"use client";

import type { Route } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const companyDetails = {
	1: {
		name: "Stripe",
		icon: "S",
		color: "bg-blue-600",
		location: "Парис, Франц",
		founded: "2011 оны 7 сарын 31",
		employees: "4000+ хүн",
		industry: "Төлбөрийн платформ",
		website: "https://stripe.com",
		description:
			"Stripe нь интернэт бизнес эхлүүлж, хөгжүүлэхэд зориулагдсан платформ. Дэлхийн сая сая бизнес Stripe-ийн хэрэгслээр төлбөр хүлээн авч, олон улсад тэлж, онлайн бизнесээ удирддаг. Stripe нь нийт 728,000 ам.долларын борлуулалт хийсэн.",
		techStack: ["HTML5", "CSS3", "JavaScript", "Ruby", "Magento"],
		officeLocations: [
			{ country: "АНУ", flag: "🇺🇸" },
			{ country: "Их Британи", flag: "🇬🇧" },
			{ country: "Япон", flag: "🇯🇵" },
			{ country: "Австрали", flag: "🇦🇺" },
			{ country: "Хятад", flag: "🇨🇳" },
		],
		teamMembers: [
			{
				name: "Celestin Gardinier",
				role: "Гүйцэтгэх захирал, хамтран үүсгэн байгуулагч",
				image: "👨‍💼",
			},
			{
				name: "Raymond Chribert",
				role: "Хамтран үүсгэн байгуулагч",
				image: "👨‍💼",
			},
			{ name: "Annette Black", role: "Ерөнхий захирал", image: "👩‍💼" },
			{ name: "Bernard Alexander", role: "Ерөнхий захирал", image: "👨‍💼" },
			{ name: "Christine Jhonson", role: "Ерөнхий захирал", image: "👩‍💼" },
		],
		jobCount: 7,
	},
};

const jobs = [
	{
		id: 1,
		title: "Сошиал медиа туслах",
		company: "Nomad",
		location: "Парис, Франц",
		type: "Бүтэн цагийн",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		icon: "N",
		color: "bg-emerald-500",
	},
	{
		id: 2,
		title: "Сошиал медиа туслах",
		company: "Notify",
		location: "Парис, Франц",
		type: "Бүтэн цагийн",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		icon: "NO",
		color: "bg-cyan-500",
	},
	{
		id: 3,
		title: "Брэнд дизайнер",
		company: "Dropbox",
		location: "Сан Франциско, АНУ",
		type: "Бүтэн цагийн",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		icon: "D",
		color: "bg-blue-500",
	},
	{
		id: 4,
		title: "Брэнд дизайнер",
		company: "Maze",
		location: "Сан Франциско, АНУ",
		type: "Бүтэн цагийн",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		icon: "M",
		color: "bg-blue-400",
	},
	{
		id: 5,
		title: "Интерактив хөгжүүлэгч",
		company: "Terraform",
		location: "Хамбург, Герман",
		type: "Бүтэн цагийн",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		icon: "T",
		color: "bg-purple-500",
	},
	{
		id: 6,
		title: "Интерактив хөгжүүлэгч",
		company: "Udacity",
		location: "Хамбург, Герман",
		type: "Бүтэн цагийн",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
		icon: "U",
		color: "bg-orange-500",
	},
];

