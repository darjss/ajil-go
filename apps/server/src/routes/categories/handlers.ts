import type {
	CreateCategoryBody,
	GetCategoriesQuery,
	IdParams,
	UpdateCategoryBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";

const CACHE_PREFIX = "categories";
const CACHE_TTL = 600; // 10 minutes

export async function getCategories(
	fastify: FastifyInstance,
	query: GetCategoriesQuery,
) {
	const { page, limit, search } = query;
	const cacheKey = `list:${page}:${limit}:${search || "all"}`;

	return fastify.cache.getOrSet(
		cacheKey,
		async () => {
			const skip = (page - 1) * limit;

			const where = {
				...(search && {
					name: { contains: search, mode: "insensitive" as const },
				}),
			};

			const [categories, total] = await Promise.all([
				fastify.prisma.category.findMany({
					where,
					skip,
					take: limit,
					include: {
						_count: {
							select: { tasks: true },
						},
					},
					orderBy: { name: "asc" },
				}),
				fastify.prisma.category.count({ where }),
			]);

			return {
				data: categories,
				meta: {
					total,
					page,
					limit,
					totalPages: Math.ceil(total / limit),
				},
			};
		},
		{ prefix: CACHE_PREFIX, ttl: CACHE_TTL },
	);
}

export async function getCategoryById(
	fastify: FastifyInstance,
	params: IdParams,
) {
	const cacheKey = `item:${params.id}`;

	return fastify.cache.getOrSet(
		cacheKey,
		async () => {
			const category = await fastify.prisma.category.findUnique({
				where: { id: params.id },
				include: {
					_count: {
						select: { tasks: true },
					},
				},
			});

			return category;
		},
		{ prefix: CACHE_PREFIX, ttl: CACHE_TTL },
	);
}

export async function createCategory(
	fastify: FastifyInstance,
	body: CreateCategoryBody,
) {
	const category = await fastify.prisma.category.create({
		data: body,
	});

	// Invalidate category list cache
	await fastify.cache.invalidate(`${CACHE_PREFIX}:list:*`);

	return category;
}

export async function updateCategory(
	fastify: FastifyInstance,
	params: IdParams,
	body: UpdateCategoryBody,
) {
	const category = await fastify.prisma.category.update({
		where: { id: params.id },
		data: body,
	});

	// Invalidate both list and item cache
	await Promise.all([
		fastify.cache.invalidate(`${CACHE_PREFIX}:list:*`),
		fastify.cache.del(`${CACHE_PREFIX}:item:${params.id}`),
	]);

	return category;
}

export async function deleteCategory(
	fastify: FastifyInstance,
	params: IdParams,
) {
	await fastify.prisma.category.delete({
		where: { id: params.id },
	});

	// Invalidate both list and item cache
	await Promise.all([
		fastify.cache.invalidate(`${CACHE_PREFIX}:list:*`),
		fastify.cache.del(`${CACHE_PREFIX}:item:${params.id}`),
	]);
}
