import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TaskCardSkeleton() {
	return (
		<Card className="border-border bg-card">
			<CardContent className="p-6">
				<div className="mb-4 flex gap-2">
					<Skeleton className="h-5 w-20 rounded-none" />
					<Skeleton className="h-5 w-16 rounded-none" />
				</div>
				<Skeleton className="mb-2 h-6 w-3/4 rounded-none" />
				<Skeleton className="mb-4 h-4 w-full rounded-none" />
				<Skeleton className="mb-4 h-4 w-2/3 rounded-none" />
				<Skeleton className="mb-4 h-14 w-full rounded-none" />
				<div className="flex items-center justify-between border-border border-t pt-4">
					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-8 rounded-none" />
						<div>
							<Skeleton className="mb-1 h-4 w-20 rounded-none" />
							<Skeleton className="h-3 w-16 rounded-none" />
						</div>
					</div>
					<Skeleton className="h-9 w-28 rounded-none" />
				</div>
			</CardContent>
		</Card>
	);
}

export function TaskCardCompactSkeleton() {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-0">
				<div className="p-5">
					<div className="mb-3 flex gap-2">
						<Skeleton className="h-5 w-20 rounded-none" />
						<Skeleton className="h-5 w-16 rounded-none" />
					</div>
					<Skeleton className="mb-2 h-6 w-3/4 rounded-none" />
					<Skeleton className="mb-4 h-4 w-full rounded-none" />
					<Skeleton className="h-4 w-1/2 rounded-none" />
				</div>
				<div className="border-border border-t bg-muted px-5 py-3">
					<div className="flex items-center justify-between">
						<Skeleton className="h-4 w-32 rounded-none" />
						<Skeleton className="h-7 w-20 rounded-none" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
