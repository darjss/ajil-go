"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusPill } from "../components/status-pill";
import { applicants } from "../data";

export default function ApplicantsPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">All Applicants</h1>
					<Button variant="outline" size="sm">
						Filters
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-4 px-6 py-8">
				<div className="flex items-center gap-3 text-sm">
					<input
						className="flex-1 rounded-lg border border-border bg-card px-4 py-3"
						placeholder="Search applicants"
					/>
					<Button variant="outline">Pipeline View</Button>
					<Button variant="outline">Table View</Button>
				</div>

				<div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
					<div className="grid grid-cols-[60px_1.5fr_1fr_1fr_1fr_120px] border-border border-b px-6 py-3 font-semibold text-muted-foreground text-xs">
						<span> </span>
						<span>Full Name</span>
						<span>Score</span>
						<span>Hiring Stage</span>
						<span>Applied Date</span>
						<span>Action</span>
					</div>
					<div className="divide-y divide-border">
						{applicants.map((appl) => (
							<div
								key={appl.id}
								className="grid grid-cols-[60px_1.5fr_1fr_1fr_1fr_120px] items-center px-6 py-4 hover:bg-muted/50"
							>
								<input type="checkbox" className="mx-auto" />
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
										👤
									</div>
									<div>
										<p className="font-semibold text-foreground">{appl.name}</p>
										<p className="text-muted-foreground text-xs">{appl.role}</p>
									</div>
								</div>
								<span className="text-muted-foreground text-sm">
									{appl.score.toFixed(1)}
								</span>
								<StatusPill stage={appl.stage} />
								<span className="text-muted-foreground text-sm">
									{appl.applied}
								</span>
								<Link
									href={`/employer/applicants/${appl.id}`}
									className="font-semibold text-primary text-sm hover:underline"
								>
									See Application
								</Link>
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
