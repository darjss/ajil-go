import type { FastifyInstance } from "fastify";
import type {
	GetUsersQuery,
	IdParams,
	UpdateUserBody,
} from "@ajil-go/contract";

export async function getUsers(fastify: FastifyInstance, query: GetUsersQuery) {
	const { page, limit, city, search } = query;
	const skip = (page - 1) * limit;

	const where = {
		...(city && { city: { contains: city, mode: "insensitive" as const } }),
		...(search && {
			OR: [
				{ name: { contains: search, mode: "insensitive" as const } },
				{ email: { contains: search, mode: "insensitive" as const } },
			],
		}),
	};

	const [users, total] = await Promise.all([
		fastify.prisma.user.findMany({
			where,
			skip,
			take: limit,
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				city: true,
				bio: true,
				avgRatingAsClient: true,
				avgRatingAsWorker: true,
				completedTasksAsWorker: true,
				completedTasksAsClient: true,
				createdAt: true,
			},
			orderBy: { createdAt: "desc" },
		}),
		fastify.prisma.user.count({ where }),
	]);

	return {
		data: users,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		},
	};
}

export async function getUserById(fastify: FastifyInstance, params: IdParams) {
	const user = await fastify.prisma.user.findUnique({
		where: { id: params.id },
		include: {
			skills: {
				include: {
					skill: true,
					customSkill: true,
				},
			},
			_count: {
				select: {
					postedTasks: true,
					bids: true,
					reviewsReceived: true,
				},
			},
		},
	});

	if (!user) {
		return null;
	}

	return user;
}

export async function updateUser(
	fastify: FastifyInstance,
	params: IdParams,
	body: UpdateUserBody,
) {
	const user = await fastify.prisma.user.update({
		where: { id: params.id },
		data: body,
	});

	return user;
}

export async function deleteUser(fastify: FastifyInstance, params: IdParams) {
	await fastify.prisma.user.delete({
		where: { id: params.id },
	});
}
