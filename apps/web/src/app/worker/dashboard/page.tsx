"use client";

import { useQuery } from "@tanstack/react-query";
import {
	ArrowRight,
	Banknote,
	Briefcase,
	CheckCircle2,
	Clock,
	FileText,
	Search,
	TrendingUp,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { PageHeader } from "@/components/page-layout";
import { StatCard, StatCardSkeleton } from "@/components/stat-card";
import { EmptyState } from "@/components/states";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { bidQueries } from "@/lib/queries";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";

function RecentBidsSkeleton() {
	return (
		<div className="space-y-3">
			{Array.from({ length: 5 }).map((_, i) => (
				<div
					key={`bid-skeleton-${i.toString()}`}
					className="flex items-center gap-4 rounded-xl bg-muted/50 p-4"
				>
					<Skeleton className="h-10 w-10 rounded-lg" />
					<div className="flex-1 space-y-2">
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
					<Skeleton className="h-6 w-20 rounded-full" />
				</div>
			))}
		</div>
	);
}

export default function WorkerDashboardPage() {
	const router = useRouter();
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

	const bids = bidsData?.data || [];
	const totalBids = bids.length;
	const pendingBids = bids.filter((b) => b.status === "PENDING").length;
	const acceptedBids = bids.filter((b) => b.status === "ACCEPTED").length;
	const activeTasks = bids.filter(
		(b) =>
			b.status === "ACCEPTED" &&
			b.task &&
			["ASSIGNED", "IN_PROGRESS"].includes(b.task.status),
	).length;

	const recentBids = bids.slice(0, 5);

	const today = new Date().toLocaleDateString("mn-MN", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	if (isSessionLoading) {
		return (
			<div className="min-h-screen p-6 lg:p-8">
				<div className="mx-auto max-w-6xl space-y-8">
					<div className="space-y-2">
						<Skeleton className="h-8 w-64" />
						<Skeleton className="h-4 w-48" />
					</div>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{Array.from({ length: 4 }).map((_, i) => (
							<StatCardSkeleton key={`stats-skeleton-${i.toString()}`} />
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6 lg:p-8">
			<div className="mx-auto max-w-6xl space-y-8">
				<PageHeader
					title={`Сайн байна уу, ${session?.user?.name || "Гүйцэтгэгч"}`}
					description={today}
					actions={
						<Link href="/tasks">
							<Button type="button">
								<Search className="mr-2 h-4 w-4" />
								Даалгавар хайх
							</Button>
						</Link>
					}
				/>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{isBidsLoading ? (
						Array.from({ length: 4 }).map((_, i) => (
							<StatCardSkeleton key={`loading-skeleton-${i.toString()}`} />
						))
					) : (
						<>
							<StatCard
								label="Нийт саналууд"
								value={totalBids}
								icon={<FileText className="h-6 w-6" />}
							/>
							<StatCard
								label="Хүлээгдэж буй"
								value={pendingBids}
								icon={<Clock className="h-6 w-6" />}
							/>
							<StatCard
								label="Хүлээн авсан"
								value={acceptedBids}
								icon={<CheckCircle2 className="h-6 w-6" />}
							/>
							<StatCard
								label="Идэвхтэй даалгавар"
								value={activeTasks}
								icon={<Briefcase className="h-6 w-6" />}
							/>
						</>
					)}
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					<Card className="lg:col-span-2">
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-lg font-semibold">
								Сүүлийн саналууд
							</CardTitle>
							<Link
								href={"/worker/bids" as Route}
								className="group flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
							>
								Бүгдийг харах
								<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
							</Link>
						</CardHeader>
						<CardContent>
							{isBidsLoading ? (
								<RecentBidsSkeleton />
							) : recentBids.length === 0 ? (
								<EmptyState
									icon={<FileText className="h-8 w-8 text-muted-foreground" />}
									title="Санал байхгүй байна"
									description="Даалгавруудаас сонгон санал илгээнэ үү"
									action={{
										label: "Даалгавар хайх",
										onClick: () => router.push("/tasks"),
									}}
								/>
							) : (
								<div className="space-y-3">
									{recentBids.map((bid) => (
										<Link
											key={bid.id}
											href={`/task/${bid.taskId}`}
											className="group flex items-center gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted"
										>
											<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
												<Briefcase className="h-5 w-5 text-primary" />
											</div>
											<div className="min-w-0 flex-1">
												<p className="truncate text-sm font-medium text-foreground transition-colors group-hover:text-primary">
													{bid.task?.title || "Даалгавар"}
												</p>
												<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
													<span>{formatCurrency(bid.amount)}₮</span>
													<span>•</span>
													<span>{formatTimeAgo(bid.createdAt)}</span>
												</div>
											</div>
											<StatusBadge
												status={bid.status}
												type="bid"
												className="shrink-0"
											/>
										</Link>
									))}
								</div>
							)}
						</CardContent>
					</Card>

					<div className="space-y-6">
						<Card>
							<CardHeader className="bg-primary pb-4">
								<CardTitle className="flex items-center gap-2 text-lg font-semibold text-primary-foreground">
									<TrendingUp className="h-5 w-5" />
									Орлогын мэдээлэл
								</CardTitle>
							</CardHeader>
							<CardContent className="p-6">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<span className="text-sm text-muted-foreground">
											Дууссан даалгавар
										</span>
										<span className="font-semibold text-foreground">
											{
												bids.filter(
													(b) =>
														b.status === "ACCEPTED" &&
														b.task?.status === "COMPLETED",
												).length
											}
										</span>
									</div>
									<div className="h-px bg-border" />
									<div className="flex items-center justify-between">
										<span className="text-sm text-muted-foreground">
											Нийт орлого
										</span>
										<span className="text-lg font-bold text-primary">
											{formatCurrency(
												bids
													.filter(
														(b) =>
															b.status === "ACCEPTED" &&
															b.task?.status === "COMPLETED",
													)
													.reduce((sum, b) => sum + b.amount, 0),
											)}
											₮
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card className="bg-primary/5">
							<CardContent className="p-6">
								<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
									<Banknote className="h-6 w-6" />
								</div>
								<h3 className="font-semibold text-foreground">
									Шинэ боломж хайж байна уу?
								</h3>
								<p className="mt-2 text-sm text-muted-foreground">
									Олон зуун даалгавраас сонгон өөрийн чадварт тохирохыг олоорой.
								</p>
								<Link href="/tasks" className="mt-4 block">
									<Button type="button" className="w-full">
										Даалгавар үзэх
										<ArrowRight className="ml-2 h-4 w-4" />
									</Button>
								</Link>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
