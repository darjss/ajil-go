import {
	type CreateTaskBody,
	CreateTaskBodySchema,
	type GetTasksQuery,
	GetTasksQuerySchema,
	type IdParams,
	IdParamsSchema,
	type UpdateTaskBody,
	UpdateTaskBodySchema,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
import * as handlers from "./handlers.js";

export default async function tasksRoutes(fastify: FastifyInstance) {
	// GET /api/tasks - List all tasks with pagination and filters
	fastify.get<{ Querystring: GetTasksQuery }>(
		"/",
		{
			schema: {
				querystring: GetTasksQuerySchema,
			},
		},
		async (request) => {
			return handlers.getTasks(fastify, request.query);
		},
	);

	// GET /api/tasks/:id - Get task by ID
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			const task = await handlers.getTaskById(fastify, request.params);
			if (!task) {
				return reply
					.status(404)
					.send({ error: "Task not found", code: "TASK_NOT_FOUND" });
			}
			return task;
		},
	);

	// POST /api/tasks - Create new task
	fastify.post<{ Body: CreateTaskBody }>(
		"/",
		{
			schema: {
				body: CreateTaskBodySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			const task = await handlers.createTask(
				fastify,
				request.body,
				request.user!.id,
			);
			return reply.status(201).send(task);
		},
	);

	// PATCH /api/tasks/:id - Update task
	fastify.patch<{ Params: IdParams; Body: UpdateTaskBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateTaskBodySchema,
			},
			preHandler: fastify.authenticate,
		},
		async (request, reply) => {
			// Check ownership
			const existingTask = await fastify.prisma.task.findUnique({
				where: { id: request.params.id },
				select: { posterId: true },
			});

			if (!existingTask) {
				return reply
					.status(404)
					.send({ error: "Task not found", code: "TASK_NOT_FOUND" });
			}

			if (existingTask.posterId !== request.user?.id) {
				return reply
					.status(403)
					.send({ error: "Forbidden", code: "FORBIDDEN" });
			}

			const task = await handlers.updateTask(
				fastify,
				request.params,
				request.body,
			);
			return task;
		},
	);

	// DELETE /api/tasks/:id - Delete task
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
			const existingTask = await fastify.prisma.task.findUnique({
				where: { id: request.params.id },
				select: { posterId: true },
			});

			if (!existingTask) {
				return reply
					.status(404)
					.send({ error: "Task not found", code: "TASK_NOT_FOUND" });
			}

			if (existingTask.posterId !== request.user?.id) {
				return reply
					.status(403)
					.send({ error: "Forbidden", code: "FORBIDDEN" });
			}

			await handlers.deleteTask(fastify, request.params);
			return reply.status(204).send();
		},
	);
}
