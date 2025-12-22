import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StatCardProps {
	label: string;
	value: string | number;
	icon?: React.ReactNode;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	className?: string;
}

export function StatCard({
	label,
	value,
	icon,
	trend,
	className,
}: StatCardProps) {
	return (
		<Card className={cn("transition-shadow hover:shadow-md", className)}>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<p className="text-sm text-muted-foreground">{label}</p>
						<p className="text-2xl font-semibold text-foreground">{value}</p>
						{trend && (
							<p
								className={cn(
									"text-xs font-medium",
									trend.isPositive ? "text-success" : "text-destructive",
								)}
							>
								{trend.isPositive ? "+" : ""}
								{trend.value}%
							</p>
						)}
					</div>
					{icon && (
						<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
							{icon}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export function StatCardSkeleton() {
	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-8 w-16" />
					</div>
					<Skeleton className="h-12 w-12 rounded-lg" />
				</div>
			</CardContent>
		</Card>
	);
}
