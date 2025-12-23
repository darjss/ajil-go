import { Skeleton } from "@/components/ui/skeleton";

export function ReviewCardSkeleton() {
	return (
		<div className="rounded-none bg-muted p-4">
			<div className="flex items-start gap-3">
				<Skeleton className="h-10 w-10 rounded-none" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-32 rounded-none" />
					<Skeleton className="h-3 w-24 rounded-none" />
					<Skeleton className="mt-2 h-12 w-full rounded-none" />
				</div>
			</div>
		</div>
	);
}
