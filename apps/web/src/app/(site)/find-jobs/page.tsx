"use client";

import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const jobListings = [
	{
		id: 1,
		title: "Сошиал медиа туслах",
		company: "Nomad",
		location: "Парис, Франц",
		type: "Бүтэн цагийн",
		icon: "N",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		applied: 5,
		capacity: 10,
		color: "bg-emerald-500",
	},
	{
		id: 2,
		title: "Брэнд дизайнер",
		company: "Dropbox",
		location: "Сан Франциско, АНУ",
		type: "Бүтэн цагийн",
		icon: "D",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		applied: 2,
		capacity: 10,
		color: "bg-blue-500",
	},
	{
		id: 3,
		title: "Интерактив хөгжүүлэгч",
		company: "Terraform",
		location: "Хамбург, Герман",
		type: "Бүтэн цагийн",
		icon: "T",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		applied: 8,
		capacity: 12,
		color: "bg-cyan-500",
	},
	{
		id: 4,
		title: "Имэйл маркетинг мэргэжилтэн",
		company: "Revolut",
		location: "Мадрид, Испани",
		type: "Бүтэн цагийн",
		icon: "R",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		applied: 0,
		capacity: 10,
		color: "bg-red-500",
	},
	{
		id: 5,
		title: "Ахлах инженер",
		company: "Canva",
		location: "Анкара, Турк",
		type: "Бүтэн цагийн",
		icon: "C",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		applied: 5,
		capacity: 10,
		color: "bg-orange-400",
	},
	{
		id: 6,
		title: "Бүтээгдэхүүний дизайнер",
		company: "ClassPass",
		location: "Берлин, Герман",
		type: "Бүтэн цагийн",
		icon: "CP",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		applied: 5,
		capacity: 10,
		color: "bg-blue-600",
	},
];

