import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";

import { getQueryClient } from "@/lib/get-query-client";
import { categoryQueries, taskQueries } from "@/lib/queries";

import { searchParamsCache } from "./search-params";
import { TasksContent } from "./tasks-content";

type PageProps = {
	searchParams: Promise<SearchParams>;
};

export default async function TasksPage({ searchParams }: PageProps) {
	// Parse search params on the server
	const params = await searchParamsCache.parse(searchParams);

	const queryClient = getQueryClient();

	// Build query from parsed params
	const query = {
		status: "OPEN" as const,
		page: params.page,
		limit: 20,
		...(params.search && { search: params.search }),
		...(params.categoryId && { categoryId: params.categoryId }),
		...(params.isRemote !== null && { isRemote: params.isRemote }),
		...(params.minBudget && { minBudget: params.minBudget }),
		...(params.maxBudget && { maxBudget: params.maxBudget }),
		...(params.city && { city: params.city }),
	};

	// Prefetch data on the server in parallel
	await Promise.all([
		queryClient.prefetchQuery(taskQueries.list(query)),
		queryClient.prefetchQuery(categoryQueries.list()),
	]);

	return (
		<main className="min-h-screen bg-background">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<TasksContent />
			</HydrationBoundary>
		</main>
	);
}
