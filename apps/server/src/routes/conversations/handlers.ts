import type {
	GetConversationsQuery,
	IdParams,
	StartConversationBody,
	TogglePinBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
import { emitConversationUpdate, emitToUser } from "../../plugins/socket.js";

export async function getConversations(
	fastify: FastifyInstance,
	query: GetConversationsQuery,
	userId: string,
) {
	const { page, limit } = query;

	// First, fetch ALL conversations for proper sorting (pinned first)
	// This is necessary because pinned status depends on user role
	const [allConversations, total] = await Promise.all([
		fastify.prisma.conversation.findMany({
			where: {
				OR: [{ clientId: userId }, { workerId: userId }],
			},
			include: {
				task: {
					select: {
						id: true,
						title: true,
						status: true,
						budgetMin: true,
						budgetMax: true,
					},
				},
				client: {
					select: { id: true, name: true, image: true },
				},
				worker: {
					select: { id: true, name: true, image: true },
				},
				messages: {
					orderBy: { createdAt: "desc" },
					take: 1,
					include: {
						sender: {
							select: { id: true, name: true, image: true },
						},
					},
				},
				_count: {
					select: {
						messages: {
							where: {
								isRead: false,
								senderId: { not: userId },
							},
						},
					},
				},
			},
			orderBy: [
				// Sort by last message initially (we'll re-sort for pinned in JS)
				{ lastMessageAt: "desc" },
			],
			// Don't use skip/take here - we need all for proper pinned sorting
		}),
		fastify.prisma.conversation.count({
			where: {
				OR: [{ clientId: userId }, { workerId: userId }],
			},
		}),
	]);

	// Transform to include pinned status and unread count
	const transformedConversations = allConversations.map((conv) => {
		const isPinned =
			conv.clientId === userId ? conv.clientPinned : conv.workerPinned;
		return {
			...conv,
			isPinned,
			lastMessage: conv.messages[0] || null,
			unreadCount: conv._count.messages,
			messages: undefined,
			_count: undefined,
		};
	});

	// Sort: pinned first, then by lastMessageAt
	transformedConversations.sort((a, b) => {
		if (a.isPinned && !b.isPinned) return -1;
		if (!a.isPinned && b.isPinned) return 1;
		return (
			new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
		);
	});

	// Apply pagination after sorting
	const skip = (page - 1) * limit;
	const paginatedConversations = transformedConversations.slice(
		skip,
		skip + limit,
	);

	return {
		data: paginatedConversations,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getConversationById(
	fastify: FastifyInstance,
	params: IdParams,
	userId: string,
) {
	const conversation = await fastify.prisma.conversation.findUnique({
		where: { id: params.id },
		include: {
			task: {
				select: {
					id: true,
					title: true,
					status: true,
					budgetMin: true,
					budgetMax: true,
					posterId: true,
				},
			},
			client: {
				select: { id: true, name: true, image: true },
			},
			worker: {
				select: { id: true, name: true, image: true },
			},
			messages: {
				orderBy: { createdAt: "asc" },
				include: {
					sender: {
						select: { id: true, name: true, image: true },
					},
				},
			},
			_count: {
				select: {
					messages: {
						where: {
							isRead: false,
							senderId: { not: userId },
						},
					},
				},
			},
		},
	});

	if (!conversation) return null;

	// Check if user is part of this conversation
	if (conversation.clientId !== userId && conversation.workerId !== userId) {
		return null;
	}

	const isPinned =
		conversation.clientId === userId
			? conversation.clientPinned
			: conversation.workerPinned;

	return {
		...conversation,
		isPinned,
		unreadCount: conversation._count.messages,
		_count: undefined,
	};
}

export async function startConversation(
	fastify: FastifyInstance,
	body: StartConversationBody,
	userId: string,
) {
	const { taskId, recipientId, initialMessage } = body;

	// Get the task to determine who is client and who is worker
	const task = await fastify.prisma.task.findUnique({
		where: { id: taskId },
		select: { posterId: true, title: true },
	});

	if (!task) {
		throw new Error("Task not found");
	}

	// Determine roles
	const isUserClient = task.posterId === userId;
	const clientId = isUserClient ? userId : recipientId;
	const workerId = isUserClient ? recipientId : userId;

	// Check if conversation already exists
	let conversation = await fastify.prisma.conversation.findFirst({
		where: {
			taskId,
			clientId,
			workerId,
		},
		include: {
			task: {
				select: {
					id: true,
					title: true,
					status: true,
					budgetMin: true,
					budgetMax: true,
				},
			},
			client: {
				select: { id: true, name: true, image: true },
			},
			worker: {
				select: { id: true, name: true, image: true },
			},
		},
	});

	if (!conversation) {
		// Create new conversation
		conversation = await fastify.prisma.conversation.create({
			data: {
				taskId,
				clientId,
				workerId,
			},
			include: {
				task: {
					select: {
						id: true,
						title: true,
						status: true,
						budgetMin: true,
						budgetMax: true,
					},
				},
				client: {
					select: { id: true, name: true, image: true },
				},
				worker: {
					select: { id: true, name: true, image: true },
				},
			},
		});

		// Notify both users about new conversation
		emitConversationUpdate(fastify.io, clientId, conversation);
		emitConversationUpdate(fastify.io, workerId, conversation);
	}

	// If there's an initial message, create it
	if (initialMessage) {
		const message = await fastify.prisma.message.create({
			data: {
				conversationId: conversation.id,
				senderId: userId,
				content: initialMessage,
				taskId,
			},
			include: {
				sender: {
					select: { id: true, name: true, image: true },
				},
			},
		});

		// Update conversation's lastMessageAt
		await fastify.prisma.conversation.update({
			where: { id: conversation.id },
			data: { lastMessageAt: new Date() },
		});

		// Emit the message to both users
		emitToUser(fastify.io, clientId, "message:new", {
			...message,
			conversationId: conversation.id,
		});
		emitToUser(fastify.io, workerId, "message:new", {
			...message,
			conversationId: conversation.id,
		});
	}

	return conversation;
}

export async function togglePin(
	fastify: FastifyInstance,
	body: TogglePinBody,
	userId: string,
) {
	const { conversationId, pinned } = body;

	// Get conversation to determine user's role
	const conversation = await fastify.prisma.conversation.findUnique({
		where: { id: conversationId },
		select: { clientId: true, workerId: true },
	});

	if (!conversation) {
		throw new Error("Conversation not found");
	}

	// Check if user is part of this conversation
	if (conversation.clientId !== userId && conversation.workerId !== userId) {
		throw new Error("Not authorized");
	}

	const isClient = conversation.clientId === userId;

	const updated = await fastify.prisma.conversation.update({
		where: { id: conversationId },
		data: isClient ? { clientPinned: pinned } : { workerPinned: pinned },
		include: {
			task: {
				select: {
					id: true,
					title: true,
					status: true,
					budgetMin: true,
					budgetMax: true,
				},
			},
			client: {
				select: { id: true, name: true, image: true },
			},
			worker: {
				select: { id: true, name: true, image: true },
			},
		},
	});

	// Notify user about the update
	emitConversationUpdate(fastify.io, userId, {
		...updated,
		isPinned: pinned,
	});

	return { ...updated, isPinned: pinned };
}

export async function getOrCreateConversation(
	fastify: FastifyInstance,
	taskId: string,
	recipientId: string,
	userId: string,
) {
	// Get the task to determine who is client and who is worker
	const task = await fastify.prisma.task.findUnique({
		where: { id: taskId },
		select: { posterId: true },
	});

	if (!task) {
		throw new Error("Task not found");
	}

	// Determine roles
	const isUserClient = task.posterId === userId;
	const clientId = isUserClient ? userId : recipientId;
	const workerId = isUserClient ? recipientId : userId;

	// Check if conversation already exists
	let conversation = await fastify.prisma.conversation.findFirst({
		where: {
			taskId,
			clientId,
			workerId,
		},
	});

	if (!conversation) {
		// Create new conversation
		conversation = await fastify.prisma.conversation.create({
			data: {
				taskId,
				clientId,
				workerId,
			},
		});
	}

	return conversation;
}
