import {
	type CreateMessageBody,
	CreateMessageBodySchema,
	type GetMessagesQuery,
	GetMessagesQuerySchema,
	type IdParams,
	IdParamsSchema,
	type MarkMessagesReadBody,
	MarkMessagesReadBodySchema,
	type UpdateMessageBody,
	UpdateMessageBodySchema,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
import * as handlers from "./handlers.js";

export default async function messagesRoutes(fastify: FastifyInstance) {
	// GET /api/messages - List all messages with filters
	fastify.get<{ Querystring: GetMessagesQuery }>(
		"/",
		{
			schema: {
				querystring: GetMessagesQuerySchema,
			},
		},
		async (request) => {
			return handlers.getMessages(fastify, request.query);
		},
	);

	// GET /api/messages/:id - Get message by ID
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			const message = await handlers.getMessageById(fastify, request.params);
			if (!message) {
				return reply
					.status(404)
					.send({ error: "Message not found", code: "MESSAGE_NOT_FOUND" });
			}
			return message;
		},
	);

	// POST /api/messages - Create new message
	fastify.post<{ Body: CreateMessageBody }>(
		"/",
		{
			schema: {
				body: CreateMessageBodySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({ error: "Unauthorized" });
			}
			const message = await handlers.createMessage(
				fastify,
				request.body,
				request.user.id,
			);
			return reply.status(201).send(message);
		},
	);

	// POST /api/messages/read - Mark messages as read (bulk)
	fastify.post<{ Body: MarkMessagesReadBody }>(
		"/read",
		{
			schema: {
				body: MarkMessagesReadBodySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({ error: "Unauthorized" });
			}
			return handlers.markMessagesAsRead(fastify, request.body, request.user.id);
		},
	);

	// PATCH /api/messages/:id - Update message
	fastify.patch<{ Params: IdParams; Body: UpdateMessageBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateMessageBodySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			// Check ownership
			const existingMessage = await fastify.prisma.message.findUnique({
				where: { id: request.params.id },
				select: { senderId: true },
			});

			if (!existingMessage) {
				return reply
					.status(404)
					.send({ error: "Message not found", code: "MESSAGE_NOT_FOUND" });
			}

			if (!request.user || existingMessage.senderId !== request.user.id) {
				return reply
					.status(403)
					.send({ error: "Forbidden", code: "FORBIDDEN" });
			}

			const message = await handlers.updateMessage(
				fastify,
				request.params,
				request.body,
			);
			return message;
		},
	);

	// DELETE /api/messages/:id - Delete message
	fastify.delete<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			// Check ownership
			const existingMessage = await fastify.prisma.message.findUnique({
				where: { id: request.params.id },
				select: { senderId: true },
			});

			if (!existingMessage) {
				return reply
					.status(404)
					.send({ error: "Message not found", code: "MESSAGE_NOT_FOUND" });
			}

			if (!request.user || existingMessage.senderId !== request.user.id) {
				return reply
					.status(403)
					.send({ error: "Forbidden", code: "FORBIDDEN" });
			}

			await handlers.deleteMessage(fastify, request.params);
			return reply.status(204).send();
		},
	);
}
