import {
	type CreateReviewBody,
	CreateReviewBodySchema,
	type GetReviewsQuery,
	GetReviewsQuerySchema,
	type IdParams,
	IdParamsSchema,
	type UpdateReviewBody,
	UpdateReviewBodySchema,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
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

	// POST /api/reviews - Create new review (requires auth)
	fastify.post<{ Body: CreateReviewBody }>(
		"/",
		{
			schema: {
				body: CreateReviewBodySchema,
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

			// Validate review creation rules
			const validation = await handlers.validateReviewCreation(
				fastify,
				request.body,
				request.user.id,
			);

			if (!validation.valid) {
				return reply.status(403).send({
					error: validation.error,
					code: validation.code,
				});
			}

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

	// PATCH /api/reviews/:id - Update review (requires auth, must be author)
	fastify.patch<{ Params: IdParams; Body: UpdateReviewBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateReviewBodySchema,
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

			// Check if review exists and user is author
			const review = await handlers.getReviewForAuth(fastify, request.params);
			if (!review) {
				return reply
					.status(404)
					.send({ error: "Review not found", code: "REVIEW_NOT_FOUND" });
			}

			if (review.authorId !== request.user.id) {
				return reply.status(403).send({
					error: "You can only update your own reviews",
					code: "FORBIDDEN",
				});
			}

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

	// DELETE /api/reviews/:id - Delete review (requires auth, must be author)
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

			// Check if review exists and user is author
			const review = await handlers.getReviewForAuth(fastify, request.params);
			if (!review) {
				return reply
					.status(404)
					.send({ error: "Review not found", code: "REVIEW_NOT_FOUND" });
			}

			if (review.authorId !== request.user.id) {
				return reply.status(403).send({
					error: "You can only delete your own reviews",
					code: "FORBIDDEN",
				});
			}

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
