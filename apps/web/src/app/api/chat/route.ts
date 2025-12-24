import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import type { RedisClientType } from "redis";
import { createClient } from "redis";

const google = process.env.GEMINI_API_KEY
	? createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY })
	: null;

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

// Redis client - optional, chat works without it (no history persistence)
let redis: RedisClientType | null = null;
let redisConnectionFailed = false;
let redisConnecting = false;

async function getRedisClient(): Promise<RedisClientType | null> {
	// If we already know Redis is unavailable, skip
	if (redisConnectionFailed) return null;

	// If no URL configured, skip
	if (!process.env.REDIS_URL) {
		redisConnectionFailed = true;
		return null;
	}

	// If already connected, return client
	if (redis?.isOpen) return redis;

	// Prevent multiple concurrent connection attempts
	if (redisConnecting) return null;

	// Try to connect
	redisConnecting = true;
	try {
		if (!redis) {
			redis = createClient({ url: process.env.REDIS_URL }) as RedisClientType;
			redis.on("error", (err) => {
				console.error("Redis Client Error:", err.message);
				redisConnectionFailed = true;
			});
		}
		await redis.connect();
		redisConnecting = false;
		return redis;
	} catch (error) {
		console.error(
			"Failed to connect to Redis:",
			error instanceof Error ? error.message : error,
		);
		redisConnectionFailed = true;
		redisConnecting = false;
		return null;
	}
}

// Enhanced system prompt with navigation and quick action capabilities
const SYSTEM_PROMPT = `You are Ajil, an intelligent AI assistant for Ajil-Go - a professional micro task marketplace platform in Mongolia.

## YOUR IDENTITY
- Name: Ajil (means "work" in Mongolian)
- Personality: Professional, helpful, proactive, and friendly
- Language: Respond in the same language the user uses (Mongolian or English)

## PLATFORM OVERVIEW
Ajil-Go connects Clients (who post tasks) with Workers (who complete tasks):
- **Workflow**: Client posts task → Workers bid → Client accepts bid → Worker completes → Both review each other
- **Categories**: Delivery, Cleaning, Moving, Tech Support, Design, Writing, Virtual Assistant, Data Entry, etc.
- **Features**: Task posting, bidding system, real-time messaging, reviews/ratings, secure payments

## YOUR CAPABILITIES

### 1. NAVIGATION ASSISTANCE
You can help users navigate the app. When suggesting navigation, include an ACTION block:

\`\`\`action
{"type": "navigate", "path": "/tasks", "label": "Browse Tasks"}
\`\`\`

Available pages:
- "/" - Home page
- "/tasks" - Browse all available tasks
- "/task/[id]" - View specific task details
- "/login" - Login page
- "/signup" - Sign up page
- "/client/dashboard" - Client dashboard
- "/client/tasks" - Client's posted tasks
- "/client/post-task" - Post a new task
- "/client/messages" - Client messages
- "/client/settings" - Client settings
- "/worker/dashboard" - Worker dashboard
- "/worker/tasks" - Available tasks for workers
- "/worker/bids" - Worker's submitted bids
- "/worker/messages" - Worker messages
- "/worker/profile" - Worker profile
- "/worker/settings" - Worker settings

### 2. QUICK ACTIONS
Suggest relevant quick actions when appropriate:

\`\`\`quickactions
[
  {"label": "Post a Task", "path": "/client/post-task", "icon": "plus"},
  {"label": "Browse Tasks", "path": "/tasks", "icon": "search"},
  {"label": "My Bids", "path": "/worker/bids", "icon": "list"}
]
\`\`\`

## RESPONSE GUIDELINES

1. **Be Proactive**: Don't just answer - suggest next steps and relevant actions
2. **Use Rich Responses**: Include navigation and quick actions when helpful (do NOT output \`tasks\` blocks)
3. **Personalize**: Use the user's context (skills, role, current page) to tailor responses
4. **Be Concise**: Keep text responses brief but informative
5. **Guide Users**: Help both new and experienced users accomplish their goals

## EXAMPLE INTERACTIONS

**User**: "I want to find design work"
**Response**: I'll help you find design tasks! Click below to browse:

\`\`\`action
{"type": "navigate", "path": "/tasks?category=design", "label": "Browse Design Tasks"}
\`\`\`

\`\`\`quickactions
[
  {"label": "View All Design Tasks", "path": "/tasks?category=design", "icon": "search"},
  {"label": "Update My Skills", "path": "/worker/profile", "icon": "user"}
]
\`\`\`

**User**: "How do I post a task?"
**Response**: Posting a task is easy! Click below to get started:

\`\`\`action
{"type": "navigate", "path": "/client/post-task", "label": "Post a New Task"}
\`\`\`

You'll need to:
1. Choose a category
2. Describe your task
3. Set your budget
4. Add a deadline (optional)

## CURRENT USER CONTEXT
{USER_CONTEXT}

## CURRENT PAGE
{PAGE_CONTEXT}

Remember: You're not just answering questions - you're actively helping users succeed on Ajil-Go!`;

