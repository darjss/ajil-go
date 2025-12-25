"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import {
	Briefcase,
	Filter,
	Grid3X3,
	LayoutList,
	MapPin,
	Search,
	Sparkles,
	Wifi,
	X,
} from "lucide-react";
import Link from "next/link";
import {
	parseAsBoolean,
	parseAsInteger,
	parseAsString,
	useQueryStates,
} from "nuqs";
import { Suspense, useState } from "react";

import { Pagination, TaskCard, TaskCardSkeleton } from "@/components/tasks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import type { GetTasksQuery } from "@/lib/queries";
import { categoryQueries, taskQueries } from "@/lib/queries";

// nuqs parsers for URL state
const filterParsers = {
	search: parseAsString,
	categoryId: parseAsString,
	isRemote: parseAsBoolean,
	minBudget: parseAsInteger,
	maxBudget: parseAsInteger,
	city: parseAsString,
	page: parseAsInteger.withDefault(1),
};

function HeroSection() {
	return (
		<section className="relative border-border border-b bg-muted/30 py-16 md:py-24">
			<div className="container px-4 md:px-6">
				<div className="flex flex-col gap-4">
					<div className="inline-flex items-center gap-2 font-mono text-primary text-sm uppercase tracking-wider">
						<Sparkles className="h-4 w-4" />
						<span>Мянга мянган боломж</span>
					</div>

					<h1 className="max-w-3xl font-bold font-display text-4xl text-foreground uppercase leading-tight tracking-tighter sm:text-5xl md:text-6xl">
						Нээлттэй <span className="text-primary">даалгаврууд</span>
					</h1>

					<p className="max-w-2xl font-body text-lg text-muted-foreground md:text-xl">
						Өөрийн чадвар, туршлагадаа тохирох даалгавруудаас сонгоод орлого
						олох боломжоо бүү алдаарай.
					</p>
				</div>
			</div>
		</section>
	);
}

function FilterSidebarSkeleton() {
	return (
		<div className="space-y-8 border border-border bg-card p-6">
			<div>
				<Skeleton className="mb-4 h-5 w-24 rounded-none" />
				<Skeleton className="h-10 w-full rounded-none" />
			</div>
			<div className="h-px bg-border" />
			<div>
				<Skeleton className="mb-4 h-5 w-20 rounded-none" />
				<div className="space-y-3">
					{["skel1", "skel2", "skel3", "skel4", "skel5"].map((key) => (
						<div key={key} className="flex items-center gap-3">
							<Skeleton className="h-4 w-4 rounded-none" />
							<Skeleton className="h-4 w-24 rounded-none" />
						</div>
					))}
				</div>
			</div>
			<div className="h-px bg-border" />
			<div>
				<Skeleton className="mb-4 h-5 w-16 rounded-none" />
				<div className="flex gap-2">
					<Skeleton className="h-10 flex-1 rounded-none" />
					<Skeleton className="h-10 flex-1 rounded-none" />
				</div>
			</div>
		</div>
	);
}

interface FilterState {
	search: string | null;
	categoryId: string | null;
	isRemote: boolean | null;
	minBudget: number | null;
	maxBudget: number | null;
	city: string | null;
	page: number;
}

