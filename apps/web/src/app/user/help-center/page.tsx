"use client";

import { Button } from "@/components/ui/button";
import { helpArticles, helpCategories } from "../data";

export default function HelpCenterPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">Тусламжийн төв</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 grid lg:grid-cols-[280px_1fr] gap-8">
				<aside className="space-y-4">
					<div>
						<label className="text-sm font-semibold text-foreground">Асуултаа хайх</label>
						<input
							className="mt-2 w-full rounded-lg border border-border px-4 py-3 text-sm bg-card"
							placeholder="Асуулт эсвэл түлхүүр үг"
						/>
					</div>
					<nav className="bg-white border border-border rounded-lg shadow-sm divide-y divide-border">
						{helpCategories.map((cat) => (
							<button
								key={cat}
								className="w-full text-left px-4 py-3 text-sm hover:bg-primary/5 font-medium text-foreground"
							>
								{cat}
							</button>
						))}
					</nav>
					<div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
						<p className="font-semibold text-foreground mb-1">Хүссэн мэдээллээ олсонгүй юу?</p>
						<p className="text-sm text-muted-foreground mb-3">Манай багтай холбогдоорой.</p>
						<Button size="sm" className="bg-primary text-white hover:bg-primary/90">
							Холбогдох
						</Button>
					</div>
				</aside>

				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-lg font-semibold text-foreground">Түгээмэл асуулт</h2>
							<p className="text-sm text-muted-foreground">Бидний бэлтгэсэн цөөн хариултаас эхлээрэй.</p>
						</div>
						<select className="border border-border rounded-lg px-3 py-2 text-sm bg-card">
							<option>Холбогдолтой</option>
							<option>Шинэ</option>
						</select>
					</div>

					<div className="space-y-3">
						{helpArticles.map((article) => (
							<div key={article.title} className="bg-white border border-border rounded-lg p-5 shadow-sm space-y-2">
								<div className="flex items-start justify-between gap-3">
									<h3 className="text-base font-semibold text-foreground">{article.title}</h3>
									<button className="text-muted-foreground">⋯</button>
								</div>
								<p className="text-sm text-muted-foreground">{article.summary}</p>
								<div className="flex items-center gap-3 text-sm text-muted-foreground">
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
