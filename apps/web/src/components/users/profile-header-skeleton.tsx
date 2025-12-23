import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
	return (
		<div className="relative overflow-hidden rounded-none bg-primary p-8 shadow-xl">
			<div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
				<Skeleton className="h-28 w-28 rounded-none bg-primary-foreground/20" />
				<div className="flex-1 space-y-3 text-center sm:text-left">
					<Skeleton className="mx-auto h-8 w-48 bg-primary-foreground/20 sm:mx-0" />
					<Skeleton className="mx-auto h-4 w-32 bg-primary-foreground/20 sm:mx-0" />
					<div className="flex flex-wrap justify-center gap-4 sm:justify-start">
						<Skeleton className="h-6 w-24 bg-primary-foreground/20" />
						<Skeleton className="h-6 w-24 bg-primary-foreground/20" />
					</div>
				</div>
			</div>
		</div>
	);
}
