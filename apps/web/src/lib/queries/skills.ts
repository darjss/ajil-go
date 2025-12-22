import type { GetSkillsQuery, SkillApiResponse } from "@ajil-go/contract";
import { queryOptions } from "@tanstack/react-query";

import { skillsApi } from "../api";

export const skillKeys = {
	all: ["skills"] as const,
	lists: () => [...skillKeys.all, "list"] as const,
	list: (filters: Partial<GetSkillsQuery>) =>
		[...skillKeys.lists(), filters] as const,
	details: () => [...skillKeys.all, "detail"] as const,
	detail: (id: string) => [...skillKeys.details(), id] as const,
};

export const skillQueries = {
	list: (filters: Partial<GetSkillsQuery> = {}) =>
		queryOptions({
			queryKey: skillKeys.list(filters),
			queryFn: () => skillsApi.list(filters),
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: skillKeys.detail(id),
			queryFn: () => skillsApi.get(id),
			enabled: !!id,
		}),
};

// Re-export types for convenience
export type { GetSkillsQuery, SkillApiResponse };
