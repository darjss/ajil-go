import type { FastifyInstance } from "fastify";
import type prisma from "@ajil-go/db";

// Extend Fastify instance with Prisma
declare module "fastify" {
	interface FastifyInstance {
		prisma: typeof prisma;
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