function FilterSidebar({
	filters,
	onFilterChange,
}: {
	filters: FilterState;
	onFilterChange: (updates: Partial<FilterState>) => void;
}) {
	const { data: categoriesData } = useSuspenseQuery(categoryQueries.list());

	const handleCategoryChange = (categoryId: string, checked: boolean) => {
		onFilterChange({
			categoryId: checked ? categoryId : null,
			page: 1,
		});
	};

	const handleRemoteChange = (value: string) => {
		if (value === "all") {
			onFilterChange({ isRemote: null, page: 1 });
		} else {
			onFilterChange({ isRemote: value === "remote", page: 1 });
		}
	};

	const activeFilterCount = [
		filters.categoryId,
		filters.isRemote !== null,
		filters.minBudget,
		filters.maxBudget,
		filters.city,
	].filter(Boolean).length;

	return (
		<div className="space-y-8 border border-border bg-card p-6">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4 text-primary" />
					<h3 className="font-mono font-semibold text-foreground uppercase tracking-wider">
						Шүүлтүүр
					</h3>
				</div>
				{activeFilterCount > 0 && (
					<Badge
						variant="secondary"
						className="rounded-none bg-primary/10 text-primary"
					>
						{activeFilterCount}
					</Badge>
				)}
			</div>

			<div className="h-px bg-border" />

			<div className="space-y-3">
				<h4 className="font-medium font-mono text-foreground text-sm uppercase tracking-wide">
					Ажлын байршил
				</h4>
				<Select
					value={
						filters.isRemote === null
							? "all"
							: filters.isRemote
								? "remote"
								: "onsite"
					}
					onValueChange={handleRemoteChange}
				>
					<SelectTrigger className="h-11 rounded-none border-border bg-background transition-colors hover:border-primary/50">
						<SelectValue placeholder="Бүгд" />
					</SelectTrigger>
					<SelectContent className="rounded-none border-border">
						<SelectItem value="all" className="rounded-none">
							Бүгд
						</SelectItem>
						<SelectItem value="remote" className="rounded-none">
							<span className="flex items-center gap-2">
								<Wifi className="h-3.5 w-3.5" />
								Алсаас
							</span>
						</SelectItem>
						<SelectItem value="onsite" className="rounded-none">
							<span className="flex items-center gap-2">
								<MapPin className="h-3.5 w-3.5" />
								Газар дээр
							</span>
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="h-px bg-border" />

			<div className="space-y-3">
				<h4 className="font-medium font-mono text-foreground text-sm uppercase tracking-wide">
					Ангилал
				</h4>
				<div className="space-y-2">
					{categoriesData?.data.map((category) => {
						const checkboxId = `category-${category.id}`;
						const isChecked = filters.categoryId === category.id;
						return (
							<div key={category.id} className="flex items-center gap-3 py-1">
								<Checkbox
									id={checkboxId}
									checked={isChecked}
									onCheckedChange={(checked) =>
										handleCategoryChange(category.id, !!checked)
									}
									className="rounded-none border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
								/>
								<Label
									htmlFor={checkboxId}
									className="group flex flex-1 cursor-pointer items-center justify-between text-sm"
								>
									<span
										className={`transition-colors ${isChecked ? "font-medium text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
									>
										{category.name}
									</span>
									{category._count && (
										<span className="font-mono text-muted-foreground text-xs">
											{category._count.tasks}
										</span>
									)}
								</Label>
							</div>
						);
					})}
				</div>
			</div>

			<div className="h-px bg-border" />

			<div className="space-y-3">
				<h4 className="font-medium font-mono text-foreground text-sm uppercase tracking-wide">
					Төсөв (₮)
				</h4>
				<div className="flex items-center gap-2">
					<Input
						type="number"
						placeholder="Доод"
						value={filters.minBudget ?? ""}
						onChange={(e) =>
							onFilterChange({
								minBudget: e.target.value ? Number(e.target.value) : null,
								page: 1,
							})
						}
						className="h-10 rounded-none border-border bg-background transition-colors hover:border-primary/50 focus-visible:border-primary focus-visible:ring-0"
					/>
					<span className="text-muted-foreground">-</span>
					<Input
						type="number"
						placeholder="Дээд"
						value={filters.maxBudget ?? ""}
						onChange={(e) =>
							onFilterChange({
								maxBudget: e.target.value ? Number(e.target.value) : null,
								page: 1,
							})
						}
						className="h-10 rounded-none border-border bg-background transition-colors hover:border-primary/50 focus-visible:border-primary focus-visible:ring-0"
					/>
				</div>
			</div>

			<div className="h-px bg-border" />

			<div className="space-y-3">
				<h4 className="font-medium font-mono text-foreground text-sm uppercase tracking-wide">
					Хот/Дүүрэг
				</h4>
				<Input
					type="text"
					placeholder="Хот/Дүүрэг хайх..."
					value={filters.city ?? ""}
					onChange={(e) =>
						onFilterChange({
							city: e.target.value || null,
							page: 1,
						})
					}
					className="rounded-none border-border bg-background transition-colors hover:border-primary/50 focus-visible:border-primary focus-visible:ring-0"
				/>
			</div>

			{activeFilterCount > 0 && (
				<Button
					variant="outline"
					className="h-10 w-full rounded-none border-border font-mono text-xs uppercase tracking-wide hover:border-destructive hover:bg-destructive hover:text-destructive-foreground"
					onClick={() =>
						onFilterChange({
							search: null,
							categoryId: null,
							isRemote: null,
							minBudget: null,
							maxBudget: null,
							city: null,
							page: 1,
						})
					}
				>
					<X className="mr-2 h-3 w-3" />
					Шүүлтүүр цэвэрлэх
				</Button>
			)}
		</div>
	);
}

function TaskList({
	filters,
	viewMode,
}: {
	filters: FilterState;
	viewMode: "grid" | "list";
}) {
	const query: Partial<GetTasksQuery> = {
		status: "OPEN",
		page: filters.page,
		limit: 20,
		...(filters.search && { search: filters.search }),
		...(filters.categoryId && { categoryId: filters.categoryId }),
		...(filters.isRemote !== null && { isRemote: filters.isRemote }),
		...(filters.minBudget && { minBudget: filters.minBudget }),
		...(filters.maxBudget && { maxBudget: filters.maxBudget }),
		...(filters.city && { city: filters.city }),
	};

	const { data } = useSuspenseQuery(taskQueries.list(query));

	if (!data?.data.length) {
		return (
			<div className="flex flex-col items-center justify-center border border-border border-dashed py-24 text-center">
				<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-muted">
					<Briefcase className="h-8 w-8 text-muted-foreground" />
				</div>
				<h3 className="font-display font-semibold text-foreground text-lg uppercase tracking-wide">
					Даалгавар олдсонгүй
				</h3>
				<p className="mx-auto mt-2 max-w-sm text-muted-foreground text-sm">
					Шүүлтүүрээ өөрчилж дахин хайна уу. Эсвэл бүх даалгавруудыг харахын
					тулд шүүлтүүрээ цэвэрлэнэ үү.
				</p>
			</div>
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
		<div className="mb-6 flex flex-col gap-4 border-border border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 className="font-bold font-display text-2xl text-foreground uppercase tracking-tight">
					Нээлттэй <span className="text-primary">даалгаврууд</span>
				</h2>
				<p className="mt-1 font-mono text-muted-foreground text-sm">
					Нийт {total.toLocaleString("mn-MN")} даалгавар олдлоо
				</p>
			</div>
			<div className="flex items-center gap-3">
				<Select defaultValue="newest">
					<SelectTrigger className="w-44 rounded-none border-border bg-background">
						<SelectValue placeholder="Эрэмбэлэх" />
					</SelectTrigger>
					<SelectContent className="rounded-none border-border">
						<SelectItem value="newest" className="rounded-none">
							Шинээр нийтлэгдсэн
						</SelectItem>
						<SelectItem value="budget-high" className="rounded-none">
							Төсөв: Их-Бага
						</SelectItem>
						<SelectItem value="budget-low" className="rounded-none">
							Төсөв: Бага-Их
						</SelectItem>
						<SelectItem value="deadline" className="rounded-none">
							Эцсийн хугацаа
						</SelectItem>
					</SelectContent>
				</Select>
				<div className="flex border border-border bg-background p-0.5">
					<Button
						variant={viewMode === "list" ? "secondary" : "ghost"}
						size="icon"
						className="h-8 w-8 rounded-none"
						onClick={() => onViewModeChange("list")}
					>
						<LayoutList className="h-4 w-4" />
					</Button>
					<Button
						variant={viewMode === "grid" ? "secondary" : "ghost"}
						size="icon"
						className="h-8 w-8 rounded-none"
						onClick={() => onViewModeChange("grid")}
					>
						<Grid3X3 className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

function TasksContentInner() {
	// Use nuqs for URL-based filter state
	const [filters, setFilters] = useQueryStates(filterParsers, {
		shallow: false, // Trigger server-side re-fetch
	});
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [searchTerm, setSearchTerm] = useState(filters.search ?? "");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		setFilters({ search: searchTerm || null, page: 1 });
	};

	const handleFilterChange = (updates: Partial<FilterState>) => {
		setFilters(updates);
	};

	const query: Partial<GetTasksQuery> = {
		status: "OPEN",
		page: filters.page,
		limit: 20,
		...(filters.search && { search: filters.search }),
		...(filters.categoryId && { categoryId: filters.categoryId }),
		...(filters.isRemote !== null && { isRemote: filters.isRemote }),
		...(filters.minBudget && { minBudget: filters.minBudget }),
		...(filters.maxBudget && { maxBudget: filters.maxBudget }),
		...(filters.city && { city: filters.city }),
	};

	const { data } = useSuspenseQuery(taskQueries.list(query));
	const totalTasks = data?.meta.total ?? 0;
	const totalPages = data?.meta.totalPages ?? 1;

	return (
		<>
			<HeroSection />

			<div className="border-border border-b bg-background">
				<div className="container px-4 py-4 sm:px-6 lg:px-8">
					<div className="flex items-center font-mono text-muted-foreground text-sm">
						<Link href="/" className="hover:text-foreground hover:underline">
							Нүүр
						</Link>
						<span className="mx-2">/</span>
						<span className="font-medium text-foreground uppercase tracking-wide">
							Даалгаврууд
						</span>
					</div>
				</div>
			</div>

			<div className="bg-background py-12">
				<div className="container px-4 sm:px-6 lg:px-8">
					<form onSubmit={handleSearch} className="mb-12">
						<div className="flex gap-0 border border-border bg-background p-1 focus-within:ring-1 focus-within:ring-primary">
							<div className="relative flex-1">
								<Search className="-translate-y-1/2 absolute top-1/2 left-4 h-5 w-5 text-muted-foreground" />
								<Input
									type="text"
									placeholder="Даалгаврын нэр, тайлбараар хайх..."
									className="h-12 rounded-none border-0 bg-transparent pl-12 text-base shadow-none focus-visible:ring-0"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
							<Button
								type="submit"
								size="lg"
								className="h-12 rounded-none px-8 font-mono uppercase tracking-wider"
							>
								Хайх
							</Button>
						</div>
					</form>

					<div className="grid gap-8 lg:grid-cols-4">
						<div className="lg:col-span-1">
							<div className="lg:sticky lg:top-24">
								<Suspense fallback={<FilterSidebarSkeleton />}>
									<FilterSidebar
										filters={filters}
										onFilterChange={handleFilterChange}
									/>
								</Suspense>
							</div>
						</div>

						<div className="lg:col-span-3">
							<TaskListHeader
								total={totalTasks}
								viewMode={viewMode}
								onViewModeChange={setViewMode}
							/>

							<TaskList filters={filters} viewMode={viewMode} />

							<div className="mt-12">
								<Pagination
									currentPage={filters.page}
									totalPages={totalPages}
									onPageChange={(newPage) => setFilters({ page: newPage })}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export function TasksLoadingFallback() {
	return (
		<>
			<section className="relative border-border border-b bg-muted/30 py-16 md:py-24">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col gap-4">
						<Skeleton className="h-6 w-48 rounded-none" />
						<Skeleton className="h-16 w-full max-w-2xl rounded-none" />
						<Skeleton className="h-6 w-full max-w-xl rounded-none" />
					</div>
				</div>
			</section>

			<div className="border-border border-b bg-background">
				<div className="container px-4 py-4 sm:px-6 lg:px-8">
					<Skeleton className="h-4 w-32 rounded-none" />
				</div>
			</div>

			<div className="bg-background py-12">
				<div className="container px-4 sm:px-6 lg:px-8">
					<Skeleton className="mb-12 h-14 w-full rounded-none" />
					<div className="grid gap-8 lg:grid-cols-4">
						<div className="lg:col-span-1">
							<FilterSidebarSkeleton />
						</div>
						<div className="lg:col-span-3">
							<div className="mb-6 flex items-center justify-between border-border border-b pb-4">
								<div>
									<Skeleton className="mb-2 h-8 w-40 rounded-none" />
									<Skeleton className="h-4 w-28 rounded-none" />
								</div>
								<Skeleton className="h-10 w-48 rounded-none" />
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

export function TasksContent() {
	return (
		<Suspense fallback={<TasksLoadingFallback />}>
			<TasksContentInner />
		</Suspense>
	);
}
