import type {
	CreateSkillBody,
	GetSkillsQuery,
	IdParams,
	UpdateSkillBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";

const CACHE_PREFIX = "skills";
const CACHE_TTL = 600; // 10 minutes

export async function getSkills(
	fastify: FastifyInstance,
	query: GetSkillsQuery,
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

			const [skills, total] = await Promise.all([
				fastify.prisma.skill.findMany({
					where,
					skip,
					take: limit,
					include: {
						_count: {
							select: { users: true, tasks: true },
						},
					},
					orderBy: { name: "asc" },
				}),
				fastify.prisma.skill.count({ where }),
			]);

			return {
				data: skills,
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

export async function getSkillById(fastify: FastifyInstance, params: IdParams) {
	const cacheKey = `item:${params.id}`;

	return fastify.cache.getOrSet(
		cacheKey,
		async () => {
			const skill = await fastify.prisma.skill.findUnique({
				where: { id: params.id },
				include: {
					_count: {
						select: { users: true, tasks: true },
					},
				},
			});

			return skill;
		},
		{ prefix: CACHE_PREFIX, ttl: CACHE_TTL },
	);
}

export async function createSkill(
	fastify: FastifyInstance,
	body: CreateSkillBody,
) {
	const skill = await fastify.prisma.skill.create({
		data: body,
	});

	// Invalidate skills list cache
	await fastify.cache.invalidate(`${CACHE_PREFIX}:list:*`);

	return skill;
}

export async function updateSkill(
	fastify: FastifyInstance,
	params: IdParams,
	body: UpdateSkillBody,
) {
	const skill = await fastify.prisma.skill.update({
		where: { id: params.id },
		data: body,
	});

	// Invalidate both list and item cache
	await Promise.all([
		fastify.cache.invalidate(`${CACHE_PREFIX}:list:*`),
		fastify.cache.del(`${CACHE_PREFIX}:item:${params.id}`),
	]);

	return skill;
}

export async function deleteSkill(fastify: FastifyInstance, params: IdParams) {
	await fastify.prisma.skill.delete({
		where: { id: params.id },
	});

	// Invalidate both list and item cache
	await Promise.all([
		fastify.cache.invalidate(`${CACHE_PREFIX}:list:*`),
		fastify.cache.del(`${CACHE_PREFIX}:item:${params.id}`),
	]);
}
