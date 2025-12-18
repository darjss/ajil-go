"use client";

import Link from "next/link";
import { useState } from "react";
import { ApplicationModal } from "@/components/application-modal";
import { Button } from "@/components/ui/button";

const jobDetails = {
	1: {
		title: "Сошиал медиа туслах",
		company: "Stripe",
		location: "Парис, Франц",
		type: "Бүтэн цагийн",
		icon: "S",
		color: "bg-blue-600",
		description:
			"Stripe нь манай онлайн сувгуудыг идэвхтэй өсгөх сошиал медиа маркетингийн мэргэжилтэн хайж байна. Та контент бэлтгэж, нийтэлж, олон нийттэй харилцаж, үр дүнтэй оролцоог бий болгоход төвлөрнө.",
		responsibilities: [
			"Олон нийтийн оролцоог идэвхтэй дэмжиж, брэндийг онлайн орчинд төлөөлөх",
			"Сошиал медиа контентын төлөвлөгөө гаргаж, зөв сувгаар түгээх",
			"Маркетингийн стратеги, кампанит ажилд дэмжлэг үзүүлэх",
			"Сошиал медиа трэндүүдийг ажиглаж, контентийн шинэ санаа санал болгох",
			"Онлайн хамт олон, хэрэглэгчидтэй тогтмол харилцах",
		],
		whoYouAre: [
			"Хүмүүсээс энерги авч, багаар хамтран ажиллахыг хүсдэг",
			"Албан тасалгааны орчны гоо зүй, туршлагад анхааралтай",
			"Нэмэлт үүрэг хариуцлага авахаас айдаггүй туршлагатай оффис менежер",
			"Дэлгэрч, бүтээлч, жижиг зүйлд анхаардаг",
			"Өсөлтийн маркетер тул кампанит ажил удирдах туршлагатай",
		],
		niceToHaves: [
			"Англи хэлэнд чөлөөтэй",
			"Төслийн удирдлагын чадвар",
			"Контент, текст найруулгын ур чадвар",
		],
		perksAndBenefits: [
			{
				title: "Бүрэн эрүүл мэндийн даатгал",
				description:
					"Багийн гишүүд эрүүл, аз жаргалтай байж гэмээнэ хамт олон цэцэглэнэ гэж бид итгэдэг.",
			},
			{
				title: "Хязгааргүй амралт",
				description:
					"Ажил, амьдралын уян хатан цагийн хуваарьтай байж, сэргэх боломжийг дэмжинэ.",
			},
			{
				title: "Ур чадвар хөгжүүлэлт",
				description:
					"Онлайн сургалт, оффлайн уулзалт гээд шинэ мэдлэгээр байнга өөрийгөө хөгжүүлэхэд урамшуулна.",
			},
			{
				title: "Багийн уулзалт",
				description:
					"6 сар тутам багийнхаа амжилт, төлөвлөгөөг ярилцаж, амарч, нэг зорилгоо шинэчилдэг.",
			},
			{
				title: "Алсаас ажиллах нөхцөл",
				description:
					"Гэр, оффис, кофе шоп гээд хамгийн бүтээмжтэй газраасаа ажиллах сонголттой.",
			},
			{
				title: "Замын урамшуулал",
				description:
					"Өдөр бүр ажилдаа ирэх замын цаг, хүч хөдөлмөрийг үнэлж, урамшуулал олгодог.",
			},
		],
		appliedCount: 5,
		capacity: 10,
		applyBefore: "2021 оны 7 сарын 31",
		jobMarked: "2021 оны 7 сарын 1",
		salary: "$75k - $85k (USD)",
	},
};

const similarJobs = [
	{
		id: 2,
		title: "Сошиал медиа туслах",
		company: "Nomad",
		location: "Парис, Франц",
		type: "Бүтэн цагийн",
		icon: "N",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
	},
	{
		id: 3,
		title: "Сошиал медиа туслах",
		company: "Notify",
		location: "Парис, Франц",
		type: "Бүтэн цагийн",
		icon: "NO",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
	},
	{
		id: 4,
		title: "Брэнд дизайнер",
		company: "Dropbox",
		location: "Сан Франциско, АНУ",
		type: "Бүтэн цагийн",
		icon: "D",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
	},
	{
		id: 5,
		title: "Брэнд дизайнер",
		company: "Maze",
		location: "Сан Франциско, АНУ",
		type: "Бүтэн цагийн",
		icon: "M",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
	},
	{
		id: 6,
		title: "Интерактив хөгжүүлэгч",
		company: "Terraform",
		location: "Хамбург, Герман",
		type: "Бүтэн цагийн",
		icon: "T",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
	},
	{
		id: 7,
		title: "Интерактив хөгжүүлэгч",
		company: "Udacity",
		location: "Хамбург, Герман",
		type: "Бүтэн цагийн",
		icon: "U",
		tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
	},
];

