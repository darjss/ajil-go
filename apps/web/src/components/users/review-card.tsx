import type { ReviewApiResponse, ReviewType } from "@ajil-go/contract";

import { StarRating } from "@/components/star-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

import { getUserInitials, REVIEW_TYPE_LABELS } from "./types";

interface ReviewCardProps {
	review: ReviewApiResponse;
	showReviewType?: boolean;
}

export function ReviewCard({
	review,
	showReviewType = false,
}: ReviewCardProps) {
	const authorInitials = getUserInitials(review.author?.name);

	return (
		<div className="rounded-none border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm">
			<div className="flex items-start gap-3">
				<Avatar className="h-10 w-10">
					<AvatarImage
						src={review.author?.image || undefined}
						alt={review.author?.name}
					/>
					<AvatarFallback className="bg-primary font-medium text-primary-foreground text-sm">
						{authorInitials}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1">
					<div className="flex flex-wrap items-center gap-2">
						<span className="font-medium text-foreground">
							{review.author?.name || "Нэргүй"}
						</span>
						<StarRating rating={review.rating} size="sm" />
						{showReviewType && <ReviewTypeBadge type={review.type} />}
					</div>
					<p className="mt-0.5 font-mono text-muted-foreground text-xs">
						{formatDate(review.createdAt)}
					</p>
					{review.comment && (
						<p className="mt-2 text-muted-foreground text-sm leading-relaxed">
							{review.comment}
						</p>
					)}
					{review.task && (
						<p className="mt-2 font-mono text-muted-foreground text-xs">
							Даалгавар: {review.task.title}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

function ReviewTypeBadge({ type }: { type: ReviewType }) {
	const isClientToWorker = type === "CLIENT_TO_WORKER";
	return (
		<Badge
			variant="outline"
			className={
				isClientToWorker
					? "border-primary/30 bg-primary/5 text-primary"
					: "border-secondary bg-secondary text-secondary-foreground"
			}
		>
			{REVIEW_TYPE_LABELS[type]}
		</Badge>
	);
}
