import type { ReactNode } from "react";

import type { BadgeProps } from "@/components/ui/badge";
import type { BidStatus, TaskApiResponse, TaskStatus } from "@/lib/queries";

export type { BidStatus, TaskApiResponse, TaskStatus };

export interface TaskFilters {
	categoryId?: string;
	isRemote?: boolean;
	city?: string;
	minBudget?: number;
	maxBudget?: number;
	search?: string;
	status?: TaskStatus;
}

export interface TaskStatusConfig {
	label: string;
	className: string;
	icon?: ReactNode;
	variant?: BadgeProps["variant"];
}

export const TASK_STATUS_CONFIG: Record<TaskStatus, TaskStatusConfig> = {
	OPEN: {
		label: "Нээлттэй",
		className:
			"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
		variant: "default",
	},
	ASSIGNED: {
		label: "Хуваарилагдсан",
		className:
			"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
		variant: "secondary",
	},
	IN_PROGRESS: {
		label: "Гүйцэтгэж буй",
		className:
			"bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
		variant: "secondary",
	},
	COMPLETED: {
		label: "Дууссан",
		className:
			"bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
		variant: "secondary",
	},
	REVIEWED: {
		label: "Үнэлэгдсэн",
		className:
			"bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
		variant: "secondary",
	},
	CANCELLED: {
		label: "Цуцлагдсан",
		className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
		variant: "destructive",
	},
	DISPUTED: {
		label: "Маргаантай",
		className:
			"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
		variant: "destructive",
	},
};

export interface BidStatusConfig {
	label: string;
	className: string;
}

export const BID_STATUS_CONFIG: Record<BidStatus, BidStatusConfig> = {
	PENDING: {
		label: "Хүлээгдэж буй",
		className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
	},
	ACCEPTED: {
		label: "Зөвшөөрөгдсөн",
		className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
	},
	REJECTED: {
		label: "Татгалзсан",
		className: "bg-red-500/10 text-red-600 dark:text-red-400",
	},
	WITHDRAWN: {
		label: "Буцаагдсан",
		className: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
	},
};

export type TaskCardVariant = "default" | "compact" | "client";

export type TaskTabFilter = "all" | TaskStatus;

export const TASK_TABS: { value: TaskTabFilter; label: string }[] = [
	{ value: "all", label: "Бүгд" },
	{ value: "OPEN", label: "Нээлттэй" },
	{ value: "IN_PROGRESS", label: "Гүйцэтгэгдэж буй" },
	{ value: "COMPLETED", label: "Дууссан" },
	{ value: "CANCELLED", label: "Цуцлагдсан" },
];

export interface TaskSkillDisplay {
	skill?: { id: string; name: string } | null;
	customSkill?: { id: string; name: string } | null;
}

export function getTaskStatusConfig(
	status: TaskStatus | string,
): TaskStatusConfig {
	return TASK_STATUS_CONFIG[status as TaskStatus] || TASK_STATUS_CONFIG.OPEN;
}

export function getBidStatusConfig(
	status: BidStatus | string,
): BidStatusConfig {
	return BID_STATUS_CONFIG[status as BidStatus] || BID_STATUS_CONFIG.PENDING;
}
