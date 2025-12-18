import type { BidApiResponse, GetBidsQuery } from "@ajil-go/contract";
import { queryOptions } from "@tanstack/react-query";

import { bidsApi } from "../api";

export const bidKeys = {
	all: ["bids"] as const,
	lists: () => [...bidKeys.all, "list"] as const,
	list: (filters: Partial<GetBidsQuery>) =>
		[...bidKeys.lists(), filters] as const,
	details: () => [...bidKeys.all, "detail"] as const,
	detail: (id: string) => [...bidKeys.details(), id] as const,
};

export const bidQueries = {
	list: (filters: Partial<GetBidsQuery> = {}) =>
		queryOptions({
			queryKey: bidKeys.list(filters),
			queryFn: () => bidsApi.list(filters),
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: bidKeys.detail(id),
			queryFn: () => bidsApi.get(id),
			enabled: !!id,
		}),

	byTask: (taskId: string) =>
		queryOptions({
			queryKey: bidKeys.list({ taskId }),
			queryFn: () => bidsApi.list({ taskId }),
			enabled: !!taskId,
		}),

	byBidder: (bidderId: string) =>
		queryOptions({
			queryKey: bidKeys.list({ bidderId }),
			queryFn: () => bidsApi.list({ bidderId }),
			enabled: !!bidderId,
		}),
};

// Re-export types for convenience
export type { BidApiResponse, GetBidsQuery };
