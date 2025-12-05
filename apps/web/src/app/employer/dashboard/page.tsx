"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { applicants, jobs } from "../data";

export default function EmployerDashboardPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<div>
						<p className="text-xs text-muted-foreground">Good morning, Maria</p>
						<h1 className="text-2xl font-bold text-foreground">Company Dashboard</h1>
					</div>
					<div className="flex items-center gap-3">
						<Button variant="outline" size="sm">
							Jul 19 - Jul 25 📅
						</Button>
						<Button size="sm" className="bg-primary text-white hover:bg-primary/90">
							+ Post a job
						</Button>
					</div>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
				<div className="grid md:grid-cols-3 gap-4">
					<SummaryCard title="New candidates" value="76" subtitle="to review" accent="bg-primary" />
					<SummaryCard title="Schedule for today" value="3" subtitle="" accent="bg-emerald-500" />
					<SummaryCard title="Messages received" value="24" subtitle="" accent="bg-blue-500" />
				</div>

				<div className="grid md:grid-cols-3 gap-6">
					<div className="md:col-span-2 bg-white border border-border rounded-lg shadow-sm p-6">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-foreground">Job statistics</h3>
							<div className="flex gap-2 text-xs text-muted-foreground">
								<button className="px-2 py-1 rounded bg-primary/10 text-primary">Week</button>
								<button className="px-2 py-1 rounded hover:bg-muted">Month</button>
								<button className="px-2 py-1 rounded hover:bg-muted">Year</button>
							</div>
						</div>
						<div className="h-56 bg-gradient-to-b from-primary/5 to-transparent rounded-lg border border-dashed border-border flex items-center justify-center text-muted-foreground">
							Chart placeholder
						</div>
					</div>
					<div className="space-y-4">
						<InfoTile title="Job Open" value="12" description="Jobs Opened" />
						<InfoTile title="Applicants" value="67" description="Summary by type" />
					</div>
				</div>

				<div className="bg-white border border-border rounded-lg shadow-sm p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-foreground">Job Updates</h3>
						<Link href="#" className="text-primary text-sm hover:underline">
							View all →
						</Link>
					</div>
					<div className="grid md:grid-cols-2 gap-4">
						{jobs.slice(0, 4).map((job) => (
							<div key={job.id} className="border border-border rounded-lg p-4 flex items-start gap-3">
								<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-semibold text-primary">N</div>
								<div className="flex-1">
									<p className="font-semibold text-foreground">{job.title}</p>
									<p className="text-xs text-muted-foreground">{job.datePosted}</p>
									<p className="text-xs text-muted-foreground">
										{job.applicants} applied • Needs {job.needs}
									</p>
								</div>
								<Button size="sm" variant="outline" className="text-primary border-primary/40">
									See
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="bg-white border border-border rounded-lg shadow-sm p-6">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-foreground">Recent Applicants</h3>
						<Link href="/employer/applicants" className="text-primary text-sm hover:underline">
							View all →
						</Link>
					</div>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{applicants.slice(0, 6).map((appl) => (
							<div key={appl.id} className="border border-border rounded-lg p-4 space-y-2 hover:shadow-sm">
								<div className="flex items-center gap-2">
									<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">👤</div>
									<div>
										<p className="font-semibold text-foreground">{appl.name}</p>
										<p className="text-xs text-muted-foreground">{appl.role}</p>
									</div>
								</div>
								<p className="text-xs text-muted-foreground">Applied {appl.applied}</p>
								<span className={`text-[11px] px-2 py-1 rounded-full ${appl.statusColor}`}>{appl.stage}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function SummaryCard({ title, value, subtitle, accent }: { title: string; value: string; subtitle?: string; accent: string }) {
	return (
		<div className="bg-white border border-border rounded-lg p-5 shadow-sm flex items-center gap-4">
			<div className={`w-12 h-12 rounded-lg ${accent} text-white flex items-center justify-center text-lg`}>★</div>
			<div>
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold text-foreground">{value}</p>
				{subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
			</div>
		</div>
	);
}

function InfoTile({ title, value, description }: { title: string; value: string; description: string }) {
	return (
		<div className="bg-white border border-border rounded-lg p-4 shadow-sm">
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="text-3xl font-bold text-foreground">{value}</p>
			<p className="text-xs text-muted-foreground">{description}</p>
		</div>
	);
}
