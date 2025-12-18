import {
	type CreatePaymentBody,
	CreatePaymentBodySchema,
	type GetPaymentsQuery,
	GetPaymentsQuerySchema,
	type IdParams,
	IdParamsSchema,
	type UpdatePaymentBody,
	UpdatePaymentBodySchema,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
import * as handlers from "./handlers.js";

export default async function paymentsRoutes(fastify: FastifyInstance) {
	// GET /api/payments - List all payments with filters
	fastify.get<{ Querystring: GetPaymentsQuery }>(
		"/",
		{
			schema: {
				querystring: GetPaymentsQuerySchema,
			},
		},
		async (request) => {
			return handlers.getPayments(fastify, request.query);
		},
	);

	// GET /api/payments/:id - Get payment by ID
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			const payment = await handlers.getPaymentById(fastify, request.params);
			if (!payment) {
				return reply
					.status(404)
					.send({ error: "Payment not found", code: "PAYMENT_NOT_FOUND" });
			}
			return payment;
		},
	);

	// POST /api/payments - Create new payment
	fastify.post<{ Body: CreatePaymentBody }>(
		"/",
		{
			schema: {
				body: CreatePaymentBodySchema,
			},
		},
		async (request, reply) => {
			try {
				const payment = await handlers.createPayment(fastify, request.body);
				return reply.status(201).send(payment);
			} catch (error: unknown) {
				if (
					error &&
					typeof error === "object" &&
					"code" in error &&
					error.code === "P2002"
				) {
					return reply.status(409).send({
						error: "Payment already exists for this task",
						code: "PAYMENT_EXISTS",
					});
				}
				throw error;
			}
		},
	);

	// PATCH /api/payments/:id - Update payment status
	fastify.patch<{ Params: IdParams; Body: UpdatePaymentBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdatePaymentBodySchema,
			},
		},
		async (request, reply) => {
			try {
				return await handlers.updatePayment(
					fastify,
					request.params,
					request.body,
				);
			} catch {
				return reply
					.status(404)
					.send({ error: "Payment not found", code: "PAYMENT_NOT_FOUND" });
			}
		},
	);

	// DELETE /api/payments/:id - Delete payment
	fastify.delete<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			try {
				await handlers.deletePayment(fastify, request.params);
				return reply.status(204).send();
			} catch {
				return reply
					.status(404)
					.send({ error: "Payment not found", code: "PAYMENT_NOT_FOUND" });
			}
		},
	);
}
