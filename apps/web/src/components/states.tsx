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
				"flex flex-col items-center justify-center py-12 text-center",
				className,
			)}
		>
			<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				{icon ?? <FileQuestion className="h-8 w-8 text-muted-foreground" />}
			</div>
			<h3 className="font-semibold text-foreground">{title}</h3>
			{description && (
				<p className="mt-1 max-w-sm text-sm text-muted-foreground">
					{description}
				</p>
			)}
			{action && (
				<Button onClick={action.onClick} className="mt-4" variant="outline">
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
				"flex flex-col items-center justify-center py-12",
				className,
			)}
		>
			<Loader2 className="h-8 w-8 animate-spin text-primary" />
			<p className="mt-2 text-sm text-muted-foreground">{message}</p>
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
				"flex flex-col items-center justify-center py-12 text-center",
				className,
			)}
		>
			<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
				<AlertTriangle className="h-8 w-8 text-destructive" />
			</div>
			<h3 className="font-semibold text-foreground">{title}</h3>
			<p className="mt-1 max-w-sm text-sm text-muted-foreground">{message}</p>
			{retry && (
				<Button onClick={retry} className="mt-4" variant="outline">
					Дахин оролдох
				</Button>
			)}
		</div>
	);
}
