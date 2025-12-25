import type prisma from "@ajil-go/db";
import type { Redis } from "@upstash/redis";
import type { FastifyInstance } from "fastify";
import type { CacheHelper } from "./plugins/redis";

// Extend Fastify instance with Prisma and Redis
declare module "fastify" {
	interface FastifyInstance {
		prisma: typeof prisma;
		redis: Redis | null;
		cache: CacheHelper;
	}
}

// Common response types
export interface PaginatedResponse<T> {
	data: T[];
	meta: {
		total: number;
		page: number;
		limit: number;
		totalPages: number;
	};
}

export interface ErrorResponse {
	error: string;
	code: string;
	details?: unknown;
}

// Common query params
export interface PaginationQuery {
	page?: number;
	limit?: number;
}

// Route plugin type
export type RoutePlugin = (
	fastify: FastifyInstance,
	opts: { prefix?: string },
) => Promise<void>;
