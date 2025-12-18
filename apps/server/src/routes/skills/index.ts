import {
	type CreateSkillBody,
	CreateSkillBodySchema,
	type GetSkillsQuery,
	GetSkillsQuerySchema,
	type IdParams,
	IdParamsSchema,
	type UpdateSkillBody,
	UpdateSkillBodySchema,
} from "@ajil-go/contract";
import type { FastifyInstance } from "fastify";
import * as handlers from "./handlers.js";

export default async function skillsRoutes(fastify: FastifyInstance) {
	// GET /api/skills - List all skills
	fastify.get<{ Querystring: GetSkillsQuery }>(
		"/",
		{
			schema: {
				querystring: GetSkillsQuerySchema,
			},
		},
		async (request) => {
			return handlers.getSkills(fastify, request.query);
		},
	);

	// GET /api/skills/:id - Get skill by ID
	fastify.get<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			const skill = await handlers.getSkillById(fastify, request.params);
			if (!skill) {
				return reply
					.status(404)
					.send({ error: "Skill not found", code: "SKILL_NOT_FOUND" });
			}
			return skill;
		},
	);

	// POST /api/skills - Create new skill
	fastify.post<{ Body: CreateSkillBody }>(
		"/",
		{
			schema: {
				body: CreateSkillBodySchema,
			},
		},
		async (request, reply) => {
			try {
				const skill = await handlers.createSkill(fastify, request.body);
				return reply.status(201).send(skill);
			} catch (error: unknown) {
				if (
					error &&
					typeof error === "object" &&
					"code" in error &&
					error.code === "P2002"
				) {
					return reply.status(409).send({
						error: "Skill with this name already exists",
						code: "SKILL_EXISTS",
					});
				}
				throw error;
			}
		},
	);

	// PATCH /api/skills/:id - Update skill
	fastify.patch<{ Params: IdParams; Body: UpdateSkillBody }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
				body: UpdateSkillBodySchema,
			},
		},
		async (request, reply) => {
			try {
				return await handlers.updateSkill(
					fastify,
					request.params,
					request.body,
				);
			} catch {
				return reply
					.status(404)
					.send({ error: "Skill not found", code: "SKILL_NOT_FOUND" });
			}
		},
	);

	// DELETE /api/skills/:id - Delete skill
	fastify.delete<{ Params: IdParams }>(
		"/:id",
		{
			schema: {
				params: IdParamsSchema,
			},
		},
		async (request, reply) => {
			try {
				await handlers.deleteSkill(fastify, request.params);
				return reply.status(204).send();
			} catch {
				return reply
					.status(404)
					.send({ error: "Skill not found", code: "SKILL_NOT_FOUND" });
			}
		},
	);
}
