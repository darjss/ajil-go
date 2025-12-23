import type {
	CategoryApiResponse,
	GetCategoriesQuery,
} from "@ajil-go/contract";
import { queryOptions } from "@tanstack/react-query";

import { categoriesApi } from "../api";

export const categoryKeys = {
	all: ["categories"] as const,
	lists: () => [...categoryKeys.all, "list"] as const,
	list: (filters: Partial<GetCategoriesQuery>) =>
		[...categoryKeys.lists(), filters] as const,
	details: () => [...categoryKeys.all, "detail"] as const,
	detail: (id: string) => [...categoryKeys.details(), id] as const,
};

export const categoryQueries = {
	list: (filters: Partial<GetCategoriesQuery> = {}) =>
		queryOptions({
			queryKey: categoryKeys.list(filters),
			queryFn: () => categoriesApi.list(filters),
			staleTime: 1000 * 60 * 5, // 5 minutes - categories don't change often
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: categoryKeys.detail(id),
			queryFn: () => categoriesApi.get(id),
			enabled: !!id,
		}),
};

// Re-export types for convenience
export type { CategoryApiResponse, GetCategoriesQuery };