export default function JobDetailPage({ params }: { params: { id: string } }) {
	const job =
		jobDetails[params.id as unknown as keyof typeof jobDetails] ||
		jobDetails[1];
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<main className="min-h-screen bg-background">
				{/* Breadcrumb */}
				<div className="mx-auto max-w-7xl px-4 py-6 text-muted-foreground text-sm sm:px-6 lg:px-8">
					<span>Нүүр</span> / <span>Компаниуд</span> /{" "}
					<span>{job.company}</span> / <span>{job.title}</span>
				</div>

				<div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
					{/* Job Header */}
					<div className="mb-8 flex items-start justify-between">
						<div className="flex items-start gap-4">
							<div
								className={`h-16 w-16 ${job.color} flex items-center justify-center rounded-lg font-bold text-lg text-white`}
							>
								{job.icon}
							</div>
							<div>
								<h1 className="font-bold text-3xl text-foreground">
									{job.title}
								</h1>
								<p className="text-muted-foreground">
									{job.company} • {job.location} • {job.type}
								</p>
							</div>
						</div>
						<div className="flex gap-3">
							<Button variant="outline" aria-label="Зар хуваалцах">
								📤
							</Button>
							<Button
								className="bg-primary hover:bg-primary/90"
								onClick={() => setIsModalOpen(true)}
							>
								Өргөдөл илгээх
							</Button>
						</div>
					</div>

					<div className="grid gap-8 lg:grid-cols-3">
						{/* Main Content */}
						<div className="space-y-8 lg:col-span-2">
							{/* Description */}
							<section>
								<h2 className="mb-4 font-bold text-2xl text-foreground">
									Ажлын товч
								</h2>
								<p className="text-muted-foreground leading-relaxed">
									{job.description}
								</p>
							</section>

							{/* Responsibilities */}
							<section>
								<h2 className="mb-4 font-bold text-2xl text-foreground">
									Үндсэн үүрэг
								</h2>
								<ul className="space-y-3">
									{job.responsibilities.map((item) => (
										<li key={item} className="flex gap-3 text-muted-foreground">
											<span className="mt-1 text-primary">✓</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</section>

							{/* Who You Are */}
							<section>
								<h2 className="mb-4 font-bold text-2xl text-foreground">
									Таны тухай
								</h2>
								<ul className="space-y-3">
									{job.whoYouAre.map((item) => (
										<li key={item} className="flex gap-3 text-muted-foreground">
											<span className="mt-1 text-primary">✓</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</section>

							{/* Nice-To-Haves */}
							<section>
								<h2 className="mb-4 font-bold text-2xl text-foreground">
									Давуу талууд
								</h2>
								<ul className="space-y-3">
									{job.niceToHaves.map((item) => (
										<li key={item} className="flex gap-3 text-muted-foreground">
											<span className="mt-1 text-primary">✓</span>
											<span>{item}</span>
										</li>
									))}
								</ul>
							</section>

							{/* Perks & Benefits */}
							<section>
								<h2 className="mb-4 font-bold text-2xl text-foreground">
									Бонус ба урамшуулал
								</h2>
								<p className="mb-6 text-muted-foreground text-sm">
									Энэ ажлын байранд дараах боломжууд багтсан
								</p>
								<div className="grid gap-6 md:grid-cols-2">
									{job.perksAndBenefits.map((perk) => (
										<div key={perk.title} className="flex gap-3">
											<span className="text-2xl">💼</span>
											<div>
												<h3 className="font-semibold text-foreground">
													{perk.title}
												</h3>
												<p className="text-muted-foreground text-sm">
													{perk.description}
												</p>
											</div>
										</div>
									))}
								</div>
							</section>

							{/* Company Info */}
							<section className="rounded-lg border border-border bg-card p-6">
								<div className="mb-4 flex items-center gap-4">
									<div
										className={`h-12 w-12 ${job.color} flex items-center justify-center rounded-lg font-bold text-white`}
									>
										{job.icon}
									</div>
									<div>
										<h3 className="font-semibold text-foreground">
											{job.company}
										</h3>
										<Link
											href="/browse-companies"
											className="text-primary text-sm hover:underline"
										>
											{job.company}-ийн талаар дэлгэрэнгүй унших
										</Link>
									</div>
								</div>
								<p className="text-muted-foreground text-sm">
									Stripe нь интернэт бизнес эхлүүлж, хөгжүүлэхэд зориулсан
									программын платформ. Дэлхийн сая сая бизнес Stripe-ийн
									хэрэгслээр төлбөр хүлээн авч, олон улсад тэлж, санхүүгийн
									менежментээ хийдэг.
								</p>
							</section>

							{/* Similar Jobs */}
							<section>
								<div className="mb-6 flex items-center justify-between">
									<h2 className="font-bold text-2xl text-foreground">
										Ижил төстэй <span className="text-primary">ажлууд</span>
									</h2>
									<Link
										href="/find-jobs"
										className="text-primary text-sm hover:underline"
									>
										Бүх ажлыг харах →
									</Link>
								</div>
								<div className="grid gap-4 md:grid-cols-2">
									{similarJobs.map((similarJob) => (
										<div
											key={similarJob.id}
											className="rounded-lg border border-border bg-card p-4 transition-shadow hover:shadow-lg"
										>
											<div className="mb-3 flex items-start gap-3">
												<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 font-bold text-sm text-white">
													{similarJob.icon}
												</div>
												<div className="flex-1">
													<h4 className="font-semibold text-foreground text-sm">
														{similarJob.title}
													</h4>
													<p className="text-muted-foreground text-xs">
														{similarJob.company} • {similarJob.location}
													</p>
												</div>
											</div>
											<div className="flex flex-wrap gap-2">
												{similarJob.tags.map((tag) => (
													<span
														key={tag}
														className="rounded-full border border-border px-2 py-1 text-muted-foreground text-xs"
													>
														{tag}
													</span>
												))}
											</div>
										</div>
									))}
								</div>
							</section>
						</div>

						{/* Sidebar */}
						<div className="lg:col-span-1">
							<div className="sticky top-20 space-y-4 rounded-lg border border-border bg-card p-6">
								<h3 className="mb-6 font-semibold text-foreground">
									Энэ ажлын мэдээлэл
								</h3>

								<div>
									<p className="mb-1 text-muted-foreground text-xs">
										Өргөдөл өгсөн
									</p>
									<div className="flex items-center gap-2">
										<div className="h-2 flex-1 rounded-full bg-muted">
											<div
												className="h-2 rounded-full bg-primary"
												style={{
													width: `${(job.appliedCount / job.capacity) * 100}%`,
												}}
											/>
										</div>
										<span className="font-semibold text-foreground text-sm">
											{job.appliedCount}/{job.capacity}
										</span>
									</div>
								</div>

								<div className="border-border border-t pt-4">
									<p className="mb-1 text-muted-foreground text-xs">
										Өргөдөл авах эцсийн өдөр
									</p>
									<p className="font-semibold text-foreground text-sm">
										{job.applyBefore}
									</p>
								</div>

								<div className="border-border border-t pt-4">
									<p className="mb-1 text-muted-foreground text-xs">
										Зар нийтэлсэн
									</p>
									<p className="font-semibold text-foreground text-sm">
										{job.jobMarked}
									</p>
								</div>

								<div className="border-border border-t pt-4">
									<p className="mb-1 text-muted-foreground text-xs">
										Ажлын төрөл
									</p>
									<p className="font-semibold text-foreground text-sm">
										{job.type}
									</p>
								</div>

								<div className="border-border border-t pt-4">
									<p className="mb-1 text-muted-foreground text-xs">Цалин</p>
									<p className="font-semibold text-foreground text-sm">
										{job.salary}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<ApplicationModal
				isOpen={isModalOpen}
				jobTitle={job.title}
				companyName={job.company}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}
