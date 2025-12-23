import type { GetMessagesQuery, MessageApiResponse } from "@ajil-go/contract";
import { queryOptions } from "@tanstack/react-query";

import { messagesApi } from "../api";

export const messageKeys = {
	all: ["messages"] as const,
	lists: () => [...messageKeys.all, "list"] as const,
	list: (filters: Partial<GetMessagesQuery>) =>
		[...messageKeys.lists(), filters] as const,
	details: () => [...messageKeys.all, "detail"] as const,
	detail: (id: string) => [...messageKeys.details(), id] as const,
	conversations: () => [...messageKeys.all, "conversations"] as const,
};

export const messageQueries = {
	list: (filters: Partial<GetMessagesQuery> = {}) =>
		queryOptions({
			queryKey: messageKeys.list(filters),
			queryFn: () => messagesApi.list(filters),
		}),

	detail: (id: string) =>
		queryOptions({
			queryKey: messageKeys.detail(id),
			queryFn: () => messagesApi.get(id),
			enabled: !!id,
		}),

	byTask: (taskId: string) =>
		queryOptions({
			queryKey: messageKeys.list({ taskId }),
			queryFn: () => messagesApi.list({ taskId, limit: 100 }),
			enabled: !!taskId,
		}),

	bySender: (senderId: string) =>
		queryOptions({
			queryKey: messageKeys.list({ senderId }),
			queryFn: () => messagesApi.list({ senderId }),
			enabled: !!senderId,
		}),
};

export type { GetMessagesQuery, MessageApiResponse };
