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
				"flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
				className,
			)}
		>
			<div>
				<h1 className="text-2xl font-semibold text-foreground lg:text-3xl">
					{title}
				</h1>
				{description && (
					<p className="mt-1 text-muted-foreground">{description}</p>
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
		<Card className={cn(className)}>
			{(title || actions) && (
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
					<div>
						{title && (
							<CardTitle className="text-lg font-semibold">{title}</CardTitle>
						)}
						{description && (
							<p className="text-sm text-muted-foreground">{description}</p>
						)}
					</div>
					{actions}
				</CardHeader>
			)}
			<CardContent className={!title && !actions ? "pt-6" : ""}>
				{children}
			</CardContent>
		</Card>
	);
}

export function PageSkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-4 w-64" />
			</div>
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, i) => (
					<Card key={`skeleton-${i}`}>
						<CardContent className="p-6">
							<div className="space-y-2">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-8 w-16" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
