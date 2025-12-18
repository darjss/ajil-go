"use client";

import Link from "next/link";
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
		icon: "P",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		applied: 5,
		capacity: 10,
		color: "bg-blue-600",
	},
];

const featuredJobs = [
	{
		id: 1,
		title: "Имэйл маркетинг мэргэжилтэн",
		company: "Revolut",
		location: "Мадрид, Испани",
		type: "Бүтэн цагийн",
		icon: "R",
		color: "bg-red-500",
	},
	{
		id: 2,
		title: "Брэнд дизайнер",
		company: "Dropbox",
		location: "Сан Франциско, АНУ",
		type: "Бүтэн цагийн",
		icon: "D",
		color: "bg-blue-500",
	},
	{
		id: 3,
		title: "Шууд жагсаалт",
		company: "Direct",
		location: "Берлин, Герман",
		type: "Бүтэн цагийн",
		icon: "DL",
		color: "bg-black",
	},
	{
		id: 4,
		title: "Бүтээгдэхүүний дизайнер",
		company: "ClassPass",
		location: "Манчестер, Их Британи",
		type: "Бүтэн цагийн",
		icon: "CP",
		color: "bg-orange-600",
	},
	{
		id: 5,
		title: "Брэнд стратегич",
		company: "Gobadly",
		location: "Марсель, Франц",
		type: "Бүтэн цагийн",
		icon: "GB",
		color: "bg-purple-600",
	},
	{
		id: 6,
		title: "Өгөгдлийн шинжээч",
		company: "Twitter",
		location: "Сан Диего, АНУ",
		type: "Бүтэн цагийн",
		icon: "TW",
		color: "bg-blue-400",
	},
];

const categories = [
	{ name: "Дизайн", count: "235 нээлттэй ажлын байр" },
	{ name: "Борлуулалт", count: "756 нээлттэй ажлын байр" },
	{ name: "Маркетинг", count: "140 нээлттэй ажлын байр" },
	{ name: "Санхүү", count: "555 нээлттэй ажлын байр" },
	{ name: "Технологи", count: "436 нээлттэй ажлын байр" },
	{ name: "Инженерчлэл", count: "640 нээлттэй ажлын байр" },
	{ name: "Бизнес", count: "211 нээлттэй ажлын байр" },
	{ name: "Хүний нөөц", count: "346 нээлттэй ажлын байр" },
];

