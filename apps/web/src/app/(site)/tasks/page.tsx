"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	ArrowRight,
	Briefcase,
	Calendar,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Filter,
	Grid3X3,
	LayoutList,
	MapPin,
	Search,
	Sparkles,
	Users,
	Wifi,
	X,
} from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import type { GetTasksQuery, TaskApiResponse } from "@/lib/queries";
import { categoryQueries, taskQueries } from "@/lib/queries";

interface TaskFilters {
	categoryId?: string;
	isRemote?: boolean;
	city?: string;
	minBudget?: number;
	maxBudget?: number;
	search?: string;
	status?: "OPEN";
}

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

function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("mn-MN", {
		month: "short",
		day: "numeric",
	}).format(new Date(date));
}

function HeroSection() {
	return (
		<section className="relative overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

			<div className="-left-32 absolute top-10 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
			<div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

			<div
				className="absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}}
			/>

			<div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
				<div className="text-center">
					<div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
						<Sparkles className="h-4 w-4 text-emerald-400" />
						<span className="text-slate-300 text-sm">Мянга мянган боломж</span>
					</div>

					<h1 className="mb-4 font-bold text-3xl text-white leading-tight tracking-tight md:text-4xl lg:text-5xl">
						Нээлттэй{" "}
						<span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
							даалгаврууд
						</span>
					</h1>

					<p className="mx-auto max-w-2xl text-slate-400 md:text-lg">
						Өөрийн чадвар, туршлагадаа тохирох даалгавруудаас сонгоод орлого
						олох боломжоо бүү алдаарай
					</p>
				</div>
			</div>
		</section>
	);
}

function TaskCardSkeleton() {
	return (
		<Card className="border-border/50 bg-gradient-to-br from-card to-card/80">
			<CardContent className="p-6">
				<div className="mb-4 flex gap-2">
					<Skeleton className="h-5 w-20" />
					<Skeleton className="h-5 w-16" />
				</div>
				<Skeleton className="mb-2 h-6 w-3/4" />
				<Skeleton className="mb-4 h-4 w-full" />
				<Skeleton className="mb-4 h-4 w-2/3" />
				<Skeleton className="mb-4 h-14 w-full rounded-lg" />
				<div className="flex items-center justify-between border-border/50 border-t pt-4">
					<div className="flex items-center gap-2">
						<Skeleton className="h-8 w-8 rounded-full" />
						<div>
							<Skeleton className="mb-1 h-4 w-20" />
							<Skeleton className="h-3 w-16" />
						</div>
					</div>
					<Skeleton className="h-9 w-28" />
				</div>
			</CardContent>
		</Card>
	);
}

function FilterSidebarSkeleton() {
	return (
		<div className="space-y-6 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6">
			<div>
				<Skeleton className="mb-4 h-5 w-24" />
				<Skeleton className="h-10 w-full rounded-lg" />
			</div>
			<div className="h-px bg-border/50" />
			<div>
				<Skeleton className="mb-4 h-5 w-20" />
				<div className="space-y-3">
					{Array.from({ length: 5 }).map((_, i) => (
						<div key={`filter-skel-${i}`} className="flex items-center gap-3">
							<Skeleton className="h-4 w-4 rounded" />
							<Skeleton className="h-4 w-24" />
						</div>
					))}
				</div>
			</div>
			<div className="h-px bg-border/50" />
			<div>
				<Skeleton className="mb-4 h-5 w-16" />
				<div className="flex gap-2">
					<Skeleton className="h-10 flex-1 rounded-lg" />
					<Skeleton className="h-10 flex-1 rounded-lg" />
				</div>
			</div>
		</div>
	);
}

