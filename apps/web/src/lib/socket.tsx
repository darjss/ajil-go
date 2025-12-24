"use client";

import type {
	ConversationApiResponse,
	MessageApiResponse,
} from "@ajil-go/contract";
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { io, type Socket } from "socket.io-client";
import { authClient } from "@/lib/auth-client";

interface SocketContextType {
	socket: Socket | null;
	isConnected: boolean;
	joinConversation: (conversationId: string) => void;
	leaveConversation: (conversationId: string) => void;
	sendMessage: (
		conversationId: string,
		content: string,
	) => Promise<{ success?: boolean; message?: unknown; error?: string }>;
	startTyping: (conversationId: string) => void;
	stopTyping: (conversationId: string) => void;
	onNewMessage: (
		callback: (
			message: MessageApiResponse & { conversationId: string },
		) => void,
	) => () => void;
	onNewConversationMessage: (
		callback: (data: {
			conversationId: string;
			lastMessage: unknown;
			senderId: string;
		}) => void,
	) => () => void;
	onMessageRead: (
		callback: (data: {
			conversationId: string;
			messageIds: string[];
			readBy: string;
		}) => void,
	) => () => void;
	onTypingStart: (
		callback: (data: {
			conversationId: string;
			userId: string;
			userName: string;
		}) => void,
	) => () => void;
	onTypingStop: (
		callback: (data: { conversationId: string; userId: string }) => void,
	) => () => void;
	onConversationUpdate: (
		callback: (conversation: ConversationApiResponse) => void,
	) => () => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

const SOCKET_URL =
	process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

export function SocketProvider({ children }: { children: ReactNode }) {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [isConnected, setIsConnected] = useState(false);
	const socketRef = useRef<Socket | null>(null);
	const { data: session } = authClient.useSession();

	useEffect(() => {
		if (!session?.user?.id) {
			if (socketRef.current) {
				socketRef.current.disconnect();
				socketRef.current = null;
				setSocket(null);
				setIsConnected(false);
			}
			return;
		}

		// Don't reconnect if already connected with same user
		if (socketRef.current?.connected) {
			return;
		}

		const newSocket = io(SOCKET_URL, {
			path: "/socket.io",
			auth: {
				userId: session.user.id,
				userName: session.user.name,
			},
			transports: ["websocket", "polling"],
		});

		newSocket.on("connect", () => {
			console.log("Socket connected");
			setIsConnected(true);
		});

		newSocket.on("disconnect", () => {
			console.log("Socket disconnected");
			setIsConnected(false);
		});

		newSocket.on("connect_error", (error) => {
			console.error("Socket connection error:", error);
		});

		socketRef.current = newSocket;
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
			socketRef.current = null;
		};
	}, [session?.user?.id, session?.user?.name]);

	const joinConversation = useCallback(
		(conversationId: string) => {
			socket?.emit("join:conversation", conversationId);
		},
		[socket],
	);

	const leaveConversation = useCallback(
		(conversationId: string) => {
			socket?.emit("leave:conversation", conversationId);
		},
		[socket],
	);

	const sendMessage = useCallback(
		(
			conversationId: string,
			content: string,
		): Promise<{ success?: boolean; message?: unknown; error?: string }> => {
			return new Promise((resolve) => {
				if (!socket || !socket.connected) {
					resolve({ error: "Socket not connected" });
					return;
				}
				socket.emit(
					"message:send",
					{ conversationId, content },
					(response: {
						success?: boolean;
						message?: unknown;
						error?: string;
					}) => {
						resolve(response || { success: true });
					},
				);
			});
		},
		[socket],
	);

	const startTyping = useCallback(
		(conversationId: string) => {
			socket?.emit("typing:start", conversationId);
		},
		[socket],
	);

	const stopTyping = useCallback(
		(conversationId: string) => {
			socket?.emit("typing:stop", conversationId);
		},
		[socket],
	);

	const onNewMessage = useCallback(
		(
			callback: (
				message: MessageApiResponse & { conversationId: string },
			) => void,
		) => {
			if (!socket) return () => {};
			socket.on("message:new", callback);
			return () => {
				socket.off("message:new", callback);
			};
		},
		[socket],
	);

	const onNewConversationMessage = useCallback(
		(
			callback: (data: {
				conversationId: string;
				lastMessage: unknown;
				senderId: string;
			}) => void,
		) => {
			if (!socket) return () => {};
			socket.on("conversation:newMessage", callback);
			return () => {
				socket.off("conversation:newMessage", callback);
			};
		},
		[socket],
	);

	const onMessageRead = useCallback(
		(
			callback: (data: {
				conversationId: string;
				messageIds: string[];
				readBy: string;
			}) => void,
		) => {
			if (!socket) return () => {};
			socket.on("message:read", callback);
			return () => {
				socket.off("message:read", callback);
			};
		},
		[socket],
	);

	const onTypingStart = useCallback(
		(
			callback: (data: {
				conversationId: string;
				userId: string;
				userName: string;
			}) => void,
		) => {
			if (!socket) return () => {};
			socket.on("typing:start", callback);
			return () => {
				socket.off("typing:start", callback);
			};
		},
		[socket],
	);

	const onTypingStop = useCallback(
		(callback: (data: { conversationId: string; userId: string }) => void) => {
			if (!socket) return () => {};
			socket.on("typing:stop", callback);
			return () => {
				socket.off("typing:stop", callback);
			};
		},
		[socket],
	);

	const onConversationUpdate = useCallback(
		(callback: (conversation: ConversationApiResponse) => void) => {
			if (!socket) return () => {};
			socket.on("conversation:update", callback);
			return () => {
				socket.off("conversation:update", callback);
			};
		},
		[socket],
	);

	return (
		<SocketContext.Provider
			value={{
				socket,
				isConnected,
				joinConversation,
				leaveConversation,
				sendMessage,
				startTyping,
				stopTyping,
				onNewMessage,
				onNewConversationMessage,
				onMessageRead,
				onTypingStart,
				onTypingStop,
				onConversationUpdate,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
}

export function useSocket() {
	const context = useContext(SocketContext);
	if (!context) {
		throw new Error("useSocket must be used within a SocketProvider");
	}
	return context;
}
