"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	ArrowRight,
	Briefcase,
	Calendar,
	CheckCircle2,
	Clock,
	ExternalLink,
	Loader2,
	MapPin,
	MessageSquare,
	Play,
	Wifi,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { tasksApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { bidQueries, taskKeys } from "@/lib/queries";

function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("mn-MN", {
		style: "decimal",
		maximumFractionDigits: 0,
	}).format(amount);
}

function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("mn-MN", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(date));
}

const taskStatusColors: Record<string, string> = {
	ASSIGNED: "bg-blue-100 text-blue-700 border-blue-200",
	IN_PROGRESS: "bg-amber-100 text-amber-700 border-amber-200",
	COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
	REVIEWED: "bg-purple-100 text-purple-700 border-purple-200",
};

const taskStatusLabels: Record<string, string> = {
	ASSIGNED: "Хуваарилсан",
	IN_PROGRESS: "Гүйцэтгэж байна",
	COMPLETED: "Дууссан",
	REVIEWED: "Үнэлгээ өгсөн",
};

const taskStatusIcons: Record<string, React.ReactNode> = {
	ASSIGNED: <Clock className="h-3.5 w-3.5" />,
	IN_PROGRESS: <Play className="h-3.5 w-3.5" />,
	COMPLETED: <CheckCircle2 className="h-3.5 w-3.5" />,
	REVIEWED: <CheckCircle2 className="h-3.5 w-3.5" />,
};

function TaskCardSkeleton() {
	return (
		<Card className="border-slate-100">
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<Skeleton className="h-14 w-14 shrink-0 rounded-xl" />
					<div className="flex-1 space-y-3">
						<Skeleton className="h-5 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
						<div className="flex gap-4">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-24" />
						</div>
					</div>
					<Skeleton className="h-8 w-32 rounded-lg" />
				</div>
			</CardContent>
		</Card>
	);
}

