"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	ArrowRight,
	BadgeCheck,
	Banknote,
	Briefcase,
	CheckCircle2,
	ChevronRight,
	Clock,
	FileText,
	Handshake,
	MapPin,
	Search,
	Shield,
	Sparkles,
	Star,
	TrendingUp,
	Users,
	Wifi,
	Zap,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { CategoryApiResponse, TaskApiResponse } from "@/lib/queries";
import { categoryQueries, taskQueries } from "@/lib/queries";

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

function formatTimeAgo(date: Date): string {
	const now = new Date();
	const diff = now.getTime() - new Date(date).getTime();
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(hours / 24);

	if (days > 0) return `${days} өдрийн өмнө`;
	if (hours > 0) return `${hours} цагийн өмнө`;
	return "Саяхан";
}

const categoryIcons: Record<string, React.ReactNode> = {
	Цэвэрлэгээ: <Sparkles className="h-6 w-6" />,
	Тээвэр: <TrendingUp className="h-6 w-6" />,
	Засвар: <Zap className="h-6 w-6" />,
	IT: <FileText className="h-6 w-6" />,
	Дизайн: <Star className="h-6 w-6" />,
	"Бичиг хэрэг": <FileText className="h-6 w-6" />,
	default: <Briefcase className="h-6 w-6" />,
};

function getCategoryIcon(name: string): React.ReactNode {
	return categoryIcons[name] || categoryIcons.default;
}

