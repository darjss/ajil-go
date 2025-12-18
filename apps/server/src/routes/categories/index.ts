import type { FastifyInstance } from "fastify";
import {
	GetCategoriesQuerySchema,
	IdParamsSchema,
	CreateCategoryBodySchema,
	UpdateCategoryBodySchema,
	type GetCategoriesQuery,
	type IdParams,
	type CreateCategoryBody,
	type UpdateCategoryBody,
} from "@ajil-go/contract";
import * as handlers from "./handlers.js";

export default async function categoriesRoutes(fastify: FastifyInstance) {
	// GET /api/categories - List all categories
	fastify.get<{ Querystring: GetCategoriesQuery }>(
		"/",
		{
			schema: {
				querystring: GetCategoriesQuerySchema,
			},
		},
		async (request) => {
			return handlers.getCategories(fastify, request.query);
		},
	);

	// GET /api/categories/:id - Get category by ID
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			const category = await handlers.getCategoryById(fastify, request.params);
			if (!category) {
				return reply
					.status(404)
					.send({ error: "Category not found", code: "CATEGORY_NOT_FOUND" });
			}
			return category;
		},
	);

	// POST /api/categories - Create new category
	fastify.post<{ Body: CreateCategoryBody }>(
		"/",
		{
			schema: {
				body: CreateCategoryBodySchema,
			},
		},
		async (request, reply) => {
			try {
				const category = await handlers.createCategory(fastify, request.body);
				return reply.status(201).send(category);
			} catch (error: unknown) {
				if (
					error &&
					typeof error === "object" &&
					"code" in error &&
					error.code === "P2002"
				) {
					return reply.status(409).send({
						error: "Category with this name already exists",
						code: "CATEGORY_EXISTS",
					});
				}
				throw error;
			}
		},
	);

	// PATCH /api/categories/:id - Update category
	fastify.patch<{ Params: IdParams; Body: UpdateCategoryBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateCategoryBodySchema,
			},
		},
		async (request, reply) => {
			try {
				return await handlers.updateCategory(
					fastify,
					request.params,
					request.body,
				);
			} catch {
				return reply
					.status(404)
					.send({ error: "Category not found", code: "CATEGORY_NOT_FOUND" });
			}
		},
	);

	// DELETE /api/categories/:id - Delete category
	fastify.delete<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			try {
				await handlers.deleteCategory(fastify, request.params);
				return reply.status(204).send();
			} catch {
				return reply
					.status(404)
					.send({ error: "Category not found", code: "CATEGORY_NOT_FOUND" });
			}
		},
	);
}
