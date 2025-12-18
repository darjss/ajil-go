import type {
	CreateSkillBody,
	GetSkillsQuery,
	IdParams,
	UpdateSkillBody,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";

export async function getSkills(
	fastify: FastifyInstance,
	query: GetSkillsQuery,
) {
	const { page, limit, search } = query;
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
}

export async function getSkillById(fastify: FastifyInstance, params: IdParams) {
	const skill = await fastify.prisma.skill.findUnique({
		where: { id: params.id },
		include: {
			_count: {
				select: { users: true, tasks: true },
			},
		},
	});

	return skill;
}

export async function createSkill(
	fastify: FastifyInstance,
	body: CreateSkillBody,
) {
	const skill = await fastify.prisma.skill.create({
		data: body,
	});

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

	return skill;
}

export async function deleteSkill(fastify: FastifyInstance, params: IdParams) {
	await fastify.prisma.skill.delete({
		where: { id: params.id },
	});
}
