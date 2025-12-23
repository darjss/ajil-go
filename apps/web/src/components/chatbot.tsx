"use client";

import { useQuery } from "@tanstack/react-query";
import {
	ArrowRight,
	Bot,
	ExternalLink,
	HelpCircle,
	Home,
	List,
	MapPin,
	MessageSquare,
	Plus,
	Search,
	Send,
	Sparkles,
	User,
	Wifi,
	X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

// Types
interface Message {
	id: string;
	role: "user" | "ai";
	content: string;
	timestamp: number;
}

interface TaskData {
	id: string;
	title: string;
	description: string;
	budgetMin: number;
	budgetMax: number;
	isRemote: boolean;
	city?: string;
	category?: { name: string };
	deadline?: string;
	poster?: { name: string };
	_count?: { bids: number };
}

interface QuickAction {
	label: string;
	path: string;
	icon: string;
}

interface NavigationAction {
	type: "navigate";
	path: string;
	label: string;
}

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
	search: <Search className="h-4 w-4" />,
	plus: <Plus className="h-4 w-4" />,
	list: <List className="h-4 w-4" />,
	home: <Home className="h-4 w-4" />,
	user: <User className="h-4 w-4" />,
	help: <HelpCircle className="h-4 w-4" />,
	message: <MessageSquare className="h-4 w-4" />,
};

// Parse AI response for special blocks
function parseAIResponse(content: string): {
	text: string;
	tasks?: { filter: string; skills?: string[]; limit?: number };
	quickActions?: QuickAction[];
	navigation?: NavigationAction;
} {
	const result: ReturnType<typeof parseAIResponse> = { text: content };

	// Extract tasks block
	const tasksMatch = content.match(/```tasks\n([\s\S]*?)\n```/);
	if (tasksMatch) {
		try {
			result.tasks = JSON.parse(tasksMatch[1]);
			result.text = result.text.replace(tasksMatch[0], "").trim();
		} catch (e) {
			console.error("Failed to parse tasks block:", e);
		}
	}

	// Extract quick actions block
	const actionsMatch = content.match(/```quickactions\n([\s\S]*?)\n```/);
	if (actionsMatch) {
		try {
			result.quickActions = JSON.parse(actionsMatch[1]);
			result.text = result.text.replace(actionsMatch[0], "").trim();
		} catch (e) {
			console.error("Failed to parse quickactions block:", e);
		}
	}

	// Extract navigation action
	const navMatch = content.match(/```action\n([\s\S]*?)\n```/);
	if (navMatch) {
		try {
			result.navigation = JSON.parse(navMatch[1]);
			result.text = result.text.replace(navMatch[0], "").trim();
		} catch (e) {
			console.error("Failed to parse action block:", e);
		}
	}

	return result;
}

