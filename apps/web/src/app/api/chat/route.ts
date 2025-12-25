import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import type { RedisClientType } from "redis";
import { createClient } from "redis";

const groq = process.env.GROQ_API_KEY
	? createGroq({ apiKey: process.env.GROQ_API_KEY })
	: null;

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

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

## ⚠️ CRITICAL RESPONSE FORMATTING RULES

**NEVER explain code blocks to users!** The frontend automatically converts special blocks into interactive UI.

✅ CORRECT approach:
- Keep text concise and natural
- Add special blocks directly without announcing them
- They automatically become clickable buttons, task cards, etc.

❌ WRONG approach:
- Do not write phrases like "Click below" or "Here is a button"
- Do not mention that you are adding interactive elements
- Do not explain what the special blocks will do

Just include blocks naturally - they render as beautiful UI automatically!

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

### 3. TASK CARDS (IMPORTANT!)
When users ask about specific jobs/tasks/work, show them actual task cards using the tasks block:

\`\`\`tasks
{"filter": "web design", "limit": 3}
\`\`\`

Task filter options:
- "filter": Search query or "all" for all tasks, "latest" for newest
- "limit": Number of tasks to show (default 3, max 10)
- "skills": Array of required skills (optional)

**IMPORTANT**: Always use tasks blocks when users ask about finding work, viewing jobs, or looking for tasks!

## RESPONSE GUIDELINES

1. **Be Proactive**: Don't just answer - suggest next steps and relevant actions
2. **Use Rich Responses**: Include navigation, quick actions, AND TASK CARDS when helpful
3. **Show Real Tasks**: When users ask about work/jobs, ALWAYS include a tasks block to show actual available tasks
4. **Personalize**: Use the user's context (skills, role, current page) to tailor responses
5. **Be Concise**: Keep text responses brief but informative
6. **Guide Users**: Help both new and experienced users accomplish their goals

## EXAMPLE INTERACTIONS

**User**: "I want to find design work"
**Response**: Design tasks available now:

\`\`\`tasks
{"filter": "design", "limit": 3}
\`\`\`

\`\`\`quickactions
[
  {"label": "All Design", "path": "/tasks?category=design", "icon": "search"},
  {"label": "My Profile", "path": "/worker/profile", "icon": "user"}
]
\`\`\`

**User**: "Show me remote jobs"
**Response**: Latest remote opportunities:

\`\`\`tasks
{"filter": "all", "limit": 5}
\`\`\`

**User**: "How do I post a task?"
**Response**: Task posting:

\`\`\`action
{"type": "navigate", "path": "/client/post-task", "label": "Post a Task"}
\`\`\`

You'll need:
• Category selection
• Task description
• Budget range
• Deadline (optional)

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

// Keep tasks blocks - they will be rendered as interactive task cards in the chatbot
function stripTasksBlocks(text: string): string {
	// Don't strip tasks blocks anymore - let the frontend handle them
	return text;
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
					return `Одоо боломжтой ажлууд:

