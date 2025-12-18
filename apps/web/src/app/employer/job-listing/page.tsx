"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { jobs } from "../data";

export default function JobListingPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">Job Listing</h1>
					<Button
						size="sm"
						className="bg-primary text-white hover:bg-primary/90"
					>
						+ Post a job
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-4 px-6 py-8">
				<div className="flex items-center gap-3 text-sm">
					<p className="text-muted-foreground">
						Here is your job listing status
					</p>
					<div className="ml-auto flex items-center gap-2">
						<Button variant="outline" size="sm">
							Jul 19 - Jul 25 📅
						</Button>
						<Button variant="outline" size="sm">
							Filters
						</Button>
					</div>
				</div>

				<div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
					<div className="grid grid-cols-[1.5fr_100px_140px_140px_140px_120px] border-border border-b px-6 py-3 font-semibold text-muted-foreground text-xs">
						<span>Roles</span>
						<span>Status</span>
						<span>Date Posted</span>
						<span>Due Date</span>
						<span>Job Type</span>
						<span>Applicants</span>
					</div>
					<div className="divide-y divide-border">
						{jobs.map((job) => (
							<div
								key={job.id}
								className="grid grid-cols-[1.5fr_100px_140px_140px_140px_120px] items-center px-6 py-4 hover:bg-muted/50"
							>
								<div>
									<p className="font-semibold text-foreground">{job.title}</p>
								</div>
								<span
									className={`rounded-full border px-2 py-1 text-xs ${job.status === "Live" ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}
								>
									{job.status}
								</span>
								<span className="text-muted-foreground text-sm">
									{job.datePosted}
								</span>
								<span className="text-muted-foreground text-sm">
									{job.dueDate}
								</span>
								<span className="text-muted-foreground text-sm">
									{job.type}
								</span>
								<div className="flex items-center gap-2">
									<span className="text-foreground text-sm">
										{job.applicants}
									</span>
									<span className="text-muted-foreground text-xs">
										{job.needs}
									</span>
									<Link
										href="/employer/applicants"
										className="ml-auto text-primary text-sm hover:underline"
									>
										See Application
									</Link>
								</div>
							</div>
						))}
					</div>
					<div className="flex items-center justify-between px-6 py-4 text-muted-foreground text-sm">
						<span>View 10 / page</span>
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
