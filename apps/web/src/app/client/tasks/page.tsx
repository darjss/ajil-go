"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
	Calendar,
	ChevronLeft,
	ChevronRight,
	Edit2,
	Eye,
	ListTodo,
	Loader2,
	MapPin,
	MoreVertical,
	PlusCircle,
	Trash2,
	Users,
	Wifi,
	XCircle,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import type { TaskApiResponse, TaskStatus } from "@/lib/queries";
import { taskQueries, userQueries } from "@/lib/queries";

type TabFilter = "all" | TaskStatus;

const tabs: { value: TabFilter; label: string }[] = [
	{ value: "all", label: "Бүгд" },
	{ value: "OPEN", label: "Нээлттэй" },
	{ value: "IN_PROGRESS", label: "Гүйцэтгэгдэж буй" },
	{ value: "COMPLETED", label: "Дууссан" },
	{ value: "CANCELLED", label: "Цуцлагдсан" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
	OPEN: {
		label: "Нээлттэй",
		className:
			"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
	},
	ASSIGNED: {
		label: "Хуваарилагдсан",
		className:
			"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
	},
	IN_PROGRESS: {
		label: "Гүйцэтгэж буй",
		className:
			"bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
	},
	COMPLETED: {
		label: "Дууссан",
		className:
			"bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
	},
	REVIEWED: {
		label: "Үнэлэгдсэн",
		className:
			"bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
	},
	CANCELLED: {
		label: "Цуцлагдсан",
		className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
	},
};

function formatBudget(min: number, max: number | null): string {
	const formatter = new Intl.NumberFormat("mn-MN", {
		style: "decimal",
		maximumFractionDigits: 0,
	});
	if (max && max !== min) {
		return `${formatter.format(min)}₮ - ${formatter.format(max)}₮`;
	}
	return `${formatter.format(min)}₮`;
}

function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("mn-MN", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(date));
}

