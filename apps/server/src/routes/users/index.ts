import {
	type GetUsersQuery,
	GetUsersQuerySchema,
	type IdParams,
	IdParamsSchema,
	type UpdateUserBody,
	UpdateUserBodySchema,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
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

	// GET /api/users/me - Get current authenticated user
	fastify.get(
		"/me",
		{
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({
					error: "Unauthorized",
					code: "UNAUTHORIZED",
				});
			}

			const user = await handlers.getUserById(fastify, { id: request.user.id });
			if (!user) {
				return reply
					.status(404)
					.send({ error: "User not found", code: "USER_NOT_FOUND" });
			}
			return user;
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

	// PATCH /api/users/:id - Update user (requires auth, must be self)
	fastify.patch<{ Params: IdParams; Body: UpdateUserBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateUserBodySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({
					error: "Unauthorized",
					code: "UNAUTHORIZED",
				});
			}

			// Users can only update their own profile
			if (request.params.id !== request.user.id) {
				return reply.status(403).send({
					error: "You can only update your own profile",
					code: "FORBIDDEN",
				});
			}

			try {
				return await handlers.updateUser(fastify, request.params, request.body);
			} catch {
				return reply
					.status(404)
					.send({ error: "User not found", code: "USER_NOT_FOUND" });
			}
		},
	);

	// DELETE /api/users/:id - Delete user (requires auth, must be self)
	fastify.delete<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			if (!request.user) {
				return reply.status(401).send({
					error: "Unauthorized",
					code: "UNAUTHORIZED",
				});
			}

			// Users can only delete their own account
			if (request.params.id !== request.user.id) {
				return reply.status(403).send({
					error: "You can only delete your own account",
					code: "FORBIDDEN",
				});
			}

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
