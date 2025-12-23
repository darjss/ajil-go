"use client";

import type { TaskApiResponse } from "@ajil-go/contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, MessageSquare, Search, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { messagesApi } from "@/lib/api";
import { messageKeys, taskQueries, userQueries } from "@/lib/queries";
import { ChatHeader } from "./chat-header";
import { ConversationItem } from "./conversation-item";
import { ConversationListSkeleton } from "./conversation-list-skeleton";
import { EmptyState } from "./empty-state";
import { MessageBubble } from "./message-bubble";
import { MessageInput } from "./message-input";
import {
	type Conversation,
	MESSAGES_PAGE_CONFIG,
	type MessagesPageUserType,
} from "./types";

interface MessagesPageProps {
	userType: MessagesPageUserType;
}

export function MessagesPage({ userType }: MessagesPageProps) {
	const config = MESSAGES_PAGE_CONFIG[userType];
	const queryClient = useQueryClient();
	const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
	const [newMessage, setNewMessage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showConversationList, setShowConversationList] = useState(true);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const { data: user } = useQuery(userQueries.me());

	const { data: inProgressTasks, isLoading: isLoadingInProgress } = useQuery({
		...taskQueries.list({ status: "IN_PROGRESS", limit: 100 }),
		enabled: !!user?.id,
	});

	const { data: completedTasks, isLoading: isLoadingCompleted } = useQuery({
		...taskQueries.list({ status: "COMPLETED", limit: 100 }),
		enabled: !!user?.id,
	});

	const { data: myTasks, isLoading: isLoadingMyTasks } = useQuery({
		...taskQueries.list({ posterId: user?.id, limit: 100 }),
		enabled: !!user?.id && userType === "client",
	});

	const allTasks = useMemo(() => {
		const tasksMap = new Map<string, TaskApiResponse>();

		if (userType === "worker") {
			for (const t of inProgressTasks?.data || []) {
				if (t.assignedBidId) {
					tasksMap.set(t.id, t);
				}
			}
			for (const t of completedTasks?.data || []) {
				if (t.assignedBidId) {
					tasksMap.set(t.id, t);
				}
			}
		} else {
			for (const t of myTasks?.data || []) {
				if (t.status !== "OPEN" && t.status !== "CANCELLED") {
					tasksMap.set(t.id, t);
				}
			}
			for (const t of inProgressTasks?.data || []) {
				if (t.posterId === user?.id || t.assignedBidId) {
					tasksMap.set(t.id, t);
				}
			}
		}

		return Array.from(tasksMap.values());
	}, [userType, inProgressTasks, completedTasks, myTasks, user?.id]);

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

	const handleBack = useCallback(() => {
		setSelectedTaskId(null);
		setShowConversationList(true);
	}, []);

	const handleSelectConversation = useCallback((taskId: string) => {
		setSelectedTaskId(taskId);
		setShowConversationList(false);
	}, []);

	const isLoading =
		isLoadingInProgress ||
		isLoadingCompleted ||
		(userType === "client" && isLoadingMyTasks) ||
		isLoadingMessages;

	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	return (
		<div className="flex h-screen flex-col bg-muted">
			<header className="shrink-0 border-border border-b bg-background px-6 py-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-display text-2xl text-foreground tracking-tight">
							Мессежүүд
						</h1>
						<p className="mt-0.5 text-muted-foreground text-sm">
							{config.headerSubtitle}
						</p>
					</div>
					{conversations.length > 0 && (
						<Badge variant="secondary" className="bg-primary/10 text-primary">
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
					} w-full flex-col border-border border-r bg-background lg:flex lg:w-80 xl:w-96 ${
						selectedTaskId ? "hidden lg:flex" : ""
					}`}
				>
					<div className="shrink-0 border-border border-b p-3">
						<div className="relative">
							<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Харилцаа хайх..."
								className="border-border bg-muted pl-10"
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
										defaultOtherUserLabel={config.defaultOtherUserLabel}
										onClick={() => handleSelectConversation(conv.taskId)}
									/>
								))}
							</div>
						)}
					</ScrollArea>
				</aside>

				<main
					className={`${
						selectedTaskId ? "flex" : "hidden lg:flex"
					} flex-1 flex-col bg-muted`}
				>
					{!selectedConversation ? (
						<EmptyState
							icon={Sparkles}
							title="Харилцаа сонгох"
							description="Зүүн талаас харилцаа сонгоно уу."
						/>
					) : (
						<>
							<ChatHeader
								conversation={selectedConversation}
								defaultOtherUserLabel={config.defaultOtherUserLabel}
								onBack={handleBack}
							/>

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

							<MessageInput
								value={newMessage}
								onChange={setNewMessage}
								onSend={handleSend}
								isPending={sendMessageMutation.isPending}
							/>
						</>
					)}
				</main>
			</div>
		</div>
	);
}
