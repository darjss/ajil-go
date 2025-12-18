import type {
	CreateReviewBody,
	GetReviewsQuery,
	IdParams,
	UpdateReviewBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";

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

export interface CreateReviewValidation {
	valid: boolean;
	error?: string;
	code?: string;
}

export async function validateReviewCreation(
	fastify: FastifyInstance,
	body: CreateReviewBody,
	currentUserId: string,
): Promise<CreateReviewValidation> {
	// Verify author is the current user
	if (body.authorId !== currentUserId) {
		return {
			valid: false,
			error: "You can only create reviews as yourself",
			code: "INVALID_AUTHOR",
		};
	}

	// Get task with assignment info
	const task = await fastify.prisma.task.findUnique({
		where: { id: body.taskId },
		include: {
			assignedBid: {
				select: { bidderId: true },
			},
		},
	});

	if (!task) {
		return {
			valid: false,
			error: "Task not found",
			code: "TASK_NOT_FOUND",
		};
	}

	// Verify task is completed or reviewed
	if (task.status !== "COMPLETED" && task.status !== "REVIEWED") {
		return {
			valid: false,
			error: "Can only review completed tasks",
			code: "TASK_NOT_COMPLETED",
		};
	}

	const isTaskPoster = task.posterId === currentUserId;
	const isAssignedWorker = task.assignedBid?.bidderId === currentUserId;

	// User must be involved in the task
	if (!isTaskPoster && !isAssignedWorker) {
		return {
			valid: false,
			error: "You must be the task poster or assigned worker to review",
			code: "NOT_TASK_PARTICIPANT",
		};
	}

	// Validate review type matches user role
	if (body.type === "CLIENT_TO_WORKER") {
		if (!isTaskPoster) {
			return {
				valid: false,
				error: "Only the task poster can write CLIENT_TO_WORKER reviews",
				code: "INVALID_REVIEW_TYPE",
			};
		}
		// Target must be the assigned worker
		if (body.targetId !== task.assignedBid?.bidderId) {
			return {
				valid: false,
				error: "Target must be the assigned worker",
				code: "INVALID_TARGET",
			};
		}
	} else if (body.type === "WORKER_TO_CLIENT") {
		if (!isAssignedWorker) {
			return {
				valid: false,
				error: "Only the assigned worker can write WORKER_TO_CLIENT reviews",
				code: "INVALID_REVIEW_TYPE",
			};
		}
		// Target must be the task poster
		if (body.targetId !== task.posterId) {
			return {
				valid: false,
				error: "Target must be the task poster",
				code: "INVALID_TARGET",
			};
		}
	}

	// Can't review yourself
	if (body.authorId === body.targetId) {
		return {
			valid: false,
			error: "Cannot review yourself",
			code: "SELF_REVIEW",
		};
	}

	return { valid: true };
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

export async function getReviewForAuth(
	fastify: FastifyInstance,
	params: IdParams,
) {
	return fastify.prisma.review.findUnique({
		where: { id: params.id },
		select: { id: true, authorId: true },
	});
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
