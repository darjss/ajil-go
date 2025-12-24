import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TaskDetailLoading() {
	return (
		<div className="min-h-screen bg-background py-8">
			<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
				{/* Back Button */}
				<Skeleton className="mb-6 h-9 w-32 rounded-none" />

				{/* Main Content */}
				<div className="grid gap-8 lg:grid-cols-3">
					{/* Task Details */}
					<div className="lg:col-span-2">
						<Card className="rounded-none">
							<CardHeader className="space-y-4">
								{/* Category Badge */}
								<Skeleton className="h-6 w-24 rounded-none" />
								{/* Title */}
								<Skeleton className="h-8 w-3/4 rounded-none" />
								{/* Meta Info */}
								<div className="flex gap-4">
									<Skeleton className="h-5 w-24 rounded-none" />
									<Skeleton className="h-5 w-20 rounded-none" />
									<Skeleton className="h-5 w-28 rounded-none" />
								</div>
							</CardHeader>
							<CardContent className="space-y-6">
								{/* Description */}
								<div className="space-y-2">
									<Skeleton className="h-4 w-full rounded-none" />
									<Skeleton className="h-4 w-full rounded-none" />
									<Skeleton className="h-4 w-3/4 rounded-none" />
									<Skeleton className="h-4 w-5/6 rounded-none" />
								</div>

								{/* Budget & Location */}
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Skeleton className="h-4 w-16 rounded-none" />
										<Skeleton className="h-6 w-32 rounded-none" />
									</div>
									<div className="space-y-2">
										<Skeleton className="h-4 w-16 rounded-none" />
										<Skeleton className="h-6 w-28 rounded-none" />
									</div>
								</div>

								{/* Skills */}
								<div className="space-y-2">
									<Skeleton className="h-4 w-20 rounded-none" />
									<div className="flex gap-2">
										<Skeleton className="h-6 w-16 rounded-none" />
										<Skeleton className="h-6 w-20 rounded-none" />
										<Skeleton className="h-6 w-14 rounded-none" />
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Sidebar */}
					<div className="space-y-6">
						{/* Poster Card */}
						<Card className="rounded-none">
							<CardHeader>
								<Skeleton className="h-5 w-24 rounded-none" />
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center gap-3">
									<Skeleton className="h-12 w-12 rounded-full" />
									<div className="space-y-2">
										<Skeleton className="h-5 w-28 rounded-none" />
										<Skeleton className="h-4 w-20 rounded-none" />
									</div>
								</div>
							</CardContent>
						</Card>

						{/* Bid Form Card */}
						<Card className="rounded-none">
							<CardHeader>
								<Skeleton className="h-5 w-32 rounded-none" />
							</CardHeader>
							<CardContent className="space-y-4">
								<Skeleton className="h-10 w-full rounded-none" />
								<Skeleton className="h-10 w-full rounded-none" />
								<Skeleton className="h-24 w-full rounded-none" />
								<Skeleton className="h-10 w-full rounded-none" />
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