export default function WorkerTasksPage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data: session, isPending: isSessionLoading } =
		authClient.useSession();

	useEffect(() => {
		if (!isSessionLoading && !session?.user) {
			router.push("/login");
		}
	}, [session, isSessionLoading, router]);

	const userId = session?.user?.id;

	const { data: bidsData, isLoading: isBidsLoading } = useQuery({
		...bidQueries.byBidder(userId || ""),
		enabled: !!userId,
	});

	const updateTaskMutation = useMutation({
		mutationFn: ({ taskId, status }: { taskId: string; status: string }) =>
			tasksApi.update(taskId, {
				status: status as "IN_PROGRESS" | "COMPLETED",
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
		},
	});

	const acceptedBids = (bidsData?.data || []).filter(
		(b) => b.status === "ACCEPTED" && b.task,
	);

	const activeTasks = acceptedBids.filter((b) =>
		["ASSIGNED", "IN_PROGRESS"].includes(b.task?.status || ""),
	);

	const completedTasks = acceptedBids.filter((b) =>
		["COMPLETED", "REVIEWED"].includes(b.task?.status || ""),
	);

	if (isSessionLoading) {
		return (
			<div className="min-h-screen p-6 lg:p-8">
				<div className="mx-auto max-w-4xl space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-64" />
					</div>
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<TaskCardSkeleton key={`skeleton-${i.toString()}`} />
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6 lg:p-8">
			<div className="mx-auto max-w-4xl space-y-8">
				<header>
					<h1 className="font-bold text-2xl text-slate-800 lg:text-3xl">
						Идэвхтэй даалгаврууд
					</h1>
					<p className="mt-1 text-slate-500">
						Таны хүлээн авсан даалгаврууд болон тэдгээрийн статус
					</p>
				</header>

				{isBidsLoading ? (
					<div className="space-y-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<TaskCardSkeleton key={`loading-${i.toString()}`} />
						))}
					</div>
				) : activeTasks.length === 0 && completedTasks.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-2xl border-2 border-slate-100 border-dashed bg-slate-50/50 py-16 text-center">
						<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
							<Briefcase className="h-8 w-8 text-slate-400" />
						</div>
						<h3 className="font-semibold text-slate-700">
							Идэвхтэй даалгавар байхгүй
						</h3>
						<p className="mt-1 max-w-sm text-slate-500 text-sm">
							Даалгавруудад санал илгээн, хүлээн авагдсаны дараа энд харагдана
						</p>
						<Link href="/tasks" className="mt-4">
							<Button
								type="button"
								className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
							>
								Даалгавар хайх
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</Link>
					</div>
				) : (
					<div className="space-y-8">
						{activeTasks.length > 0 && (
							<section>
								<div className="mb-4 flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-amber-500" />
									<h2 className="font-semibold text-slate-700">
										Гүйцэтгэж буй ({activeTasks.length})
									</h2>
								</div>
								<div className="space-y-4">
									{activeTasks.map((bid) => {
										const task = bid.task;
										if (!task) return null;
										return (
											<Card
												key={bid.id}
												className="group overflow-hidden border-slate-100 transition-all hover:border-slate-200 hover:shadow-lg"
											>
												<CardContent className="p-6">
													<div className="flex flex-col gap-4 lg:flex-row lg:items-start">
														<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
															<Briefcase className="h-7 w-7 text-white" />
														</div>

														<div className="min-w-0 flex-1">
															<div className="flex flex-wrap items-start justify-between gap-2">
																<div>
																	<Link
																		href={`/task/${task.id}`}
																		className="group/link flex items-center gap-2"
																	>
																		<h3 className="font-semibold text-lg text-slate-800 transition-colors group-hover/link:text-emerald-600">
																			{task.title}
																		</h3>
																		<ExternalLink className="h-4 w-4 text-slate-400 opacity-0 transition-all group-hover/link:opacity-100" />
																	</Link>
																	<p className="mt-1 line-clamp-2 text-slate-500 text-sm">
																		{task.description}
																	</p>
																</div>
															</div>

															<div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-500 text-sm">
																<div className="flex items-center gap-1.5 font-semibold text-emerald-600">
																	{formatCurrency(bid.amount)}₮
																</div>
																{task.deadline && (
																	<div className="flex items-center gap-1.5">
																		<Calendar className="h-4 w-4" />
																		<span>
																			Хугацаа: {formatDate(task.deadline)}
																		</span>
																	</div>
																)}
																<Badge
																	variant="outline"
																	className={
																		task.isRemote
																			? "border-emerald-200 bg-emerald-50 text-emerald-700"
																			: ""
																	}
																>
																	{task.isRemote ? (
																		<>
																			<Wifi className="mr-1 h-3 w-3" />
																			Алсаас
																		</>
																	) : (
																		<>
																			<MapPin className="mr-1 h-3 w-3" />
																			{task.city || "Газар дээр"}
																		</>
																	)}
																</Badge>
															</div>

															<div className="mt-4 flex flex-wrap items-center gap-3">
																<div className="flex items-center gap-2">
																	<span className="text-slate-500 text-sm">
																		Статус:
																	</span>
																	<Select
																		value={task.status}
																		onValueChange={(value) =>
																			updateTaskMutation.mutate({
																				taskId: task.id,
																				status: value,
																			})
																		}
																		disabled={updateTaskMutation.isPending}
																	>
																		<SelectTrigger className="h-9 w-auto gap-2 border-slate-200 bg-white">
																			<SelectValue />
																		</SelectTrigger>
																		<SelectContent>
																			<SelectItem value="ASSIGNED">
																				<div className="flex items-center gap-2">
																					{taskStatusIcons.ASSIGNED}
																					{taskStatusLabels.ASSIGNED}
																				</div>
																			</SelectItem>
																			<SelectItem value="IN_PROGRESS">
																				<div className="flex items-center gap-2">
																					{taskStatusIcons.IN_PROGRESS}
																					{taskStatusLabels.IN_PROGRESS}
																				</div>
																			</SelectItem>
																			<SelectItem value="COMPLETED">
																				<div className="flex items-center gap-2">
																					{taskStatusIcons.COMPLETED}
																					{taskStatusLabels.COMPLETED}
																				</div>
																			</SelectItem>
																		</SelectContent>
																	</Select>
																	{updateTaskMutation.isPending && (
																		<Loader2 className="h-4 w-4 animate-spin text-slate-400" />
																	)}
																</div>

																<Link
																	href={
																		`/worker/messages?taskId=${task.id}` as Route
																	}
																>
																	<Button
																		variant="outline"
																		size="sm"
																		type="button"
																		className="border-slate-200"
																	>
																		<MessageSquare className="mr-1.5 h-3.5 w-3.5" />
																		Мессеж
																	</Button>
																</Link>
															</div>
														</div>
													</div>
												</CardContent>
											</Card>
										);
									})}
								</div>
							</section>
						)}

						{completedTasks.length > 0 && (
							<section>
								<div className="mb-4 flex items-center gap-2">
									<div className="h-2 w-2 rounded-full bg-emerald-500" />
									<h2 className="font-semibold text-slate-700">
										Дууссан ({completedTasks.length})
									</h2>
								</div>
								<div className="space-y-4">
									{completedTasks.map((bid) => {
										const task = bid.task;
										if (!task) return null;
										return (
											<Card
												key={bid.id}
												className="overflow-hidden border-slate-100 bg-slate-50/50"
											>
												<CardContent className="p-6">
													<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
														<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
															<CheckCircle2 className="h-6 w-6 text-emerald-600" />
														</div>

														<div className="min-w-0 flex-1">
															<Link
																href={`/task/${task.id}`}
																className="group/link flex items-center gap-2"
															>
																<h3 className="font-semibold text-slate-700 transition-colors group-hover/link:text-emerald-600">
																	{task.title}
																</h3>
																<ExternalLink className="h-4 w-4 text-slate-400 opacity-0 transition-all group-hover/link:opacity-100" />
															</Link>
															<div className="mt-1 flex items-center gap-3 text-slate-500 text-sm">
																<span className="font-medium text-emerald-600">
																	{formatCurrency(bid.amount)}₮
																</span>
																<span>•</span>
																<span>{formatDate(task.updatedAt)}</span>
															</div>
														</div>

														<Badge
															variant="outline"
															className={taskStatusColors[task.status]}
														>
															{taskStatusIcons[task.status]}
															<span className="ml-1">
																{taskStatusLabels[task.status]}
															</span>
														</Badge>
													</div>
												</CardContent>
											</Card>
										);
									})}
								</div>
							</section>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