function TaskCard({ task }: { task: TaskApiResponse }) {
	const bidCount = task._count?.bids || 0;

	return (
		<Card className="hover:-translate-y-1 group h-full overflow-hidden border-border/50 bg-gradient-to-br from-card to-card/80 transition-all duration-300 hover:border-primary/30 hover:shadow-primary/5 hover:shadow-xl">
			<CardContent className="flex h-full flex-col p-6">
				<div className="mb-4 flex flex-wrap items-start gap-2">
					{task.category && (
						<Badge
							variant="secondary"
							className="shrink-0 bg-primary/10 text-primary"
						>
							{task.category.name}
						</Badge>
					)}
					<Badge
						variant={task.isRemote ? "default" : "outline"}
						className={
							task.isRemote
								? "shrink-0 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
								: "shrink-0"
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
					{task.deadline && (
						<Badge variant="outline" className="ml-auto shrink-0">
							<Calendar className="mr-1 h-3 w-3" />
							{formatDate(task.deadline)}
						</Badge>
					)}
				</div>

				<Link href={`/task/${task.id}`} className="group/link mb-2 block">
					<h3 className="line-clamp-2 font-semibold text-foreground text-lg transition-colors group-hover/link:text-primary">
						{task.title}
					</h3>
				</Link>
				<p className="mb-4 line-clamp-2 flex-1 text-muted-foreground text-sm leading-relaxed">
					{task.description}
				</p>

				<div className="mb-4 rounded-xl bg-gradient-to-r from-primary/5 to-emerald-500/5 p-4">
					<div className="flex items-center justify-between">
						<span className="text-muted-foreground text-sm">Төсөв</span>
						<span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text font-bold text-lg text-transparent">
							{formatBudget(task.budgetMin, task.budgetMax)}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between border-border/50 border-t pt-4">
					<div className="flex items-center gap-3">
						<Avatar className="h-9 w-9 ring-2 ring-primary/10">
							<AvatarImage src={task.poster?.image || undefined} />
							<AvatarFallback className="bg-gradient-to-br from-primary/20 to-emerald-500/20 font-medium text-primary text-sm">
								{task.poster?.name?.charAt(0) || "?"}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0">
							<p className="truncate font-medium text-foreground text-sm">
								{task.poster?.name || "Захиалагч"}
							</p>
							<div className="flex items-center gap-2 text-muted-foreground text-xs">
								<span>{formatTimeAgo(task.createdAt)}</span>
								<span className="text-border">•</span>
								<span className="flex items-center gap-1">
									<Users className="h-3 w-3" />
									{bidCount} санал
								</span>
							</div>
						</div>
					</div>

					<Link href={`/task/${task.id}`}>
						<Button
							size="sm"
							className="bg-gradient-to-r from-primary to-emerald-500 text-white shadow-sm transition-all hover:shadow-md hover:shadow-primary/20"
						>
							Санал илгээх
							<ArrowRight className="ml-1 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}

function FilterSidebar({
	filters,
	onFilterChange,
}: {
	filters: TaskFilters;
	onFilterChange: (filters: TaskFilters) => void;
}) {
	const { data: categoriesData } = useSuspenseQuery(categoryQueries.list());

	const handleCategoryChange = (categoryId: string, checked: boolean) => {
		onFilterChange({
			...filters,
			categoryId: checked ? categoryId : undefined,
		});
	};

	const handleRemoteChange = (value: string) => {
		if (value === "all") {
			onFilterChange({ ...filters, isRemote: undefined });
		} else {
			onFilterChange({ ...filters, isRemote: value === "remote" });
		}
	};

	const activeFilterCount = [
		filters.categoryId,
		filters.isRemote !== undefined,
		filters.minBudget,
		filters.maxBudget,
		filters.city,
	].filter(Boolean).length;

	return (
		<div className="space-y-6 rounded-2xl border border-border/50 bg-gradient-to-br from-card to-card/80 p-6 shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
						<Filter className="h-4 w-4 text-primary" />
					</div>
					<h3 className="font-semibold text-foreground">Шүүлтүүр</h3>
				</div>
				{activeFilterCount > 0 && (
					<Badge variant="secondary" className="bg-primary/10 text-primary">
						{activeFilterCount}
					</Badge>
				)}
			</div>

			<div className="h-px bg-border/50" />

			<div>
				<h4 className="mb-3 flex items-center justify-between font-medium text-foreground text-sm">
					Ажлын байршил
					<ChevronDown className="h-4 w-4 text-muted-foreground" />
				</h4>
				<Select
					value={
						filters.isRemote === undefined
							? "all"
							: filters.isRemote
								? "remote"
								: "onsite"
					}
					onValueChange={handleRemoteChange}
				>
					<SelectTrigger className="border-border/50 bg-background/50">
						<SelectValue placeholder="Бүгд" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Бүгд</SelectItem>
						<SelectItem value="remote">
							<span className="flex items-center gap-2">
								<Wifi className="h-3.5 w-3.5 text-emerald-500" />
								Алсаас
							</span>
						</SelectItem>
						<SelectItem value="onsite">
							<span className="flex items-center gap-2">
								<MapPin className="h-3.5 w-3.5 text-cyan-500" />
								Газар дээр
							</span>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="h-px bg-border/50" />

			<div>
				<h4 className="mb-3 flex items-center justify-between font-medium text-foreground text-sm">
					Ангилал
					<ChevronDown className="h-4 w-4 text-muted-foreground" />
				</h4>
				<div className="space-y-2.5">
					{categoriesData?.data.map((category) => {
						const checkboxId = `category-${category.id}`;
						const isChecked = filters.categoryId === category.id;
						return (
							<div
								key={category.id}
								className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${isChecked ? "bg-primary/5" : "hover:bg-muted/50"}`}
							>
								<Checkbox
									id={checkboxId}
									checked={isChecked}
									onCheckedChange={(checked) =>
										handleCategoryChange(category.id, !!checked)
									}
									className="border-border data-[state=checked]:border-primary data-[state=checked]:bg-primary"
								/>
								<Label
									htmlFor={checkboxId}
									className="flex flex-1 cursor-pointer items-center justify-between text-sm"
								>
									<span className={isChecked ? "font-medium text-primary" : ""}>
										{category.name}
									</span>
									{category._count && (
										<span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">
											{category._count.tasks}
										</span>
									)}
								</Label>
							</div>
						);
					})}
				</div>
			</div>

			<div className="h-px bg-border/50" />

			<div>
				<h4 className="mb-3 flex items-center justify-between font-medium text-foreground text-sm">
					Төсөв (₮)
					<ChevronDown className="h-4 w-4 text-muted-foreground" />
				</h4>
				<div className="flex items-center gap-2">
					<Input
						type="number"
						placeholder="Доод"
						value={filters.minBudget || ""}
						onChange={(e) =>
							onFilterChange({
								...filters,
								minBudget: e.target.value ? Number(e.target.value) : undefined,
							})
						}
						className="h-10 border-border/50 bg-background/50"
					/>
					<span className="text-muted-foreground">-</span>
					<Input
						type="number"
						placeholder="Дээд"
						value={filters.maxBudget || ""}
						onChange={(e) =>
							onFilterChange({
								...filters,
								maxBudget: e.target.value ? Number(e.target.value) : undefined,
							})
						}
						className="h-10 border-border/50 bg-background/50"
					/>
				</div>
			</div>

			<div className="h-px bg-border/50" />

			<div>
				<h4 className="mb-3 flex items-center justify-between font-medium text-foreground text-sm">
					Хот/Дүүрэг
					<ChevronDown className="h-4 w-4 text-muted-foreground" />
				</h4>
				<Input
					type="text"
					placeholder="Хот/Дүүрэг хайх..."
					value={filters.city || ""}
					onChange={(e) =>
						onFilterChange({
							...filters,
							city: e.target.value || undefined,
						})
					}
					className="border-border/50 bg-background/50"
				/>
			</div>

			{activeFilterCount > 0 && (
				<Button
					variant="outline"
					className="w-full border-border/50 transition-colors hover:border-destructive/50 hover:bg-destructive/5 hover:text-destructive"
					onClick={() => onFilterChange({ status: "OPEN" })}
				>
					<X className="mr-2 h-4 w-4" />
					Шүүлтүүр цэвэрлэх
				</Button>
			)}
		</div>
	);
}

function TaskList({
	filters,
	page,
	viewMode,
}: {
	filters: TaskFilters;
	page: number;
	viewMode: "grid" | "list";
}) {
	const query: Partial<GetTasksQuery> = {
		...filters,
		status: "OPEN",
		page,
		limit: 20,
	};

	const { data } = useSuspenseQuery(taskQueries.list(query));

	if (!data?.data.length) {
		return (
			<Card className="border-border/50 border-dashed bg-gradient-to-br from-card to-card/80">
				<CardContent className="flex flex-col items-center justify-center py-16 text-center">
					<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
						<Briefcase className="h-8 w-8 text-muted-foreground" />
					</div>
					<h3 className="font-semibold text-foreground text-lg">
						Даалгавар олдсонгүй
					</h3>
					<p className="mx-auto mt-2 max-w-sm text-muted-foreground text-sm">
						Шүүлтүүрээ өөрчилж дахин хайна уу. Эсвэл бүх даалгавруудыг харахын
						тулд шүүлтүүрээ цэвэрлэнэ үү.
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div
			className={
				viewMode === "grid"
					? "grid grid-cols-1 gap-6 md:grid-cols-2"
					: "grid grid-cols-1 gap-4"
			}
		>
			{data.data.map((task) => (
				<TaskCard key={task.id} task={task} />
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

	if (totalPages <= 7) {
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
		<div className="flex items-center justify-center gap-2">
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
				className="border-border/50 disabled:opacity-50"
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
						className={
							page === currentPage
								? "bg-gradient-to-r from-primary to-emerald-500 text-white"
								: "border-border/50"
						}
					>
						{page}
					</Button>
				) : (
					<span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">
						...
					</span>
				),
			)}
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				className="border-border/50 disabled:opacity-50"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}

function TaskListHeader({
	total,
	viewMode,
	onViewModeChange,
}: {
	total: number;
	viewMode: "grid" | "list";
	onViewModeChange: (mode: "grid" | "list") => void;
}) {
	return (
		<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 className="font-bold text-foreground text-xl">
					Нээлттэй{" "}
					<span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
						даалгаврууд
					</span>
				</h2>
				<p className="mt-1 text-muted-foreground text-sm">
					Нийт {total.toLocaleString("mn-MN")} даалгавар олдлоо
				</p>
			</div>
			<div className="flex items-center gap-3">
				<Select defaultValue="newest">
					<SelectTrigger className="w-44 border-border/50 bg-background/50">
						<SelectValue placeholder="Эрэмбэлэх" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="newest">Шинээр нийтлэгдсэн</SelectItem>
						<SelectItem value="budget-high">Төсөв: Их-Бага</SelectItem>
						<SelectItem value="budget-low">Төсөв: Бага-Их</SelectItem>
						<SelectItem value="deadline">Эцсийн хугацаа</SelectItem>
					</SelectContent>
				</Select>
				<div className="flex rounded-lg border border-border/50 bg-background/50 p-1">
					<Button
						variant={viewMode === "list" ? "secondary" : "ghost"}
						size="icon"
						className="h-8 w-8"
						onClick={() => onViewModeChange("list")}
					>
						<LayoutList className="h-4 w-4" />
					</Button>
					<Button
						variant={viewMode === "grid" ? "secondary" : "ghost"}
						size="icon"
						className="h-8 w-8"
						onClick={() => onViewModeChange("grid")}
					>
						<Grid3X3 className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

function TasksContent() {
	const [filters, setFilters] = useState<TaskFilters>({ status: "OPEN" });
	const [page, setPage] = useState(1);
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setFilters((prev) => ({ ...prev, search: searchTerm || undefined }));
		setPage(1);
	};

	const handleFilterChange = (newFilters: TaskFilters) => {
		setFilters(newFilters);
		setPage(1);
	};

	const query: Partial<GetTasksQuery> = {
		...filters,
		status: "OPEN",
		page,
		limit: 20,
	};
	const { data } = useSuspenseQuery(taskQueries.list(query));
	const totalTasks = data?.meta.total || 0;
	const totalPages = data?.meta.totalPages || 1;

	return (
		<>
			<HeroSection />

			<div className="border-border/50 border-b bg-muted/30">
				<div className="mx-auto max-w-7xl px-4 py-4 text-muted-foreground text-sm sm:px-6 lg:px-8">
					<Link href="/" className="transition-colors hover:text-foreground">
						Нүүр
					</Link>
					<span className="mx-2">/</span>
					<span className="font-medium text-foreground">Даалгаврууд</span>
				</div>
			</div>

			<div className="bg-background py-8">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<form onSubmit={handleSearch} className="mb-8">
						<div className="flex gap-3">
							<div className="relative flex-1">
								<Search className="-translate-y-1/2 absolute top-1/2 left-4 h-5 w-5 text-muted-foreground" />
								<Input
									type="text"
									placeholder="Даалгаврын нэр, тайлбараар хайх..."
									className="h-12 border-border/50 bg-background pl-12 text-base shadow-sm transition-shadow focus:shadow-md"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
							<Button
								type="submit"
								size="lg"
								className="h-12 bg-gradient-to-r from-primary to-emerald-500 px-6 text-white shadow-sm transition-all hover:shadow-md hover:shadow-primary/20"
							>
								<Search className="mr-2 h-5 w-5" />
								Хайх
							</Button>
						</div>
					</form>

					<div className="grid gap-8 lg:grid-cols-4">
						<div className="lg:col-span-1">
							<div className="lg:sticky lg:top-24">
								<FilterSidebar
									filters={filters}
									onFilterChange={handleFilterChange}
								/>
							</div>
						</div>

						<div className="lg:col-span-3">
							<TaskListHeader
								total={totalTasks}
								viewMode={viewMode}
								onViewModeChange={setViewMode}
							/>

							<TaskList filters={filters} page={page} viewMode={viewMode} />

							<div className="mt-8">
								<Pagination
									currentPage={page}
									totalPages={totalPages}
									onPageChange={setPage}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function TasksLoadingFallback() {
	return (
		<>
			<section className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
				<div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
					<div className="text-center">
						<Skeleton className="mx-auto mb-4 h-8 w-48 bg-white/10" />
						<Skeleton className="mx-auto mb-4 h-12 w-96 bg-white/10" />
						<Skeleton className="mx-auto h-6 w-80 bg-white/10" />
					</div>
				</div>
			</section>

			<div className="border-border/50 border-b bg-muted/30">
				<div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
					<Skeleton className="h-4 w-32" />
				</div>
			</div>

			<div className="bg-background py-8">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Skeleton className="mb-8 h-12 w-full rounded-lg" />
					<div className="grid gap-8 lg:grid-cols-4">
						<div className="lg:col-span-1">
							<FilterSidebarSkeleton />
						</div>
						<div className="lg:col-span-3">
							<div className="mb-6 flex items-center justify-between">
								<div>
									<Skeleton className="mb-2 h-6 w-40" />
									<Skeleton className="h-4 w-28" />
								</div>
								<Skeleton className="h-10 w-48" />
							</div>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<TaskCardSkeleton />
								<TaskCardSkeleton />
								<TaskCardSkeleton />
								<TaskCardSkeleton />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default function TasksPage() {
	return (
		<main className="min-h-screen bg-background">
			<Suspense fallback={<TasksLoadingFallback />}>
				<TasksContent />
			</Suspense>
		</main>
	);
}
