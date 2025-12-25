import { TaskCardCompactSkeleton } from "@/components/tasks";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientTasksLoading() {
	return (
		<div className="p-6 lg:p-8">
			{/* Header */}
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<Skeleton className="h-8 w-48 rounded-none" />
					<Skeleton className="mt-2 h-5 w-56 rounded-none" />
				</div>
				<Skeleton className="h-10 w-40 rounded-none" />
			</div>

			{/* Tabs */}
			<div className="mb-6">
				<Skeleton className="h-10 w-full max-w-lg rounded-none" />
			</div>

			{/* Tasks Grid */}
			<div className="grid gap-4 md:grid-cols-2">
				<TaskCardCompactSkeleton />
				<TaskCardCompactSkeleton />
				<TaskCardCompactSkeleton />
				<TaskCardCompactSkeleton />
			</div>
		</div>
	);
}
