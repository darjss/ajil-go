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
		<Card
			className={cn(
				"transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md rounded-none border-border bg-card",
				className,
			)}
		>
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div className="space-y-2">
						<p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
							{label}
						</p>
						<div className="flex items-baseline gap-2">
							<p className="font-display text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
								{value}
							</p>
						</div>
						{trend && (
							<div className="flex items-center gap-1.5">
								<span
									className={cn(
										"inline-flex items-center justify-center rounded-none px-1.5 py-0.5 text-xs font-mono font-medium",
										trend.isPositive
											? "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary"
											: "bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive",
									)}
								>
									{trend.isPositive ? "↑" : "↓"} {trend.value}%
								</span>
								<span className="text-xs text-muted-foreground">
									өнгөрсөн сараас
								</span>
							</div>
						)}
					</div>
					{icon && (
						<div className="flex h-12 w-12 items-center justify-center rounded-none bg-primary/10 text-primary ring-1 ring-primary/20">
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
		<Card className="rounded-none border-border">
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div className="space-y-3">
						<Skeleton className="h-4 w-24 rounded-none" />
						<Skeleton className="h-10 w-32 rounded-none" />
						<Skeleton className="h-4 w-20 rounded-none" />
					</div>
					<Skeleton className="h-12 w-12 rounded-none" />
				</div>
			</CardContent>
		</Card>
	);
}