export default function CompanyDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const company =
		companyDetails[params.id as unknown as keyof typeof companyDetails] ||
		companyDetails[1];

	return (
		<main className="min-h-screen bg-background">
			{/* Breadcrumb */}
			<div className="mx-auto max-w-7xl px-4 py-6 text-muted-foreground text-sm sm:px-6 lg:px-8">
				<span>Нүүр</span> / <span>Компаниуд</span> / <span>{company.name}</span>
			</div>

			<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
				{/* Company Header */}
				<div className="mb-8 flex items-start justify-between border-border border-b pb-8">
					<div className="flex items-start gap-4">
						<div
							className={`h-20 w-20 ${company.color} flex items-center justify-center rounded-lg font-bold text-2xl text-white`}
						>
							{company.icon}
						</div>
						<div>
							<h1 className="font-bold text-3xl text-foreground">
								{company.name}
							</h1>
							<p className="text-muted-foreground">{company.website}</p>
						</div>
					</div>
					<Button className="bg-primary hover:bg-primary/90">
						Өргөдөл илгээх
					</Button>
				</div>

				<div className="grid gap-8 lg:grid-cols-3">
					{/* Main Content */}
					<div className="space-y-8 lg:col-span-2">
						{/* Company Profile */}
						<section>
							<h2 className="mb-4 font-bold text-2xl text-foreground">
								Компанийн танилцуулга
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{company.description}
							</p>
						</section>

						{/* Tech Stack */}
						<section>
							<h2 className="mb-4 font-bold text-2xl text-foreground">
								Технологийн стек
							</h2>
							<p className="mb-4 text-muted-foreground">
								{company.name} дараах технологи ашигладаг
							</p>
							<div className="flex flex-wrap gap-4">
								{company.techStack.map((tech) => (
									<div
										key={tech}
										className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-card text-center"
									>
										<span className="font-semibold text-foreground text-xs">
											{tech}
										</span>
									</div>
								))}
							</div>
							<Link
								href="#"
								className="mt-4 inline-block font-medium text-primary text-sm hover:underline"
							>
								Бүх технологи →
							</Link>
						</section>

						{/* Office Location */}
						<section>
							<h2 className="mb-4 font-bold text-2xl text-foreground">
								Оффисын байршил
							</h2>
							<p className="mb-4 text-muted-foreground">
								Stripe-ийн оффисууд {company.officeLocations.length} улсад
								байрладаг.
							</p>
							<div className="space-y-3">
								{company.officeLocations.map((office) => (
									<div key={office.country} className="flex items-center gap-3">
										<span className="text-2xl">{office.flag}</span>
										<span className="text-foreground">{office.country}</span>
									</div>
								))}
							</div>
							<Link
								href="#"
								className="mt-4 inline-block font-medium text-primary text-sm hover:underline"
							>
								Байршлуудыг үзэх →
							</Link>
						</section>

						{/* Team */}
						<section>
							<div className="mb-6 flex items-center justify-between">
								<h2 className="font-bold text-2xl text-foreground">Баг</h2>
								<Link
									href="#"
									className="font-medium text-primary text-sm hover:underline"
								>
									Бүгдийг харах (47)
								</Link>
							</div>
							<div className="grid grid-cols-2 gap-6 md:grid-cols-5">
								{company.teamMembers.map((member) => (
									<div key={member.name} className="text-center">
										<div className="mb-3 text-4xl">{member.image}</div>
										<h3 className="font-semibold text-foreground text-sm">
											{member.name}
										</h3>
										<p className="text-muted-foreground text-xs">
											{member.role}
										</p>
									</div>
								))}
							</div>
						</section>

						{/* Jobs */}
						<section>
							<div className="mb-6 flex items-center justify-between">
								<h2 className="font-bold text-2xl text-foreground">
									Нээлттэй ажлууд
								</h2>
								<Link
									href={"/find-jobs" as Route}
									className="font-medium text-primary text-sm hover:underline"
								>
									Бүх ажлыг харах →
								</Link>
							</div>
							<div className="grid gap-4 md:grid-cols-2">
								{jobs.map((job) => (
									<Link key={job.id} href={`/job/${job.id}` as Route}>
										<div className="cursor-pointer rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg">
											<div className="mb-3 flex items-start gap-3">
												<div
													className={`h-10 w-10 ${job.color} flex items-center justify-center rounded-lg font-bold text-sm text-white`}
												>
													{job.icon}
												</div>
												<div className="flex-1">
													<h4 className="font-semibold text-foreground text-sm">
														{job.title}
													</h4>
													<p className="text-muted-foreground text-xs">
														{job.company} • {job.location}
													</p>
												</div>
											</div>
											<div className="flex flex-wrap gap-2">
												{job.tags.map((tag) => (
													<span
														key={tag}
														className="rounded-full border border-border px-2 py-1 text-muted-foreground text-xs"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									</Link>
								))}
							</div>
						</section>
					</div>

					{/* Sidebar */}
					<div className="lg:col-span-1">
						<div className="sticky top-20 space-y-4 rounded-lg border border-border bg-card p-6">
							<h3 className="mb-6 font-semibold text-foreground">
								Компанийн товч
							</h3>

							<div>
								<p className="mb-1 text-muted-foreground text-xs">
									Байгуулагдсан
								</p>
								<p className="font-semibold text-foreground text-sm">
									{company.founded}
								</p>
							</div>

							<div className="border-border border-t pt-4">
								<p className="mb-1 text-muted-foreground text-xs">Ажилчид</p>
								<p className="font-semibold text-foreground text-sm">
									{company.employees}
								</p>
							</div>

							<div className="border-border border-t pt-4">
								<p className="mb-1 text-muted-foreground text-xs">Байршил</p>
								<p className="font-semibold text-foreground text-sm">
									{company.location}
								</p>
							</div>

							<div className="border-border border-t pt-4">
								<p className="mb-1 text-muted-foreground text-xs">Салбар</p>
								<p className="font-semibold text-foreground text-sm">
									{company.industry}
								</p>
							</div>

							<div className="border-border border-t pt-4">
								<p className="mb-1 text-muted-foreground text-xs">
									Нээлттэй ажлын байр
								</p>
								<p className="font-semibold text-foreground text-sm">
									{company.jobCount} ажил
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