// Mini Task Card for AI responses
function MiniTaskCard({ task }: { task: TaskData }) {
	const formatBudget = (min: number, max: number) => {
		if (min === max) return `₮${min.toLocaleString()}`;
		return `₮${min.toLocaleString()} - ₮${max.toLocaleString()}`;
	};

	return (
		<Card className="overflow-hidden border-border/50 bg-background/50 transition-all hover:border-primary/50 hover:shadow-sm">
			<CardContent className="p-3">
				<div className="mb-2 flex items-start justify-between gap-2">
					<div className="flex flex-wrap gap-1">
						{task.category && (
							<Badge variant="secondary" className="text-[10px]">
								{task.category.name}
							</Badge>
						)}
						<Badge variant="outline" className="text-[10px]">
							{task.isRemote ? (
								<>
									<Wifi className="mr-1 h-2.5 w-2.5" />
									Remote
								</>
							) : (
								<>
									<MapPin className="mr-1 h-2.5 w-2.5" />
									{task.city || "On-site"}
								</>
							)}
						</Badge>
					</div>
					{task._count?.bids !== undefined && (
						<span className="text-[10px] text-muted-foreground">
							{task._count.bids} bids
						</span>
					)}
				</div>
				<h4 className="mb-1 line-clamp-1 font-medium text-sm">{task.title}</h4>
				<p className="mb-2 line-clamp-2 text-muted-foreground text-xs">
					{task.description}
				</p>
				<div className="flex items-center justify-between">
					<span className="font-semibold text-primary text-xs">
						{formatBudget(task.budgetMin, task.budgetMax)}
					</span>
					<Link href={`/task/${task.id}`}>
						<Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
							View <ArrowRight className="ml-1 h-3 w-3" />
						</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}

// Quick Action Button
function QuickActionButton({
	action,
	onClick,
}: {
	action: QuickAction;
	onClick: () => void;
}) {
	return (
		<Button
			variant="outline"
			size="sm"
			className="h-8 gap-1.5 rounded-full text-xs"
			onClick={onClick}
		>
			{iconMap[action.icon] || <ExternalLink className="h-3.5 w-3.5" />}
			{action.label}
		</Button>
	);
}

// Navigation Action Card
function NavigationCard({
	action,
	onClick,
}: {
	action: NavigationAction;
	onClick: () => void;
}) {
	return (
		<Button
			variant="default"
			className="h-auto w-full justify-start gap-3 rounded-xl p-4"
			onClick={onClick}
		>
			<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
				<ArrowRight className="h-5 w-5" />
			</div>
			<div className="text-left">
				<div className="font-semibold">{action.label}</div>
				<div className="text-primary-foreground/70 text-xs">{action.path}</div>
			</div>
		</Button>
	);
}

// Task Cards Loading Component
function TaskCardsLoading() {
	return (
		<div className="space-y-2">
			{[1, 2, 3].map((i) => (
				<Card
					key={i}
					className="overflow-hidden border-border/50 bg-background/50"
				>
					<CardContent className="p-3">
						<div className="mb-2 flex gap-1">
							<div className="h-4 w-16 animate-pulse rounded bg-muted" />
							<div className="h-4 w-14 animate-pulse rounded bg-muted" />
						</div>
						<div className="mb-1 h-4 w-3/4 animate-pulse rounded bg-muted" />
						<div className="mb-2 h-3 w-full animate-pulse rounded bg-muted" />
						<div className="flex items-center justify-between">
							<div className="h-4 w-24 animate-pulse rounded bg-muted" />
							<div className="h-6 w-12 animate-pulse rounded bg-muted" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

// Task Cards Container that fetches real data
function TaskCards({
	taskFilter,
}: {
	taskFilter: { filter: string; skills?: string[]; limit?: number };
}) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["chat-tasks", taskFilter],
		queryFn: async () => {
			const response = await fetch("/api/chat/tasks", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(taskFilter),
			});
			if (!response.ok) throw new Error("Failed to fetch tasks");
			return response.json() as Promise<{ tasks: TaskData[]; total: number }>;
		},
		staleTime: 30000, // Cache for 30 seconds
	});

	if (isLoading) {
		return <TaskCardsLoading />;
	}

	if (error || !data?.tasks?.length) {
		return (
			<div className="rounded-xl border border-muted-foreground/30 border-dashed p-4 text-center">
				<p className="text-muted-foreground text-sm">
					{error
						? "Unable to load tasks"
						: "No tasks found matching your criteria"}
				</p>
				<Link href="/tasks">
					<Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs">
						Browse all tasks <ArrowRight className="ml-1 h-3 w-3" />
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="space-y-2">
			{data.tasks.slice(0, taskFilter.limit || 3).map((task) => (
				<MiniTaskCard key={task.id} task={task} />
			))}
			{data.total > (taskFilter.limit || 3) && (
				<Link href="/tasks" className="block">
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-full text-muted-foreground text-xs"
					>
						View {data.total - (taskFilter.limit || 3)} more tasks
						<ArrowRight className="ml-1 h-3 w-3" />
					</Button>
				</Link>
			)}
		</div>
	);
}

// Message Component
function ChatMessage({ message }: { message: Message }) {
	if (message.role === "user") {
		return (
			<div className="flex justify-end">
				<div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-primary-foreground">
					<p className="text-sm">{message.content}</p>
				</div>
			</div>
		);
	}

	const parsed = parseAIResponse(message.content);

	return (
		<div className="flex gap-2.5">
			<Avatar className="h-8 w-8 shrink-0 border border-border">
				<AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
					<Sparkles className="h-4 w-4" />
				</AvatarFallback>
			</Avatar>
			<div className="max-w-[85%] space-y-3">
				{/* Text content */}
				{parsed.text && (
					<div className="rounded-2xl rounded-tl-md bg-muted/70 px-4 py-2.5">
						<div className="prose prose-sm dark:prose-invert max-w-none text-sm [&_li]:my-0.5 [&_p]:my-1 [&_ul]:my-1">
							<ReactMarkdown>{parsed.text}</ReactMarkdown>
						</div>
					</div>
				)}

				{/* Navigation action */}
				{parsed.navigation && (
					<NavigationCard
						action={parsed.navigation}
						onClick={() => {
							if (parsed.navigation?.path) {
								window.location.href = parsed.navigation.path;
							}
						}}
					/>
				)}

				{/* Task cards - now fetching real data */}
				{parsed.tasks && <TaskCards taskFilter={parsed.tasks} />}

				{/* Quick actions */}
				{parsed.quickActions && parsed.quickActions.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{parsed.quickActions.map((action, idx) => (
							<QuickActionButton
								key={`${action.path}-${idx}`}
								action={action}
								onClick={() => {
									window.location.href = action.path;
								}}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

// Loading indicator
function TypingIndicator() {
	return (
		<div className="flex gap-2.5">
			<Avatar className="h-8 w-8 shrink-0 border border-border">
				<AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
					<Sparkles className="h-4 w-4" />
				</AvatarFallback>
			</Avatar>
			<div className="rounded-2xl rounded-tl-md bg-muted/70 px-4 py-3">
				<div className="flex gap-1">
					<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
					<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
					<span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
				</div>
			</div>
		</div>
	);
}

// Suggested prompts - bilingual
const SUGGESTED_PROMPTS = [
	{ text: "Ажил хайх", textEn: "Find tasks", icon: "search" },
	{ text: "Ажил нийтлэх", textEn: "Post a task", icon: "plus" },
	{ text: "Тусламж", textEn: "Help", icon: "home" },
];

// Main Chatbot Component
export function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [sessionId] = useState(() => {
		if (typeof window !== "undefined") {
			const stored = sessionStorage.getItem("chatbot-session-id");
			if (stored) return stored;
			const newId = crypto.randomUUID();
			sessionStorage.setItem("chatbot-session-id", newId);
			return newId;
		}
		return crypto.randomUUID();
	});

	const messagesEndRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const pathname = usePathname();
	const _router = useRouter();

	// Get current user session
	const { data: session } = authClient.useSession();

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [scrollToBottom]);

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus();
		}
	}, [isOpen]);

	const loadHistory = useCallback(async () => {
		try {
			const response = await fetch(`/api/chat?sessionId=${sessionId}`);
			if (response.ok) {
				const data = await response.json();
				if (data.history && Array.isArray(data.history)) {
					setMessages(
						data.history.map(
							(
								m: { role: string; content: string; timestamp: number },
								idx: number,
							) => ({
								...m,
								id: `hist-${idx}`,
								role: m.role as "user" | "ai",
							}),
						),
					);
				}
			}
		} catch (error) {
			console.error("Failed to load chat history:", error);
		}
	}, [sessionId]);

	useEffect(() => {
		if (isOpen && messages.length === 0) {
			loadHistory();
		}
	}, [isOpen, loadHistory, messages.length]);

	const sendMessage = async (text?: string) => {
		const messageText = text || input.trim();
		if (!messageText || loading) return;

		setInput("");
		setLoading(true);

		const userMessage: Message = {
			id: `user-${Date.now()}`,
			role: "user",
			content: messageText,
			timestamp: Date.now(),
		};
		setMessages((prev) => [...prev, userMessage]);

		try {
			const userContext = {
				isAuthenticated: !!session?.user,
				userId: session?.user?.id,
				name: session?.user?.name,
				currentPage: pathname,
			};

			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					message: messageText,
					sessionId,
					userContext,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				const aiMessage: Message = {
					id: `ai-${Date.now()}`,
					role: "ai",
					content: data.message,
					timestamp: Date.now(),
				};
				setMessages((prev) => [...prev, aiMessage]);
			} else {
				throw new Error("Failed to get response");
			}
		} catch (error) {
			console.error("Chat error:", error);
			const errorMessage: Message = {
				id: `error-${Date.now()}`,
				role: "ai",
				content: "Sorry, I couldn't process your message. Please try again.",
				timestamp: Date.now(),
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<>
			{/* Floating Button */}
			<Button
				onClick={() => setIsOpen(true)}
				className={cn(
					"fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300",
					"bg-gradient-to-br from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600",
					"hover:scale-110 hover:shadow-xl",
					isOpen && "scale-0 opacity-0",
				)}
				size="icon"
			>
				<Bot className="h-6 w-6 text-white" />
			</Button>

			{/* Chat Panel */}
			<div
				className={cn(
					"fixed right-6 bottom-6 z-50 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl transition-all duration-300",
					isOpen
						? "scale-100 opacity-100"
						: "pointer-events-none scale-95 opacity-0",
				)}
			>
				{/* Header */}
				<div className="flex items-center justify-between border-b bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-3 text-white">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
							<Sparkles className="h-5 w-5" />
						</div>
						<div>
							<h3 className="font-semibold">Ajil Assistant</h3>
							<p className="text-white/70 text-xs">Always here to help</p>
						</div>
					</div>
					<Button
						variant="ghost"
						size="icon"
						className="h-8 w-8 text-white/80 hover:bg-white/20 hover:text-white"
						onClick={() => setIsOpen(false)}
					>
						<X className="h-5 w-5" />
					</Button>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto p-4">
					<div className="space-y-4">
						{messages.length === 0 && !loading && (
							<div className="py-8 text-center">
								<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30">
									<Sparkles className="h-8 w-8 text-violet-600 dark:text-violet-400" />
								</div>
								<h4 className="mb-1 font-semibold">Сайн байна уу! Би Ажил</h4>
								<p className="mb-6 text-muted-foreground text-sm">
									Ajil-Go платформын AI туслах
								</p>
								<div className="flex flex-wrap justify-center gap-2">
									{SUGGESTED_PROMPTS.map((prompt) => (
										<Button
											key={prompt.text}
											variant="outline"
											size="sm"
											className="h-auto flex-col gap-0.5 rounded-xl px-3 py-2 text-xs"
											onClick={() => sendMessage(prompt.text)}
										>
											<span className="flex items-center gap-1.5">
												{iconMap[prompt.icon]}
												{prompt.text}
											</span>
											<span className="text-[10px] text-muted-foreground">
												{prompt.textEn}
											</span>
										</Button>
									))}
								</div>
							</div>
						)}

						{messages.map((msg) => (
							<ChatMessage key={msg.id} message={msg} />
						))}

						{loading && <TypingIndicator />}

						<div ref={messagesEndRef} />
					</div>
				</div>

				{/* Input */}
				<div className="border-t bg-muted/30 p-4">
					<div className="flex gap-2">
						<input
							ref={inputRef}
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder="Асуултаа бичнэ үү... / Ask anything..."
							className="flex-1 rounded-full border bg-background px-4 py-2.5 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
							disabled={loading}
						/>
						<Button
							onClick={() => sendMessage()}
							disabled={!input.trim() || loading}
							size="icon"
							className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 hover:from-violet-500 hover:to-purple-600"
						>
							<Send className="h-4 w-4 text-white" />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
