import {
	type GetConversationsQuery,
	GetConversationsQuerySchema,
	type IdParams,
	IdParamsSchema,
	type StartConversationBody,
	StartConversationBodySchema,
	type TogglePinBody,
	TogglePinBodySchema,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import * as handlers from "./handlers.js";

// Schema for by-task route params
const ByTaskParamsSchema = z.object({
	taskId: z.string().min(1, "taskId is required"),
	recipientId: z.string().min(1, "recipientId is required"),
});
type ByTaskParams = z.infer<typeof ByTaskParamsSchema>;

export default async function conversationsRoutes(fastify: FastifyInstance) {
	// GET /api/conversations - List user's conversations
	fastify.get<{ Querystring: GetConversationsQuery }>(
		"/",
		{
			schema: {
				querystring: GetConversationsQuerySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({ error: "Unauthorized" });
			}
			return handlers.getConversations(fastify, request.query, request.user.id);
		},
	);

	// GET /api/conversations/:id - Get conversation with messages
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({ error: "Unauthorized" });
			}
			const conversation = await handlers.getConversationById(
				fastify,
				request.params,
				request.user.id,
			);
			if (!conversation) {
				return reply.status(404).send({
					error: "Conversation not found",
					code: "CONVERSATION_NOT_FOUND",
				});
			}
			return conversation;
		},
	);

	// POST /api/conversations - Start a new conversation
	fastify.post<{ Body: StartConversationBody }>(
		"/",
		{
			schema: {
				body: StartConversationBodySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({ error: "Unauthorized" });
			}
			try {
				const conversation = await handlers.startConversation(
					fastify,
					request.body,
					request.user.id,
				);
				return reply.status(201).send(conversation);
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Failed to start conversation";
				return reply.status(400).send({ error: message });
			}
		},
	);

	// POST /api/conversations/pin - Toggle pin on a conversation
	fastify.post<{ Body: TogglePinBody }>(
		"/pin",
		{
			schema: {
				body: TogglePinBodySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({ error: "Unauthorized" });
			}
			try {
				const result = await handlers.togglePin(
					fastify,
					request.body,
					request.user.id,
				);
				return result;
			} catch (error) {
				const message =
					error instanceof Error ? error.message : "Failed to toggle pin";
				return reply.status(400).send({ error: message });
			}
		},
	);

	// GET /api/conversations/by-task/:taskId/:recipientId - Get or create conversation by task
	fastify.get<{ Params: ByTaskParams }>(
		"/by-task/:taskId/:recipientId",
		{
			schema: {
				params: ByTaskParamsSchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({ error: "Unauthorized" });
			}
			try {
				const conversation = await handlers.getOrCreateConversation(
					fastify,
					request.params.taskId,
					request.params.recipientId,
					request.user.id,
				);
				return conversation;
			} catch (error) {
				const message =
					error instanceof Error ? error.message : "Failed to get conversation";
				return reply.status(400).send({ error: message });
			}
		},
	);
}
