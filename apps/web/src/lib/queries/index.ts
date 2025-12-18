// Re-export types from contract
export type {
	BidApiResponse,
	BidStatus,
	CategoryApiResponse,
	GetBidsQuery,
	GetCategoriesQuery,
	GetTasksQuery,
	GetUsersQuery,
	PaginatedResponse,
	TaskApiResponse,
	TaskStatus,
	UserApiResponse,
} from "@ajil-go/contract";

// Query options exports
export { bidKeys, bidQueries } from "./bids";
export { categoryKeys, categoryQueries } from "./categories";
export { taskKeys, taskQueries } from "./tasks";
export { userKeys, userQueries } from "./users";
