import type { GetUsersQuery, UserApiResponse } from "@ajil-go/contract";
import { queryOptions } from "@tanstack/react-query";

import { usersApi } from "../api";

export const userKeys = {
	all: ["users"] as const,
	lists: () => [...userKeys.all, "list"] as const,
	list: (filters: Partial<GetUsersQuery>) =>
		[...userKeys.lists(), filters] as const,
	details: () => [...userKeys.all, "detail"] as const,
	detail: (id: string) => [...userKeys.details(), id] as const,
	me: () => [...userKeys.all, "me"] as const,
};

export const userQueries = {
	list: (filters: Partial<GetUsersQuery> = {}) =>
		queryOptions({
			queryKey: userKeys.list(filters),
			queryFn: () => usersApi.list(filters),
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: userKeys.detail(id),
			queryFn: () => usersApi.get(id),
			enabled: !!id,
		}),

	me: () =>
		queryOptions({
			queryKey: userKeys.me(),
			queryFn: () => usersApi.me(),
			retry: false,
		}),
};

// Re-export types for convenience
export type { GetUsersQuery, UserApiResponse };