function HeroSection() {
	return (
		<section className="relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

			<div className="-left-32 absolute top-20 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
			<div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
			<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}}
			/>

			<div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-32">
				<div className="grid items-center gap-12 lg:grid-cols-2">
					<div className="text-center lg:text-left">
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
							<Sparkles className="h-4 w-4 text-emerald-400" />
							<span className="text-slate-300 text-sm">
								Монголын #1 даалгаврын платформ
							</span>
						</div>

						<h1 className="mb-6 font-bold text-4xl text-white leading-tight tracking-tight md:text-5xl lg:text-6xl">
							Таны даалгаврыг{" "}
							<span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
								гүйцэтгэх хүн
							</span>{" "}
							энд байна
						</h1>

						<p className="mb-8 text-lg text-slate-400 md:text-xl">
							Өөрийн чадвараар орлого олох эсвэл ажлаа хөнгөвчлөх боломж. Мянга
							мянган даалгавар, мянга мянган гүйцэтгэгч.
						</p>

						<div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
							<Link href="/tasks">
								<Button
									size="lg"
									className="group w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/25 shadow-lg transition-all hover:shadow-emerald-500/30 hover:shadow-xl sm:w-auto"
								>
									<Search className="mr-2 h-5 w-5" />
									Даалгавар хайх
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Button>
							</Link>
							<Link href="/signup">
								<Button
									size="lg"
									variant="outline"
									className="w-full border-slate-600 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 sm:w-auto"
								>
									<FileText className="mr-2 h-5 w-5" />
									Даалгавар нийтлэх
								</Button>
							</Link>
						</div>

						<div className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
							<div className="flex items-center gap-2 text-slate-400">
								<Shield className="h-5 w-5 text-emerald-400" />
								<span className="text-sm">Баталгаатай төлбөр</span>
							</div>
							<div className="flex items-center gap-2 text-slate-400">
								<BadgeCheck className="h-5 w-5 text-cyan-400" />
								<span className="text-sm">Баталгаажсан гүйцэтгэгчид</span>
							</div>
							<div className="flex items-center gap-2 text-slate-400">
								<Clock className="h-5 w-5 text-violet-400" />
								<span className="text-sm">24/7 дэмжлэг</span>
							</div>
						</div>
					</div>

					<div className="hidden lg:block">
						<div className="relative">
							<div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
								<div className="grid grid-cols-2 gap-8">
									<div className="text-center">
										<div className="mb-2 font-bold text-4xl text-white">
											10K+
										</div>
										<p className="text-slate-400">Нээлттэй даалгавар</p>
									</div>
									<div className="text-center">
										<div className="mb-2 font-bold text-4xl text-emerald-400">
											25K+
										</div>
										<p className="text-slate-400">Гүйцэтгэгч</p>
									</div>
									<div className="text-center">
										<div className="mb-2 font-bold text-4xl text-cyan-400">
											50K+
										</div>
										<p className="text-slate-400">Дууссан даалгавар</p>
									</div>
									<div className="text-center">
										<div className="mb-2 font-bold text-4xl text-violet-400">
											4.9
										</div>
										<p className="text-slate-400">Дундаж үнэлгээ</p>
									</div>
								</div>
							</div>

							<div className="-bottom-4 -right-4 absolute animate-pulse rounded-xl border border-white/10 bg-slate-800/90 p-4 shadow-xl backdrop-blur-sm">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
										<CheckCircle2 className="h-5 w-5 text-emerald-400" />
									</div>
									<div>
										<p className="font-medium text-sm text-white">
											Шинэ даалгавар
										</p>
										<p className="text-slate-400 text-xs">Саяхан нийтлэгдсэн</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function CategoryCard({ category }: { category: CategoryApiResponse }) {
	const taskCount = category._count?.tasks || 0;

	return (
		<Link href={`/tasks?categoryId=${category.id}`}>
			<Card className="group hover:-translate-y-1 relative h-full overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/5 hover:shadow-xl">
				<CardContent className="p-6">
					<div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary transition-colors group-hover:from-primary/20 group-hover:to-primary/10">
						{getCategoryIcon(category.name)}
					</div>

					<h3 className="mb-1 font-semibold text-foreground text-lg transition-colors group-hover:text-primary">
						{category.name}
					</h3>
					<p className="text-muted-foreground text-sm">
						{taskCount} нээлттэй даалгавар
					</p>

					<div className="-translate-x-2 absolute right-4 bottom-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
						<ChevronRight className="h-5 w-5 text-primary" />
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

function CategoriesSkeleton() {
	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{Array.from({ length: 8 }).map((_, i) => (
				<Card key={`cat-skeleton-${i}`} className="h-full">
					<CardContent className="p-6">
						<Skeleton className="mb-4 h-14 w-14 rounded-xl" />
						<Skeleton className="mb-2 h-5 w-24" />
						<Skeleton className="h-4 w-32" />
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function CategoriesContent() {
	const { data } = useSuspenseQuery(categoryQueries.list({ limit: 8 }));

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
			{data?.data.map((category) => (
				<CategoryCard key={category.id} category={category} />
			))}
		</div>
	);
}

function CategoriesSection() {
	return (
		<section className="relative bg-background py-16 md:py-24">
			<div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-transparent" />

			<div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-10 flex items-end justify-between">
					<div>
						<h2 className="font-bold text-2xl text-foreground md:text-3xl lg:text-4xl">
							Ангилалаар <span className="text-primary">хайх</span>
						</h2>
						<p className="mt-2 text-muted-foreground">
							Өөрт тохирох даалгаврыг олоорой
						</p>
					</div>
					<Link
						href="/tasks"
						className="group hidden items-center gap-2 font-medium text-primary text-sm transition-colors hover:text-primary/80 sm:flex"
					>
						Бүгдийг харах
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>

				<Suspense fallback={<CategoriesSkeleton />}>
					<CategoriesContent />
				</Suspense>

				<div className="mt-8 text-center sm:hidden">
					<Link href="/tasks">
						<Button variant="outline" className="w-full">
							Бүх ангиллыг харах
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}

function TaskCard({ task }: { task: TaskApiResponse }) {
	const bidCount = task._count?.bids || 0;

	return (
		<Link href={`/task/${task.id}`}>
			<Card className="group hover:-translate-y-1 h-full overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-xl">
				<CardContent className="flex h-full flex-col p-6">
					<div className="mb-4 flex items-start justify-between gap-3">
						<Badge
							variant="secondary"
							className="shrink-0 bg-primary/10 text-primary"
						>
							{task.category?.name || "Бусад"}
						</Badge>
						<Badge
							variant={task.isRemote ? "default" : "outline"}
							className={
								task.isRemote
									? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
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

					<h3 className="mb-2 line-clamp-2 font-semibold text-foreground transition-colors group-hover:text-primary">
						{task.title}
					</h3>
					<p className="mb-4 line-clamp-2 flex-1 text-muted-foreground text-sm">
						{task.description}
					</p>

					<div className="mb-4 rounded-lg bg-muted/50 p-3">
						<div className="flex items-center justify-between">
							<span className="text-muted-foreground text-sm">Төсөв</span>
							<span className="font-semibold text-foreground">
								{formatBudget(task.budgetMin, task.budgetMax)}
							</span>
						</div>
					</div>

					<div className="flex items-center justify-between border-border/50 border-t pt-4">
						<div className="flex items-center gap-2">
							<Avatar className="h-8 w-8">
								<AvatarImage src={task.poster?.image || undefined} />
								<AvatarFallback className="bg-primary/10 text-primary text-xs">
									{task.poster?.name?.charAt(0) || "?"}
								</AvatarFallback>
							</Avatar>
							<div className="min-w-0">
								<p className="truncate font-medium text-foreground text-sm">
									{task.poster?.name || "Хэрэглэгч"}
								</p>
								<p className="text-muted-foreground text-xs">
									{formatTimeAgo(task.createdAt)}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-1.5 text-muted-foreground">
							<Users className="h-4 w-4" />
							<span className="text-sm">{bidCount} санал</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

function TasksSkeleton() {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{Array.from({ length: 6 }).map((_, i) => (
				<Card key={`task-skeleton-${i}`}>
					<CardContent className="p-6">
						<div className="mb-4 flex justify-between">
							<Skeleton className="h-5 w-20" />
							<Skeleton className="h-5 w-16" />
						</div>
						<Skeleton className="mb-2 h-6 w-full" />
						<Skeleton className="mb-4 h-4 w-3/4" />
						<Skeleton className="mb-4 h-16 w-full rounded-lg" />
						<div className="flex justify-between border-t pt-4">
							<div className="flex items-center gap-2">
								<Skeleton className="h-8 w-8 rounded-full" />
								<div>
									<Skeleton className="mb-1 h-4 w-20" />
									<Skeleton className="h-3 w-16" />
								</div>
							</div>
							<Skeleton className="h-4 w-16" />
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function TasksContent() {
	const { data } = useSuspenseQuery(
		taskQueries.list({ status: "OPEN", limit: 6 }),
	);

	if (!data?.data.length) {
		return (
			<div className="rounded-2xl border border-border border-dashed bg-muted/30 py-16 text-center">
				<Briefcase className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
				<h3 className="font-semibold text-lg">Одоогоор даалгавар байхгүй</h3>
				<p className="mt-2 text-muted-foreground">
					Шинэ даалгавар удахгүй нийтлэгдэнэ
				</p>
			</div>
		);
	}

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{data.data.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	);
}

function FeaturedTasksSection() {
	return (
		<section className="bg-muted/30 py-16 md:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-10 flex items-end justify-between">
					<div>
						<h2 className="font-bold text-2xl text-foreground md:text-3xl lg:text-4xl">
							Шинэ <span className="text-primary">даалгаврууд</span>
						</h2>
						<p className="mt-2 text-muted-foreground">
							Саяхан нийтлэгдсэн даалгавруудаас сонгоорой
						</p>
					</div>
					<Link
						href="/tasks"
						className="group hidden items-center gap-2 font-medium text-primary text-sm transition-colors hover:text-primary/80 sm:flex"
					>
						Бүгдийг харах
						<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>

				<Suspense fallback={<TasksSkeleton />}>
					<TasksContent />
				</Suspense>

				<div className="mt-8 text-center sm:hidden">
					<Link href="/tasks">
						<Button variant="outline" className="w-full">
							Бүх даалгаврыг харах
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}

function HowItWorksSection() {
	const clientSteps = [
		{
			icon: FileText,
			title: "Даалгавар нийтлэх",
			description: "Хийлгэх ажлаа дэлгэрэнгүй бичээд төсвөө тодорхойл",
		},
		{
			icon: Users,
			title: "Санал хүлээн авах",
			description:
				"Гүйцэтгэгчдээс ирсэн саналуудыг харьцуулж шилдгийг нь сонго",
		},
		{
			icon: CheckCircle2,
			title: "Ажил дууссан",
			description: "Ажил дуусмагц төлбөрөө баталгаатай шилжүүл",
		},
	];

	const workerSteps = [
		{
			icon: Search,
			title: "Даалгавар хайх",
			description: "Өөрийн ур чадварт тохирох даалгавруудыг олоорой",
		},
		{
			icon: Banknote,
			title: "Санал илгээх",
			description: "Үнэ болон хугацаагаа санал болгож өрсөлдөөрэй",
		},
		{
			icon: Handshake,
			title: "Орлого олох",
			description: "Даалгавар гүйцэтгээд баталгаатай орлого олоорой",
		},
	];

	return (
		<section className="bg-background py-16 md:py-24">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-16 text-center">
					<h2 className="font-bold text-2xl text-foreground md:text-3xl lg:text-4xl">
						Хэрхэн <span className="text-primary">ажилладаг</span> вэ?
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
						Энгийн 3 алхамаар даалгавраа нийтлэх эсвэл орлого олох боломжтой
					</p>
				</div>

				<div className="grid gap-12 lg:grid-cols-2">
					<div>
						<div className="mb-8 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
								<Briefcase className="h-6 w-6" />
							</div>
							<div>
								<h3 className="font-bold text-foreground text-xl">
									Захиалагчид
								</h3>
								<p className="text-muted-foreground text-sm">
									Даалгавар нийтлэхийг хүсвэл
								</p>
							</div>
						</div>

						<div className="space-y-6">
							{clientSteps.map((step, index) => (
								<div key={step.title} className="flex gap-4">
									<div className="relative">
										<div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-cyan-500/30 bg-cyan-500/10 font-bold text-cyan-500">
											{index + 1}
										</div>
										{index < clientSteps.length - 1 && (
											<div className="-translate-x-1/2 absolute top-14 left-1/2 h-8 w-0.5 bg-gradient-to-b from-cyan-500/30 to-transparent" />
										)}
									</div>
									<div className="flex-1 pt-1">
										<h4 className="font-semibold text-foreground">
											{step.title}
										</h4>
										<p className="mt-1 text-muted-foreground text-sm">
											{step.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8">
							<Link href="/signup">
								<Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 sm:w-auto">
									Даалгавар нийтлэх
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</div>
					</div>

					<div>
						<div className="mb-8 flex items-center gap-3">
							<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
								<Users className="h-6 w-6" />
							</div>
							<div>
								<h3 className="font-bold text-foreground text-xl">
									Гүйцэтгэгчид
								</h3>
								<p className="text-muted-foreground text-sm">
									Орлого олохыг хүсвэл
								</p>
							</div>
						</div>

						<div className="space-y-6">
							{workerSteps.map((step, index) => (
								<div key={step.title} className="flex gap-4">
									<div className="relative">
										<div className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-emerald-500/30 bg-emerald-500/10 font-bold text-emerald-500">
											{index + 1}
										</div>
										{index < workerSteps.length - 1 && (
											<div className="-translate-x-1/2 absolute top-14 left-1/2 h-8 w-0.5 bg-gradient-to-b from-emerald-500/30 to-transparent" />
										)}
									</div>
									<div className="flex-1 pt-1">
										<h4 className="font-semibold text-foreground">
											{step.title}
										</h4>
										<p className="mt-1 text-muted-foreground text-sm">
											{step.description}
										</p>
									</div>
								</div>
							))}
						</div>

						<div className="mt-8">
							<Link href="/tasks">
								<Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 sm:w-auto">
									Даалгавар хайх
									<ArrowRight className="ml-2 h-4 w-4" />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function StatsSection() {
	const stats = [
		{
			value: "50,000+",
			label: "Дууссан даалгавар",
			icon: CheckCircle2,
			color: "text-emerald-500",
		},
		{
			value: "25,000+",
			label: "Сэтгэл хангалуун хэрэглэгч",
			icon: Users,
			color: "text-cyan-500",
		},
		{
			value: "₮2.5 тэрбум+",
			label: "Нийт гүйлгээ",
			icon: Banknote,
			color: "text-violet-500",
		},
		{
			value: "4.9/5",
			label: "Дундаж үнэлгээ",
			icon: Star,
			color: "text-amber-500",
		},
	];

	return (
		<section className="border-border border-y bg-muted/50 py-16">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4">
					{stats.map((stat) => {
						const Icon = stat.icon;
						return (
							<div key={stat.label} className="text-center">
								<div
									className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-current/10 ${stat.color}`}
								>
									<Icon className={`h-6 w-6 ${stat.color}`} />
								</div>
								<div className="font-bold text-2xl text-foreground md:text-3xl">
									{stat.value}
								</div>
								<p className="mt-1 text-muted-foreground text-sm">
									{stat.label}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

function CTASection() {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
			<div className="-left-32 absolute top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
			<div className="-right-32 absolute bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

			<div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
				<h2 className="font-bold text-2xl text-white md:text-3xl lg:text-4xl">
					Өнөөдрөөс эхлээрэй
				</h2>
				<p className="mx-auto mt-4 max-w-2xl text-lg text-slate-400">
					Бүртгэл үнэгүй. Даалгавар нийтлэхэд ямар ч шимтгэл авахгүй. Зөвхөн
					амжилттай гүйцэтгэлээс хувь авна.
				</p>

				<div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Link href="/signup">
						<Button
							size="lg"
							className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/25 shadow-lg transition-all hover:shadow-emerald-500/30 hover:shadow-xl sm:w-auto"
						>
							Үнэгүй бүртгүүлэх
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
					<Link href="/tasks">
						<Button
							size="lg"
							variant="outline"
							className="w-full border-slate-600 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 sm:w-auto"
						>
							Даалгаврууд үзэх
						</Button>
					</Link>
				</div>

				<div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-white/10 border-t pt-8">
					<div className="flex items-center gap-2 text-slate-400">
						<Shield className="h-5 w-5" />
						<span className="text-sm">SSL баталгаажсан</span>
					</div>
					<div className="flex items-center gap-2 text-slate-400">
						<BadgeCheck className="h-5 w-5" />
						<span className="text-sm">Хувийн мэдээлэл хамгаалалттай</span>
					</div>
					<div className="flex items-center gap-2 text-slate-400">
						<Banknote className="h-5 w-5" />
						<span className="text-sm">Баталгаатай төлбөр</span>
					</div>
				</div>
			</div>
		</section>
	);
}

export default function HomePage() {
	return (
		<main className="min-h-screen">
			<HeroSection />
			<CategoriesSection />
			<FeaturedTasksSection />
			<HowItWorksSection />
			<StatsSection />
			<CTASection />
		</main>
	);
}
