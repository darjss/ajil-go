"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Calendar,
	CheckCircle2,
	Clock,
	FileText,
	Loader2,
	MapPin,
	Send,
	Star,
	Tag,
	User,
	Users,
	Wifi,
} from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";
import { toast } from "sonner";
import { getTaskStatusConfig, SkillBadges } from "@/components/tasks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { bidsApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { bidQueries, taskQueries } from "@/lib/queries";
import { formatBudget, formatDate, formatTimeAgo } from "@/lib/utils";

interface TaskDetailPageProps {
	params: Promise<{ id: string }>;
}

function formatDateTime(date: Date | string): string {
	return new Intl.DateTimeFormat("mn-MN", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(date));
}

function TaskDetailSkeleton() {
	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<Skeleton className="mb-6 h-4 w-32" />
			<div className="grid gap-8 lg:grid-cols-3">
				<div className="space-y-6 lg:col-span-2">
					<Card>
						<CardContent className="p-6 pt-6">
							<div className="mb-4 flex items-start justify-between">
								<Skeleton className="h-8 w-3/4" />
								<Skeleton className="h-6 w-20" />
							</div>
							<div className="mb-6 flex gap-2">
								<Skeleton className="h-5 w-24" />
								<Skeleton className="h-5 w-20" />
							</div>
							<Skeleton className="mb-4 h-32 w-full" />
							<Skeleton className="mb-2 h-16 w-full rounded-lg" />
						</CardContent>
					</Card>
				</div>
				<div className="space-y-6">
					<Card>
						<CardContent className="p-6">
							<Skeleton className="mb-4 h-6 w-24" />
							<div className="flex items-center gap-4">
								<Skeleton className="h-16 w-16 rounded-sm" />
								<div className="space-y-2">
									<Skeleton className="h-5 w-32" />
									<Skeleton className="h-4 w-24" />
								</div>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6">
							<Skeleton className="mb-4 h-6 w-32" />
							<Skeleton className="mb-4 h-10 w-full" />
							<Skeleton className="mb-4 h-10 w-full" />
							<Skeleton className="mb-4 h-24 w-full" />
							<Skeleton className="h-10 w-full" />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

function BidSubmissionForm({
	taskId,
	onSuccess,
}: {
	taskId: string;
	onSuccess: () => void;
}) {
	const { data: session } = authClient.useSession();
	const [amount, setAmount] = useState("");
	const [estimatedHours, setEstimatedHours] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState<{
		amount?: string;
		message?: string;
	}>({});

	const mutation = useMutation({
		mutationFn: (data: {
			taskId: string;
			bidderId: string;
			amount: number;
			message: string;
			estimatedHours?: number;
		}) => bidsApi.create(data),
		onSuccess: () => {
			toast.success("Санал амжилттай илгээгдлээ!");
			setAmount("");
			setEstimatedHours("");
			setMessage("");
			setErrors({});
			onSuccess();
		},
		onError: (error: Error) => {
			toast.error(error.message || "Санал илгээхэд алдаа гарлаа");
		},
	});

	const validateForm = () => {
		const newErrors: { amount?: string; message?: string } = {};

		if (!amount || Number(amount) <= 0) {
			newErrors.amount = "Саналын дүн оруулна уу";
		}

		if (!message.trim()) {
			newErrors.message = "Танилцуулга бичнэ үү";
		} else if (message.length < 10) {
			newErrors.message = "Танилцуулга хамгийн багадаа 10 тэмдэгт байх ёстой";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!session?.user?.id) {
			toast.error("Та нэвтрэх шаардлагатай");
			return;
		}

		if (!validateForm()) return;

		mutation.mutate({
			taskId,
			bidderId: session.user.id,
			amount: Number(amount),
			message: message.trim(),
			estimatedHours: estimatedHours ? Number(estimatedHours) : undefined,
		});
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-5">
			<div className="space-y-2">
				<Label htmlFor="amount" className="font-medium text-foreground">
					Таны саналын дүн
				</Label>
				<div className="relative">
					<Input
						id="amount"
						type="number"
						placeholder="0"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						className={`pr-8 ${errors.amount ? "border-destructive" : ""}`}
						min="0"
					/>
					<span className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 text-muted-foreground text-sm">
						₮
					</span>
				</div>
				{errors.amount && (
					<p className="text-destructive text-sm">{errors.amount}</p>
				)}
			</div>

			<div className="space-y-2">
				<Label htmlFor="estimatedHours" className="font-medium text-foreground">
					Хэдэн цагт хийх вэ?{" "}
					<span className="text-muted-foreground">(заавал биш)</span>
				</Label>
				<div className="relative">
					<Input
						id="estimatedHours"
						type="number"
						placeholder="0"
						value={estimatedHours}
						onChange={(e) => setEstimatedHours(e.target.value)}
						className="pr-12"
						min="0"
					/>
					<span className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 text-muted-foreground text-sm">
						цаг
					</span>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="message" className="font-medium text-foreground">
					Танилцуулга
				</Label>
				<Textarea
					id="message"
					placeholder="Яагаад та энэ даалгаврыг гүйцэтгэхэд хамгийн тохиромжтой вэ? Ур чадвар, туршлагаа товч тайлбарлана уу..."
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className={`min-h-[120px] resize-none ${errors.message ? "border-destructive" : ""}`}
					maxLength={2000}
				/>
				{errors.message && (
					<p className="text-destructive text-sm">{errors.message}</p>
				)}
				<p className="text-right text-muted-foreground text-xs">
					{message.length}/2000
				</p>
			</div>

			<Button
				type="submit"
				className="w-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
				disabled={mutation.isPending}
			>
				{mutation.isPending ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Илгээж байна...
					</>
				) : (
					<>
						<Send className="mr-2 h-4 w-4" />
						Санал илгээх
					</>
				)}
			</Button>
		</form>
	);
}

