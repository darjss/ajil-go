import type { FastifyInstance } from "fastify";

export default async function healthRoutes(fastify: FastifyInstance) {
	fastify.get("/", async () => {
		return { status: "ok", timestamp: new Date().toISOString() };
	});

	fastify.get("/ready", async () => {
		// Check database connection
		try {
			await fastify.prisma.$queryRaw`SELECT 1`;
			return { status: "ready", database: "connected" };
		} catch {
			return { status: "not_ready", database: "disconnected" };
		}
	});
}
