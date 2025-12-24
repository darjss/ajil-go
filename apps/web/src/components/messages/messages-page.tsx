"use client";

import type { ConversationApiResponse, MessageApiResponse } from "@ajil-go/contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, MessageSquare, Pin, PinOff, Search, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { conversationsApi, messagesApi } from "@/lib/api";
import { useSocket } from "@/lib/socket";
import { userQueries } from "@/lib/queries";
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
	const searchParams = useSearchParams();
	const initialConversationId = searchParams.get("conversation");
	
	const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
		initialConversationId
	);
	const [newMessage, setNewMessage] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [showConversationList, setShowConversationList] = useState(true);
	const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const { data: user } = useQuery(userQueries.me());
	
	// Socket connection
	const {
		isConnected,
		joinConversation,
		leaveConversation,
		sendMessage: socketSendMessage,
		startTyping,
		stopTyping,
		onNewMessage,
		onNewConversationMessage,
		onMessageRead,
		onTypingStart,
		onTypingStop,
		onConversationUpdate,
	} = useSocket();

	// Fetch conversations
	const { data: conversationsData, isLoading: isLoadingConversations } = useQuery({
		queryKey: ["conversations", userType],
		queryFn: () => conversationsApi.list({ limit: 100 }),
		enabled: !!user?.id,
		staleTime: 30 * 1000, // 30 seconds - prevent unnecessary refetches
		refetchOnWindowFocus: false,
	});

	// Fetch selected conversation details with messages
	const { data: selectedConversationData, isLoading: isLoadingConversation } = useQuery({
		queryKey: ["conversation", selectedConversationId],
		queryFn: () => conversationsApi.get(selectedConversationId!),
		enabled: !!selectedConversationId,
		staleTime: 10 * 1000, // 10 seconds - WebSocket will update in real-time
		refetchOnWindowFocus: false,
	});

	// Transform conversations to our Conversation type
	const conversations = useMemo<Conversation[]>(() => {
		if (!conversationsData?.data || !user?.id) return [];

		return conversationsData.data.map((conv: any) => {
			const isClient = conv.clientId === user.id;
			const otherUser = isClient ? conv.worker : conv.client;

			return {
				id: conv.id,
				taskId: conv.taskId,
				task: conv.task,
				messages: [],
				lastMessage: conv.lastMessage,
				unreadCount: conv.unreadCount || 0,
				isPinned: conv.isPinned || false,
				otherUser: otherUser
					? {
							id: otherUser.id,
							name: otherUser.name,
							image: otherUser.image || null,
						}
					: null,
			};
		});
	}, [conversationsData, user?.id]);

	// Filter conversations based on search
	const filteredConversations = useMemo(() => {
		if (!searchQuery.trim()) return conversations;
		const query = searchQuery.toLowerCase();
		return conversations.filter(
			(c) =>
				c.task?.title?.toLowerCase().includes(query) ||
				c.otherUser?.name?.toLowerCase().includes(query),
		);
	}, [conversations, searchQuery]);

	// Selected conversation with full data
	const selectedConversation = useMemo<Conversation | null>(() => {
		if (!selectedConversationData || !user?.id) return null;

		const conv: any = selectedConversationData;
		const isClient = conv.clientId === user.id;
		const otherUser = isClient ? conv.worker : conv.client;

		return {
			id: conv.id,
			taskId: conv.taskId,
			task: conv.task,
			messages: conv.messages || [],
			lastMessage: null,
			unreadCount: conv.unreadCount || 0,
			isPinned: conv.isPinned || false,
			otherUser: otherUser
				? {
						id: otherUser.id,
						name: otherUser.name,
						image: otherUser.image || null,
					}
				: null,
		};
	}, [selectedConversationData, user?.id]);

	// Send message via WebSocket (much faster than HTTP)
	const sendMessageMutation = useMutation({
		mutationFn: async (content: string) => {
			// Use WebSocket if connected, fallback to HTTP
			if (isConnected && selectedConversationId) {
				const result = await socketSendMessage(selectedConversationId, content);
				if (result.error) {
					throw new Error(result.error);
				}
				return result.message;
			}
			// Fallback to HTTP
			return messagesApi.create({
				conversationId: selectedConversationId!,
				content,
			});
		},
		onMutate: async (content) => {
			// Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey: ["conversation", selectedConversationId] });

			// Snapshot previous value
			const previousConversation = queryClient.getQueryData(["conversation", selectedConversationId]);

			// Optimistically add new message
			queryClient.setQueryData(["conversation", selectedConversationId], (old: any) => {
				if (!old) return old;
				const optimisticMessage = {
					id: `temp-${Date.now()}`,
					conversationId: selectedConversationId,
					senderId: user?.id,
					content,
					isRead: false,
					createdAt: new Date().toISOString(),
				};
				return {
					...old,
					messages: [...(old.messages || []), optimisticMessage],
				};
			});

			setNewMessage("");
			return { previousConversation };
		},
		onError: (_err, _content, context) => {
			// Rollback on error
			if (context?.previousConversation) {
				queryClient.setQueryData(["conversation", selectedConversationId], context.previousConversation);
			}
		},
		onSettled: () => {
			// Only refetch conversation list in background (not blocking)
			queryClient.invalidateQueries({ queryKey: ["conversations"], refetchType: "none" });
		},
	});

	// Mark messages as read mutation
	const markReadMutation = useMutation({
		mutationFn: (messageIds: string[]) => messagesApi.markRead(messageIds),
		onMutate: async (messageIds) => {
			// Optimistically mark as read in cache
			queryClient.setQueryData(["conversation", selectedConversationId], (old: any) => {
				if (!old) return old;
				return {
					...old,
					messages: old.messages?.map((m: any) =>
						messageIds.includes(m.id) ? { ...m, isRead: true } : m
					),
				};
			});
		},
		// No need to refetch - server will confirm via WebSocket
	});

	// Toggle pin mutation
	const togglePinMutation = useMutation({
		mutationFn: (pinned: boolean) =>
			conversationsApi.togglePin({
				conversationId: selectedConversationId!,
				pinned,
			}),
		onMutate: async (pinned) => {
			// Optimistically update pin status
			queryClient.setQueryData(["conversations", userType], (old: any) => {
				if (!old?.data) return old;
				return {
					...old,
					data: old.data.map((c: any) =>
						c.id === selectedConversationId ? { ...c, isPinned: pinned } : c
					),
				};
			});
		},
		// No need to refetch for pin toggle
	});

	// Join/leave conversation room on socket
	useEffect(() => {
		if (selectedConversationId && isConnected) {
			joinConversation(selectedConversationId);
			return () => {
				leaveConversation(selectedConversationId);
			};
		}
	}, [selectedConversationId, isConnected, joinConversation, leaveConversation]);

	// Listen for new messages - update cache directly instead of refetching
	useEffect(() => {
		const unsubscribe = onNewMessage((message) => {
			// Skip if this is our own message (we already added it optimistically)
			if (message.senderId === user?.id) {
				// Replace the temp message with the real one from server
				if (message.conversationId === selectedConversationId) {
					queryClient.setQueryData(["conversation", selectedConversationId], (old: any) => {
						if (!old) return old;
						// Remove temp messages and avoid duplicates
						const filteredMessages = old.messages?.filter(
							(m: any) => !m.id.startsWith("temp-") && m.id !== message.id
						) || [];
						return {
							...old,
							messages: [...filteredMessages, message],
						};
					});
				}
				return;
			}
			
			// Add message from other user to conversation cache
			if (message.conversationId === selectedConversationId) {
				queryClient.setQueryData(["conversation", selectedConversationId], (old: any) => {
					if (!old) return old;
					// Avoid duplicates
					const exists = old.messages?.some((m: any) => m.id === message.id);
					if (exists) return old;
					return {
						...old,
						messages: [...(old.messages || []), message],
					};
				});
			}
			// Update conversation list (lastMessage) in background
			queryClient.invalidateQueries({ queryKey: ["conversations"], refetchType: "none" });
		});
		return unsubscribe;
	}, [onNewMessage, selectedConversationId, queryClient, user?.id]);

	// Listen for new message notifications (for chat list update)
	useEffect(() => {
		const unsubscribe = onNewConversationMessage((data) => {
			// Update conversation list with new message info
			queryClient.setQueryData(["conversations", userType], (old: any) => {
				if (!old?.data) return old;
				return {
					...old,
					data: old.data.map((c: any) => {
						if (c.id === data.conversationId) {
							return {
								...c,
								lastMessage: data.lastMessage,
								// Increment unread count if not our own message and not currently viewing
								unreadCount: data.senderId !== user?.id && data.conversationId !== selectedConversationId
									? (c.unreadCount || 0) + 1
									: c.unreadCount,
							};
						}
						return c;
					}).sort((a: any, b: any) => {
						// Pinned first, then by last message time
						if (a.isPinned && !b.isPinned) return -1;
						if (!a.isPinned && b.isPinned) return 1;
						const aTime = a.lastMessage?.createdAt || a.createdAt;
						const bTime = b.lastMessage?.createdAt || b.createdAt;
						return new Date(bTime).getTime() - new Date(aTime).getTime();
					}),
				};
			});
		});
		return unsubscribe;
	}, [onNewConversationMessage, queryClient, userType, user?.id, selectedConversationId]);

	// Listen for message read events - update cache directly
	useEffect(() => {
		const unsubscribe = onMessageRead((data) => {
			if (data.conversationId === selectedConversationId) {
				queryClient.setQueryData(["conversation", selectedConversationId], (old: any) => {
					if (!old) return old;
					return {
						...old,
						messages: old.messages?.map((m: any) =>
							data.messageIds?.includes(m.id) ? { ...m, isRead: true } : m
						),
					};
				});
			}
		});
		return unsubscribe;
	}, [onMessageRead, selectedConversationId, queryClient]);

	// Listen for typing indicators
	useEffect(() => {
		const unsubTypingStart = onTypingStart(({ conversationId, userId, userName }) => {
			if (conversationId === selectedConversationId && userId !== user?.id) {
				setTypingUsers((prev) => new Map(prev).set(userId, userName));
			}
		});

		const unsubTypingStop = onTypingStop(({ conversationId, userId }) => {
			if (conversationId === selectedConversationId) {
				setTypingUsers((prev) => {
					const newMap = new Map(prev);
					newMap.delete(userId);
					return newMap;
				});
			}
		});

		return () => {
			unsubTypingStart();
			unsubTypingStop();
		};
	}, [onTypingStart, onTypingStop, selectedConversationId, user?.id]);

	// Listen for conversation updates (e.g., when other user pins/unpins)
	useEffect(() => {
		const unsubscribe = onConversationUpdate(() => {
			// Refetch in background only
			queryClient.invalidateQueries({ queryKey: ["conversations"], refetchType: "none" });
		});
		return unsubscribe;
	}, [onConversationUpdate, queryClient]);

	// Mark messages as read when viewing conversation
	useEffect(() => {
		if (selectedConversation && user?.id) {
			const unreadIds = selectedConversation.messages
				.filter((m) => !m.isRead && m.senderId !== user.id)
				.map((m) => m.id);
			if (unreadIds.length > 0) {
				markReadMutation.mutate(unreadIds);
			}
		}
	}, [selectedConversation?.messages.length, user?.id]);

	// Scroll to bottom when new messages arrive
	const messageCount = selectedConversation?.messages.length ?? 0;
	useEffect(() => {
		if (messagesEndRef.current && messageCount > 0) {
			messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [messageCount]);

	// Handle typing
	const handleInputChange = useCallback(
		(value: string) => {
			setNewMessage(value);

			if (selectedConversationId && value.trim()) {
				startTyping(selectedConversationId);

				if (typingTimeoutRef.current) {
					clearTimeout(typingTimeoutRef.current);
				}

				typingTimeoutRef.current = setTimeout(() => {
					stopTyping(selectedConversationId);
				}, 2000);
			}
		},
		[selectedConversationId, startTyping, stopTyping],
	);

	const handleSend = useCallback(() => {
		const trimmed = newMessage.trim();
		if (!trimmed || !selectedConversationId || sendMessageMutation.isPending) return;

		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		}
		stopTyping(selectedConversationId);
		sendMessageMutation.mutate(trimmed);
	}, [newMessage, selectedConversationId, sendMessageMutation, stopTyping]);

	const handleBack = useCallback(() => {
		setSelectedConversationId(null);
		setShowConversationList(true);
	}, []);

	const handleSelectConversation = useCallback((conversationId: string) => {
		setSelectedConversationId(conversationId);
		setShowConversationList(false);
	}, []);

	const handleTogglePin = useCallback(() => {
		if (selectedConversation) {
			togglePinMutation.mutate(!selectedConversation.isPinned);
		}
	}, [selectedConversation, togglePinMutation]);

	const isLoading = isLoadingConversations;

	if (!user) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
	const typingUserName = typingUsers.size > 0 ? Array.from(typingUsers.values())[0] : null;

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
					<div className="flex items-center gap-2">
						{!isConnected && (
							<Badge variant="outline" className="border-yellow-500 text-yellow-500">
								Холбогдоогүй
							</Badge>
						)}
						{totalUnread > 0 && (
							<Badge variant="secondary" className="bg-primary/10 text-primary">
								{totalUnread} уншаагүй
							</Badge>
						)}
					</div>
				</div>
			</header>

			<div className="flex flex-1 overflow-hidden">
				<aside
					className={`${
						showConversationList ? "flex" : "hidden"
					} w-full flex-col border-border border-r bg-background lg:flex lg:w-80 xl:w-96 ${
						selectedConversationId ? "hidden lg:flex" : ""
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
										key={conv.id}
										conversation={conv}
										isActive={conv.id === selectedConversationId}
										currentUserId={user.id}
										defaultOtherUserLabel={config.defaultOtherUserLabel}
										onClick={() => handleSelectConversation(conv.id)}
									/>
								))}
							</div>
						)}
					</ScrollArea>
				</aside>

				<main
					className={`${
						selectedConversationId ? "flex" : "hidden lg:flex"
					} flex-1 flex-col bg-muted`}
				>
					{!selectedConversation ? (
						isLoadingConversation ? (
							<div className="flex flex-1 items-center justify-center">
								<Loader2 className="h-8 w-8 animate-spin text-primary" />
							</div>
						) : (
							<EmptyState
								icon={Sparkles}
								title="Харилцаа сонгох"
								description="Зүүн талаас харилцаа сонгоно уу."
							/>
						)
					) : (
						<>
							<ChatHeader
								conversation={selectedConversation}
								defaultOtherUserLabel={config.defaultOtherUserLabel}
								onBack={handleBack}
								extraActions={
									<Button
										variant="ghost"
										size="icon"
										onClick={handleTogglePin}
										disabled={togglePinMutation.isPending}
										title={selectedConversation.isPinned ? "Бэхлэлт арилгах" : "Бэхлэх"}
									>
										{selectedConversation.isPinned ? (
											<PinOff className="h-5 w-5" />
										) : (
											<Pin className="h-5 w-5" />
										)}
									</Button>
								}
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
								{typingUserName && (
									<div className="mt-2 text-muted-foreground text-sm italic">
										{typingUserName} бичиж байна...
									</div>
								)}
							</ScrollArea>

							<MessageInput
								value={newMessage}
								onChange={handleInputChange}
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
