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
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">Post a Job</h1>
					<Button variant="outline" size="sm">
						Save Draft
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
				<div className="grid md:grid-cols-3 border border-border rounded-lg bg-white shadow-sm">
					{steps.map((step) => (
						<div
							key={step.step}
							className={`flex items-center gap-3 px-4 py-4 border-r border-border last:border-r-0 ${
								step.step === 3 ? "bg-primary/5 text-primary" : "bg-white"
							}`}
						>
							<span className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-sm font-semibold">
								{step.step}
							</span>
							<div>
								<p className="text-xs text-muted-foreground">Step {step.step}/3</p>
								<p className="font-semibold text-foreground">{step.label}</p>
							</div>
						</div>
					))}
				</div>

				<section className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-4">
					<h2 className="text-lg font-semibold text-foreground">Basic Information</h2>
					<p className="text-sm text-muted-foreground">List out your top perks and benefits.</p>

					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-semibold text-foreground">Perks and Benefits</p>
							<p className="text-sm text-muted-foreground">Share the attractive rewards and benefits for your employees.</p>
						</div>
						<Button variant="outline" size="sm">
							+ Add Benefit
						</Button>
					</div>

					<div className="grid md:grid-cols-3 gap-4">
						{perks.map((perk) => (
							<div key={perk.title} className="border border-border rounded-lg p-4 space-y-2 hover:shadow-sm">
								<div className="flex items-start justify-between">
									<div className="text-2xl">{perk.icon}</div>
									<button className="text-muted-foreground">✕</button>
								</div>
								<p className="font-semibold text-foreground">{perk.title}</p>
								<p className="text-sm text-muted-foreground">{perk.body}</p>
							</div>
						))}
					</div>

					<div className="flex justify-end">
						<Button className="bg-primary text-white hover:bg-primary/90">Do a Review</Button>
					</div>
				</section>
			</div>
		</div>
	);
}
