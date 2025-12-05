"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { applicants } from "../data";
import { StatusPill } from "../components/status-pill";

export default function ApplicantsPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">All Applicants</h1>
					<Button variant="outline" size="sm">
						Filters
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-4">
				<div className="flex items-center gap-3 text-sm">
					<input className="flex-1 rounded-lg border border-border px-4 py-3 bg-card" placeholder="Search applicants" />
					<Button variant="outline">Pipeline View</Button>
					<Button variant="outline">Table View</Button>
				</div>

				<div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
					<div className="grid grid-cols-[60px_1.5fr_1fr_1fr_1fr_120px] px-6 py-3 text-xs font-semibold text-muted-foreground border-b border-border">
						<span> </span>
						<span>Full Name</span>
						<span>Score</span>
						<span>Hiring Stage</span>
						<span>Applied Date</span>
						<span>Action</span>
					</div>
					<div className="divide-y divide-border">
						{applicants.map((appl) => (
							<div key={appl.id} className="grid grid-cols-[60px_1.5fr_1fr_1fr_1fr_120px] px-6 py-4 items-center hover:bg-muted/50">
								<input type="checkbox" className="mx-auto" />
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">👤</div>
									<div>
										<p className="font-semibold text-foreground">{appl.name}</p>
										<p className="text-xs text-muted-foreground">{appl.role}</p>
									</div>
								</div>
								<span className="text-sm text-muted-foreground">{appl.score.toFixed(1)}</span>
								<StatusPill stage={appl.stage} />
								<span className="text-sm text-muted-foreground">{appl.applied}</span>
								<Link href={`/employer/applicants/${appl.id}`} className="text-primary text-sm font-semibold hover:underline">
									See Application
								</Link>
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
