import type {
	BidApiResponse,
	CategoryApiResponse,
	ConversationApiResponse,
	CreateBidBody,
	CreateMessageBody,
	CreateReviewBody,
	CreateTaskBody,
	GetBidsQuery,
	GetCategoriesQuery,
	GetConversationsQuery,
	GetMessagesQuery,
	GetReviewsQuery,
	GetSkillsQuery,
	GetTasksQuery,
	GetUsersQuery,
	MessageApiResponse,
	PaginatedResponse,
	ReviewApiResponse,
	SkillApiResponse,
	StartConversationBody,
	TaskApiResponse,
	TogglePinBody,
	UpdateBidBody,
	UpdateTaskBody,
	UpdateUserBody,
	UserApiResponse,
} from "@ajil-go/contract";

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001";

// ============================================
// Error Type
// ============================================

export interface ApiError {
	error: string;
	code: string;
	details?: unknown;
}

// ============================================
// Base Fetch Wrapper
// ============================================

async function apiFetch<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const url = `${API_URL}/api${endpoint}`;

	const response = await fetch(url, {
		...options,
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
	});

	if (!response.ok) {
		const error = (await response.json().catch(() => ({
			error: "Unknown error",
			code: "UNKNOWN",
		}))) as ApiError;
		throw new Error(error.error || `HTTP ${response.status}`);
	}

	// Handle 204 No Content
	if (response.status === 204) {
		return undefined as T;
	}

	return response.json() as Promise<T>;
}

function buildQueryString(params: Record<string, unknown>): string {
	const searchParams = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== "") {
			searchParams.append(key, String(value));
		}
	}
	const qs = searchParams.toString();
	return qs ? `?${qs}` : "";
}

// ============================================
// API Functions
// ============================================

// Tasks
export const tasksApi = {
	list: (query: Partial<GetTasksQuery> = {}) =>
		apiFetch<PaginatedResponse<TaskApiResponse>>(
			`/tasks${buildQueryString(query)}`,
		),

	get: (id: string) => apiFetch<TaskApiResponse>(`/tasks/${id}`),

	create: (body: CreateTaskBody) =>
		apiFetch<TaskApiResponse>("/tasks", {
			method: "POST",
			body: JSON.stringify(body),
		}),

	update: (id: string, body: UpdateTaskBody) =>
		apiFetch<TaskApiResponse>(`/tasks/${id}`, {
			method: "PATCH",
			body: JSON.stringify(body),
		}),

	delete: (id: string) => apiFetch<void>(`/tasks/${id}`, { method: "DELETE" }),
};

// Bids
export const bidsApi = {
	list: (query: Partial<GetBidsQuery> = {}) =>
		apiFetch<PaginatedResponse<BidApiResponse>>(
			`/tasks/bids${buildQueryString(query)}`,
		),

	get: (id: string) => apiFetch<BidApiResponse>(`/tasks/bids/${id}`),

	create: (body: CreateBidBody) =>
		apiFetch<BidApiResponse>("/tasks/bids", {
			method: "POST",
			body: JSON.stringify(body),
		}),

	update: (id: string, body: UpdateBidBody) =>
		apiFetch<BidApiResponse>(`/tasks/bids/${id}`, {
			method: "PATCH",
			body: JSON.stringify(body),
		}),

	delete: (id: string) =>
		apiFetch<void>(`/tasks/bids/${id}`, { method: "DELETE" }),
};

// Categories
export const categoriesApi = {
	list: (query: Partial<GetCategoriesQuery> = {}) =>
		apiFetch<PaginatedResponse<CategoryApiResponse>>(
			`/categories${buildQueryString(query)}`,
		),

	get: (id: string) => apiFetch<CategoryApiResponse>(`/categories/${id}`),
};

// Skills
export const skillsApi = {
	list: (query: Partial<GetSkillsQuery> = {}) =>
		apiFetch<PaginatedResponse<SkillApiResponse>>(
			`/skills${buildQueryString(query)}`,
		),

	get: (id: string) => apiFetch<SkillApiResponse>(`/skills/${id}`),
};

// Users
export const usersApi = {
	list: (query: Partial<GetUsersQuery> = {}) =>
		apiFetch<PaginatedResponse<UserApiResponse>>(
			`/users${buildQueryString(query)}`,
		),

	get: (id: string) => apiFetch<UserApiResponse>(`/users/${id}`),

	me: () => apiFetch<UserApiResponse>("/users/me"),

	update: (id: string, body: UpdateUserBody) =>
		apiFetch<UserApiResponse>(`/users/${id}`, {
			method: "PATCH",
			body: JSON.stringify(body),
		}),

	delete: (id: string) => apiFetch<void>(`/users/${id}`, { method: "DELETE" }),
};

// Conversations
export const conversationsApi = {
	list: (query: Partial<GetConversationsQuery> = {}) =>
		apiFetch<PaginatedResponse<ConversationApiResponse>>(
			`/conversations${buildQueryString(query)}`,
		),

	get: (id: string) =>
		apiFetch<ConversationApiResponse>(`/conversations/${id}`),

	start: (body: StartConversationBody) =>
		apiFetch<ConversationApiResponse>("/conversations", {
			method: "POST",
			body: JSON.stringify(body),
		}),

	togglePin: (body: TogglePinBody) =>
		apiFetch<ConversationApiResponse>("/conversations/pin", {
			method: "POST",
			body: JSON.stringify(body),
		}),

	getByTask: (taskId: string, recipientId: string) =>
		apiFetch<ConversationApiResponse>(
			`/conversations/by-task/${taskId}/${recipientId}`,
		),
};

// Messages
export const messagesApi = {
	list: (query: Partial<GetMessagesQuery> = {}) =>
		apiFetch<PaginatedResponse<MessageApiResponse>>(
			`/messages${buildQueryString(query)}`,
		),

	get: (id: string) => apiFetch<MessageApiResponse>(`/messages/${id}`),

	create: (body: CreateMessageBody) =>
		apiFetch<MessageApiResponse>("/messages", {
			method: "POST",
			body: JSON.stringify(body),
		}),

	markRead: (messageIds: string[]) =>
		apiFetch<{ updated: number }>("/messages/read", {
			method: "POST",
			body: JSON.stringify({ messageIds }),
		}),
};

// Reviews
export const reviewsApi = {
	list: (query: Partial<GetReviewsQuery> = {}) =>
		apiFetch<PaginatedResponse<ReviewApiResponse>>(
			`/reviews${buildQueryString(query)}`,
		),

	get: (id: string) => apiFetch<ReviewApiResponse>(`/reviews/${id}`),

	create: (body: CreateReviewBody) =>
		apiFetch<ReviewApiResponse>("/reviews", {
			method: "POST",
			body: JSON.stringify(body),
		}),
};
