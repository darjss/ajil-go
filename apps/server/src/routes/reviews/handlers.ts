import type { FastifyInstance } from "fastify";
import type {
	GetReviewsQuery,
	IdParams,
	CreateReviewBody,
	UpdateReviewBody,
} from "@ajil-go/contract";

export async function getReviews(
	fastify: FastifyInstance,
	query: GetReviewsQuery,
) {
	const { page, limit, taskId, authorId, targetId, type, minRating } = query;
	const skip = (page - 1) * limit;

	const where = {
		...(taskId && { taskId }),
		...(authorId && { authorId }),
		...(targetId && { targetId }),
		...(type && { type }),
		...(minRating && { rating: { gte: minRating } }),
	};

	const [reviews, total] = await Promise.all([
		fastify.prisma.review.findMany({
			where,
			skip,
			take: limit,
			include: {
				author: {
					select: { id: true, name: true, image: true },
				},
				target: {
					select: { id: true, name: true, image: true },
				},
				task: {
					select: { id: true, title: true },
				},
			},
			orderBy: { createdAt: "desc" },
		}),
		fastify.prisma.review.count({ where }),
	]);

	return {
		data: reviews,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getReviewById(
	fastify: FastifyInstance,
	params: IdParams,
) {
	const review = await fastify.prisma.review.findUnique({
		where: { id: params.id },
		include: {
			author: {
				select: { id: true, name: true, image: true },
			},
			target: {
				select: { id: true, name: true, image: true },
			},
			task: {
				select: { id: true, title: true, description: true },
			},
		},
	});

	return review;
}

export async function createReview(
	fastify: FastifyInstance,
	body: CreateReviewBody,
) {
	const review = await fastify.prisma.review.create({
		data: body,
		include: {
			author: {
				select: { id: true, name: true, image: true },
			},
			target: {
				select: { id: true, name: true, image: true },
			},
		},
	});

	return review;
}

export async function updateReview(
	fastify: FastifyInstance,
	params: IdParams,
	body: UpdateReviewBody,
) {
	const review = await fastify.prisma.review.update({
		where: { id: params.id },
		data: body,
	});

	return review;
}

export async function deleteReview(fastify: FastifyInstance, params: IdParams) {
	await fastify.prisma.review.delete({
		where: { id: params.id },
	});
}
