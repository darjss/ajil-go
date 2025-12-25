import type { FastifyInstance } from "fastify";
import authRoutes from "./auth/index.js";
import benchmarkRoutes from "./benchmark/index.js";
import categoriesRoutes from "./categories/index.js";
import conversationsRoutes from "./conversations/index.js";
import healthRoutes from "./health/index.js";
import messagesRoutes from "./messages/index.js";
import paymentsRoutes from "./payments/index.js";
import reviewsRoutes from "./reviews/index.js";
import skillsRoutes from "./skills/index.js";
import bidsRoutes from "./tasks/bids/index.js";
import tasksRoutes from "./tasks/index.js";
import usersRoutes from "./users/index.js";

/**
 * Registers all routes under /api prefix
 */
export default async function routes(fastify: FastifyInstance) {
	// Health check routes
	await fastify.register(healthRoutes, { prefix: "/health" });

	// Benchmark routes
	await fastify.register(benchmarkRoutes, { prefix: "/benchmark" });

	// Auth routes (better-auth handler)
	await fastify.register(authRoutes, { prefix: "/auth" });

	// Resource routes
	await fastify.register(usersRoutes, { prefix: "/users" });
	await fastify.register(tasksRoutes, { prefix: "/tasks" });
	await fastify.register(bidsRoutes, { prefix: "/tasks/bids" });
	await fastify.register(categoriesRoutes, { prefix: "/categories" });
	await fastify.register(skillsRoutes, { prefix: "/skills" });
	await fastify.register(reviewsRoutes, { prefix: "/reviews" });
	await fastify.register(messagesRoutes, { prefix: "/messages" });
	await fastify.register(conversationsRoutes, { prefix: "/conversations" });
	await fastify.register(paymentsRoutes, { prefix: "/payments" });
}
