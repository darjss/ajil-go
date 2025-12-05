"use client";

import { Button } from "@/components/ui/button";
import { applicationsFull, type Status } from "../data";
import { StatusBadge } from "../components/status-badge";

const tabs = [
	{ key: "all", label: "Бүгд", count: 45 },
	{ key: "review", label: "Шалгаж байна", count: 12 },
	{ key: "interview", label: "Интервью", count: 8 },
	{ key: "offer", label: "Санал тавьсан", count: 2 },
	{ key: "hired", label: "Ажилд орсон", count: 1 },
];

export default function ApplicationsPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">Миний өргөдлүүд</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div>
						<h2 className="text-lg font-semibold text-foreground">Өргөдлийн тойм</h2>
						<p className="text-sm text-muted-foreground">Ажлын өргөдлүүдийн явцыг эндээс хянаарай.</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm">
							🔍 Хайх
						</Button>
						<Button variant="outline" size="sm">
							☰ Шүүлтүүр
						</Button>
					</div>
				</div>

				<div className="flex gap-6 overflow-x-auto">
					{tabs.map((tab) => (
						<button
							key={tab.key}
							className={`pb-2 text-sm font-semibold border-b-2 ${
								tab.key === "all" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
							}`}
						>
							{tab.label} ({tab.count})
						</button>
					))}
				</div>

				<div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
					<div className="grid grid-cols-[60px_1fr_1fr_140px_140px] px-6 py-3 text-xs font-semibold text-muted-foreground border-b border-border">
						<span>#</span>
						<span>Компани</span>
						<span>Ажлын нэр</span>
						<span>Илгээсэн</span>
						<span>Статус</span>
					</div>
					<div className="divide-y divide-border">
						{applicationsFull.map((app) => (
							<div
								key={app.id}
								className="grid grid-cols-[60px_1fr_1fr_140px_140px] px-6 py-4 items-center hover:bg-muted/50 transition-colors"
							>
								<span className="text-sm text-muted-foreground">{app.id}</span>
								<div>
									<p className="font-semibold text-foreground">{app.company}</p>
									<p className="text-xs text-muted-foreground">{app.location}</p>
								</div>
								<div>
									<p className="text-sm text-foreground">{app.role}</p>
									<p className="text-xs text-muted-foreground">{app.type}</p>
								</div>
								<span className="text-sm text-muted-foreground">{formatDate(app.date)}</span>
								<StatusBadge status={app.status as Status} />
							</div>
						))}
					</div>
					<div className="px-6 py-4 flex items-center justify-between text-sm text-muted-foreground">
						<span>1–5 / 45</span>
						<div className="flex gap-2">
							<button className="px-3 py-1 rounded-lg border border-border hover:bg-muted">←</button>
							<button className="px-3 py-1 rounded-lg bg-primary text-white">1</button>
							<button className="px-3 py-1 rounded-lg border border-border hover:bg-muted">2</button>
							<button className="px-3 py-1 rounded-lg border border-border hover:bg-muted">→</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function formatDate(date: string) {
	const d = new Date(date);
	return d.toLocaleDateString("mn-MN", { year: "numeric", month: "short", day: "numeric" });
}
