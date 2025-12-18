import type { FastifyInstance } from "fastify";
import {
	GetUsersQuerySchema,
	IdParamsSchema,
	UpdateUserBodySchema,
	type GetUsersQuery,
	type IdParams,
	type UpdateUserBody,
} from "@ajil-go/contract";
import * as handlers from "./handlers.js";

export default async function usersRoutes(fastify: FastifyInstance) {
	// GET /api/users - List all users with pagination
	fastify.get<{ Querystring: GetUsersQuery }>(
		"/",
		{
			schema: {
				querystring: GetUsersQuerySchema,
			},
		},
		async (request) => {
			return handlers.getUsers(fastify, request.query);
		},
	);

	// GET /api/users/:id - Get user by ID
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			const user = await handlers.getUserById(fastify, request.params);
			if (!user) {
				return reply
					.status(404)
					.send({ error: "User not found", code: "USER_NOT_FOUND" });
			}
			return user;
		},
	);

	// PATCH /api/users/:id - Update user
	fastify.patch<{ Params: IdParams; Body: UpdateUserBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateUserBodySchema,
			},
		},
		async (request, reply) => {
			try {
				return await handlers.updateUser(fastify, request.params, request.body);
			} catch {
				return reply
					.status(404)
					.send({ error: "User not found", code: "USER_NOT_FOUND" });
			}
		},
	);

	// DELETE /api/users/:id - Delete user
	fastify.delete<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			try {
				await handlers.deleteUser(fastify, request.params);
				return reply.status(204).send();
			} catch {
				return reply
					.status(404)
					.send({ error: "User not found", code: "USER_NOT_FOUND" });
			}
		},
	);
}
