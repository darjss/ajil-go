import type { FastifyInstance } from "fastify";
import {
	GetBidsQuerySchema,
	IdParamsSchema,
	CreateBidBodySchema,
	UpdateBidBodySchema,
	type GetBidsQuery,
	type IdParams,
	type CreateBidBody,
	type UpdateBidBody,
} from "@ajil-go/contract";
import * as handlers from "./handlers.js";

export default async function bidsRoutes(fastify: FastifyInstance) {
	// GET /api/tasks/bids - List all bids with filters
	fastify.get<{ Querystring: GetBidsQuery }>(
		"/",
		{
			schema: {
				querystring: GetBidsQuerySchema,
			},
		},
		async (request) => {
			return handlers.getBids(fastify, request.query);
		},
	);

	// GET /api/tasks/bids/:id - Get bid by ID
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			const bid = await handlers.getBidById(fastify, request.params);
			if (!bid) {
				return reply
					.status(404)
					.send({ error: "Bid not found", code: "BID_NOT_FOUND" });
			}
			return bid;
		},
	);

	// POST /api/tasks/bids - Create new bid
	fastify.post<{ Body: CreateBidBody }>(
		"/",
		{
			schema: {
				body: CreateBidBodySchema,
			},
		},
		async (request, reply) => {
			try {
				const bid = await handlers.createBid(fastify, request.body);
				return reply.status(201).send(bid);
			} catch (error: unknown) {
				// Handle unique constraint (one bid per user per task)
				if (
					error &&
					typeof error === "object" &&
					"code" in error &&
					error.code === "P2002"
				) {
					return reply.status(409).send({
						error: "You have already placed a bid on this task",
						code: "BID_EXISTS",
					});
				}
				throw error;
			}
		},
	);

	// PATCH /api/tasks/bids/:id - Update bid
	fastify.patch<{ Params: IdParams; Body: UpdateBidBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateBidBodySchema,
			},
		},
		async (request, reply) => {
			try {
				return await handlers.updateBid(fastify, request.params, request.body);
			} catch {
				return reply
					.status(404)
					.send({ error: "Bid not found", code: "BID_NOT_FOUND" });
			}
		},
	);

	// DELETE /api/tasks/bids/:id - Delete/withdraw bid
	fastify.delete<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			try {
				await handlers.deleteBid(fastify, request.params);
				return reply.status(204).send();
			} catch {
				return reply
					.status(404)
					.send({ error: "Bid not found", code: "BID_NOT_FOUND" });
			}
		},
	);
}
