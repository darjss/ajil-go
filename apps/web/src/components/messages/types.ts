import type { MessageApiResponse, TaskApiResponse } from "@ajil-go/contract";

export interface Conversation {
	taskId: string;
	task: TaskApiResponse;
	messages: MessageApiResponse[];
	lastMessage: MessageApiResponse | null;
	unreadCount: number;
	otherUser: {
		id: string;
		name: string;
		image: string | null;
	} | null;
}

export type MessagesPageUserType = "worker" | "client";

export interface MessagesPageConfig {
	headerSubtitle: string;
	defaultOtherUserLabel: string;
}

export const MESSAGES_PAGE_CONFIG: Record<
	MessagesPageUserType,
	MessagesPageConfig
> = {
	worker: {
		headerSubtitle: "Захиалагчидтай харилцаа",
		defaultOtherUserLabel: "Захиалагч",
	},
	client: {
		headerSubtitle: "Даалгавартай холбоотой харилцаа",
		defaultOtherUserLabel: "Хэрэглэгч",
	},
};
