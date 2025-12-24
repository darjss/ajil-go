import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Server } from "socket.io";

declare module "fastify" {
	interface FastifyInstance {
		io: Server;
	}
}

interface SocketUser {
	id: string;
	name: string;
}

// Map userId -> Set of socketIds
const userSockets = new Map<string, Set<string>>();

// Store reference to fastify instance for socket handlers
let fastifyInstance: FastifyInstance | null = null;

async function socketPlugin(fastify: FastifyInstance) {
	fastifyInstance = fastify;
	
	const io = new Server(fastify.server, {
		cors: {
			origin: process.env.CORS_ORIGIN || "http://localhost:3000",
			credentials: true,
		},
		path: "/socket.io",
	});

	// Authentication middleware
	io.use((socket, next) => {
		const userId = socket.handshake.auth.userId;
		const userName = socket.handshake.auth.userName;

		if (!userId) {
			return next(new Error("Authentication error: userId required"));
		}

		(socket.data as { user: SocketUser }).user = { id: userId, name: userName };
		next();
	});

	io.on("connection", (socket) => {
		const user = (socket.data as { user: SocketUser }).user;
		fastify.log.info(`User ${user.id} connected with socket ${socket.id}`);

		// Track user's sockets
		if (!userSockets.has(user.id)) {
			userSockets.set(user.id, new Set());
		}
		userSockets.get(user.id)!.add(socket.id);

		// Join user's personal room
		socket.join(`user:${user.id}`);

		// Join conversation room
		socket.on("join:conversation", (conversationId: string) => {
			socket.join(`conversation:${conversationId}`);
			fastify.log.info(`User ${user.id} joined conversation ${conversationId}`);
		});

		// Leave conversation room
		socket.on("leave:conversation", (conversationId: string) => {
			socket.leave(`conversation:${conversationId}`);
			fastify.log.info(`User ${user.id} left conversation ${conversationId}`);
		});

		// Handle typing indicator
		socket.on("typing:start", (conversationId: string) => {
			socket.to(`conversation:${conversationId}`).emit("typing:start", {
				conversationId,
				userId: user.id,
				userName: user.name,
			});
		});

		socket.on("typing:stop", (conversationId: string) => {
			socket.to(`conversation:${conversationId}`).emit("typing:stop", {
				conversationId,
				userId: user.id,
			});
		});

		// Handle sending message via WebSocket (faster than HTTP)
		socket.on("message:send", async (data: { conversationId: string; content: string }, callback) => {
			try {
				if (!fastifyInstance) {
					callback?.({ error: "Server not ready" });
					return;
				}

				const { conversationId, content } = data;

				// Get conversation
				const conversation = await fastifyInstance.prisma.conversation.findUnique({
					where: { id: conversationId },
					select: { clientId: true, workerId: true, taskId: true },
				});

				if (!conversation) {
					callback?.({ error: "Conversation not found" });
					return;
				}

				// Check user is participant
				if (conversation.clientId !== user.id && conversation.workerId !== user.id) {
					callback?.({ error: "Not authorized" });
					return;
				}

				// Create message
				const message = await fastifyInstance.prisma.message.create({
					data: {
						conversationId,
						senderId: user.id,
						content,
						taskId: conversation.taskId,
					},
					include: {
						sender: {
							select: { id: true, name: true, image: true },
						},
					},
				});

				// Update conversation's lastMessageAt
				await fastifyInstance.prisma.conversation.update({
					where: { id: conversationId },
					data: { lastMessageAt: new Date() },
				});

				// Emit to conversation room only (users in room will receive it)
				io.to(`conversation:${conversationId}`).emit("message:new", {
					...message,
					conversationId,
				});

				// Notify both users for chat list update (different event to avoid duplicate in chat)
				io.to(`user:${conversation.clientId}`).emit("conversation:newMessage", {
					conversationId,
					lastMessage: message,
					senderId: user.id,
				});
				io.to(`user:${conversation.workerId}`).emit("conversation:newMessage", {
					conversationId,
					lastMessage: message,
					senderId: user.id,
				});

				// Send success callback with the created message
				callback?.({ success: true, message });
			} catch (error) {
				fastify.log.error("Socket message:send error: %s", error);
				callback?.({ error: "Failed to send message" });
			}
		});

		socket.on("disconnect", () => {
			fastify.log.info(`User ${user.id} disconnected from socket ${socket.id}`);

			// Remove socket from tracking
			const sockets = userSockets.get(user.id);
			if (sockets) {
				sockets.delete(socket.id);
				if (sockets.size === 0) {
					userSockets.delete(user.id);
				}
			}
		});
	});

	// Helper function to emit to specific user
	fastify.decorate("io", io);

	fastify.addHook("onClose", async () => {
		io.close();
	});
}

export default fp(socketPlugin, {
	name: "socket",
});

// Helper function to emit new message to a conversation
export function emitNewMessage(
	io: Server,
	conversationId: string,
	message: unknown,
) {
	io.to(`conversation:${conversationId}`).emit("message:new", message);
}

// Helper function to emit to specific user
export function emitToUser(io: Server, userId: string, event: string, data: unknown) {
	io.to(`user:${userId}`).emit(event, data);
}

// Helper function to emit conversation update (for pin, new conversation, etc.)
export function emitConversationUpdate(
	io: Server,
	userId: string,
	conversation: unknown,
) {
	io.to(`user:${userId}`).emit("conversation:update", conversation);
}
