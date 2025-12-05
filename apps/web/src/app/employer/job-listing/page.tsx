"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { jobs } from "../data";

export default function JobListingPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">Job Listing</h1>
					<Button size="sm" className="bg-primary text-white hover:bg-primary/90">
						+ Post a job
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-4">
				<div className="flex items-center gap-3 text-sm">
					<p className="text-muted-foreground">Here is your job listing status</p>
					<div className="flex items-center gap-2 ml-auto">
						<Button variant="outline" size="sm">
							Jul 19 - Jul 25 📅
						</Button>
						<Button variant="outline" size="sm">
							Filters
						</Button>
					</div>
				</div>

				<div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
					<div className="grid grid-cols-[1.5fr_100px_140px_140px_140px_120px] px-6 py-3 text-xs font-semibold text-muted-foreground border-b border-border">
						<span>Roles</span>
						<span>Status</span>
						<span>Date Posted</span>
						<span>Due Date</span>
						<span>Job Type</span>
						<span>Applicants</span>
					</div>
					<div className="divide-y divide-border">
						{jobs.map((job) => (
							<div key={job.id} className="grid grid-cols-[1.5fr_100px_140px_140px_140px_120px] px-6 py-4 items-center hover:bg-muted/50">
								<div>
									<p className="font-semibold text-foreground">{job.title}</p>
								</div>
								<span className={`text-xs px-2 py-1 rounded-full border ${job.status === "Live" ? "border-emerald-300 text-emerald-700 bg-emerald-50" : "border-red-200 text-red-700 bg-red-50"}`}>
									{job.status}
								</span>
								<span className="text-sm text-muted-foreground">{job.datePosted}</span>
								<span className="text-sm text-muted-foreground">{job.dueDate}</span>
								<span className="text-sm text-muted-foreground">{job.type}</span>
								<div className="flex items-center gap-2">
									<span className="text-sm text-foreground">{job.applicants}</span>
									<span className="text-xs text-muted-foreground">{job.needs}</span>
									<Link href="/employer/applicants" className="text-primary text-sm hover:underline ml-auto">
										See Application
									</Link>
								</div>
							</div>
						))}
					</div>
					<div className="px-6 py-4 flex items-center justify-between text-sm text-muted-foreground">
						<span>View 10 / page</span>
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
