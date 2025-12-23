import type { ReviewApiResponse } from "@ajil-go/contract";
import { Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ReviewCard } from "./review-card";
import { ReviewCardSkeleton } from "./review-card-skeleton";

interface ReviewsSectionProps {
	reviews: ReviewApiResponse[];
	isLoading?: boolean;
	showReviewType?: boolean;
	emptyMessage?: string;
	emptyDescription?: string;
}

export function ReviewsSection({
	reviews,
	isLoading = false,
	showReviewType = false,
	emptyMessage = "Үнэлгээ байхгүй байна",
	emptyDescription = "Энэ хэрэглэгч одоогоор үнэлгээ аваагүй байна",
}: ReviewsSectionProps) {
	return (
		<Card className="border-border">
			<CardHeader className="pb-4">
				<CardTitle className="flex items-center gap-2 font-display text-lg text-foreground">
					<Star className="h-5 w-5 text-accent-foreground" />
					Үнэлгээнүүд
					{reviews.length > 0 && (
						<span className="rounded-none bg-muted px-2 py-0.5 font-mono font-normal text-muted-foreground text-sm">
							{reviews.length}
						</span>
					)}
				</CardTitle>
			</CardHeader>
			<CardContent>
				{isLoading ? (
					<ReviewsLoadingSkeleton />
				) : reviews.length > 0 ? (
					<div className="space-y-4">
						{reviews.map((review) => (
							<ReviewCard
								key={review.id}
								review={review}
								showReviewType={showReviewType}
							/>
						))}
					</div>
				) : (
					<ReviewsEmptyState
						message={emptyMessage}
						description={emptyDescription}
					/>
				)}
			</CardContent>
		</Card>
	);
}

function ReviewsLoadingSkeleton() {
	return (
		<div className="space-y-4">
			{Array.from({ length: 3 }).map((_, i) => (
				<ReviewCardSkeleton key={`review-skeleton-${i.toString()}`} />
			))}
		</div>
	);
}

interface ReviewsEmptyStateProps {
	message: string;
	description: string;
}

function ReviewsEmptyState({ message, description }: ReviewsEmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-12 text-center">
			<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-accent">
				<Star className="h-8 w-8 text-accent-foreground" />
			</div>
			<h3 className="font-display text-foreground">{message}</h3>
			<p className="mt-1 text-muted-foreground text-sm">{description}</p>
		</div>
	);
}
