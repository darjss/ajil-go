import type {
	CreateBidBody,
	GetBidsQuery,
	IdParams,
	UpdateBidBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";

export async function getBids(fastify: FastifyInstance, query: GetBidsQuery) {
	const { page, limit, taskId, bidderId, status } = query;
	const skip = (page - 1) * limit;

	const where = {
		...(taskId && { taskId }),
		...(bidderId && { bidderId }),
		...(status && { status }),
	};

	const [bids, total] = await Promise.all([
		fastify.prisma.taskBid.findMany({
			where,
			skip,
			take: limit,
			include: {
				bidder: {
					select: {
						id: true,
						name: true,
						image: true,
						avgRatingAsWorker: true,
						completedTasksAsWorker: true,
					},
				},
				task: {
					select: {
						id: true,
						title: true,
						status: true,
					},
				},
			},
			orderBy: { createdAt: "desc" },
		}),
		fastify.prisma.taskBid.count({ where }),
	]);

	return {
		data: bids,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getBidById(fastify: FastifyInstance, params: IdParams) {
	const bid = await fastify.prisma.taskBid.findUnique({
		where: { id: params.id },
		include: {
			bidder: {
				select: {
					id: true,
					name: true,
					image: true,
					avgRatingAsWorker: true,
					completedTasksAsWorker: true,
					bio: true,
				},
			},
			task: {
				select: {
					id: true,
					title: true,
					status: true,
					budgetMin: true,
					budgetMax: true,
				},
			},
		},
	});

	return bid;
}

export async function createBid(
	fastify: FastifyInstance,
	body: CreateBidBody,
	userId: string,
) {
	const { bidderId: _ignoredBidderId, ...bidData } = body;

	const bid = await fastify.prisma.taskBid.create({
		data: {
			...bidData,
			bidderId: userId,
		},
		include: {
			bidder: {
				select: { id: true, name: true, image: true },
			},
			task: {
				select: { id: true, title: true },
			},
		},
	});

	return bid;
}

export async function updateBid(
	fastify: FastifyInstance,
	params: IdParams,
	body: UpdateBidBody,
) {
	const bid = await fastify.prisma.taskBid.update({
		where: { id: params.id },
		data: body,
		include: {
			bidder: {
				select: { id: true, name: true, image: true },
			},
		},
	});

	return bid;
}

export async function deleteBid(fastify: FastifyInstance, params: IdParams) {
	await fastify.prisma.taskBid.delete({
		where: { id: params.id },
	});
}
