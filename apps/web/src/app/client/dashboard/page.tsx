"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
	ArrowRight,
	CheckCircle2,
	Clock,
	ListTodo,
	PlusCircle,
	TrendingUp,
	Users,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-layout";
import { StatCard, StatCardSkeleton } from "@/components/stat-card";
import { EmptyState, LoadingState } from "@/components/states";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { TaskApiResponse } from "@/lib/queries";
import { taskQueries, userQueries } from "@/lib/queries";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";

function formatBudget(min: number, max: number | null): string {
	if (max && max !== min) {
		return `${formatCurrency(min)}₮ - ${formatCurrency(max)}₮`;
	}
	return `${formatCurrency(min)}₮`;
}

function TaskRow({ task }: { task: TaskApiResponse }) {
	const bidCount = task._count?.bids || 0;

	return (
		<div className="flex items-center gap-4 rounded-none border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-none">
			<div className="min-w-0 flex-1">
				<Link
					href={`/client/tasks/${task.id}/bids`}
					className="line-clamp-1 font-display font-medium text-foreground transition-colors hover:text-primary"
				>
					{task.title}
				</Link>
				<div className="mt-1 flex items-center gap-3 font-body text-muted-foreground text-sm">
					<span className="font-mono">
						{formatBudget(task.budgetMin, task.budgetMax)}
					</span>
					<span className="text-border">•</span>
					<span className="font-mono">{formatTimeAgo(task.createdAt)}</span>
				</div>
			</div>
			<div className="flex items-center gap-3">
				<Link
					href={`/client/tasks/${task.id}/bids`}
					className="flex items-center gap-1.5 rounded-sm bg-muted px-3 py-1.5 font-mono text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
				>
					<Users className="h-4 w-4" />
					{bidCount} санал
				</Link>
				<StatusBadge status={task.status} type="task" />
			</div>
		</div>
	);
}

function DashboardSkeleton() {
	return (
		<div className="space-y-8">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCardSkeleton />
				<StatCardSkeleton />
				<StatCardSkeleton />
				<StatCardSkeleton />
			</div>
			<Card className="rounded-none">
				<CardHeader>
					<Skeleton className="h-6 w-40 rounded-sm" />
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-20 w-full rounded-sm" />
					<Skeleton className="h-20 w-full rounded-sm" />
					<Skeleton className="h-20 w-full rounded-sm" />
				</CardContent>
			</Card>
		</div>
	);
}

function DashboardContent() {
	const { data: user } = useQuery(userQueries.me());

	const { data: openTasks } = useSuspenseQuery(
		taskQueries.list({
			posterId: user?.id,
			status: "OPEN",
			limit: 100,
		}),
	);

	const { data: inProgressTasks } = useSuspenseQuery(
		taskQueries.list({
			posterId: user?.id,
			status: "IN_PROGRESS",
			limit: 100,
		}),
	);

	const { data: completedTasks } = useSuspenseQuery(
		taskQueries.list({
			posterId: user?.id,
			status: "COMPLETED",
			limit: 100,
		}),
	);

	const { data: recentTasks } = useSuspenseQuery(
		taskQueries.list({
			posterId: user?.id,
			limit: 5,
		}),
	);

	const totalTasks =
		(openTasks?.meta.total || 0) +
		(inProgressTasks?.meta.total || 0) +
		(completedTasks?.meta.total || 0);

	return (
		<div className="space-y-8">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					label="Нийт даалгавар"
					value={totalTasks}
					icon={<ListTodo className="h-6 w-6" />}
				/>
				<StatCard
					label="Нээлттэй даалгавар"
					value={openTasks?.meta.total || 0}
					icon={<TrendingUp className="h-6 w-6" />}
				/>
				<StatCard
					label="Гүйцэтгэгдэж буй"
					value={inProgressTasks?.meta.total || 0}
					icon={<Clock className="h-6 w-6" />}
				/>
				<StatCard
					label="Дууссан даалгавар"
					value={completedTasks?.meta.total || 0}
					icon={<CheckCircle2 className="h-6 w-6" />}
				/>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<Card className="rounded-none lg:col-span-2">
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle className="font-display text-lg font-medium text-foreground">
							Сүүлийн даалгаврууд
						</CardTitle>
						<Link href="/client/tasks">
							<Button
								variant="ghost"
								size="sm"
								className="gap-1.5 rounded-none font-mono"
							>
								Бүгдийг харах
								<ArrowRight className="h-4 w-4" />
							</Button>
						</Link>
					</CardHeader>
					<CardContent>
						{recentTasks?.data.length ? (
							<div className="space-y-3">
								{recentTasks.data.map((task) => (
									<TaskRow key={task.id} task={task} />
								))}
							</div>
						) : (
							<EmptyState
								icon={<ListTodo className="h-8 w-8 text-muted-foreground" />}
								title="Одоогоор даалгавар байхгүй"
								action={{
									label: "Даалгавар нэмэх",
									onClick: () => {
										window.location.href = "/client/post-task";
									},
								}}
							/>
						)}
					</CardContent>
				</Card>

				<Card className="rounded-none">
					<CardHeader>
						<CardTitle className="font-display text-lg font-medium text-foreground">
							Хурдан үйлдлүүд
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						<Link href="/client/post-task" className="block">
							<Button
								className="w-full justify-start gap-3 rounded-none font-medium"
								size="lg"
							>
								<PlusCircle className="h-5 w-5" />
								Шинэ даалгавар нийтлэх
							</Button>
						</Link>
						<Link href="/client/tasks" className="block">
							<Button
								variant="outline"
								className="w-full justify-start gap-3 rounded-none font-medium"
								size="lg"
							>
								<ListTodo className="h-5 w-5" />
								Миний даалгаврууд
							</Button>
						</Link>
						<Link href="/tasks" className="block">
							<Button
								variant="outline"
								className="w-full justify-start gap-3 rounded-none font-medium"
								size="lg"
							>
								<TrendingUp className="h-5 w-5" />
								Зах зээл харах
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default function ClientDashboardPage() {
	const { data: user, isLoading } = useQuery(userQueries.me());

	return (
		<div className="p-6 lg:p-8">
			<div className="mb-8">
				{isLoading ? (
					<div className="space-y-2">
						<Skeleton className="h-9 w-64" />
						<Skeleton className="h-5 w-48" />
					</div>
				) : (
					<PageHeader
						title={`Сайн байна уу, ${user?.name?.split(" ")[0] || "Хэрэглэгч"}`}
						description="Таны даалгаврын хяналтын самбар"
					/>
				)}
			</div>

			<Suspense fallback={<DashboardSkeleton />}>
				{user ? <DashboardContent /> : <LoadingState />}
			</Suspense>
		</div>
	);
}
