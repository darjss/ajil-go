import { StatCardSkeleton } from "@/components/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkerDashboardLoading() {
	return (
		<div className="min-h-screen p-6 lg:p-8">
			<div className="mx-auto max-w-6xl space-y-8">
				{/* Page Header */}
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="space-y-2">
						<Skeleton className="h-8 w-64 rounded-none" />
						<Skeleton className="h-5 w-48 rounded-none" />
					</div>
					<Skeleton className="h-10 w-36 rounded-none" />
				</div>

				{/* Stats Grid */}
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					<StatCardSkeleton />
					<StatCardSkeleton />
					<StatCardSkeleton />
					<StatCardSkeleton />
				</div>

				{/* Content Grid */}
				<div className="grid gap-6 lg:grid-cols-3">
					{/* Recent Bids Card */}
					<Card className="lg:col-span-2">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<Skeleton className="h-6 w-36 rounded-none" />
							<Skeleton className="h-5 w-24 rounded-none" />
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{Array.from({ length: 5 }).map((_, i) => (
									<div
										key={`bid-skeleton-${i.toString()}`}
										className="flex items-center gap-4 rounded-sm bg-muted/50 p-4"
									>
										<Skeleton className="h-10 w-10 rounded-lg" />
										<div className="flex-1 space-y-2">
											<Skeleton className="h-4 w-3/4 rounded-none" />
											<Skeleton className="h-3 w-1/2 rounded-none" />
										</div>
										<Skeleton className="h-6 w-20 rounded-sm" />
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Sidebar Cards */}
					<div className="space-y-6">
						{/* Income Card */}
						<Card>
							<CardHeader className="bg-primary pb-4">
								<Skeleton className="h-6 w-36 rounded-none bg-primary-foreground/20" />
							</CardHeader>
							<CardContent className="p-6">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<Skeleton className="h-4 w-28 rounded-none" />
										<Skeleton className="h-5 w-8 rounded-none" />
									</div>
									<Skeleton className="h-px w-full rounded-none" />
									<div className="flex items-center justify-between">
										<Skeleton className="h-4 w-24 rounded-none" />
										<Skeleton className="h-6 w-32 rounded-none" />
									</div>
								</div>
							</CardContent>
						</Card>

						{/* CTA Card */}
						<Card className="bg-primary/5">
							<CardContent className="p-6">
								<Skeleton className="mb-4 h-12 w-12 rounded-sm" />
								<Skeleton className="h-5 w-48 rounded-none" />
								<Skeleton className="mt-2 h-4 w-full rounded-none" />
								<Skeleton className="mt-1 h-4 w-3/4 rounded-none" />
								<Skeleton className="mt-4 h-10 w-full rounded-none" />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
