import type {
	CategoryApiResponse,
	GetCategoriesQuery,
	GetTasksQuery,
	PaginatedResponse,
	TaskApiResponse,
	UserApiResponse,
} from "@ajil-go/contract";
import { cookies } from "next/headers";

// For server-side requests (SSR), use internal K8s service URL if available
// This avoids DNS resolution issues when making requests from within the cluster
const API_URL =
	process.env.INTERNAL_API_URL ||
	process.env.NEXT_PUBLIC_SERVER_URL ||
	"http://localhost:3001";

// ============================================
// Server-side API fetch with cookie forwarding
// ============================================

async function serverFetch<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const cookieStore = await cookies();
	const cookieHeader = cookieStore.toString();

	const url = `${API_URL}/api${endpoint}`;

	const response = await fetch(url, {
		...options,
		headers: {
			"Content-Type": "application/json",
			Cookie: cookieHeader,
			...options.headers,
		},
		cache: "no-store", // SSR - always fresh data
	});

	if (!response.ok) {
		if (response.status === 401) {
			return null as T;
		}
		throw new Error(`API Error: ${response.status}`);
	}

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
// Server-side API Functions
// ============================================

export const serverApi = {
	// Users
	getMe: () => serverFetch<UserApiResponse | null>("/users/me"),

	getUser: (id: string) => serverFetch<UserApiResponse>(`/users/${id}`),

	// Tasks
	getTasks: (query: Partial<GetTasksQuery> = {}) =>
		serverFetch<PaginatedResponse<TaskApiResponse>>(
			`/tasks${buildQueryString(query)}`,
		),

	getTask: (id: string) => serverFetch<TaskApiResponse>(`/tasks/${id}`),

	// Categories
	getCategories: (query: Partial<GetCategoriesQuery> = {}) =>
		serverFetch<PaginatedResponse<CategoryApiResponse>>(
			`/categories${buildQueryString(query)}`,
		),
};
