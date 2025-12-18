"use client";

import type { Route } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const recommendedCompanies = [
	{
		id: 1,
		name: "Nomad",
		jobCount: 3,
		icon: "N",
		color: "bg-emerald-500",
		revenue: "$728,000 борлуулалт (USD)",
		description: "Nomad нь Парис хотод байрладаг аялагчдад зориулсан платформ.",
		service: "Бизнес үйлчилгээ",
	},
	{
		id: 2,
		name: "Discord",
		jobCount: 3,
		icon: "D",
		color: "bg-blue-500",
		revenue: "$1.2B хөрөнгө оруулалт",
		description:
			"Таны шиг бүтээлч хүмүүстэй ажиллах дуртай, хэрэглэгчийн туршлагыг эрхэмлэдэг баг.",
		service: "Бизнес үйлчилгээ",
	},
	{
		id: 3,
		name: "Maze",
		jobCount: 3,
		icon: "M",
		color: "bg-blue-400",
		revenue: "$250M хөрөнгө оруулалт",
		description:
			"Дэлхийн өнцөг булан бүртээс хамтран ажиллаж, хурдан тестийн ирээдүйг бүтээдэг.",
		service: "Бизнес үйлчилгээ",
	},
	{
		id: 4,
		name: "Udacity",
		jobCount: 3,
		icon: "U",
		color: "bg-cyan-500",
		revenue: "$50M хөрөнгө оруулалт",
		description:
			"Udacity нь карьерын өсөлтөд хэрэгтэй бодит програмчлал, ур чадварыг заадаг онлайн их сургууль.",
		service: "Бизнес үйлчилгээ",
	},
	{
		id: 5,
		name: "Webflow",
		jobCount: 3,
		icon: "W",
		color: "bg-purple-500",
		revenue: "$120M хөрөнгө оруулалт",
		description:
			"Webflow нь мобайл эринд зориулан бүтээсэн дизайн ба хостингийн платформ.",
		service: "Бизнес үйлчилгээ",
	},
	{
		id: 6,
		name: "Foundation",
		jobCount: 3,
		icon: "F",
		color: "bg-black",
		revenue: "$50M хөрөнгө оруулалт",
		description:
			"Foundation нь бүтээлчдэд дижитал уран бүтээлээ NFT хэлбэрээр гарган, дуудлага худалдаагаар борлуулах боломж олгодог.",
		service: "Крипто",
	},
];

const companies = [
	{ name: "Pentagram", count: "3 ажил", icon: "P", color: "bg-red-600" },
	{ name: "Wolff Olins", count: "3 ажил", icon: "WO", color: "bg-black" },
	{ name: "Clay", count: "3 ажил", icon: "C", color: "bg-gray-800" },
	{ name: "MediaMonks", count: "3 ажил", icon: "M", color: "bg-gray-900" },
	{ name: "Packer", count: "3 ажил", icon: "P", color: "bg-orange-500" },
	{ name: "Square", count: "3 ажил", icon: "S", color: "bg-black" },
	{ name: "Divvy", count: "3 ажил", icon: "D", color: "bg-gray-600" },
	{ name: "WebFlow", count: "3 ажил", icon: "W", color: "bg-purple-500" },
];

const categories = [
	{ name: "Дизайн", icon: "✦" },
	{ name: "Санхүүгийн технологи", icon: "💳" },
	{ name: "Хостинг", icon: "🌐" },
	{ name: "Бизнес үйлчилгээ", icon: "💼" },
	{ name: "Хөгжүүлэлт", icon: "< />" },
];

