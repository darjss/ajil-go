import type {
	CreateMessageBody,
	GetMessagesQuery,
	IdParams,
	MarkMessagesReadBody,
	UpdateMessageBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
import { emitNewMessage, emitToUser } from "../../plugins/socket.js";

export async function getMessages(
	fastify: FastifyInstance,
	query: GetMessagesQuery,
) {
	const { page, limit, conversationId, taskId, senderId, isRead } = query;
	const skip = (page - 1) * limit;

	const where = {
		...(conversationId && { conversationId }),
		...(taskId && { taskId }),
		...(senderId && { senderId }),
		...(isRead !== undefined && { isRead }),
	};

	const [messages, total] = await Promise.all([
		fastify.prisma.message.findMany({
			where,
			skip,
			take: limit,
			include: {
				sender: {
					select: { id: true, name: true, image: true },
				},
				conversation: {
					select: { id: true, taskId: true, clientId: true, workerId: true },
				},
			},
			orderBy: { createdAt: "desc" },
		}),
		fastify.prisma.message.count({ where }),
	]);

	return {
		data: messages,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getMessageById(
	fastify: FastifyInstance,
	params: IdParams,
) {
	const message = await fastify.prisma.message.findUnique({
		where: { id: params.id },
		include: {
			sender: {
				select: { id: true, name: true, image: true },
			},
			conversation: {
				select: { id: true, taskId: true, clientId: true, workerId: true },
			},
		},
	});

	return message;
}

export async function createMessage(
	fastify: FastifyInstance,
	body: CreateMessageBody,
	userId: string,
) {
	const { conversationId, content } = body;

	// Get conversation to update lastMessageAt and get participants
	const conversation = await fastify.prisma.conversation.findUnique({
		where: { id: conversationId },
		select: { clientId: true, workerId: true, taskId: true },
	});

	if (!conversation) {
		throw new Error("Conversation not found");
	}

	// Create message
	const message = await fastify.prisma.message.create({
		data: {
			conversationId,
			senderId: userId,
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
	await fastify.prisma.conversation.update({
		where: { id: conversationId },
		data: { lastMessageAt: new Date() },
	});

	// Emit to the conversation room (for users viewing the chat)
	emitNewMessage(fastify.io, conversationId, message);

	// Emit conversation update to user rooms (for chat list notification)
	// Using different event name to avoid duplicate messages
	emitToUser(fastify.io, conversation.clientId, "conversation:newMessage", {
		conversationId,
		lastMessage: message,
		senderId: userId,
	});
	emitToUser(fastify.io, conversation.workerId, "conversation:newMessage", {
		conversationId,
		lastMessage: message,
		senderId: userId,
	});

	return message;
}

export async function updateMessage(
	fastify: FastifyInstance,
	params: IdParams,
	body: UpdateMessageBody,
) {
	const message = await fastify.prisma.message.update({
		where: { id: params.id },
		data: body,
	});

	return message;
}

export async function deleteMessage(
	fastify: FastifyInstance,
	params: IdParams,
) {
	await fastify.prisma.message.delete({
		where: { id: params.id },
	});
}

export async function markMessagesAsRead(
	fastify: FastifyInstance,
	body: MarkMessagesReadBody,
	userId: string,
) {
	// Get the messages to find conversation info
	const messages = await fastify.prisma.message.findMany({
		where: { id: { in: body.messageIds } },
		select: { conversationId: true, senderId: true },
	});

	const result = await fastify.prisma.message.updateMany({
		where: { id: { in: body.messageIds } },
		data: { isRead: true },
	});

	// Emit read receipts to senders
	const conversationIds = [...new Set(messages.map((m) => m.conversationId))];
	for (const convId of conversationIds) {
		fastify.io.to(`conversation:${convId}`).emit("message:read", {
			conversationId: convId,
			messageIds: body.messageIds,
			readBy: userId,
		});
	}

	return { updated: result.count };
}
