import { TaskCardSkeleton } from "@/components/tasks";
import { Skeleton } from "@/components/ui/skeleton";

export default function TasksLoading() {
	return (
		<div className="min-h-screen bg-background">
			{/* Header Section */}
			<div className="border-border border-b bg-card">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="text-center">
						<Skeleton className="mx-auto h-10 w-64 rounded-none" />
						<Skeleton className="mx-auto mt-2 h-5 w-96 rounded-none" />
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-8 lg:flex-row">
					{/* Filters Sidebar Skeleton */}
					<aside className="w-full shrink-0 lg:w-72">
						<div className="space-y-6 rounded-none border border-border bg-card p-6">
							<Skeleton className="h-6 w-24 rounded-none" />
							<Skeleton className="h-10 w-full rounded-none" />
							<Skeleton className="h-10 w-full rounded-none" />
							<Skeleton className="h-10 w-full rounded-none" />
							<div className="flex gap-2">
								<Skeleton className="h-10 flex-1 rounded-none" />
								<Skeleton className="h-10 flex-1 rounded-none" />
							</div>
							<Skeleton className="h-10 w-full rounded-none" />
						</div>
					</aside>

					{/* Tasks Grid Skeleton */}
					<main className="flex-1">
						<div className="mb-6 flex items-center justify-between">
							<Skeleton className="h-5 w-32 rounded-none" />
							<Skeleton className="h-9 w-24 rounded-none" />
						</div>
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
							<TaskCardSkeleton />
							<TaskCardSkeleton />
							<TaskCardSkeleton />
							<TaskCardSkeleton />
							<TaskCardSkeleton />
							<TaskCardSkeleton />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}
