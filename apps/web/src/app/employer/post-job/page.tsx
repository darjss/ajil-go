"use client";

import { Button } from "@/components/ui/button";
import { perks } from "../data";

const steps = [
	{ label: "Job Information", step: 1 },
	{ label: "Job Description", step: 2 },
	{ label: "Perks & Benefit", step: 3 },
];

export default function PostJobPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">Post a Job</h1>
					<Button variant="outline" size="sm">
						Save Draft
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
				<div className="grid rounded-lg border border-border bg-white shadow-sm md:grid-cols-3">
					{steps.map((step) => (
						<div
							key={step.step}
							className={`flex items-center gap-3 border-border border-r px-4 py-4 last:border-r-0 ${
								step.step === 3 ? "bg-primary/5 text-primary" : "bg-white"
							}`}
						>
							<span className="flex h-8 w-8 items-center justify-center rounded-full border border-border font-semibold text-sm">
								{step.step}
							</span>
							<div>
								<p className="text-muted-foreground text-xs">
									Step {step.step}/3
								</p>
								<p className="font-semibold text-foreground">{step.label}</p>
							</div>
						</div>
					))}
				</div>

				<section className="space-y-4 rounded-lg border border-border bg-white p-6 shadow-sm">
					<h2 className="font-semibold text-foreground text-lg">
						Basic Information
					</h2>
					<p className="text-muted-foreground text-sm">
						List out your top perks and benefits.
					</p>

					<div className="flex items-center justify-between">
						<div>
							<p className="font-semibold text-foreground text-sm">
								Perks and Benefits
							</p>
							<p className="text-muted-foreground text-sm">
								Share the attractive rewards and benefits for your employees.
							</p>
						</div>
						<Button variant="outline" size="sm">
							+ Add Benefit
						</Button>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						{perks.map((perk) => (
							<div
								key={perk.title}
								className="space-y-2 rounded-lg border border-border p-4 hover:shadow-sm"
							>
								<div className="flex items-start justify-between">
									<div className="text-2xl">{perk.icon}</div>
									<button className="text-muted-foreground">✕</button>
								</div>
								<p className="font-semibold text-foreground">{perk.title}</p>
								<p className="text-muted-foreground text-sm">{perk.body}</p>
							</div>
						))}
					</div>

					<div className="flex justify-end">
						<Button className="bg-primary text-white hover:bg-primary/90">
							Do a Review
						</Button>
					</div>
				</section>
			</div>
		</div>
	);
}
