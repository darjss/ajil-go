import type { GetTasksQuery, TaskApiResponse } from "@ajil-go/contract";
import { queryOptions } from "@tanstack/react-query";

import { tasksApi } from "../api";

export const taskKeys = {
	all: ["tasks"] as const,
	lists: () => [...taskKeys.all, "list"] as const,
	list: (filters: Partial<GetTasksQuery>) =>
		[...taskKeys.lists(), filters] as const,
	details: () => [...taskKeys.all, "detail"] as const,
	detail: (id: string) => [...taskKeys.details(), id] as const,
};

export const taskQueries = {
	list: (filters: Partial<GetTasksQuery> = {}) =>
		queryOptions({
			queryKey: taskKeys.list(filters),
			queryFn: () => tasksApi.list(filters),
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: taskKeys.detail(id),
			queryFn: () => tasksApi.get(id),
			enabled: !!id,
		}),
};

// Re-export types for convenience
export type { TaskApiResponse, GetTasksQuery };