export default function HomePage() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
				<div className="mb-16 grid items-center gap-12 md:grid-cols-2">
					<div>
						<h1 className="mb-4 font-bold text-4xl text-foreground md:text-5xl">
							Илүү ихийг нээ
							<br />
							<span className="text-primary">5000+ ажлаас</span>
							<br />
							Сонголтоо хий
						</h1>
						<p className="mb-8 text-lg text-muted-foreground">
							Шинэ карьерийн боломж хайж буй, стартапд дуртай ажил хайгчдад
							зориулсан платформ.
						</p>

						{/* Search Bar */}
						<div className="mb-6 flex gap-3">
							<input
								type="text"
								placeholder="Ажлын нэр эсвэл түлхүүр үг"
								className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-muted-foreground"
							/>
							<select className="rounded-lg border border-border bg-card px-4 py-3 text-foreground">
								<option>Флоренц, Итали</option>
							</select>
							<Button className="bg-primary hover:bg-primary/90">
								Ажил хайх
							</Button>
						</div>

						<p className="text-muted-foreground text-sm">
							Тренд: UI дизайнер, UX судлаач, Андроид, Админ
						</p>
					</div>

					<div className="hidden md:block">
						<div className="flex items-center gap-8">
							<div className="rounded-lg border border-border bg-card p-8 text-center">
								<div className="mb-2 font-bold text-4xl text-foreground">
									100K+
								</div>
								<p className="text-muted-foreground">
									Эндээс ажилд орсон хүмүүс
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Companies Featured */}
				<div className="mb-16">
					<p className="mb-4 text-muted-foreground text-sm">
						Бидэнтэй хамт өсөж буй компаниуд
					</p>
					<div className="flex flex-wrap items-center gap-6">
						{["Vodafone", "Intel", "Tesla", "AMD", "Talkit"].map((company) => (
							<span
								key={company}
								className="font-semibold text-lg text-muted-foreground"
							>
								{company}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* Explore by Category */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h2 className="font-bold text-3xl text-foreground">
							Ангилалаар <span className="text-primary">хайх</span>
						</h2>
					</div>
					<Link
						href="/find-jobs"
						className="font-medium text-primary text-sm hover:underline"
					>
						Бүх ажлыг харах
					</Link>
				</div>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					{categories.map((cat) => (
						<div
							key={cat.name}
							className="cursor-pointer rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
						>
							<div className="mb-2 font-bold text-2xl text-primary">✦</div>
							<h3 className="mb-1 font-semibold text-foreground">{cat.name}</h3>
							<p className="text-muted-foreground text-xs">{cat.count}</p>
						</div>
					))}
				</div>
			</section>

			{/* Featured Jobs */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-center justify-between">
					<h2 className="font-bold text-3xl text-foreground">
						Онцлох <span className="text-primary">ажлууд</span>
					</h2>
					<Link
						href="/find-jobs"
						className="font-medium text-primary text-sm hover:underline"
					>
						Бүх ажлыг харах
					</Link>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{featuredJobs.map((job) => (
						<div
							key={job.id}
							className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
						>
							<div className="mb-4 flex items-start justify-between">
								<div
									className={`h-12 w-12 ${job.color} flex items-center justify-center rounded-lg font-bold text-sm text-white`}
								>
									{job.icon}
								</div>
								<span className="rounded bg-green-100 px-2 py-1 text-green-700 text-xs">
									{job.type}
								</span>
							</div>
							<h3 className="mb-1 font-semibold text-foreground">
								{job.title}
							</h3>
							<p className="mb-4 text-muted-foreground text-sm">
								{job.company} • {job.location}
							</p>
							<Link
								href="/find-jobs"
								className="font-medium text-primary text-sm hover:underline"
							>
								Дэлгэрэнгүй
							</Link>
						</div>
					))}
				</div>
			</section>

			{/* Latest Jobs */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-8 flex items-center justify-between">
					<h2 className="font-bold text-3xl text-foreground">
						Шинээр <span className="text-primary">нээлттэй ажлууд</span>
					</h2>
					<Link
						href="/find-jobs"
						className="font-medium text-primary text-sm hover:underline"
					>
						Бүх ажлыг харах
					</Link>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{jobListings.map((job) => (
						<div
							key={job.id}
							className="rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg"
						>
							<div className="mb-4 flex items-start justify-between">
								<div className="flex items-center gap-4">
									<div
										className={`h-14 w-14 ${job.color} flex items-center justify-center rounded-lg font-bold text-white`}
									>
										{job.icon}
									</div>
									<div>
										<h3 className="font-semibold text-foreground">
											{job.title}
										</h3>
										<p className="text-muted-foreground text-sm">
											{job.company} • {job.location}
										</p>
									</div>
								</div>
								<span className="rounded bg-green-100 px-2 py-1 text-green-700 text-xs">
									{job.type}
								</span>
							</div>
							<div className="mb-4 flex flex-wrap gap-2">
								{job.tags.map((tag) => (
									<span
										key={tag}
										className="rounded-full border border-border px-2 py-1 text-muted-foreground text-xs"
									>
										{tag}
									</span>
								))}
							</div>
							<p className="text-muted-foreground text-xs">
								{job.applied} хүн өргөдөл өгсөн, багтаамж {job.capacity}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* CTA Section */}
			<section className="my-16 bg-primary py-16 text-white">
				<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-4 font-bold text-3xl">
						Ажлын зар тавихаа өнөөдрөөс эхлүүл
					</h2>
					<p className="mb-8 text-lg text-primary-foreground/90">
						Зөвхөн $10-оор ажлын зар тавина
					</p>
					<Link href="/signup">
						<Button className="bg-white text-primary hover:bg-gray-100">
							Үнэгүй бүртгүүлэх
						</Button>
					</Link>
				</div>
			</section>
		</main>
	);
}
