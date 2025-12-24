import {
	createSearchParamsCache,
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
} from "nuqs/server";

// Define parsers for all filter parameters
export const taskSearchParams = {
	search: parseAsString,
	categoryId: parseAsString,
	isRemote: parseAsBoolean,
	minBudget: parseAsInteger,
	maxBudget: parseAsInteger,
	city: parseAsString,
	page: parseAsInteger.withDefault(1),
};

// Create a server-side cache for parsing search params
export const searchParamsCache = createSearchParamsCache(taskSearchParams);