function UserBidCard({
	bid,
}: {
	bid: {
		amount: number;
		message: string;
		estimatedHours: number | null;
		status: string;
		createdAt: Date;
	};
}) {
	const bidStatusMap: Record<string, { label: string; color: string }> = {
		PENDING: {
			label: "Хүлээгдэж буй",
			color: "bg-secondary/10 text-secondary-foreground",
		},
		ACCEPTED: {
			label: "Зөвшөөрөгдсөн",
			color: "bg-primary/10 text-primary",
		},
		REJECTED: {
			label: "Татгалзсан",
			color: "bg-destructive/10 text-destructive",
		},
		WITHDRAWN: {
			label: "Буцаагдсан",
			color: "bg-muted text-muted-foreground",
		},
	};

	const statusInfo = bidStatusMap[bid.status] || bidStatusMap.PENDING;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<span className="font-medium text-foreground">Таны санал</span>
				<Badge className={statusInfo.color}>{statusInfo.label}</Badge>
			</div>
			<div className="space-y-3 rounded-lg bg-muted/50 p-4">
				<div className="flex items-center justify-between">
					<span className="text-muted-foreground text-sm">Саналын дүн</span>
					<span className="font-semibold text-foreground">
						{new Intl.NumberFormat("mn-MN").format(bid.amount)}₮
					</span>
				</div>
				{bid.estimatedHours && (
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground text-sm">Хугацаа</span>
						<span className="text-foreground">{bid.estimatedHours} цаг</span>
					</div>
				)}
				<Separator />
				<div>
					<span className="text-muted-foreground text-sm">Танилцуулга</span>
					<p className="mt-1 text-foreground text-sm font-body">
						{bid.message}
					</p>
				</div>
				<p className="text-muted-foreground text-xs">
					Илгээсэн: {formatTimeAgo(bid.createdAt)}
				</p>
			</div>
		</div>
	);
}

