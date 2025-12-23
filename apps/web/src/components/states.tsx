import { AlertTriangle, FileQuestion, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
	icon?: React.ReactNode;
	title: string;
	description?: string;
	action?: {
		label: string;
		onClick: () => void;
	};
	className?: string;
}

export function EmptyState({
	icon,
	title,
	description,
	action,
	className,
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-16 text-center border border-dashed border-border/60 bg-muted/5 rounded-none",
				className,
			)}
		>
			<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-muted ring-1 ring-border">
				{icon ?? <FileQuestion className="h-8 w-8 text-muted-foreground" />}
			</div>
			<h3 className="font-display text-xl font-bold tracking-tight text-foreground">
				{title}
			</h3>
			{description && (
				<p className="mt-2 max-w-sm font-body text-muted-foreground">
					{description}
				</p>
			)}
			{action && (
				<Button
					onClick={action.onClick}
					className="mt-6 rounded-none font-mono text-xs uppercase tracking-wider"
					variant="outline"
				>
					{action.label}
				</Button>
			)}
		</div>
	);
}

interface LoadingStateProps {
	message?: string;
	className?: string;
}

export function LoadingState({
	message = "Уншиж байна...",
	className,
}: LoadingStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-16",
				className,
			)}
		>
			<Loader2 className="h-10 w-10 animate-spin text-primary" />
			<p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground animate-pulse">
				{message}
			</p>
		</div>
	);
}

interface ErrorStateProps {
	title?: string;
	message?: string;
	retry?: () => void;
	className?: string;
}

export function ErrorState({
	title = "Алдаа гарлаа",
	message = "Мэдээлэл ачаалахад алдаа гарлаа. Дахин оролдоно уу.",
	retry,
	className,
}: ErrorStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center py-16 text-center border border-destructive/20 bg-destructive/5 rounded-none",
				className,
			)}
		>
			<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-destructive/10 ring-1 ring-destructive/20">
				<AlertTriangle className="h-8 w-8 text-destructive" />
			</div>
			<h3 className="font-display text-xl font-bold tracking-tight text-foreground">
				{title}
			</h3>
			<p className="mt-2 max-w-sm font-body text-muted-foreground">{message}</p>
			{retry && (
				<Button
					onClick={retry}
					className="mt-6 rounded-none font-mono uppercase tracking-wider"
					variant="outline"
				>
					Дахин оролдох
				</Button>
			)}
		</div>
	);
}
