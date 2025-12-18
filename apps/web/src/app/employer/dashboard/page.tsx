"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { applicants, jobs } from "../data";

export default function EmployerDashboardPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<div>
						<p className="text-muted-foreground text-xs">Good morning, Maria</p>
						<h1 className="font-bold text-2xl text-foreground">
							Company Dashboard
						</h1>
					</div>
					<div className="flex items-center gap-3">
						<Button variant="outline" size="sm">
							Jul 19 - Jul 25 📅
						</Button>
						<Button
							size="sm"
							className="bg-primary text-white hover:bg-primary/90"
						>
							+ Post a job
						</Button>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
				<div className="grid gap-4 md:grid-cols-3">
					<SummaryCard
						title="New candidates"
						value="76"
						subtitle="to review"
						accent="bg-primary"
					/>
					<SummaryCard
						title="Schedule for today"
						value="3"
						subtitle=""
						accent="bg-emerald-500"
					/>
					<SummaryCard
						title="Messages received"
						value="24"
						subtitle=""
						accent="bg-blue-500"
					/>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<div className="rounded-lg border border-border bg-white p-6 shadow-sm md:col-span-2">
						<div className="mb-4 flex items-center justify-between">
							<h3 className="font-semibold text-foreground text-lg">
								Job statistics
							</h3>
							<div className="flex gap-2 text-muted-foreground text-xs">
								<button className="rounded bg-primary/10 px-2 py-1 text-primary">
									Week
								</button>
								<button className="rounded px-2 py-1 hover:bg-muted">
									Month
								</button>
								<button className="rounded px-2 py-1 hover:bg-muted">
									Year
								</button>
							</div>
						</div>
						<div className="flex h-56 items-center justify-center rounded-lg border border-border border-dashed bg-gradient-to-b from-primary/5 to-transparent text-muted-foreground">
							Chart placeholder
						</div>
					</div>
					<div className="space-y-4">
						<InfoTile title="Job Open" value="12" description="Jobs Opened" />
						<InfoTile
							title="Applicants"
							value="67"
							description="Summary by type"
						/>
					</div>
				</div>

				<div className="rounded-lg border border-border bg-white p-6 shadow-sm">
					<div className="mb-4 flex items-center justify-between">
						<h3 className="font-semibold text-foreground text-lg">
							Job Updates
						</h3>
						<Link href="#" className="text-primary text-sm hover:underline">
							View all →
						</Link>
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						{jobs.slice(0, 4).map((job) => (
							<div
								key={job.id}
								className="flex items-start gap-3 rounded-lg border border-border p-4"
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
									N
								</div>
								<div className="flex-1">
									<p className="font-semibold text-foreground">{job.title}</p>
									<p className="text-muted-foreground text-xs">
										{job.datePosted}
									</p>
									<p className="text-muted-foreground text-xs">
										{job.applicants} applied • Needs {job.needs}
									</p>
								</div>
								<Button
									size="sm"
									variant="outline"
									className="border-primary/40 text-primary"
								>
									See
								</Button>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-lg border border-border bg-white p-6 shadow-sm">
					<div className="mb-4 flex items-center justify-between">
						<h3 className="font-semibold text-foreground text-lg">
							Recent Applicants
						</h3>
						<Link
							href="/employer/applicants"
							className="text-primary text-sm hover:underline"
						>
							View all →
						</Link>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{applicants.slice(0, 6).map((appl) => (
							<div
								key={appl.id}
								className="space-y-2 rounded-lg border border-border p-4 hover:shadow-sm"
							>
								<div className="flex items-center gap-2">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
										👤
									</div>
									<div>
										<p className="font-semibold text-foreground">{appl.name}</p>
										<p className="text-muted-foreground text-xs">{appl.role}</p>
									</div>
								</div>
								<p className="text-muted-foreground text-xs">
									Applied {appl.applied}
								</p>
								<span
									className={`rounded-full px-2 py-1 text-[11px] ${appl.statusColor}`}
								>
									{appl.stage}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

function SummaryCard({
	title,
	value,
	subtitle,
	accent,
}: {
	title: string;
	value: string;
	subtitle?: string;
	accent: string;
}) {
	return (
		<div className="flex items-center gap-4 rounded-lg border border-border bg-white p-5 shadow-sm">
			<div
				className={`h-12 w-12 rounded-lg ${accent} flex items-center justify-center text-lg text-white`}
			>
				★
			</div>
			<div>
				<p className="text-muted-foreground text-sm">{title}</p>
				<p className="font-bold text-2xl text-foreground">{value}</p>
				{subtitle ? (
					<p className="text-muted-foreground text-xs">{subtitle}</p>
				) : null}
			</div>
		</div>
	);
}

function InfoTile({
	title,
	value,
	description,
}: {
	title: string;
	value: string;
	description: string;
}) {
	return (
		<div className="rounded-lg border border-border bg-white p-4 shadow-sm">
			<p className="text-muted-foreground text-sm">{title}</p>
			<p className="font-bold text-3xl text-foreground">{value}</p>
			<p className="text-muted-foreground text-xs">{description}</p>
		</div>
	);
}
