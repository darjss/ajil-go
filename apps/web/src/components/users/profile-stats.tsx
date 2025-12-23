import { Award, Briefcase, Star } from "lucide-react";

import { StarRating } from "@/components/star-rating";
import { Card, CardContent } from "@/components/ui/card";

import type { ProfileStats } from "./types";

interface ProfileStatsCardsProps {
	stats: ProfileStats;
}

export function ProfileStatsCards({ stats }: ProfileStatsCardsProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-3">
			<Card className="group overflow-hidden border-border transition-all hover:border-primary/30 hover:shadow-lg">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-muted-foreground text-sm">
								Гүйцэтгэгчийн үнэлгээ
							</p>
							<div className="mt-1 flex items-center gap-2">
								<p className="font-display text-2xl text-foreground">
									{stats.avgRatingAsWorker?.toFixed(1) || "0.0"}
								</p>
								<StarRating rating={stats.avgRatingAsWorker || 0} size="sm" />
							</div>
						</div>
						<div className="flex h-12 w-12 items-center justify-center rounded-none bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
							<Star className="h-6 w-6" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="group overflow-hidden border-border transition-all hover:border-primary/30 hover:shadow-lg">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-muted-foreground text-sm">Дууссан даалгавар</p>
							<p className="mt-1 font-display text-2xl text-foreground">
								{stats.completedTasksAsWorker || 0}
							</p>
						</div>
						<div className="flex h-12 w-12 items-center justify-center rounded-none bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
							<Briefcase className="h-6 w-6" />
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="group overflow-hidden border-border transition-all hover:border-primary/30 hover:shadow-lg">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-muted-foreground text-sm">
								Захиалагчийн үнэлгээ
							</p>
							<div className="mt-1 flex items-center gap-2">
								<p className="font-display text-2xl text-foreground">
									{stats.avgRatingAsClient?.toFixed(1) || "0.0"}
								</p>
								<StarRating rating={stats.avgRatingAsClient || 0} size="sm" />
							</div>
						</div>
						<div className="flex h-12 w-12 items-center justify-center rounded-none bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
							<Award className="h-6 w-6" />
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
