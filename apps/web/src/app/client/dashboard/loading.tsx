import { StatCardSkeleton } from "@/components/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClientDashboardLoading() {
	return (
		<div className="p-6 lg:p-8">
			{/* Page Header */}
			<div className="mb-8">
				<Skeleton className="h-8 w-64 rounded-none" />
				<Skeleton className="mt-2 h-5 w-48 rounded-none" />
			</div>

			<div className="space-y-8">
				{/* Stats Grid */}
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<StatCardSkeleton />
					<StatCardSkeleton />
					<StatCardSkeleton />
					<StatCardSkeleton />
				</div>

				{/* Content Grid */}
				<div className="grid gap-6 lg:grid-cols-3">
					{/* Recent Tasks Card */}
					<Card className="rounded-none lg:col-span-2">
						<CardHeader className="flex flex-row items-center justify-between">
							<Skeleton className="h-6 w-40 rounded-none" />
							<Skeleton className="h-8 w-28 rounded-none" />
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<div
										key={`task-skeleton-${i.toString()}`}
										className="flex items-center gap-4 rounded-none border border-border bg-card p-4"
									>
										<div className="min-w-0 flex-1">
											<Skeleton className="h-5 w-3/4 rounded-none" />
											<div className="mt-2 flex items-center gap-3">
												<Skeleton className="h-4 w-24 rounded-none" />
												<Skeleton className="h-4 w-20 rounded-none" />
											</div>
										</div>
										<div className="flex items-center gap-3">
											<Skeleton className="h-8 w-20 rounded-none" />
											<Skeleton className="h-6 w-16 rounded-none" />
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Quick Actions Card */}
					<Card className="rounded-none">
						<CardHeader>
							<Skeleton className="h-6 w-32 rounded-none" />
						</CardHeader>
						<CardContent className="space-y-3">
							<Skeleton className="h-12 w-full rounded-none" />
							<Skeleton className="h-12 w-full rounded-none" />
							<Skeleton className="h-12 w-full rounded-none" />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