export default function BrowseCompaniesPage() {
	return (
		<main className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-16 grid items-center gap-12 md:grid-cols-2">
					<div>
						<h1 className="mb-4 font-bold text-4xl text-foreground md:text-5xl">
							Мөрөөдлийн <span className="text-primary">компаниа</span> ол
						</h1>
						<p className="mb-8 text-lg text-muted-foreground">
							Мөрөөдлийн компанид ажиллах боломжоо эндээс хай.
						</p>

						{/* Search Bar */}
						<div className="mb-6 flex gap-3">
							<input
								type="text"
								placeholder="Компанийн нэр эсвэл түлхүүр үг"
								className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-muted-foreground"
							/>
							<select className="rounded-lg border border-border bg-card px-4 py-3 text-foreground">
								<option>Флоренц, Итали</option>
							</select>
							<Button className="bg-primary hover:bg-primary/90">Хайх</Button>
						</div>

						<p className="text-muted-foreground text-sm">
							Алдартай: Twitter, Microsoft, Apple, Facebook
						</p>
					</div>

					<div className="hidden md:block">
						<div className="rounded-lg border border-border bg-card p-8 text-center">
							<div className="mb-2 font-bold text-4xl text-primary">5000+</div>
							<p className="text-muted-foreground">Нээлттэй ажлын байр</p>
						</div>
					</div>
				</div>

				{/* Featured CTA */}
				<div className="mb-16 flex items-center justify-between rounded-lg bg-primary p-8 text-primary-foreground md:p-12">
					<div>
						<h2 className="mb-2 font-bold text-3xl">
							Ажлын зараа өнөөдрөөс нийтэл
						</h2>
						<p className="text-primary-foreground/90">
							Зөвхөн $10-оор ажлын зар тавиарай
						</p>
					</div>
					<Button className="bg-white text-primary hover:bg-gray-100">
						Үнэгүй бүртгүүлэх
					</Button>
				</div>
			</section>

			{/* Recommended Companies */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-8">
					<h2 className="mb-2 font-bold text-3xl text-foreground">
						Танд санал болгох <span className="text-primary">компаниуд</span>
					</h2>
					<p className="text-muted-foreground">
						Таны профайл, сонирхол болон сүүлийн үйлдлүүдэд тулгуурласан
					</p>
				</div>

				<div className="mb-8 grid gap-6 md:grid-cols-3">
					{recommendedCompanies.map((company) => (
						<Link key={company.id} href={`/company/${company.id}` as Route}>
							<div className="h-full cursor-pointer rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-lg">
								<div className="mb-4 flex items-center gap-4">
									<div
										className={`h-12 w-12 ${company.color} flex items-center justify-center rounded-lg font-bold text-white`}
									>
										{company.icon}
									</div>
									<div>
										<h3 className="font-semibold text-foreground">
											{company.name}
										</h3>
										<p className="text-primary text-sm">
											{company.jobCount} ажил
										</p>
									</div>
								</div>
								<p className="mb-3 line-clamp-2 text-muted-foreground text-sm">
									{company.description}
								</p>
								<div className="flex flex-wrap gap-2">
									<span className="rounded-full bg-green-100 px-2 py-1 text-green-700 text-xs">
										{company.service}
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Explore by Category */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<h2 className="mb-8 font-bold text-3xl text-foreground">
					Ангиллаар <span className="text-primary">хайх</span>
				</h2>

				<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
					{categories.map((cat) => (
						<div
							key={cat.name}
							className="col-span-2 cursor-pointer rounded-lg bg-primary p-6 text-center text-white transition-shadow hover:shadow-lg md:col-span-1 md:col-span-auto"
						>
							<div className="mb-2 text-3xl">{cat.icon}</div>
							<h3 className="font-semibold">{cat.name}</h3>
						</div>
					))}
					<div className="flex cursor-pointer items-center justify-center rounded-lg border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
						<span className="text-xl">→</span>
					</div>
				</div>
			</section>

			{/* Companies by Category - Design */}
			<section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<h2 className="mb-2 font-bold text-2xl text-foreground">Дизайн</h2>
				<p className="mb-6 text-muted-foreground">24 үр дүн</p>

				<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
					{companies.map((company) => (
						<div
							key={company.name}
							className="cursor-pointer rounded-lg border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg"
						>
							<div
								className={`h-16 w-16 ${company.color} mx-auto mb-4 flex items-center justify-center rounded-lg font-bold text-lg text-white`}
							>
								{company.icon}
							</div>
							<h3 className="mb-1 font-semibold text-foreground">
								{company.name}
							</h3>
							<p className="text-primary text-sm">{company.count}</p>
						</div>
					))}
				</div>

				<div className="mt-8 text-center">
					<Link href="#" className="font-medium text-primary hover:underline">
						Дизайн чиглэлийн бусад компани →
					</Link>
				</div>
			</section>
		</main>
	);
}