interface ChatMessage {
	role: string;
	content: string;
	timestamp: number;
}

interface UserContext {
	isAuthenticated?: boolean;
	userId?: string;
	name?: string;
	role?: "client" | "worker" | "both";
	skills?: string[];
	currentPage?: string;
	completedTasksAsWorker?: number;
	completedTasksAsClient?: number;
	avgRatingAsWorker?: number;
	avgRatingAsClient?: number;
}

interface UserApiResponse {
	id: string;
	name: string;
	email: string;
	bio?: string;
	city?: string;
	completedTasksAsWorker: number;
	completedTasksAsClient: number;
	avgRatingAsWorker: number;
	avgRatingAsClient: number;
	skills?: Array<{
		skill: { name: string } | null;
		customSkill: { name: string } | null;
	}>;
	_count?: {
		postedTasks: number;
		bids: number;
	};
}

// Fetch user data from the backend API
async function fetchUserData(userId: string): Promise<UserApiResponse | null> {
	try {
		const response = await fetch(`${API_URL}/api/users/${userId}`, {
			headers: { "Content-Type": "application/json" },
			cache: "no-store",
		});
		if (!response.ok) return null;
		return response.json();
	} catch (error) {
		console.error("Failed to fetch user data:", error);
		return null;
	}
}

// Determine user role based on their activity
function determineUserRole(
	user: UserApiResponse,
): "client" | "worker" | "both" {
	const hasPostedTasks = (user._count?.postedTasks ?? 0) > 0;
	const hasBids = (user._count?.bids ?? 0) > 0;

	if (hasPostedTasks && hasBids) return "both";
	if (hasPostedTasks) return "client";
	if (hasBids) return "worker";
	return "both"; // New users default to both
}

// Extract skill names from user data
function extractSkillNames(user: UserApiResponse): string[] {
	if (!user.skills) return [];
	return user.skills
		.map((s) => s.skill?.name || s.customSkill?.name)
		.filter((name): name is string => !!name);
}

