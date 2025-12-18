import type { FastifyInstance } from "fastify";
import {
	GetReviewsQuerySchema,
	IdParamsSchema,
	CreateReviewBodySchema,
	UpdateReviewBodySchema,
	type GetReviewsQuery,
	type IdParams,
	type CreateReviewBody,
	type UpdateReviewBody,
} from "@ajil-go/contract";
import * as handlers from "./handlers.js";

export default async function reviewsRoutes(fastify: FastifyInstance) {
	// GET /api/reviews - List all reviews with filters
	fastify.get<{ Querystring: GetReviewsQuery }>(
		"/",
		{
			schema: {
				querystring: GetReviewsQuerySchema,
			},
		},
		async (request) => {
			return handlers.getReviews(fastify, request.query);
		},
	);

	// GET /api/reviews/:id - Get review by ID
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			const review = await handlers.getReviewById(fastify, request.params);
			if (!review) {
				return reply
					.status(404)
					.send({ error: "Review not found", code: "REVIEW_NOT_FOUND" });
			}
			return review;
		},
	);

	// POST /api/reviews - Create new review
	fastify.post<{ Body: CreateReviewBody }>(
		"/",
		{
			schema: {
				body: CreateReviewBodySchema,
			},
		},
		async (request, reply) => {
			try {
				const review = await handlers.createReview(fastify, request.body);
				return reply.status(201).send(review);
			} catch (error: unknown) {
				if (
					error &&
					typeof error === "object" &&
					"code" in error &&
					error.code === "P2002"
				) {
					return reply.status(409).send({
						error: "You have already reviewed this task",
						code: "REVIEW_EXISTS",
					});
				}
				throw error;
			}
		},
	);

	// PATCH /api/reviews/:id - Update review
	fastify.patch<{ Params: IdParams; Body: UpdateReviewBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateReviewBodySchema,
			},
		},
		async (request, reply) => {
			try {
				return await handlers.updateReview(
					fastify,
					request.params,
					request.body,
				);
			} catch {
				return reply
					.status(404)
					.send({ error: "Review not found", code: "REVIEW_NOT_FOUND" });
			}
		},
	);

	// DELETE /api/reviews/:id - Delete review
	fastify.delete<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			try {
				await handlers.deleteReview(fastify, request.params);
				return reply.status(204).send();
			} catch {
				return reply
					.status(404)
					.send({ error: "Review not found", code: "REVIEW_NOT_FOUND" });
			}
		},
	);
}
