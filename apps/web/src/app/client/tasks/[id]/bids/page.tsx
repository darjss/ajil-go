"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	ArrowLeft,
	Calendar,
	CheckCircle2,
	Clock,
	Loader2,
	MapPin,
	Star,
	Users,
	Wifi,
	XCircle,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { bidsApi, tasksApi } from "@/lib/api";
import { bidKeys, bidQueries, taskKeys, taskQueries } from "@/lib/queries";

type SortOption = "date" | "price-low" | "price-high" | "rating";

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
};

const bidStatusConfig: Record<string, { label: string; className: string }> = {
	PENDING: {
		label: "Хүлээгдэж буй",
		className:
			"bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
	},
	ACCEPTED: {
		label: "Зөвшөөрсөн",
		className:
			"bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
	},
	REJECTED: {
		label: "Татгалзсан",
		className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
	},
	WITHDRAWN: {
		label: "Буцаагдсан",
		className:
			"bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
	},
};

function formatBudget(amount: number): string {
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

function formatTimeAgo(date: Date): string {
	const now = new Date();
	const diff = now.getTime() - new Date(date).getTime();
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days} өдрийн өмнө`;
	if (hours > 0) return `${hours} цагийн өмнө`;
	return "Саяхан";
}

function TaskSummarySkeleton() {
	return (
		<Card className="border-slate-200/70 dark:border-slate-800">
			<CardContent className="p-6">
				<div className="mb-4 flex gap-2">
					<Skeleton className="h-5 w-20" />
					<Skeleton className="h-5 w-16" />
				</div>
				<Skeleton className="mb-2 h-7 w-3/4" />
				<Skeleton className="mb-4 h-4 w-full" />
				<div className="flex gap-4">
					<Skeleton className="h-5 w-32" />
					<Skeleton className="h-5 w-24" />
				</div>
			</CardContent>
		</Card>
	);
}

function BidListSkeleton() {
	const skeletons = ["bid-skel-1", "bid-skel-2", "bid-skel-3"];
	return (
		<div className="space-y-4">
			{skeletons.map((id) => (
				<Card key={id} className="overflow-hidden">
					<CardContent className="p-6">
						<div className="flex gap-4">
							<Skeleton className="h-14 w-14 rounded-full" />
							<div className="flex-1">
								<Skeleton className="mb-2 h-5 w-32" />
								<Skeleton className="mb-4 h-4 w-48" />
								<Skeleton className="h-16 w-full" />
							</div>
							<Skeleton className="h-6 w-24" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

export default function TaskBidsPage() {
	const params = useParams();
	const taskId = params.id as string;
	const [sortBy, setSortBy] = useState<SortOption>("date");
	const [expandedBids, setExpandedBids] = useState<Set<string>>(new Set());
	const queryClient = useQueryClient();

	const {
		data: task,
		isLoading: isLoadingTask,
		error: taskError,
	} = useQuery(taskQueries.detail(taskId));

	const {
		data: bidsData,
		isLoading: isLoadingBids,
		error: bidsError,
	} = useQuery(bidQueries.byTask(taskId));

	const acceptBidMutation = useMutation({
		mutationFn: async (bidId: string) => {
			await bidsApi.update(bidId, { status: "ACCEPTED" });
			await tasksApi.update(taskId, {
				assignedBidId: bidId,
				status: "ASSIGNED",
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: taskKeys.detail(taskId) });
			queryClient.invalidateQueries({ queryKey: bidKeys.list({ taskId }) });
		},
	});

	const rejectBidMutation = useMutation({
		mutationFn: async (bidId: string) => {
			await bidsApi.update(bidId, { status: "REJECTED" });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: bidKeys.list({ taskId }) });
		},
	});

	const toggleBidExpand = (bidId: string) => {
		setExpandedBids((prev) => {
			const next = new Set(prev);
			if (next.has(bidId)) {
				next.delete(bidId);
			} else {
				next.add(bidId);
			}
			return next;
		});
	};

	const sortedBids = [...(bidsData?.data || [])].sort((a, b) => {
		switch (sortBy) {
			case "price-low":
				return a.amount - b.amount;
			case "price-high":
				return b.amount - a.amount;
			case "rating":
				return (
					(b.bidder?.avgRatingAsWorker || 0) -
					(a.bidder?.avgRatingAsWorker || 0)
				);
			default:
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
		}
	});

	if (taskError || bidsError) {
		return (
			<div className="p-6 lg:p-8">
				<div className="flex flex-col items-center justify-center rounded-2xl border border-red-200 border-dashed py-16 dark:border-red-900">
					<XCircle className="mb-4 h-12 w-12 text-red-400" />
					<h3 className="mb-2 font-semibold text-lg text-slate-900 dark:text-white">
						Алдаа гарлаа
					</h3>
					<p className="text-slate-500 dark:text-slate-400">
						Даалгавар олдсонгүй эсвэл та энэ даалгаврыг харах эрхгүй байна
					</p>
					<Link href="/client/tasks" className="mt-4">
						<Button variant="outline" className="gap-2">
							<ArrowLeft className="h-4 w-4" />
							Буцах
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	const taskStatus = statusConfig[task?.status || "OPEN"] || statusConfig.OPEN;
	const isTaskOpen = task?.status === "OPEN";

	return (
		<div className="p-6 lg:p-8">
			<div className="mb-6">
				<Link
					href="/client/tasks"
					className="mb-4 inline-flex items-center gap-2 font-medium text-slate-500 text-sm transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
				>
					<ArrowLeft className="h-4 w-4" />
					Миний даалгаврууд
				</Link>
				<h1 className="font-bold text-2xl text-slate-900 tracking-tight lg:text-3xl dark:text-white">
					Санал хүлээн авах
				</h1>
			</div>

			{isLoadingTask ? (
				<TaskSummarySkeleton />
			) : task ? (
				<Card className="mb-8 overflow-hidden border-slate-200/70 dark:border-slate-800">
					<CardContent className="p-6">
						<div className="mb-4 flex flex-wrap items-center gap-2">
							<Badge className={taskStatus.className}>{taskStatus.label}</Badge>
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
							{task.category && (
								<Badge variant="secondary">{task.category.name}</Badge>
							)}
						</div>

						<h2 className="mb-2 font-semibold text-slate-900 text-xl dark:text-white">
							{task.title}
						</h2>
						<p className="mb-4 text-slate-500 dark:text-slate-400">
							{task.description}
						</p>

						<div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm dark:text-slate-400">
							<span className="font-semibold text-emerald-600 text-lg dark:text-emerald-400">
								{formatBudget(task.budgetMin)}₮
								{task.budgetMax && task.budgetMax !== task.budgetMin
									? ` - ${formatBudget(task.budgetMax)}₮`
									: ""}
							</span>
							{task.deadline && (
								<span className="flex items-center gap-1">
									<Calendar className="h-4 w-4" />
									Эцсийн хугацаа: {formatDate(task.deadline)}
								</span>
							)}
							{task.estimatedHours && (
								<span className="flex items-center gap-1">
									<Clock className="h-4 w-4" />~{task.estimatedHours} цаг
								</span>
							)}
						</div>
					</CardContent>
				</Card>
			) : null}

			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-3">
					<Users className="h-5 w-5 text-slate-400" />
					<span className="font-semibold text-slate-900 dark:text-white">
						{bidsData?.data.length || 0} санал ирсэн
					</span>
				</div>
				<Select
					value={sortBy}
					onValueChange={(value) => setSortBy(value as SortOption)}
				>
					<SelectTrigger className="w-48">
						<SelectValue placeholder="Эрэмбэлэх" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="date">Огноогоор</SelectItem>
						<SelectItem value="price-low">Үнэ: Бага-Их</SelectItem>
						<SelectItem value="price-high">Үнэ: Их-Бага</SelectItem>
						<SelectItem value="rating">Үнэлгээгээр</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{isLoadingBids ? (
				<BidListSkeleton />
			) : sortedBids.length === 0 ? (
				<Card className="border-slate-200 border-dashed dark:border-slate-800">
					<CardContent className="flex flex-col items-center justify-center py-16">
						<Users className="mb-4 h-12 w-12 text-slate-300 dark:text-slate-600" />
						<h3 className="mb-2 font-semibold text-lg text-slate-900 dark:text-white">
							Одоогоор санал ирээгүй байна
						</h3>
						<p className="max-w-sm text-center text-slate-500 dark:text-slate-400">
							Гүйцэтгэгчид удахгүй санал илгээнэ. Түр хүлээнэ үү.
						</p>
					</CardContent>
				</Card>
			) : (
				<div className="space-y-4">
					{sortedBids.map((bid) => {
						const bidder = bid.bidder;
						const bidStatus =
							bidStatusConfig[bid.status] || bidStatusConfig.PENDING;
						const isExpanded = expandedBids.has(bid.id);
						const isPending = bid.status === "PENDING";

						return (
							<Card
								key={bid.id}
								className="overflow-hidden border-slate-200/70 transition-all hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
							>
								<CardContent className="p-6">
									<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
										<Avatar className="h-14 w-14 ring-2 ring-emerald-500/20">
											<AvatarImage src={bidder?.image || undefined} />
											<AvatarFallback className="bg-gradient-to-br from-emerald-500 to-cyan-500 font-semibold text-white">
												{bidder?.name?.charAt(0) || "?"}
											</AvatarFallback>
										</Avatar>

										<div className="min-w-0 flex-1">
											<div className="mb-2 flex flex-wrap items-center gap-2">
												<span className="font-semibold text-slate-900 dark:text-white">
													{bidder?.name || "Хэрэглэгч"}
												</span>
												<Badge className={bidStatus.className}>
													{bidStatus.label}
												</Badge>
											</div>

											<div className="mb-3 flex flex-wrap items-center gap-3 text-slate-500 text-sm dark:text-slate-400">
												{bidder?.avgRatingAsWorker &&
													bidder.avgRatingAsWorker > 0 && (
														<span className="flex items-center gap-1 font-medium text-amber-500">
															<Star className="h-4 w-4 fill-current" />
															{bidder.avgRatingAsWorker.toFixed(1)}
														</span>
													)}
												<span className="flex items-center gap-1">
													<CheckCircle2 className="h-4 w-4" />
													{bidder?.completedTasksAsWorker || 0} даалгавар
													гүйцэтгэсэн
												</span>
											</div>

											<div className="mb-3 flex flex-wrap items-center gap-4">
												<span className="font-bold text-emerald-600 text-lg dark:text-emerald-400">
													{formatBudget(bid.amount)}₮
												</span>
												{bid.estimatedHours && (
													<span className="flex items-center gap-1 text-slate-500 text-sm dark:text-slate-400">
														<Clock className="h-4 w-4" />~{bid.estimatedHours}{" "}
														цаг
													</span>
												)}
												<span className="text-slate-400 text-sm">
													{formatTimeAgo(bid.createdAt)}
												</span>
											</div>

											<div
												className={`rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50 ${isExpanded ? "" : "line-clamp-2"}`}
											>
												<p className="whitespace-pre-wrap text-slate-600 text-sm dark:text-slate-300">
													{bid.message}
												</p>
											</div>
											{bid.message.length > 150 && (
												<button
													type="button"
													onClick={() => toggleBidExpand(bid.id)}
													className="mt-2 font-medium text-emerald-600 text-sm hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
												>
													{isExpanded ? "Багасгах" : "Дэлгэрэнгүй"}
												</button>
											)}
										</div>

										{isTaskOpen && isPending && (
											<div className="flex gap-2 sm:flex-col">
												<Button
													size="sm"
													className="gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
													onClick={() => acceptBidMutation.mutate(bid.id)}
													disabled={
														acceptBidMutation.isPending ||
														rejectBidMutation.isPending
													}
												>
													{acceptBidMutation.isPending ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<CheckCircle2 className="h-4 w-4" />
													)}
													Зөвшөөрөх
												</Button>
												<Button
													size="sm"
													variant="outline"
													className="gap-2 border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
													onClick={() => rejectBidMutation.mutate(bid.id)}
													disabled={
														acceptBidMutation.isPending ||
														rejectBidMutation.isPending
													}
												>
													{rejectBidMutation.isPending ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<XCircle className="h-4 w-4" />
													)}
													Татгалзах
												</Button>
											</div>
										)}
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			)}
		</div>
	);
}
