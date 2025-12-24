import "dotenv/config";
import fastifyCors from "@fastify/cors";
import Fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import authPlugin from "./plugins/auth";
import prisma from "./plugins/prisma";
import socketPlugin from "./plugins/socket";
import routes from "./routes";

const baseCorsConfig = {
	origin: process.env.CORS_ORIGIN || "*",
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
	credentials: true,
	maxAge: 86400,
};

const fastify = Fastify({
	logger: true,
	pluginTimeout: 120000, // 120s for slow DB connections
}).withTypeProvider<ZodTypeProvider>();

// Set Zod as validator and serializer
fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

// Register plugins
fastify.register(fastifyCors, baseCorsConfig);
fastify.register(prisma);
fastify.register(authPlugin);
fastify.register(socketPlugin);

// Register all routes under /api prefix
fastify.register(routes, { prefix: "/api" });

// Root endpoint
fastify.get("/", async () => {
	return "OK";
});

const start = async () => {
	try {
		await fastify.listen({ port: 3001, host: "0.0.0.0" });
		console.log("Server running on port 3001");
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
};

start();
