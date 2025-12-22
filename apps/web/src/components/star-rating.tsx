"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface StarRatingProps {
	rating: number;
	maxRating?: number;
	size?: "sm" | "md" | "lg";
	showValue?: boolean;
	className?: string;
}

const sizeMap = {
	sm: "h-3.5 w-3.5",
	md: "h-4 w-4",
	lg: "h-5 w-5",
};

export function StarRating({
	rating,
	maxRating = 5,
	size = "md",
	showValue = false,
	className,
}: StarRatingProps) {
	const fullStars = Math.floor(rating);
	const hasPartial = rating % 1 >= 0.5;

	return (
		<div className={cn("flex items-center gap-0.5", className)}>
			{Array.from({ length: maxRating }).map((_, i) => {
				const isFilled = i < fullStars || (i === fullStars && hasPartial);
				return (
					<Star
						key={`star-${i}`}
						className={cn(
							sizeMap[size],
							isFilled
								? "fill-warning text-warning"
								: "fill-transparent text-muted-foreground/30",
						)}
					/>
				);
			})}
			{showValue && (
				<span className="ml-1 text-sm font-medium text-foreground">
					{rating.toFixed(1)}
				</span>
			)}
		</div>
	);
}
