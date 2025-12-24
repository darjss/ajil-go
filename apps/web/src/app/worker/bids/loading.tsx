import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function BidCardSkeleton() {
	return (
		<Card className="border-border">
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<Skeleton className="h-12 w-12 shrink-0 rounded-none" />
					<div className="flex-1 space-y-3">
						<Skeleton className="h-5 w-3/4 rounded-none" />
						<Skeleton className="h-4 w-1/2 rounded-none" />
						<div className="flex gap-4">
							<Skeleton className="h-4 w-24 rounded-none" />
							<Skeleton className="h-4 w-24 rounded-none" />
						</div>
					</div>
					<Skeleton className="h-6 w-24 rounded-sm" />
				</div>
			</CardContent>
		</Card>
	);
}

export default function WorkerBidsLoading() {
	return (
		<div className="min-h-screen p-6 lg:p-8">
			<div className="mx-auto max-w-4xl space-y-6">
				{/* Header */}
				<header>
					<Skeleton className="h-8 w-40 rounded-none" />
					<Skeleton className="mt-2 h-5 w-72 rounded-none" />
				</header>

				{/* Tabs */}
				<Skeleton className="h-10 w-full max-w-lg rounded-none" />

				{/* Bids List */}
				<div className="space-y-4">
					<BidCardSkeleton />
					<BidCardSkeleton />
					<BidCardSkeleton />
					<BidCardSkeleton />
					<BidCardSkeleton />
				</div>
			</div>
		</div>
	);
}