\`\`\`tasks
{"filter": "all", "limit": 5}
\`\`\`

\`\`\`quickactions
[
  {"label": "Бүх ажлууд", "path": "/tasks", "icon": "search"},
  {"label": "Ажил нийтлэх", "path": "/client/post-task", "icon": "plus"}
]
\`\`\``;
				}
				return `Available tasks right now:

\`\`\`tasks
{"filter": "all", "limit": 5}
\`\`\`

\`\`\`quickactions
[
  {"label": "Browse All", "path": "/tasks", "icon": "search"},
  {"label": "Post Task", "path": "/client/post-task", "icon": "plus"}
]
\`\`\``;
			}

			// Check for post/create queries
			const isPostQuery = useMongolian
				? mnPostKeywords.some((kw) => lowerMessage.includes(kw))
				: lowerMessage.includes("post") || lowerMessage.includes("create");

			if (isPostQuery) {
				if (useMongolian) {
					return `Ажил нийтлэх цэс рүү шилжүүлье:

\`\`\`action
{"type": "navigate", "path": "/client/post-task", "label": "Ажил нийтлэх"}
\`\`\`

Амжилттай ажил нийтлэхийн тулд:
• Тодорхой, ойлгомжтой гарчиг
• Дэлгэрэнгүй тайлбар
• Зохистой төсөв
• Шаардлагатай ур чадварууд`;
				}
				return `Let me take you to the task posting page:

\`\`\`action
{"type": "navigate", "path": "/client/post-task", "label": "Post a Task"}
\`\`\`

Tips for success:
• Clear, descriptive title
• Detailed requirements
• Fair budget range
• Required skills`;
			}

			// Check for greetings/help
			const isGreeting = useMongolian
				? mnGreetKeywords.some((kw) => lowerMessage.includes(kw))
				: lowerMessage.includes("help") ||
					lowerMessage.includes("hi") ||
					lowerMessage.includes("hello");

			if (isGreeting) {
				if (useMongolian) {
					return `Сайн байна уу! Би Ажил - таны AI туслах.

Танд тусална:
• Танд тохирох ажил олох
• Ажил нийтлэх, санал удирдах
• Платформыг ашиглахад туслах

Шинэ ажлууд:

\`\`\`tasks
{"filter": "latest", "limit": 3}
\`\`\`

\`\`\`quickactions
[
  {"label": "Ажил хайх", "path": "/tasks", "icon": "search"},
  {"label": "Ажил нийтлэх", "path": "/client/post-task", "icon": "plus"}
]
\`\`\``;
				}
				return `Hello! I'm Ajil, your AI assistant.

I can help you:
• Find matching tasks
• Post and manage tasks
• Navigate the platform

Latest tasks:

\`\`\`tasks
{"filter": "latest", "limit": 3}
\`\`\`

\`\`\`quickactions
[
  {"label": "Find Tasks", "path": "/tasks", "icon": "search"},
  {"label": "Post Task", "path": "/client/post-task", "icon": "plus"}
]
\`\`\``;
			}

			// Default response
			if (useMongolian) {
				return `Би танд тусалж чадна:
• Ажил хайх
• Ажил нийтлэх
• Платформ ашиглах

\`\`\`quickactions
[
  {"label": "Ажил хайх", "path": "/tasks", "icon": "search"},
  {"label": "Ажил нийтлэх", "path": "/client/post-task", "icon": "plus"}
]
\`\`\`

Танд яаж туслах вэ?`;
			}

			return `I can help you with:
• Finding tasks
• Posting tasks
• Using the platform

\`\`\`quickactions
[
  {"label": "Find Tasks", "path": "/tasks", "icon": "search"},
  {"label": "Post Task", "path": "/client/post-task", "icon": "plus"}
]
\`\`\`

What would you like to do?`;
		};

		// Try Groq API with streaming, fall back to mock if it fails
		if (groq) {
			console.log("🤖 Using Groq API for streaming response");
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
					model: groq("llama-3.3-70b-versatile"),
					messages,
					maxRetries: 2,
					async onFinish({ text }) {
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
			} catch (groqError) {
				console.error(
					"Groq API error, falling back to mock response:",
					groqError instanceof Error ? groqError.message : groqError,
				);
				// Fall through to mock response below
				aiMessage = generateMockResponse(message);
			}
		} else {
			console.warn(
				"⚠️ Groq API not configured (GROQ_API_KEY missing), using mock response",
			);
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
		console.log("📝 Streaming mock response");
		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			async start(controller) {
				// Split into words for visible streaming
				const words = aiMessage.split(" ");
				for (let i = 0; i < words.length; i++) {
					const word = words[i] + (i < words.length - 1 ? " " : "");
					controller.enqueue(encoder.encode(`0:${JSON.stringify(word)}\n`));
					// Add delay between words
					await new Promise((resolve) => setTimeout(resolve, 50));
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
