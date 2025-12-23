import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsCardSkeleton() {
	return (
		<Card className="border-border">
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<Skeleton className="h-4 w-24 rounded-none" />
						<Skeleton className="h-8 w-16 rounded-none" />
					</div>
					<Skeleton className="h-12 w-12 rounded-none" />
				</div>
			</CardContent>
		</Card>
	);
}
