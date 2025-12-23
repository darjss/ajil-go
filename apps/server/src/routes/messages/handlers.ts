import type {
	CreateMessageBody,
	GetMessagesQuery,
	IdParams,
	MarkMessagesReadBody,
	UpdateMessageBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";

export async function getMessages(
	fastify: FastifyInstance,
	query: GetMessagesQuery,
) {
	const { page, limit, taskId, senderId, isRead } = query;
	const skip = (page - 1) * limit;

	const where = {
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
				task: {
					select: { id: true, title: true },
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
			task: {
				select: { id: true, title: true },
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
	const { senderId: _ignoredSenderId, ...messageData } = body;

	const message = await fastify.prisma.message.create({
		data: {
			...messageData,
			senderId: userId,
		},
		include: {
			sender: {
				select: { id: true, name: true, image: true },
			},
		},
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
) {
	const result = await fastify.prisma.message.updateMany({
		where: { id: { in: body.messageIds } },
		data: { isRead: true },
	});

	return { updated: result.count };
}
