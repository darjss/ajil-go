import { Skeleton } from "@/components/ui/skeleton";

export function FormFieldSkeleton() {
	return (
		<div className="space-y-2">
			<Skeleton className="h-4 w-20" />
			<Skeleton className="h-9 w-full" />
		</div>
	);
}
