import type { BidStatus, TaskStatus } from "@ajil-go/contract";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusType = TaskStatus | BidStatus;

const taskStatusConfig: Record<
	TaskStatus,
	{
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
	}
> = {
	OPEN: { label: "Нээлттэй", variant: "default" },
	ASSIGNED: { label: "Хуваарилсан", variant: "secondary" },
	IN_PROGRESS: { label: "Явагдаж буй", variant: "default" },
	COMPLETED: { label: "Дууссан", variant: "secondary" },
	REVIEWED: { label: "Үнэлсэн", variant: "secondary" },
	CANCELLED: { label: "Цуцалсан", variant: "destructive" },
	DISPUTED: { label: "Маргаантай", variant: "destructive" },
};

const bidStatusConfig: Record<
	BidStatus,
	{
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
	}
> = {
	PENDING: { label: "Хүлээгдэж буй", variant: "outline" },
	ACCEPTED: { label: "Зөвшөөрсөн", variant: "default" },
	REJECTED: { label: "Татгалзсан", variant: "destructive" },
	WITHDRAWN: { label: "Цуцалсан", variant: "secondary" },
};

interface StatusBadgeProps {
	status: StatusType;
	type?: "task" | "bid";
	className?: string;
}

export function StatusBadge({
	status,
	type = "task",
	className,
}: StatusBadgeProps) {
	const config =
		type === "task"
			? taskStatusConfig[status as TaskStatus]
			: bidStatusConfig[status as BidStatus];

	if (!config) return null;

	return (
		<Badge
			variant={config.variant}
			className={cn(
				"rounded-none font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border shadow-sm",
				className,
			)}
		>
			{config.label}
		</Badge>
	);
}
