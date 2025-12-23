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
import { redirect } from "next/navigation";

import { PageHeader } from "@/components/page-layout";
import { StatCard } from "@/components/stat-card";
import { EmptyState } from "@/components/states";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serverApi } from "@/lib/api.server";
import type { TaskApiResponse } from "@/lib/queries";
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
					className="flex items-center gap-1.5 rounded-sm bg-muted px-3 py-1.5 font-mono text-muted-foreground text-sm transition-colors hover:bg-primary/10 hover:text-primary"
				>
					<Users className="h-4 w-4" />
					{bidCount} санал
				</Link>
				<StatusBadge status={task.status} type="task" />
			</div>
		</div>
	);
}

export default async function ClientDashboardPage() {
	// SSR: Fetch user first, then tasks filtered by user ID
	const user = await serverApi.getMe();
	
	if (!user) {
		redirect("/login");
	}

	const userId = user.id;

	// Fetch all task data in parallel, filtered by posterId
	const [openTasks, inProgressTasks, completedTasks, recentTasks] =
		await Promise.all([
			serverApi.getTasks({ posterId: userId, status: "OPEN", limit: 100 }),
			serverApi.getTasks({
				posterId: userId,
				status: "IN_PROGRESS",
				limit: 100,
			}),
			serverApi.getTasks({ posterId: userId, status: "COMPLETED", limit: 100 }),
			serverApi.getTasks({ posterId: userId, limit: 5 }),
		]);

	const totalTasks =
		(openTasks?.meta.total || 0) +
		(inProgressTasks?.meta.total || 0) +
		(completedTasks?.meta.total || 0);

	return (
		<div className="p-6 lg:p-8">
			<div className="mb-8">
				<PageHeader
					title={`Сайн байна уу, ${user.name?.split(" ")[0] || "Хэрэглэгч"}`}
					description="Таны даалгаврын хяналтын самбар"
				/>
			</div>

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
							<CardTitle className="font-display font-medium text-foreground text-lg">
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
										href: "/client/post-task",
									}}
								/>
							)}
						</CardContent>
					</Card>

					<Card className="rounded-none">
						<CardHeader>
							<CardTitle className="font-display font-medium text-foreground text-lg">
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
		</div>
	);
}
