"use client";

import { Button } from "@/components/ui/button";
import { helpArticles, helpCategories } from "../data";

export default function HelpCenterPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">Тусламжийн төв</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="mx-auto grid max-w-6xl gap-8 px-6 py-8 lg:grid-cols-[280px_1fr]">
				<aside className="space-y-4">
					<div>
						<label className="font-semibold text-foreground text-sm">
							Асуултаа хайх
						</label>
						<input
							className="mt-2 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
							placeholder="Асуулт эсвэл түлхүүр үг"
						/>
					</div>
					<nav className="divide-y divide-border rounded-lg border border-border bg-white shadow-sm">
						{helpCategories.map((cat) => (
							<button
								key={cat}
								className="w-full px-4 py-3 text-left font-medium text-foreground text-sm hover:bg-primary/5"
							>
								{cat}
							</button>
						))}
					</nav>
					<div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
						<p className="mb-1 font-semibold text-foreground">
							Хүссэн мэдээллээ олсонгүй юу?
						</p>
						<p className="mb-3 text-muted-foreground text-sm">
							Манай багтай холбогдоорой.
						</p>
						<Button
							size="sm"
							className="bg-primary text-white hover:bg-primary/90"
						>
							Холбогдох
						</Button>
					</div>
				</aside>

				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="font-semibold text-foreground text-lg">
								Түгээмэл асуулт
							</h2>
							<p className="text-muted-foreground text-sm">
								Бидний бэлтгэсэн цөөн хариултаас эхлээрэй.
							</p>
						</div>
						<select className="rounded-lg border border-border bg-card px-3 py-2 text-sm">
							<option>Холбогдолтой</option>
							<option>Шинэ</option>
						</select>
					</div>

					<div className="space-y-3">
						{helpArticles.map((article) => (
							<div
								key={article.title}
								className="space-y-2 rounded-lg border border-border bg-white p-5 shadow-sm"
							>
								<div className="flex items-start justify-between gap-3">
									<h3 className="font-semibold text-base text-foreground">
										{article.title}
									</h3>
									<button className="text-muted-foreground">⋯</button>
								</div>
								<p className="text-muted-foreground text-sm">
									{article.summary}
								</p>
								<div className="flex items-center gap-3 text-muted-foreground text-sm">
									<span>Энэ мэдээлэл танд хэрэгтэй байсан уу?</span>
									<div className="flex gap-2">
										<Button variant="outline" size="sm">
											👍 {article.helpfulYes}
										</Button>
										<Button variant="outline" size="sm">
											👎 {article.helpfulNo}
										</Button>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
