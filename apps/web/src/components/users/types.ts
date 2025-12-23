import type {
	ReviewApiResponse,
	ReviewType,
	UserApiResponse,
} from "@ajil-go/contract";

export type { ReviewApiResponse, UserApiResponse };

export type UserSkillItem = NonNullable<UserApiResponse["skills"]>[number];

export interface ProfileStats {
	avgRatingAsWorker: number;
	avgRatingAsClient: number;
	completedTasksAsWorker: number;
}

export interface ReviewDisplayData {
	reviews: ReviewApiResponse[];
	isLoading?: boolean;
	showReviewType?: boolean;
	emptyMessage?: string;
	emptyDescription?: string;
}

export const REVIEW_TYPE_LABELS: Record<ReviewType, string> = {
	CLIENT_TO_WORKER: "Захиалагчаас",
	WORKER_TO_CLIENT: "Гүйцэтгэгчээс",
};

export function getUserInitials(name?: string | null): string {
	if (!name) return "??";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}
