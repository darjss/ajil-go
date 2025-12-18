"use client";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "../components/status-badge";
import { applicationsFull, type Status } from "../data";

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
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">
						Миний өргөдлүүд
					</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<div>
						<h2 className="font-semibold text-foreground text-lg">
							Өргөдлийн тойм
						</h2>
						<p className="text-muted-foreground text-sm">
							Ажлын өргөдлүүдийн явцыг эндээс хянаарай.
						</p>
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
							className={`border-b-2 pb-2 font-semibold text-sm ${
								tab.key === "all"
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground"
							}`}
						>
							{tab.label} ({tab.count})
						</button>
					))}
				</div>

				<div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
					<div className="grid grid-cols-[60px_1fr_1fr_140px_140px] border-border border-b px-6 py-3 font-semibold text-muted-foreground text-xs">
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
								className="grid grid-cols-[60px_1fr_1fr_140px_140px] items-center px-6 py-4 transition-colors hover:bg-muted/50"
							>
								<span className="text-muted-foreground text-sm">{app.id}</span>
								<div>
									<p className="font-semibold text-foreground">{app.company}</p>
									<p className="text-muted-foreground text-xs">
										{app.location}
									</p>
								</div>
								<div>
									<p className="text-foreground text-sm">{app.role}</p>
									<p className="text-muted-foreground text-xs">{app.type}</p>
								</div>
								<span className="text-muted-foreground text-sm">
									{formatDate(app.date)}
								</span>
								<StatusBadge status={app.status as Status} />
							</div>
						))}
					</div>
					<div className="flex items-center justify-between px-6 py-4 text-muted-foreground text-sm">
						<span>1–5 / 45</span>
						<div className="flex gap-2">
							<button className="rounded-lg border border-border px-3 py-1 hover:bg-muted">
								←
							</button>
							<button className="rounded-lg bg-primary px-3 py-1 text-white">
								1
							</button>
							<button className="rounded-lg border border-border px-3 py-1 hover:bg-muted">
								2
							</button>
							<button className="rounded-lg border border-border px-3 py-1 hover:bg-muted">
								→
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function formatDate(date: string) {
	const d = new Date(date);
	return d.toLocaleDateString("mn-MN", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