export default function FindJobsPage() {
	const [_selectedEmploymentType, _setSelectedEmploymentType] = useState<
		string[]
	>([]);
	const [_selectedCategory, _setSelectedCategory] = useState<string[]>([
		"Бизнес",
		"Технологи",
	]);
	const [_selectedLevel, _setSelectedLevel] = useState<string[]>(["Захирал"]);
	const [_selectedSalary, _setSelectedSalary] = useState<string[]>([
		"$3000 ба түүнээс дээш",
	]);

	const _toggleFilter = (
		value: string,
		filter: string[],
		setFilter: (arr: string[]) => void,
	) => {
		setFilter(
			filter.includes(value)
				? filter.filter((f) => f !== value)
				: [...filter, value],
		);
	};

	return (
		<main className="min-h-screen bg-background">
			{/* Breadcrumb */}
			<div className="mx-auto max-w-7xl px-4 py-6 text-muted-foreground text-sm sm:px-6 lg:px-8">
				<span>Нүүр</span> / <span>Ажлуудыг хайх</span>
			</div>

			<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
				<div className="grid gap-8 md:grid-cols-4">
					{/* Sidebar - Filters */}
					<div className="md:col-span-1">
						<div className="space-y-6 rounded-lg border border-border bg-card p-6">
							{/* Employment Type */}
							<div>
								<h3 className="mb-4 flex items-center justify-between font-semibold text-foreground">
									Ажлын төрөл
									<span className="text-xs">▼</span>
								</h3>
								<div className="space-y-2">
									{[
										"Бүтэн цагийн (3)",
										"Хагас цагийн (5)",
										"Алсаас (2)",
										"Дадлага (24)",
										"Гэрээт (3)",
									].map((item) => (
										<label
											key={item}
											className="flex cursor-pointer items-center gap-2"
										>
											<input type="checkbox" className="h-4 w-4 rounded" />
											<span className="text-muted-foreground text-sm">
												{item}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Categories */}
							<div>
								<h3 className="mb-4 flex items-center justify-between font-semibold text-foreground">
									Ангилал
									<span className="text-xs">▼</span>
								</h3>
								<div className="space-y-2">
									{[
										"Дизайн (24)",
										"Борлуулалт (3)",
										"Маркетинг (3)",
										"Бизнес (3)",
										"Хүний нөөц (6)",
										"Санхүү (4)",
										"Инженер (4)",
										"Технологи (5)",
									].map((item) => (
										<label
											key={item}
											className="flex cursor-pointer items-center gap-2"
										>
											<input
												type="checkbox"
												className="h-4 w-4 rounded"
												defaultChecked={[
													"Бизнес (3)",
													"Технологи (5)",
												].includes(item)}
											/>
											<span className="text-muted-foreground text-sm">
												{item}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Job Level */}
							<div>
								<h3 className="mb-4 flex items-center justify-between font-semibold text-foreground">
									Түвшин
									<span className="text-xs">▼</span>
								</h3>
								<div className="space-y-2">
									{[
										"Эхний түвшин (57)",
										"Дунд түвшин (3)",
										"Ахлах түвшин (5)",
										"Захирал (12)",
										"Дэд захирал ба түүнээс дээш (8)",
									].map((item) => (
										<label
											key={item}
											className="flex cursor-pointer items-center gap-2"
										>
											<input
												type="checkbox"
												className="h-4 w-4 rounded"
												defaultChecked={item === "Захирал (12)"}
											/>
											<span className="text-muted-foreground text-sm">
												{item}
											</span>
										</label>
									))}
								</div>
							</div>

							{/* Salary Range */}
							<div>
								<h3 className="mb-4 flex items-center justify-between font-semibold text-foreground">
									Цалин
									<span className="text-xs">▼</span>
								</h3>
								<div className="space-y-2">
									{[
										"$700 - $1000 (4)",
										"$1000 - $1500 (6)",
										"$1500 - $2000 (10)",
										"$3000 ба түүнээс дээш (4)",
									].map((item) => (
										<label
											key={item}
											className="flex cursor-pointer items-center gap-2"
										>
											<input
												type="checkbox"
												className="h-4 w-4 rounded"
												defaultChecked={item === "$3000 ба түүнээс дээш (4)"}
											/>
											<span className="text-muted-foreground text-sm">
												{item}
											</span>
										</label>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="md:col-span-3">
						{/* Search and Sort */}
						<div className="mb-8">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="font-semibold text-foreground text-xl">
									Бүх ажлууд
								</h2>
								<div className="flex items-center gap-4">
									<select className="rounded-lg border border-border bg-card px-3 py-2 text-foreground text-sm">
										<option>Хамааралтай</option>
										<option>Шинээр</option>
										<option>Хамгийн олон өргөдөлтэй</option>
									</select>
									<div className="flex gap-2">
										<button className="rounded-lg border border-border p-2 hover:bg-muted">
											⊞
										</button>
										<button className="rounded-lg border border-border p-2 hover:bg-muted">
											≡
										</button>
									</div>
								</div>
							</div>
							<p className="text-muted-foreground text-sm">Нийт 73 үр дүн</p>
						</div>

						{/* Job Listings */}
						<div className="space-y-4">
							{jobListings.map((job) => (
								<div
									key={job.id}
									className="flex items-center justify-between rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
								>
									<div className="flex flex-1 items-center gap-4">
										<div
											className={`h-14 w-14 ${job.color} flex items-center justify-center rounded-lg font-bold text-white`}
										>
											{job.icon}
										</div>
										<div className="flex-1">
											<h3 className="font-semibold text-foreground">
												{job.title}
											</h3>
											<p className="text-muted-foreground text-sm">
												{job.company} • {job.location}
											</p>
											<div className="mt-2 flex flex-wrap gap-2">
												{job.tags.map((tag) => (
													<span
														key={tag}
														className="rounded-full border border-border px-2 py-1 text-muted-foreground text-xs"
													>
														{tag}
													</span>
												))}
											</div>
											<p className="mt-2 text-muted-foreground text-xs">
												{job.applied} хүн өргөдөл өгсөн, багтаамж {job.capacity}
											</p>
										</div>
									</div>
									<Link href={`/job/${job.id}` as Route}>
										<Button className="bg-primary hover:bg-primary/90">
											Өргөдөл илгээх
										</Button>
									</Link>
								</div>
							))}
						</div>

						{/* Pagination */}
						<div className="mt-8 flex items-center justify-center gap-2">
							<button className="rounded-lg border border-border px-3 py-2 text-muted-foreground hover:bg-muted">
								←
							</button>
							{[1, 2, 3, "...", 33].map((page) => (
								<button
									key={page}
									className={`rounded-lg px-3 py-2 ${page === 1 ? "bg-primary text-white" : "border border-border text-muted-foreground hover:bg-muted"}`}
								>
									{page}
								</button>
							))}
							<button className="rounded-lg border border-border px-3 py-2 text-muted-foreground hover:bg-muted">
								→
							</button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
