import type { GetConversationsQuery } from "@ajil-go/contract";
import { conversationsApi } from "../api";

export const conversationKeys = {
	all: ["conversations"] as const,
	lists: () => [...conversationKeys.all, "list"] as const,
	list: (filters: Partial<GetConversationsQuery>) =>
		[...conversationKeys.lists(), filters] as const,
	details: () => [...conversationKeys.all, "detail"] as const,
	detail: (id: string) => [...conversationKeys.details(), id] as const,
};

export const conversationQueries = {
	list: (filters: Partial<GetConversationsQuery> = {}) => ({
		queryKey: conversationKeys.list(filters),
		queryFn: () => conversationsApi.list(filters),
	}),
	detail: (id: string) => ({
		queryKey: conversationKeys.detail(id),
		queryFn: () => conversationsApi.get(id),
	}),
};
