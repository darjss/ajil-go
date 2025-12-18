import { auth } from "@ajil-go/auth";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export interface AuthUser {
	id: string;
	email: string;
	name: string | null;
	image?: string | null;
}

export interface AuthSession {
	user: AuthUser;
	session: {
		id: string;
		userId: string;
		expiresAt: Date;
	};
}

declare module "fastify" {
	interface FastifyRequest {
		user?: AuthUser;
		session?: AuthSession["session"];
	}
	interface FastifyInstance {
		authenticate: (
			request: FastifyRequest,
			reply: FastifyReply,
		) => Promise<void>;
	}
}

async function authPlugin(fastify: FastifyInstance) {
	// Helper to get session from request
	const getSession = async (
		request: FastifyRequest,
	): Promise<AuthSession | null> => {
		try {
			const headers = new Headers();
			for (const [key, value] of Object.entries(request.headers)) {
				if (value) headers.append(key, String(value));
			}

			const result = await auth.api.getSession({
				headers,
			});

			if (!result?.user || !result?.session) {
				return null;
			}

			return {
				user: {
					id: result.user.id,
					email: result.user.email,
					name: result.user.name,
					image: result.user.image ?? null,
				},
				session: {
					id: result.session.id,
					userId: result.session.userId,
					expiresAt: result.session.expiresAt,
				},
			};
		} catch {
			return null;
		}
	};

	// Decorate request with user info
	fastify.decorateRequest("user", undefined);
	fastify.decorateRequest("session", undefined);

	// Authentication hook decorator
	fastify.decorate(
		"authenticate",
		async (request: FastifyRequest, reply: FastifyReply) => {
			const session = await getSession(request);

			if (!session?.user) {
				return reply.status(401).send({
					error: "Unauthorized",
					code: "UNAUTHORIZED",
				});
			}

			request.user = session.user;
			request.session = session.session;
		},
	);

	// Optional: Add hook to parse session on all requests (without enforcing auth)
	fastify.addHook("onRequest", async (request) => {
		const session = await getSession(request);
		if (session?.user) {
			request.user = session.user;
			request.session = session.session;
		}
	});
}

export default fp(authPlugin, {
	name: "auth",
	dependencies: [],
});