function stripTasksBlocks(text: string): string {
	return text
		.replace(/```tasks[\s\S]*?```/gi, "")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

function isChatMessage(value: unknown): value is ChatMessage {
	if (typeof value !== "object" || value === null) return false;
	const record = value as Record<string, unknown>;
	return (
		typeof record.role === "string" &&
		typeof record.content === "string" &&
		typeof record.timestamp === "number"
	);
}

function buildPromptWithContext(userContext: UserContext): string {
	let userContextStr: string;

	if (userContext.isAuthenticated) {
		const statsStr =
			userContext.completedTasksAsWorker || userContext.completedTasksAsClient
				? `
- Completed tasks as worker: ${userContext.completedTasksAsWorker || 0}
- Completed tasks as client: ${userContext.completedTasksAsClient || 0}
- Average rating as worker: ${userContext.avgRatingAsWorker?.toFixed(1) || "N/A"}
- Average rating as client: ${userContext.avgRatingAsClient?.toFixed(1) || "N/A"}`
				: "";

		userContextStr = `- Authenticated: Yes
- User ID: ${userContext.userId || "Unknown"}
- Name: ${userContext.name || "Unknown"}
- Primary Role: ${userContext.role || "Unknown"}
- Skills: ${userContext.skills?.length ? userContext.skills.join(", ") : "None specified"}${statsStr}`;
	} else {
		userContextStr = "- Authenticated: No (Guest user)";
	}

	const pageContextStr = userContext.currentPage
		? `Current page: ${userContext.currentPage}`
		: "Current page: Unknown";

	return SYSTEM_PROMPT.replace("{USER_CONTEXT}", userContextStr).replace(
		"{PAGE_CONTEXT}",
		pageContextStr,
	);
}

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const sessionId = searchParams.get("sessionId");

		if (!sessionId) {
			return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
		}

		// Try to get Redis client (optional)
		const redisClient = await getRedisClient();

		const historyKey = `chat:session:${sessionId}`;
		let history: ChatMessage[] = [];

		if (redisClient) {
			try {
				const historyData = await redisClient.get(historyKey);
				if (historyData) {
					const parsedHistory: unknown = JSON.parse(historyData);
					if (Array.isArray(parsedHistory)) {
						history = parsedHistory
							.filter(isChatMessage)
							.map((h) => ({ ...h, content: stripTasksBlocks(h.content) }));
					}
				}
			} catch (error) {
				console.error("Error loading chat history:", error);
			}
		}

		return NextResponse.json({ history });
	} catch (error) {
		console.error("Chat history API error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function POST(request: NextRequest) {
	try {
		const { message, sessionId, userContext = {} } = await request.json();

		if (!message || !sessionId) {
			return NextResponse.json(
				{ error: "Missing message or sessionId" },
				{ status: 400 },
			);
		}

		// Try to get Redis client (optional)
		const redisClient = await getRedisClient();

		// Enrich user context with real data if authenticated
		let enrichedContext: UserContext = userContext as UserContext;
		if (userContext.isAuthenticated && userContext.userId) {
			const userData = await fetchUserData(userContext.userId);
			if (userData) {
				enrichedContext = {
					...enrichedContext,
					name: userData.name,
					role: determineUserRole(userData),
					skills: extractSkillNames(userData),
					completedTasksAsWorker: userData.completedTasksAsWorker,
					completedTasksAsClient: userData.completedTasksAsClient,
					avgRatingAsWorker: userData.avgRatingAsWorker,
					avgRatingAsClient: userData.avgRatingAsClient,
				};
			}
		}

		// Load chat history (last 30 messages) if Redis is available
		const historyKey = `chat:session:${sessionId}`;
		let history: ChatMessage[] = [];

		if (redisClient) {
			try {
				const historyData = await redisClient.get(historyKey);
				if (historyData) {
					const parsedHistory: unknown = JSON.parse(historyData);
					if (Array.isArray(parsedHistory)) {
						history = parsedHistory
							.filter(isChatMessage)
							.map((h) => ({ ...h, content: stripTasksBlocks(h.content) }));
					} else {
						history = [];
					}
				}
			} catch (error) {
				console.error("Error loading chat history:", error);
				history = [];
			}
		}

		// Keep only last 30
		if (history.length > 30) {
			history = history.slice(-30);
		}

		let aiMessage: string;
		const systemPrompt = buildPromptWithContext(enrichedContext);

		// Helper function to detect Mongolian text (Cyrillic characters)
		const isMongolian = (text: string): boolean => {
			// Check for Cyrillic characters commonly used in Mongolian
			const cyrillicPattern = /[\u0400-\u04FF]/;
			return cyrillicPattern.test(text);
		};

		// Helper function to generate mock responses
		const generateMockResponse = (msg: string): string => {
			const lowerMessage = msg.toLowerCase();
			const useMongolian = isMongolian(msg);

			// Mongolian keywords
			const mnTaskKeywords = ["ажил", "даалгавар", "захиалга"];
			const mnFindKeywords = ["олох", "хайх", "харуулах", "харах"];
			const mnPostKeywords = ["нийтлэх", "үүсгэх", "оруулах", "шинэ"];
			const mnGreetKeywords = [
				"сайн байна уу",
				"сайн уу",
				"сайн",
				"тусламж",
				"туслах",
				"юу хийж",
			];

			// Check for task-related queries
			const isTaskQuery = useMongolian
				? mnTaskKeywords.some((kw) => lowerMessage.includes(kw)) ||
					mnFindKeywords.some((kw) => lowerMessage.includes(kw))
				: lowerMessage.includes("task") ||
					lowerMessage.includes("work") ||
					lowerMessage.includes("job");

			if (isTaskQuery) {
				if (useMongolian) {
					return `Танд тохирох ажлуудыг олоход туслая! Доорх товчоор ажлын жагсаалт руу орно уу:

\`\`\`action
{"type": "navigate", "path": "/tasks", "label": "Ажлууд үзэх"}
\`\`\`

\`\`\`quickactions
[
  {"label": "Бүх ажлууд", "path": "/tasks", "icon": "search"},
  {"label": "Ажил нийтлэх", "path": "/client/post-task", "icon": "plus"}
]
\`\`\``;
				}
				return `I'll help you find the perfect tasks! Use the button below to open the task list:

\`\`\`action
{"type": "navigate", "path": "/tasks", "label": "Browse Tasks"}
\`\`\`

\`\`\`quickactions
[
  {"label": "Browse All Tasks", "path": "/tasks", "icon": "search"},
  {"label": "Post a Task", "path": "/client/post-task", "icon": "plus"}
]
\`\`\``;
			}

			// Check for post/create queries
			const isPostQuery = useMongolian
				? mnPostKeywords.some((kw) => lowerMessage.includes(kw))
				: lowerMessage.includes("post") || lowerMessage.includes("create");

			if (isPostQuery) {
				if (useMongolian) {
					return `Маш сайн! Шинэ даалгавар нийтлэхэд туслая:

\`\`\`action
{"type": "navigate", "path": "/client/post-task", "label": "Шинэ даалгавар үүсгэх"}
\`\`\`

**Амжилттай даалгавар нийтлэх зөвлөмж:**
1. Тодорхой, ойлгомжтой гарчиг бичих
2. Бүх шаардлагыг тайлбарт оруулах
3. Зохистой төсөв тогтоох
4. Шаардлагатай ур чадваруудыг нэмэх`;
				}
				return `Great! Let me help you post a new task:

\`\`\`action
{"type": "navigate", "path": "/client/post-task", "label": "Create New Task"}
\`\`\`

**Tips for a successful task post:**
1. Write a clear, descriptive title
2. Include all requirements in the description
3. Set a fair budget range
4. Add relevant skills needed`;
			}

			// Check for greetings/help
			const isGreeting = useMongolian
				? mnGreetKeywords.some((kw) => lowerMessage.includes(kw))
				: lowerMessage.includes("help") ||
					lowerMessage.includes("hi") ||
					lowerMessage.includes("hello");

			if (isGreeting) {
				if (useMongolian) {
					return `Сайн байна уу! Би **Ажил** - Ajil-Go платформын AI туслах.

Би танд тусалж чадна:
- Таны ур чадварт тохирсон ажил олох
- Шинэ даалгавар нийтлэх, санал удирдах
- Платформыг ашиглахад туслах
- Амжилтын зөвлөмж өгөх

\`\`\`quickactions
[
  {"label": "Ажил хайх", "path": "/tasks", "icon": "search"},
  {"label": "Ажил нийтлэх", "path": "/client/post-task", "icon": "plus"},
  {"label": "Хяналтын самбар", "path": "/worker/dashboard", "icon": "home"}
]
\`\`\`

Өнөөдөр танд юугаар туслах вэ?`;
				}
				return `Hello! I'm **Ajil**, your AI assistant for Ajil-Go.

I can help you:
- Find tasks that match your skills
- Post new tasks and manage bids
- Navigate the platform
- Get tips for success

\`\`\`quickactions
[
  {"label": "Find Tasks", "path": "/tasks", "icon": "search"},
  {"label": "Post a Task", "path": "/client/post-task", "icon": "plus"},
  {"label": "My Dashboard", "path": "/worker/dashboard", "icon": "home"}
]
\`\`\`

What would you like to do today?`;
			}

			// Default response
			if (useMongolian) {
				return `Таны "${msg}" гэсэн хүсэлтийг хүлээн авлаа.

Ajil-Go туслах болохын хувьд би танд:
- Ажил олох, бүртгүүлэхэд туслах
- Даалгавар нийтлэх, ажилчдыг удирдах
- Платформыг ашиглахад туслах

\`\`\`quickactions
[
  {"label": "Ажил харах", "path": "/tasks", "icon": "search"},
  {"label": "Тусламж авах", "path": "/", "icon": "help"}
]
\`\`\`

Танд юугаар туслахыг хүсч байна вэ?`;
			}

			return `I understand you're asking about "${msg}". 

As your Ajil-Go assistant, I can help you:
- Find and apply for tasks
- Post tasks and manage workers
- Navigate the platform

\`\`\`quickactions
[
  {"label": "Browse Tasks", "path": "/tasks", "icon": "search"},
  {"label": "Get Help", "path": "/", "icon": "help"}
]
\`\`\`

Could you tell me more about what you need?`;
		};

		// Try Gemini API with streaming, fall back to mock if it fails
		if (google) {
			try {
				// Build messages for AI SDK
				const messages = [
					{
						role: "system" as const,
						content: systemPrompt,
					},
					...history.map((h) => ({
						role: h.role === "ai" ? ("assistant" as const) : ("user" as const),
						content: h.content,
					})),
					{
						role: "user" as const,
						content: message,
					},
				];

				const result = streamText({
					model: google("gemini-2.0-flash"),
					messages,
					maxRetries: 1, // Reduce retries to fail faster
					onFinish: async ({ text }) => {
						// Save to history if Redis is available
						if (redisClient) {
							const cleanedText = stripTasksBlocks(text);
							const newHistory = [
								...history,
								{ role: "user", content: message, timestamp: Date.now() },
								{ role: "ai", content: cleanedText, timestamp: Date.now() },
							].slice(-30);

							try {
								await redisClient.set(historyKey, JSON.stringify(newHistory));
							} catch (error) {
								console.error("Failed to save chat history:", error);
							}
						}
					},
				});

				return result.toTextStreamResponse();
			} catch (geminiError) {
				console.error(
					"Gemini API error, falling back to mock response:",
					geminiError instanceof Error ? geminiError.message : geminiError,
				);
				// Fall through to mock response below
				aiMessage = generateMockResponse(message);
			}
		} else {
			console.warn("Gemini API not configured, using mock response");
			aiMessage = generateMockResponse(message);
		}

		// Fallback: Stream the mock response to match expected format
		// Ensure we never emit `tasks` blocks (client may render these as task cards)
		aiMessage = stripTasksBlocks(aiMessage);

		// Save to history if Redis is available
		if (redisClient) {
			const newHistory = [
				...history,
				{ role: "user", content: message, timestamp: Date.now() },
				{ role: "ai", content: aiMessage, timestamp: Date.now() },
			].slice(-30);

			try {
				await redisClient.set(historyKey, JSON.stringify(newHistory));
			} catch (error) {
				console.error("Failed to save chat history:", error);
			}
		}

		// Create a streaming response for the mock message
		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			async start(controller) {
				// Split message into words for streaming effect
				const words = aiMessage.split(" ");
				for (let i = 0; i < words.length; i++) {
					const word = words[i] + (i < words.length - 1 ? " " : "");
					controller.enqueue(encoder.encode(`0:"${word}"\n`));
					// Small delay for streaming effect
					await new Promise((resolve) => setTimeout(resolve, 20));
				}
				controller.close();
			},
		});

		return new Response(stream, {
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
				"Transfer-Encoding": "chunked",
			},
		});
	} catch (error) {
		console.error(
			"Chat API error:",
			error instanceof Error ? error.message : error,
		);
		console.error("Stack trace:", error instanceof Error ? error.stack : "N/A");
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
