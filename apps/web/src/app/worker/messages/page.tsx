"use client";

import type { MessageApiResponse, TaskApiResponse } from "@ajil-go/contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Check,
	CheckCheck,
	ChevronLeft,
	Clock,
	Loader2,
	MessageSquare,
	Search,
	Send,
	Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { messagesApi } from "@/lib/api";
import { messageKeys, taskQueries, userQueries } from "@/lib/queries";

interface Conversation {
	taskId: string;
	task: TaskApiResponse;
	messages: MessageApiResponse[];
	lastMessage: MessageApiResponse | null;
	unreadCount: number;
	otherUser: {
		id: string;
		name: string;
		image: string | null;
	} | null;
}

function formatMessageTime(date: Date): string {
	const now = new Date();
	const messageDate = new Date(date);
	const diffMs = now.getTime() - messageDate.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return "Одоо";
	if (diffMins < 60) return `${diffMins}м`;
	if (diffHours < 24) return `${diffHours}ц`;
	if (diffDays < 7) return `${diffDays}ө`;

	return messageDate.toLocaleDateString("mn-MN", {
		month: "short",
		day: "numeric",
	});
}

function formatFullTime(date: Date): string {
	return new Date(date).toLocaleTimeString("mn-MN", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

function ConversationListSkeleton() {
	const skeletonItems = ["skel-1", "skel-2", "skel-3", "skel-4"];
	return (
		<div className="space-y-2 p-3">
			{skeletonItems.map((id) => (
				<div key={id} className="flex items-start gap-3 p-3">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-32" />
						<Skeleton className="h-3 w-full" />
					</div>
				</div>
			))}
		</div>
	);
}

function EmptyState({
	icon: Icon,
	title,
	description,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
}) {
	return (
		<div className="flex h-full flex-col items-center justify-center p-8">
			<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900">
				<Icon className="h-8 w-8 text-slate-400" />
			</div>
			<h3 className="mb-2 font-semibold text-lg text-slate-900 dark:text-white">
				{title}
			</h3>
			<p className="max-w-sm text-center text-slate-500 text-sm dark:text-slate-400">
				{description}
			</p>
		</div>
	);
}

function ConversationItem({
	conversation,
	isActive,
	currentUserId,
	onClick,
}: {
	conversation: Conversation;
	isActive: boolean;
	currentUserId: string;
	onClick: () => void;
}) {
	const isMyMessage = conversation.lastMessage?.senderId === currentUserId;
	const otherUser = conversation.otherUser;

	return (
		<button
			type="button"
			onClick={onClick}
			className={`group flex w-full items-start gap-3 rounded-xl p-3 text-left transition-all duration-200 ${
				isActive
					? "bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 shadow-sm"
					: "hover:bg-slate-50 dark:hover:bg-slate-800/50"
			}`}
		>
			<div className="relative">
				<Avatar className="h-12 w-12 shadow-sm ring-2 ring-white dark:ring-slate-800">
					<AvatarImage src={otherUser?.image || undefined} />
					<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-cyan-500 font-semibold text-white">
						{otherUser?.name?.charAt(0) || "?"}
					</AvatarFallback>
				</Avatar>
				{conversation.unreadCount > 0 && (
					<span className="-right-1 -top-1 absolute flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-1.5 font-bold text-[10px] text-white shadow-lg">
						{conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
					</span>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="mb-0.5 flex items-center justify-between gap-2">
					<p
						className={`truncate font-semibold text-sm ${isActive ? "text-emerald-700 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}
					>
						{otherUser?.name || "Хэрэглэгч"}
					</p>
					<span className="shrink-0 text-[11px] text-slate-400">
						{conversation.lastMessage
							? formatMessageTime(conversation.lastMessage.createdAt)
							: ""}
					</span>
				</div>
				<p className="mb-1 truncate text-slate-500 text-xs dark:text-slate-400">
					{conversation.task.title}
				</p>
				{conversation.lastMessage && (
					<div className="flex items-center gap-1.5">
						{isMyMessage && (
							<span className="shrink-0 text-emerald-500">
								{conversation.lastMessage.isRead ? (
									<CheckCheck className="h-3.5 w-3.5" />
								) : (
									<Check className="h-3.5 w-3.5" />
								)}
							</span>
						)}
						<p
							className={`truncate text-sm ${
								conversation.unreadCount > 0 && !isMyMessage
									? "font-medium text-slate-900 dark:text-white"
									: "text-slate-500 dark:text-slate-400"
							}`}
						>
							{conversation.lastMessage.content}
						</p>
					</div>
				)}
			</div>
		</button>
	);
}

function MessageBubble({
	message,
	isOwn,
	showTime,
}: {
	message: MessageApiResponse;
	isOwn: boolean;
	showTime: boolean;
}) {
	return (
		<div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
			<div
				className={`group relative max-w-[75%] ${isOwn ? "order-2" : "order-1"}`}
			>
				<div
					className={`rounded-2xl px-4 py-2.5 ${
						isOwn
							? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/20 shadow-lg"
							: "bg-white text-slate-900 shadow-md ring-1 ring-slate-100 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
					}`}
				>
					<p className="text-sm leading-relaxed">{message.content}</p>
				</div>
				{showTime && (
					<div
						className={`mt-1 flex items-center gap-1.5 ${isOwn ? "justify-end" : "justify-start"}`}
					>
						<span className="text-[11px] text-slate-400">
							{formatFullTime(message.createdAt)}
						</span>
						{isOwn && (
							<span className="text-emerald-500">
								{message.isRead ? (
									<CheckCheck className="h-3.5 w-3.5" />
								) : (
									<Check className="h-3.5 w-3.5" />
								)}
							</span>
						)}
					</div>
				)}
			</div>
		</div>
	);
}

export default function WorkerMessagesPage() {
	const queryClient = useQueryClient();
	const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
	const [newMessage, setNewMessage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showConversationList, setShowConversationList] = useState(true);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { data: user } = useQuery(userQueries.me());

	const { data: assignedTasks, isLoading: isLoadingAssigned } = useQuery({
		...taskQueries.list({ status: "IN_PROGRESS", limit: 100 }),
		enabled: !!user?.id,
	});

	const { data: completedTasks, isLoading: isLoadingCompleted } = useQuery({
		...taskQueries.list({ status: "COMPLETED", limit: 100 }),
		enabled: !!user?.id,
	});

	const allTasks = useMemo(() => {
		const tasksMap = new Map<string, TaskApiResponse>();
		for (const t of assignedTasks?.data || []) {
			if (t.assignedBidId) {
				tasksMap.set(t.id, t);
			}
		}
		for (const t of completedTasks?.data || []) {
			if (t.assignedBidId) {
				tasksMap.set(t.id, t);
			}
		}
		return Array.from(tasksMap.values());
	}, [assignedTasks, completedTasks]);

	const { data: allMessages, isLoading: isLoadingMessages } = useQuery({
		queryKey: messageKeys.list({ limit: 500 }),
		queryFn: () => messagesApi.list({ limit: 500 }),
		enabled: !!user?.id,
	});

	const conversations = useMemo<Conversation[]>(() => {
		if (!user?.id || !allMessages?.data) return [];

		const convMap = new Map<string, Conversation>();

		for (const task of allTasks) {
			const taskMessages = allMessages.data.filter((m) => m.taskId === task.id);
			if (taskMessages.length === 0) continue;

			const sortedMessages = [...taskMessages].sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);

			const otherUserId =
				taskMessages.find((m) => m.senderId !== user.id)?.senderId ||
				(task.posterId !== user.id ? task.posterId : null);

			const otherUserMessage = taskMessages.find(
				(m) => m.senderId === otherUserId,
			);

			convMap.set(task.id, {
				taskId: task.id,
				task,
				messages: sortedMessages.reverse(),
				lastMessage: sortedMessages[0] || null,
				unreadCount: taskMessages.filter(
					(m) => !m.isRead && m.senderId !== user.id,
				).length,
				otherUser: otherUserMessage?.sender
					? {
							id: otherUserMessage.sender.id,
							name: otherUserMessage.sender.name,
							image: otherUserMessage.sender.image,
						}
					: task.poster && task.poster.id !== user.id
						? {
								id: task.poster.id,
								name: task.poster.name,
								image: task.poster.image,
							}
						: null,
			});
		}

		return Array.from(convMap.values()).sort((a, b) => {
			const aTime = a.lastMessage
				? new Date(a.lastMessage.createdAt).getTime()
				: 0;
			const bTime = b.lastMessage
				? new Date(b.lastMessage.createdAt).getTime()
				: 0;
			return bTime - aTime;
		});
	}, [allTasks, allMessages, user?.id]);

	const filteredConversations = useMemo(() => {
		if (!searchQuery.trim()) return conversations;
		const query = searchQuery.toLowerCase();
		return conversations.filter(
			(c) =>
				c.task.title.toLowerCase().includes(query) ||
				c.otherUser?.name.toLowerCase().includes(query),
		);
	}, [conversations, searchQuery]);

	const selectedConversation = useMemo(
		() => conversations.find((c) => c.taskId === selectedTaskId),
		[conversations, selectedTaskId],
	);

	const sendMessageMutation = useMutation({
		mutationFn: (content: string) =>
			messagesApi.create({
				taskId: selectedTaskId as string,
				senderId: user?.id as string,
				content,
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: messageKeys.all });
			setNewMessage("");
		},
	});

	const markReadMutation = useMutation({
		mutationFn: (messageIds: string[]) => messagesApi.markRead(messageIds),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: messageKeys.all });
		},
	});

	const markMessagesAsRead = useCallback(
		(conv: Conversation, userId: string) => {
			const unreadIds = conv.messages
				.filter((m) => !m.isRead && m.senderId !== userId)
				.map((m) => m.id);
			if (unreadIds.length > 0) {
				markReadMutation.mutate(unreadIds);
			}
		},
		[markReadMutation],
	);

	useEffect(() => {
		if (selectedConversation && user?.id) {
			markMessagesAsRead(selectedConversation, user.id);
		}
	}, [selectedConversation, user?.id, markMessagesAsRead]);

	const messageCount = selectedConversation?.messages.length ?? 0;
	useEffect(() => {
		if (messagesEndRef.current && messageCount > 0) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messageCount]);

	const handleSend = useCallback(() => {
		const trimmed = newMessage.trim();
		if (!trimmed || !selectedTaskId || sendMessageMutation.isPending) return;
		sendMessageMutation.mutate(trimmed);
	}, [newMessage, selectedTaskId, sendMessageMutation]);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				handleSend();
			}
		},
		[handleSend],
	);

	const isLoading =
		isLoadingAssigned || isLoadingCompleted || isLoadingMessages;

	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
			</div>
		);
	}

	return (
		<div className="flex h-screen flex-col bg-slate-50 dark:bg-slate-950">
			<header className="shrink-0 border-slate-200/70 border-b bg-white px-6 py-4 dark:border-slate-800 dark:bg-slate-900">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-bold text-2xl text-slate-900 tracking-tight dark:text-white">
							Мессежүүд
						</h1>
						<p className="mt-0.5 text-slate-500 text-sm dark:text-slate-400">
							Захиалагчидтай харилцаа
						</p>
					</div>
					{conversations.length > 0 && (
						<Badge
							variant="secondary"
							className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
						>
							{conversations.reduce((acc, c) => acc + c.unreadCount, 0)}{" "}
							уншаагүй
						</Badge>
					)}
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				<aside
					className={`${
						showConversationList ? "flex" : "hidden"
					} w-full flex-col border-slate-200/70 border-r bg-white lg:flex lg:w-80 xl:w-96 dark:border-slate-800 dark:bg-slate-900 ${
						selectedTaskId ? "hidden lg:flex" : ""
					}`}
				>
					<div className="shrink-0 border-slate-100 border-b p-3 dark:border-slate-800">
						<div className="relative">
							<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-slate-400" />
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Харилцаа хайх..."
								className="border-slate-200 bg-slate-50 pl-10 dark:border-slate-700 dark:bg-slate-800"
							/>
						</div>
					</div>

					<ScrollArea className="flex-1">
						{isLoading ? (
							<ConversationListSkeleton />
						) : filteredConversations.length === 0 ? (
							<EmptyState
								icon={MessageSquare}
								title="Харилцаа байхгүй"
								description="Даалгавартай холбоотой харилцаа эхлээгүй байна."
							/>
						) : (
							<div className="space-y-1 p-2">
								{filteredConversations.map((conv) => (
									<ConversationItem
										key={conv.taskId}
										conversation={conv}
										isActive={conv.taskId === selectedTaskId}
										currentUserId={user.id}
										onClick={() => {
											setSelectedTaskId(conv.taskId);
											setShowConversationList(false);
										}}
									/>
								))}
							</div>
						)}
					</ScrollArea>
				</aside>

				<main
					className={`${
						selectedTaskId ? "flex" : "hidden lg:flex"
					} flex-1 flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950`}
				>
					{!selectedConversation ? (
						<EmptyState
							icon={Sparkles}
							title="Харилцаа сонгох"
							description="Зүүн талаас харилцаа сонгоно уу."
						/>
					) : (
						<>
							<div className="flex shrink-0 items-center gap-3 border-slate-200/70 border-b bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
								<Button
									variant="ghost"
									size="icon"
									className="lg:hidden"
									onClick={() => {
										setSelectedTaskId(null);
										setShowConversationList(true);
									}}
								>
									<ChevronLeft className="h-5 w-5" />
								</Button>
								<Avatar className="h-10 w-10 ring-2 ring-emerald-500/20">
									<AvatarImage
										src={selectedConversation.otherUser?.image || undefined}
									/>
									<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-cyan-500 font-semibold text-white">
										{selectedConversation.otherUser?.name?.charAt(0) || "?"}
									</AvatarFallback>
								</Avatar>
								<div className="min-w-0 flex-1">
									<p className="truncate font-semibold text-slate-900 dark:text-white">
										{selectedConversation.otherUser?.name || "Захиалагч"}
									</p>
									<p className="truncate text-slate-500 text-xs dark:text-slate-400">
										{selectedConversation.task.title}
									</p>
								</div>
								<Badge
									variant="outline"
									className="shrink-0 border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
								>
									<Clock className="mr-1 h-3 w-3" />
									{selectedConversation.task.status === "IN_PROGRESS"
										? "Гүйцэтгэж буй"
										: selectedConversation.task.status === "COMPLETED"
											? "Дууссан"
											: "Идэвхтэй"}
								</Badge>
							</div>

							<ScrollArea className="flex-1 p-4">
								{selectedConversation.messages.length === 0 ? (
									<EmptyState
										icon={MessageSquare}
										title="Мессеж байхгүй"
										description="Энэ даалгавартай холбоотой мессеж байхгүй. Эхний мессежээ илгээнэ үү."
									/>
								) : (
									<div className="space-y-3">
										{selectedConversation.messages.map((msg, idx) => (
											<MessageBubble
												key={msg.id}
												message={msg}
												isOwn={msg.senderId === user.id}
												showTime={
													idx === selectedConversation.messages.length - 1 ||
													new Date(msg.createdAt).getTime() -
														new Date(
															selectedConversation.messages[idx - 1]?.createdAt,
														).getTime() >
														300000
												}
											/>
										))}
										<div ref={messagesEndRef} />
									</div>
								)}
							</ScrollArea>

							<div className="shrink-0 border-slate-200/70 border-t bg-white/80 p-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
								<div className="flex items-end gap-3">
									<div className="relative flex-1">
										<Input
											value={newMessage}
											onChange={(e) => setNewMessage(e.target.value)}
											onKeyDown={handleKeyDown}
											placeholder="Мессеж бичих..."
											className="border-slate-200 bg-white pr-4 dark:border-slate-700 dark:bg-slate-800"
											disabled={sendMessageMutation.isPending}
										/>
									</div>
									<Button
										onClick={handleSend}
										disabled={
											!newMessage.trim() || sendMessageMutation.isPending
										}
										className="shrink-0 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/25 shadow-lg transition-all hover:shadow-emerald-500/40 hover:shadow-xl"
									>
										{sendMessageMutation.isPending ? (
											<Loader2 className="h-4 w-4 animate-spin" />
										) : (
											<Send className="h-4 w-4" />
										)}
										<span className="ml-2 hidden sm:inline">Илгээх</span>
									</Button>
								</div>
							</div>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
