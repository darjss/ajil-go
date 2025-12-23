import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
	title: string;
	description?: string;
	actions?: React.ReactNode;
	className?: string;
}

export function PageHeader({
	title,
	description,
	actions,
	className,
}: PageHeaderProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-6 mb-6",
				className,
			)}
		>
			<div className="space-y-1">
				<h1 className="font-display text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
					{title}
				</h1>
				{description && (
					<p className="font-body text-lg text-muted-foreground/80 max-w-2xl">
						{description}
					</p>
				)}
			</div>
			{actions && <div className="flex items-center gap-2">{actions}</div>}
		</div>
	);
}

interface PageSectionProps {
	title?: string;
	description?: string;
	actions?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

export function PageSection({
	title,
	description,
	actions,
	children,
	className,
}: PageSectionProps) {
	return (
		<Card className={cn("rounded-none border-border shadow-sm", className)}>
			{(title || actions) && (
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-border/40">
					<div className="space-y-1">
						{title && (
							<CardTitle className="font-display text-xl font-bold tracking-tight">
								{title}
							</CardTitle>
						)}
						{description && (
							<p className="font-body text-sm text-muted-foreground">
								{description}
							</p>
						)}
					</div>
					{actions}
				</CardHeader>
			)}
			<CardContent className={!title && !actions ? "pt-6" : "pt-6"}>
				{children}
			</CardContent>
		</Card>
	);
}

export function PageSkeleton() {
	return (
		<div className="space-y-8">
			<div className="space-y-3 border-b border-border/40 pb-6">
				<Skeleton className="h-10 w-64 rounded-none" />
				<Skeleton className="h-5 w-96 rounded-none" />
			</div>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={`skeleton-${i}`} className="rounded-none border-border">
						<CardContent className="p-6">
							<div className="space-y-3">
								<Skeleton className="h-4 w-24 rounded-none" />
								<Skeleton className="h-10 w-20 rounded-none" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
