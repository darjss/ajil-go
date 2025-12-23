"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	AlertCircle,
	ArrowRight,
	Briefcase,
	Calendar,
	Clock,
	ExternalLink,
	FileText,
	Search,
	X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { bidsApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { bidKeys, bidQueries } from "@/lib/queries";
import { formatCurrency, formatDateShort } from "@/lib/utils";

const statusColors: Record<string, string> = {
	PENDING: "bg-accent/50 text-accent-foreground border-border",
	ACCEPTED: "bg-primary/10 text-primary border-primary/30",
	REJECTED: "bg-destructive/10 text-destructive border-destructive/30",
	WITHDRAWN: "bg-muted text-muted-foreground border-border",
};

const statusLabels: Record<string, string> = {
	PENDING: "Хүлээгдэж буй",
	ACCEPTED: "Хүлээн авсан",
	REJECTED: "Татгалзсан",
	WITHDRAWN: "Цуцалсан",
};

type BidStatus = "ALL" | "PENDING" | "ACCEPTED" | "REJECTED";

const tabItems: { value: BidStatus; label: string }[] = [
	{ value: "ALL", label: "Бүгд" },
	{ value: "PENDING", label: "Хүлээгдэж буй" },
	{ value: "ACCEPTED", label: "Хүлээн авсан" },
	{ value: "REJECTED", label: "Татгалзсан" },
];

function BidCardSkeleton() {
	return (
		<Card className="border-border">
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<Skeleton className="h-12 w-12 shrink-0 rounded-sm" />
					<div className="flex-1 space-y-3">
						<Skeleton className="h-5 w-3/4" />
						<Skeleton className="h-4 w-1/2" />
						<div className="flex gap-4">
							<Skeleton className="h-4 w-24" />
							<Skeleton className="h-4 w-24" />
						</div>
					</div>
					<Skeleton className="h-6 w-24 rounded-sm" />
				</div>
			</CardContent>
		</Card>
	);
}

export default function WorkerBidsPage() {
	const queryClient = useQueryClient();
	const { data: session, isPending: isSessionLoading } =
		authClient.useSession();
	const [activeTab, setActiveTab] = useState<BidStatus>("ALL");

	// Auth is handled by server-side layout
	const userId = session?.user?.id;

	const { data: bidsData, isLoading: isBidsLoading } = useQuery({
		...bidQueries.byBidder(userId || ""),
		enabled: !!userId,
	});

	const withdrawMutation = useMutation({
		mutationFn: (bidId: string) =>
			bidsApi.update(bidId, { status: "WITHDRAWN" }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: bidKeys.lists() });
		},
	});

	const bids = bidsData?.data || [];

	const filteredBids =
		activeTab === "ALL" ? bids : bids.filter((b) => b.status === activeTab);

	const counts = {
		ALL: bids.length,
		PENDING: bids.filter((b) => b.status === "PENDING").length,
		ACCEPTED: bids.filter((b) => b.status === "ACCEPTED").length,
		REJECTED: bids.filter((b) => b.status === "REJECTED").length,
	};

	if (isSessionLoading) {
		return (
			<div className="min-h-screen p-6 lg:p-8">
				<div className="mx-auto max-w-4xl space-y-6">
					<div className="space-y-2">
						<Skeleton className="h-8 w-48" />
						<Skeleton className="h-4 w-64" />
					</div>
					<Skeleton className="h-10 w-full max-w-md" />
					<div className="space-y-4">
						{Array.from({ length: 5 }).map((_, i) => (
							<BidCardSkeleton key={`skeleton-${i.toString()}`} />
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6 lg:p-8">
			<div className="mx-auto max-w-4xl space-y-6">
				<header>
					<h1 className="font-bold font-display text-2xl text-foreground lg:text-3xl">
						Миний саналууд
					</h1>
					<p className="mt-1 text-muted-foreground">
						Таны илгээсэн бүх саналуудыг энд харах боломжтой
					</p>
				</header>

				<Tabs
					value={activeTab}
					onValueChange={(v) => setActiveTab(v as BidStatus)}
					className="w-full"
				>
					<TabsList className="grid w-full max-w-lg grid-cols-4 bg-muted">
						{tabItems.map((tab) => (
							<TabsTrigger
								key={tab.value}
								value={tab.value}
								className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
							>
								{tab.label}
								{counts[tab.value] > 0 && (
									<span className="ml-1.5 rounded-sm bg-muted px-1.5 py-0.5 font-mono font-semibold text-[10px] data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
										{counts[tab.value]}
									</span>
								)}
							</TabsTrigger>
						))}
					</TabsList>

					<TabsContent value={activeTab} className="mt-6">
						{isBidsLoading ? (
							<div className="space-y-4">
								{Array.from({ length: 5 }).map((_, i) => (
									<BidCardSkeleton key={`loading-${i.toString()}`} />
								))}
							</div>
						) : filteredBids.length === 0 ? (
							<div className="flex flex-col items-center justify-center rounded-none border-2 border-border border-dashed bg-muted/50 py-16 text-center">
								<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-muted">
									<FileText className="h-8 w-8 text-muted-foreground" />
								</div>
								<h3 className="font-semibold text-foreground">
									{activeTab === "ALL"
										? "Санал байхгүй байна"
										: `${statusLabels[activeTab]} санал байхгүй`}
								</h3>
								<p className="mt-1 max-w-sm text-muted-foreground text-sm">
									Даалгавруудаас сонгон санал илгээнэ үү
								</p>
								<Link href="/tasks" className="mt-4">
									<Button
										type="button"
										className="bg-primary text-primary-foreground"
									>
										<Search className="mr-2 h-4 w-4" />
										Даалгавар хайх
									</Button>
								</Link>
							</div>
						) : (
							<div className="space-y-4">
								{filteredBids.map((bid) => (
									<Card
										key={bid.id}
										className="group overflow-hidden border-border transition-all hover:border-primary/50 hover:shadow-lg"
									>
										<CardContent className="p-6">
											<div className="flex flex-col gap-4 sm:flex-row sm:items-start">
												<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-none bg-primary/10">
													<Briefcase className="h-6 w-6 text-primary" />
												</div>

												<div className="min-w-0 flex-1">
													<div className="flex flex-wrap items-start justify-between gap-2">
														<Link
															href={`/task/${bid.taskId}`}
															className="group/link flex items-center gap-2"
														>
															<h3 className="font-semibold text-foreground transition-colors group-hover/link:text-primary">
																{bid.task?.title || "Даалгавар"}
															</h3>
															<ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover/link:opacity-100" />
														</Link>
														<Badge
															variant="outline"
															className={statusColors[bid.status]}
														>
															{statusLabels[bid.status]}
														</Badge>
													</div>

													<div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm">
														<div className="flex items-center gap-1.5">
															<span className="font-semibold text-primary">
																{formatCurrency(bid.amount)}₮
															</span>
														</div>
														{bid.estimatedHours && (
															<div className="flex items-center gap-1.5">
																<Clock className="h-4 w-4" />
																<span>{bid.estimatedHours} цаг</span>
															</div>
														)}
														<div className="flex items-center gap-1.5">
															<Calendar className="h-4 w-4" />
															<span>{formatDateShort(bid.createdAt)}</span>
														</div>
													</div>

													{bid.message && (
														<p className="mt-3 line-clamp-2 text-muted-foreground text-sm">
															{bid.message}
														</p>
													)}

													{bid.status === "PENDING" && (
														<div className="mt-4 flex items-center gap-3">
															<Button
																variant="outline"
																size="sm"
																type="button"
																onClick={() => withdrawMutation.mutate(bid.id)}
																disabled={withdrawMutation.isPending}
																className="border-red-200 text-red-600 hover:bg-red-50"
															>
																<X className="mr-1.5 h-3.5 w-3.5" />
																Цуцлах
															</Button>
															<Link href={`/task/${bid.taskId}`}>
																<Button
																	variant="outline"
																	size="sm"
																	type="button"
																	className="border-border"
																>
																	Даалгавар үзэх
																	<ArrowRight className="ml-1.5 h-3.5 w-3.5" />
																</Button>
															</Link>
														</div>
													)}

													{bid.status === "ACCEPTED" && bid.task && (
														<div className="mt-4 flex items-center gap-2 rounded-none bg-primary/10 px-3 py-2">
															<AlertCircle className="h-4 w-4 text-primary" />
															<span className="text-primary text-sm">
																Таны санал хүлээн авагдлаа. Даалгавар дээр
																ажиллаж эхлэх боломжтой.
															</span>
															<Link
																href={`/task/${bid.taskId}`}
																className="ml-auto"
															>
																<Button
																	size="sm"
																	type="button"
																	className="bg-primary text-primary-foreground hover:bg-primary/90"
																>
																	Үзэх
																</Button>
															</Link>
														</div>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>
						)}
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