function BidsList({ taskId }: { taskId: string }) {
	const { data: bidsData, isLoading } = useQuery(bidQueries.byTask(taskId));

	if (isLoading) {
		return (
			<div className="space-y-4">
				{[1, 2, 3].map((i) => (
					<div key={`bid-skeleton-${i}`} className="rounded-lg border p-4">
						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 rounded-sm" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}

	const bids = bidsData?.data || [];

	if (bids.length === 0) {
		return (
			<div className="rounded-lg border border-dashed bg-muted/30 py-12 text-center">
				<Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
				<p className="font-medium text-foreground">
					Одоогоор санал ирээгүй байна
				</p>
				<p className="mt-1 text-muted-foreground text-sm">
					Гүйцэтгэгчид удахгүй санал илгээнэ
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			{bids.map((bid) => (
				<div
					key={bid.id}
					className="group rounded-lg border bg-card p-5 transition-all hover:border-primary hover:bg-muted/5"
				>
					<div className="flex items-start justify-between gap-4">
						<div className="flex items-start gap-4">
							<Avatar className="h-12 w-12 ring-1 ring-border">
								<AvatarImage src={bid.bidder?.image || undefined} />
								<AvatarFallback className="bg-primary/10 font-semibold text-primary">
									{bid.bidder?.name?.charAt(0) || "?"}
								</AvatarFallback>
							</Avatar>
							<div className="min-w-0 flex-1">
								<div className="flex items-center gap-2">
									<h4 className="font-semibold text-foreground">
										{bid.bidder?.name || "Хэрэглэгч"}
									</h4>
									{bid.bidder?.avgRatingAsWorker &&
										bid.bidder.avgRatingAsWorker > 0 && (
											<div className="flex items-center gap-1 text-primary">
												<Star className="h-3.5 w-3.5 fill-current" />
												<span className="font-medium text-sm">
													{bid.bidder.avgRatingAsWorker.toFixed(1)}
												</span>
											</div>
										)}
								</div>
								{bid.bidder?.completedTasksAsWorker !== undefined &&
									bid.bidder.completedTasksAsWorker > 0 && (
										<p className="text-muted-foreground text-sm">
											{bid.bidder.completedTasksAsWorker} даалгавар гүйцэтгэсэн
										</p>
									)}
							</div>
						</div>
						<div className="text-right">
							<div className="font-bold text-foreground text-lg">
								{new Intl.NumberFormat("mn-MN").format(bid.amount)}₮
							</div>
							{bid.estimatedHours && (
								<p className="text-muted-foreground text-sm">
									{bid.estimatedHours} цагт
								</p>
							)}
						</div>
					</div>

					<p className="mt-4 line-clamp-3 text-muted-foreground text-sm font-body">
						{bid.message}
					</p>

					<div className="mt-4 flex items-center justify-between border-border/50 border-t pt-4">
						<span className="text-muted-foreground text-xs">
							{formatTimeAgo(bid.createdAt)}
						</span>
						<div className="flex gap-2">
							<Button size="sm" variant="outline">
								Дэлгэрэнгүй
							</Button>
							<Button
								size="sm"
								className="bg-primary text-primary-foreground hover:bg-primary/90"
							>
								Сонгох
							</Button>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

function TaskDetailContent({ taskId }: { taskId: string }) {
	const queryClient = useQueryClient();
	const { data: session } = authClient.useSession();
	const { data: task, isLoading, error } = useQuery(taskQueries.detail(taskId));

	const { data: userBidsData } = useQuery({
		...bidQueries.list({ taskId, bidderId: session?.user?.id }),
		enabled: !!session?.user?.id && !!taskId,
	});

	const userBid = userBidsData?.data?.[0];
	const isPoster = session?.user?.id === task?.posterId;
	const isLoggedIn = !!session?.user;

	const handleBidSuccess = () => {
		queryClient.invalidateQueries({ queryKey: ["bids"] });
		queryClient.invalidateQueries({ queryKey: ["tasks", "detail", taskId] });
	};

	if (isLoading) {
		return <TaskDetailSkeleton />;
	}

	if (error || !task) {
		return (
			<div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
				<FileText className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
				<h1 className="font-bold text-2xl text-foreground">
					Даалгавар олдсонгүй
				</h1>
				<p className="mt-2 text-muted-foreground">
					Энэ даалгавар устсан эсвэл байхгүй байна
				</p>
				<Link href="/tasks">
					<Button className="mt-6">Даалгаврууд руу буцах</Button>
				</Link>
			</div>
		);
	}

	const statusInfo = getTaskStatusConfig(task.status);

	return (
		<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
			<nav className="mb-6 text-muted-foreground text-sm">
				<Link href="/" className="transition-colors hover:text-foreground">
					Нүүр
				</Link>
				{" / "}
				<Link href="/tasks" className="transition-colors hover:text-foreground">
					Даалгаврууд
				</Link>
				{" / "}
				<span className="text-foreground">Даалгаврын дэлгэрэнгүй</span>
			</nav>

			<div className="grid gap-8 lg:grid-cols-3">
				<div className="space-y-6 lg:col-span-2">
					<Card className="overflow-hidden border-t-4 border-primary shadow-sm">
						<CardContent className="p-6 pt-6">
							<div className="mb-4 flex flex-wrap items-start justify-between gap-3">
								<h1 className="font-display font-bold text-3xl text-foreground leading-tight md:text-4xl">
									{task.title}
								</h1>
								<Badge
									variant={statusInfo.variant}
									className="shrink-0 rounded-none text-sm"
								>
									{statusInfo.label}
								</Badge>
							</div>

							<div className="mb-6 flex flex-wrap items-center gap-2">
								{task.category && (
									<Badge
										variant="secondary"
										className="bg-secondary/30 text-secondary-foreground"
									>
										<Tag className="mr-1 h-3 w-3" />
										{task.category.name}
									</Badge>
								)}
								<Badge
									variant={task.isRemote ? "default" : "outline"}
									className={
										task.isRemote
											? "bg-primary/10 text-primary hover:bg-primary/20"
											: ""
									}
								>
									{task.isRemote ? (
										<>
											<Wifi className="mr-1 h-3 w-3" />
											Алсаас ажиллах боломжтой
										</>
									) : (
										<>
											<MapPin className="mr-1 h-3 w-3" />
											{task.city || "Газар дээр"}
										</>
									)}
								</Badge>
								{task.city && !task.isRemote && (
									<Badge variant="outline">
										<MapPin className="mr-1 h-3 w-3" />
										{task.city}
									</Badge>
								)}
							</div>

							<div className="prose prose-slate dark:prose-invert mb-6 max-w-none font-body">
								<p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
									{task.description}
								</p>
							</div>

							<div className="mb-6 bg-primary/5 p-6 border-l-4 border-primary/20">
								<div className="mb-2 flex items-center gap-2 text-muted-foreground text-sm">
									<span className="font-mono text-xs uppercase tracking-wider">
										Төсөв
									</span>
								</div>
								<div className="font-mono font-bold text-3xl text-foreground md:text-4xl">
									{formatBudget(task.budgetMin, task.budgetMax)}
								</div>
							</div>

							<div className="grid gap-4 sm:grid-cols-2">
								{task.deadline && (
									<div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
											<Calendar className="h-5 w-5" />
										</div>
										<div>
											<p className="text-muted-foreground text-xs uppercase tracking-wider">
												Эцсийн хугацаа
											</p>
											<p className="font-medium text-foreground font-mono">
												{formatDate(task.deadline)}
											</p>
										</div>
									</div>
								)}
								{task.estimatedHours && (
									<div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
										<div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
											<Clock className="h-5 w-5" />
										</div>
										<div>
											<p className="text-muted-foreground text-xs uppercase tracking-wider">
												Тооцоолсон хугацаа
											</p>
											<p className="font-medium text-foreground font-mono">
												{task.estimatedHours} цаг
											</p>
										</div>
									</div>
								)}
							</div>

							{task.skills && task.skills.length > 0 && (
								<div className="mt-6">
									<h3 className="mb-3 font-semibold text-foreground">
										Шаардлагатай чадвар
									</h3>
									<SkillBadges skills={task.skills} />
								</div>
							)}

							<div className="mt-6 border-border/50 border-t pt-4">
								<p className="text-muted-foreground text-sm">
									Нийтлэгдсэн: {formatDateTime(task.createdAt)}
								</p>
							</div>
						</CardContent>
					</Card>

					{isPoster && (
						<Card>
							<CardHeader>
								<div className="flex items-center justify-between">
									<CardTitle className="flex items-center gap-2">
										<Users className="h-5 w-5 text-primary" />
										Саналууд
									</CardTitle>
									<Badge variant="secondary">
										{task._count?.bids || 0} санал
									</Badge>
								</div>
								<CardDescription>Гүйцэтгэгчдээс ирсэн саналууд</CardDescription>
							</CardHeader>
							<CardContent>
								<BidsList taskId={taskId} />
							</CardContent>
						</Card>
					)}
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader className="pb-4">
							<CardTitle className="flex items-center gap-2 text-base">
								<User className="h-4 w-4 text-primary" />
								Захиалагч
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-4">
								<Avatar className="h-16 w-16 ring-1 ring-border">
									<AvatarImage src={task.poster?.image || undefined} />
									<AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
										{task.poster?.name?.charAt(0) || "?"}
									</AvatarFallback>
								</Avatar>
								<div className="min-w-0 flex-1">
									<h3 className="truncate font-semibold text-foreground">
										{task.poster?.name || "Хэрэглэгч"}
									</h3>
									{task.poster?.avgRatingAsClient !== undefined &&
										task.poster.avgRatingAsClient > 0 && (
											<div className="mt-1 flex items-center gap-1 text-primary">
												<Star className="h-4 w-4 fill-current" />
												<span className="font-medium">
													{task.poster.avgRatingAsClient.toFixed(1)}
												</span>
												<span className="text-muted-foreground text-sm">
													/5
												</span>
											</div>
										)}
									{task.poster?.completedTasksAsClient !== undefined &&
										task.poster.completedTasksAsClient > 0 && (
											<p className="mt-1 flex items-center gap-1 text-muted-foreground text-sm">
												<CheckCircle2 className="h-3.5 w-3.5" />
												{task.poster.completedTasksAsClient} даалгавар нийтэлсэн
											</p>
										)}
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-5">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Users className="h-5 w-5 text-primary" />
									<span className="text-muted-foreground">Нийт санал</span>
								</div>
								<span className="font-bold text-2xl text-foreground">
									{task._count?.bids || 0}
								</span>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader className="pb-4">
							<CardTitle className="text-base">
								{isPoster
									? "Энэ таны даалгавар"
									: userBid
										? "Таны санал"
										: "Энэ даалгаварт санал өгөх"}
							</CardTitle>
						</CardHeader>
						<CardContent>
							{isPoster ? (
								<div className="rounded-lg bg-muted/50 p-4 text-center">
									<p className="text-muted-foreground text-sm">
										Та энэ даалгаврыг нийтэлсэн байна. Гүйцэтгэгчдээс ирсэн
										саналуудыг доорх хэсгээс харна уу.
									</p>
								</div>
							) : userBid ? (
								<UserBidCard bid={userBid} />
							) : isLoggedIn ? (
								task.status === "OPEN" ? (
									<BidSubmissionForm
										taskId={taskId}
										onSuccess={handleBidSuccess}
									/>
								) : (
									<div className="rounded-lg bg-muted/50 p-4 text-center">
										<p className="text-muted-foreground text-sm">
											Энэ даалгавар санал хүлээн авахгүй болсон байна
										</p>
									</div>
								)
							) : (
								<div className="space-y-4">
									<p className="text-center text-muted-foreground text-sm">
										Санал илгээхийн тулд нэвтэрнэ үү
									</p>
									<Link href="/login" className="block">
										<Button className="w-full">Нэвтрэх</Button>
									</Link>
									<p className="text-center text-muted-foreground text-xs">
										Бүртгэлгүй бол{" "}
										<Link
											href="/signup"
											className="text-primary hover:underline"
										>
											энд дарж
										</Link>{" "}
										бүртгүүлнэ үү
									</p>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default function TaskDetailPage({ params }: TaskDetailPageProps) {
	const resolvedParams = use(params);

	return (
		<main className="min-h-screen bg-background">
			<TaskDetailContent taskId={resolvedParams.id} />
		</main>
	);
}
