"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { applicantDetail } from "../../data";
import { StatusPill } from "../../components/status-pill";

export default function ApplicantDetailPage() {
	const appl = applicantDetail;

	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Link href="/employer/applicants" className="text-primary text-sm hover:underline">
							← Back
						</Link>
						<h1 className="text-2xl font-bold text-foreground">Applicant Details</h1>
					</div>
					<Button variant="outline" size="sm">
						More Action
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
				<div className="grid lg:grid-cols-[320px_1fr] gap-6">
					<aside className="bg-white border border-border rounded-lg shadow-sm p-5 space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-xl">🧑‍💼</div>
							<div>
								<p className="text-lg font-semibold text-foreground">{appl.name}</p>
								<p className="text-sm text-muted-foreground">{appl.title}</p>
								<p className="text-xs text-amber-600">★ {appl.score}</p>
							</div>
						</div>

						<div className="p-4 border border-border rounded-lg space-y-2">
							<div className="flex items-center justify-between text-xs text-muted-foreground">
								<span>Applied Jobs</span>
								<span>{appl.appliedJob.applied}</span>
							</div>
							<p className="font-semibold text-foreground">{appl.appliedJob.role}</p>
							<p className="text-xs text-muted-foreground">{appl.appliedJob.category} • {appl.appliedJob.type}</p>
							<div className="pt-2">
								<StatusPill stage={appl.appliedJob.stage} />
							</div>
						</div>

						<Button className="w-full bg-primary text-white hover:bg-primary/90">Schedule Interview</Button>

						<div className="space-y-2 text-sm">
							<p className="font-semibold text-foreground">Contact</p>
							<p className="text-muted-foreground">Email • {appl.contact.email}</p>
							<p className="text-muted-foreground">Phone • {appl.contact.phone}</p>
							<Link href={`https://${appl.contact.instagram}`} className="text-primary text-sm hover:underline">
								Instagram
							</Link>
							<Link href={`https://${appl.contact.twitter}`} className="text-primary text-sm hover:underline">
								Twitter
							</Link>
							<Link href={`https://${appl.contact.website}`} className="text-primary text-sm hover:underline">
								Website
							</Link>
						</div>
					</aside>

					<section className="bg-white border border-border rounded-lg shadow-sm">
						<div className="border-b border-border px-6 py-3 flex gap-4 text-sm font-semibold">
							<span className="text-primary">Applicant Profile</span>
							<span className="text-muted-foreground">Resume</span>
							<span className="text-muted-foreground">Hiring Progress</span>
							<span className="text-muted-foreground">Interview Schedule</span>
						</div>
						<div className="p-6 space-y-8">
							<div className="grid md:grid-cols-2 gap-6">
								<div>
									<h4 className="text-sm font-semibold text-foreground mb-2">Personal Info</h4>
									<ul className="space-y-2 text-sm text-muted-foreground">
										<li>Full Name: {appl.personalInfo.fullName}</li>
										<li>Gender: {appl.personalInfo.gender}</li>
										<li>Date of Birth: {appl.personalInfo.dob}</li>
										<li>Language: {appl.personalInfo.language}</li>
										<li>Address: {appl.personalInfo.address}</li>
									</ul>
								</div>
								<div>
									<h4 className="text-sm font-semibold text-foreground mb-2">Professional Info</h4>
									<p className="text-sm text-muted-foreground mb-2">{appl.professionalInfo.about}</p>
									<ul className="space-y-2 text-sm text-muted-foreground">
										<li>Current Job: {appl.professionalInfo.currentJob}</li>
										<li>Experience: {appl.professionalInfo.experience}</li>
										<li>Highest Qualification: {appl.professionalInfo.highestQualification}</li>
										<li>
											Skills:{" "}
											{appl.professionalInfo.skills.map((s) => (
												<span key={s} className="px-2 py-1 rounded-full bg-muted text-xs text-foreground mr-2">
													{s}
												</span>
											))}
										</li>
									</ul>
								</div>
							</div>

							<div className="space-y-3">
								<h4 className="text-sm font-semibold text-foreground">Interview Schedule</h4>
								<div className="space-y-3">
									{appl.interviews.map((interview) => (
										<div key={interview.date + interview.title} className="flex items-center justify-between border border-border rounded-lg p-4">
											<div>
												<p className="font-semibold text-foreground">{interview.title}</p>
												<p className="text-xs text-muted-foreground">{interview.date} • {interview.time}</p>
												<p className="text-xs text-muted-foreground">{interview.location}</p>
											</div>
											<Button variant="outline" size="sm">
												Add Feedback
											</Button>
										</div>
									))}
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
