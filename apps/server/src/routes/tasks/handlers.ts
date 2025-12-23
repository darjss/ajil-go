import type {
	CreateTaskBody,
	GetTasksQuery,
	IdParams,
	UpdateTaskBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";

export async function getTasks(fastify: FastifyInstance, query: GetTasksQuery) {
	const {
		page,
		limit,
		status,
		categoryId,
		posterId,
		city,
		isRemote,
		minBudget,
		maxBudget,
		search,
	} = query;
	const skip = (page - 1) * limit;

	const where = {
		...(status && { status }),
		...(categoryId && { categoryId }),
		...(posterId && { posterId }),
		...(city && { city: { contains: city, mode: "insensitive" as const } }),
		...(isRemote !== undefined && { isRemote }),
		...(minBudget && { budgetMin: { gte: minBudget } }),
		...(maxBudget && { budgetMax: { lte: maxBudget } }),
		...(search && {
			OR: [
				{ title: { contains: search, mode: "insensitive" as const } },
				{ description: { contains: search, mode: "insensitive" as const } },
			],
		}),
	};

	const [tasks, total] = await Promise.all([
		fastify.prisma.task.findMany({
			where,
			skip,
			take: limit,
			include: {
				poster: {
					select: {
						id: true,
						name: true,
						image: true,
						avgRatingAsClient: true,
					},
				},
				category: true,
				_count: {
					select: { bids: true },
				},
			},
			orderBy: { createdAt: "desc" },
		}),
		fastify.prisma.task.count({ where }),
	]);

	return {
		data: tasks,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getTaskById(fastify: FastifyInstance, params: IdParams) {
	const task = await fastify.prisma.task.findUnique({
		where: { id: params.id },
		include: {
			poster: {
				select: {
					id: true,
					name: true,
					image: true,
					avgRatingAsClient: true,
					completedTasksAsClient: true,
				},
			},
			category: true,
			skills: {
				include: {
					skill: true,
					customSkill: true,
				},
			},
			assignedBid: {
				include: {
					bidder: {
						select: {
							id: true,
							name: true,
							image: true,
							avgRatingAsWorker: true,
						},
					},
				},
			},
			attachments: true,
			_count: {
				select: { bids: true, messages: true },
			},
		},
	});

	return task;
}

export async function createTask(
	fastify: FastifyInstance,
	body: CreateTaskBody,
	userId: string,
) {
	const { skillIds, posterId: _ignoredPosterId, ...taskData } = body;

	const task = await fastify.prisma.task.create({
		data: {
			...taskData,
			posterId: userId,
			...(skillIds?.length && {
				skills: {
					create: skillIds.map((skillId) => ({ skillId })),
				},
			}),
		},
		include: {
			poster: {
				select: { id: true, name: true, image: true },
			},
			category: true,
			skills: {
				include: { skill: true },
			},
		},
	});

	return task;
}

export async function updateTask(
	fastify: FastifyInstance,
	params: IdParams,
	body: UpdateTaskBody,
) {
	const task = await fastify.prisma.task.update({
		where: { id: params.id },
		data: body,
		include: {
			poster: {
				select: { id: true, name: true, image: true },
			},
			category: true,
		},
	});

	return task;
}

export async function deleteTask(fastify: FastifyInstance, params: IdParams) {
	await fastify.prisma.task.delete({
		where: { id: params.id },
	});
}
