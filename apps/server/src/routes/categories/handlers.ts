import type { FastifyInstance } from "fastify";
import type {
	GetCategoriesQuery,
	IdParams,
	CreateCategoryBody,
	UpdateCategoryBody,
} from "@ajil-go/contract";

export async function getCategories(
	fastify: FastifyInstance,
	query: GetCategoriesQuery,
) {
	const { page, limit, search } = query;
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
}

export async function getCategoryById(
	fastify: FastifyInstance,
	params: IdParams,
) {
	const category = await fastify.prisma.category.findUnique({
		where: { id: params.id },
		include: {
			_count: {
				select: { tasks: true },
			},
		},
	});

	return category;
}

export async function createCategory(
	fastify: FastifyInstance,
	body: CreateCategoryBody,
) {
	const category = await fastify.prisma.category.create({
		data: body,
	});

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

	return category;
}

export async function deleteCategory(
	fastify: FastifyInstance,
	params: IdParams,
) {
	await fastify.prisma.category.delete({
		where: { id: params.id },
	});
}