function TaskCard({ task }: { task: TaskApiResponse }) {
	const bidCount = task._count?.bids || 0;
	const status = statusConfig[task.status] || statusConfig.OPEN;

	return (
		<Card className="group overflow-hidden border-slate-200/70 transition-all hover:border-slate-300 hover:shadow-lg dark:border-slate-800 dark:hover:border-slate-700">
			<CardContent className="p-0">
				<div className="p-5">
					<div className="mb-3 flex items-start justify-between gap-3">
						<div className="flex flex-wrap items-center gap-2">
							<Badge className={status.className}>{status.label}</Badge>
							{task.isRemote ? (
								<Badge
									variant="outline"
									className="border-emerald-200 text-emerald-600 dark:border-emerald-800 dark:text-emerald-400"
								>
									<Wifi className="mr-1 h-3 w-3" />
									Алсаас
								</Badge>
							) : (
								<Badge variant="outline">
									<MapPin className="mr-1 h-3 w-3" />
									{task.city || "Газар дээр"}
								</Badge>
							)}
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 opacity-0 group-hover:opacity-100"
								>
									<MoreVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem asChild>
									<Link
										href={`/client/tasks/${task.id}/bids`}
										className="flex items-center gap-2"
									>
										<Eye className="h-4 w-4" />
										Саналууд харах
									</Link>
								</DropdownMenuItem>
								{task.status === "OPEN" && (
									<>
										<DropdownMenuItem className="flex items-center gap-2">
											<Edit2 className="h-4 w-4" />
											Засах
										</DropdownMenuItem>
										<DropdownMenuItem className="flex items-center gap-2 text-red-600">
											<XCircle className="h-4 w-4" />
											Цуцлах
										</DropdownMenuItem>
									</>
								)}
								<DropdownMenuItem className="flex items-center gap-2 text-red-600">
									<Trash2 className="h-4 w-4" />
									Устгах
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<Link
						href={`/client/tasks/${task.id}/bids`}
						className="mb-2 block font-semibold text-lg text-slate-900 transition-colors hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400"
					>
						{task.title}
					</Link>
					<p className="mb-4 line-clamp-2 text-slate-500 text-sm dark:text-slate-400">
						{task.description}
					</p>

					<div className="mb-4 flex items-center gap-4 text-slate-500 text-sm dark:text-slate-400">
						<span className="font-semibold text-slate-900 dark:text-white">
							{formatBudget(task.budgetMin, task.budgetMax)}
						</span>
						{task.deadline && (
							<span className="flex items-center gap-1">
								<Calendar className="h-4 w-4" />
								{formatDate(task.deadline)}
							</span>
						)}
					</div>
				</div>

				<div className="flex items-center justify-between border-slate-100 border-t bg-slate-50/50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/50">
					<div className="flex items-center gap-1.5 text-slate-500 text-sm dark:text-slate-400">
						<Calendar className="h-4 w-4" />
						<span>Нийтэлсэн: {formatDate(task.createdAt)}</span>
					</div>
					<Link
						href={`/client/tasks/${task.id}/bids`}
						className="flex items-center gap-1.5 rounded-lg bg-emerald-100 px-3 py-1.5 font-medium text-emerald-700 text-sm transition-colors hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
					>
						<Users className="h-4 w-4" />
						{bidCount} санал
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}

function TaskListSkeleton() {
	const skeletonIds = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"];
	return (
		<div className="grid gap-4 md:grid-cols-2">
			{skeletonIds.map((id) => (
				<Card key={id} className="overflow-hidden">
					<CardContent className="p-0">
						<div className="p-5">
							<div className="mb-3 flex gap-2">
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-5 w-16" />
							</div>
							<Skeleton className="mb-2 h-6 w-3/4" />
							<Skeleton className="mb-4 h-4 w-full" />
							<Skeleton className="h-4 w-1/2" />
						</div>
						<div className="border-slate-100 border-t bg-slate-50/50 px-5 py-3 dark:border-slate-800 dark:bg-slate-800/50">
							<div className="flex items-center justify-between">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-7 w-20 rounded-lg" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}) {
	if (totalPages <= 1) return null;

	const pages: (number | string)[] = [];

	if (totalPages <= 5) {
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
	} else {
		pages.push(1);
		if (currentPage > 3) pages.push("...");
		const start = Math.max(2, currentPage - 1);
		const end = Math.min(totalPages - 1, currentPage + 1);
		for (let i = start; i <= end; i++) {
			pages.push(i);
		}
		if (currentPage < totalPages - 2) pages.push("...");
		pages.push(totalPages);
	}

	return (
		<div className="mt-8 flex items-center justify-center gap-2">
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
				className="h-9 w-9"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			{pages.map((page, idx) =>
				typeof page === "number" ? (
					<Button
						key={`page-${page}`}
						variant={page === currentPage ? "default" : "outline"}
						size="icon"
						onClick={() => onPageChange(page)}
						className={`h-9 w-9 ${page === currentPage ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white" : ""}`}
					>
						{page}
					</Button>
				) : (
					<span key={`ellipsis-${idx}`} className="px-2 text-slate-400">
						...
					</span>
				),
			)}
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				className="h-9 w-9"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}

function TaskListContent({
	activeTab,
	page,
	setPage,
}: {
	activeTab: TabFilter;
	page: number;
	setPage: (page: number) => void;
}) {
	const { data: user } = useQuery(userQueries.me());

	const { data: tasksData } = useSuspenseQuery(
		taskQueries.list({
			posterId: user?.id,
			status: activeTab === "all" ? undefined : activeTab,
			page,
			limit: 10,
		}),
	);

	if (!tasksData?.data.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 border-dashed py-16 dark:border-slate-800">
				<ListTodo className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
				<h3 className="mb-2 font-semibold text-lg text-slate-900 dark:text-white">
					Даалгавар олдсонгүй
				</h3>
				<p className="mb-6 max-w-sm text-center text-slate-500 dark:text-slate-400">
					{activeTab === "all"
						? "Та одоогоор даалгавар нийтлээгүй байна"
						: "Энэ ангилалд даалгавар байхгүй байна"}
				</p>
				<Link href="/client/post-task">
					<Button className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
						<PlusCircle className="h-4 w-4" />
						Шинэ даалгавар нийтлэх
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="grid gap-4 md:grid-cols-2">
				{tasksData.data.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</div>
			<Pagination
				currentPage={page}
				totalPages={tasksData.meta.totalPages}
				onPageChange={setPage}
			/>
		</>
	);
}

export default function ClientTasksPage() {
	const [activeTab, setActiveTab] = useState<TabFilter>("all");
	const [page, setPage] = useState(1);
	const { data: user } = useQuery(userQueries.me());

	const handleTabChange = (tab: TabFilter) => {
		setActiveTab(tab);
		setPage(1);
	};

	return (
		<div className="p-6 lg:p-8">
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="font-bold text-2xl text-slate-900 tracking-tight lg:text-3xl dark:text-white">
						Миний даалгаврууд
					</h1>
					<p className="mt-1 text-slate-500 dark:text-slate-400">
						Таны нийтэлсэн бүх даалгаврууд
					</p>
				</div>
				<Link href="/client/post-task">
					<Button className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/20 shadow-lg transition-all hover:shadow-emerald-500/30 hover:shadow-xl">
						<PlusCircle className="h-4 w-4" />
						Даалгавар нийтлэх
					</Button>
				</Link>
			</div>

			<div className="mb-6 overflow-x-auto">
				<div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
					{tabs.map((tab) => (
						<button
							key={tab.value}
							type="button"
							onClick={() => handleTabChange(tab.value)}
							className={`whitespace-nowrap rounded-lg px-4 py-2 font-medium text-sm transition-all ${
								activeTab === tab.value
									? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
									: "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<Suspense fallback={<TaskListSkeleton />}>
				{user ? (
					<TaskListContent
						activeTab={activeTab}
						page={page}
						setPage={setPage}
					/>
				) : (
					<div className="flex items-center justify-center py-20">
						<Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
					</div>
				)}
			</Suspense>
		</div>
	);
}
