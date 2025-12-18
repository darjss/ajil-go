"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusPill } from "../../components/status-pill";
import { applicantDetail } from "../../data";

export default function ApplicantDetailPage() {
	const appl = applicantDetail;

	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<div className="flex items-center gap-2">
						<Link
							href="/employer/applicants"
							className="text-primary text-sm hover:underline"
						>
							← Back
						</Link>
						<h1 className="font-bold text-2xl text-foreground">
							Applicant Details
						</h1>
					</div>
					<Button variant="outline" size="sm">
						More Action
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
				<div className="grid gap-6 lg:grid-cols-[320px_1fr]">
					<aside className="space-y-4 rounded-lg border border-border bg-white p-5 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-xl">
								🧑‍💼
							</div>
							<div>
								<p className="font-semibold text-foreground text-lg">
									{appl.name}
								</p>
								<p className="text-muted-foreground text-sm">{appl.title}</p>
								<p className="text-amber-600 text-xs">★ {appl.score}</p>
							</div>
						</div>

						<div className="space-y-2 rounded-lg border border-border p-4">
							<div className="flex items-center justify-between text-muted-foreground text-xs">
								<span>Applied Jobs</span>
								<span>{appl.appliedJob.applied}</span>
							</div>
							<p className="font-semibold text-foreground">
								{appl.appliedJob.role}
							</p>
							<p className="text-muted-foreground text-xs">
								{appl.appliedJob.category} • {appl.appliedJob.type}
							</p>
							<div className="pt-2">
								<StatusPill stage={appl.appliedJob.stage} />
							</div>
						</div>

						<Button className="w-full bg-primary text-white hover:bg-primary/90">
							Schedule Interview
						</Button>

						<div className="space-y-2 text-sm">
							<p className="font-semibold text-foreground">Contact</p>
							<p className="text-muted-foreground">
								Email • {appl.contact.email}
							</p>
							<p className="text-muted-foreground">
								Phone • {appl.contact.phone}
							</p>
							<Link
								href={`https://${appl.contact.instagram}`}
								className="text-primary text-sm hover:underline"
							>
								Instagram
							</Link>
							<Link
								href={`https://${appl.contact.twitter}`}
								className="text-primary text-sm hover:underline"
							>
								Twitter
							</Link>
							<Link
								href={`https://${appl.contact.website}`}
								className="text-primary text-sm hover:underline"
							>
								Website
							</Link>
						</div>
					</aside>

					<section className="rounded-lg border border-border bg-white shadow-sm">
						<div className="flex gap-4 border-border border-b px-6 py-3 font-semibold text-sm">
							<span className="text-primary">Applicant Profile</span>
							<span className="text-muted-foreground">Resume</span>
							<span className="text-muted-foreground">Hiring Progress</span>
							<span className="text-muted-foreground">Interview Schedule</span>
						</div>
						<div className="space-y-8 p-6">
							<div className="grid gap-6 md:grid-cols-2">
								<div>
									<h4 className="mb-2 font-semibold text-foreground text-sm">
										Personal Info
									</h4>
									<ul className="space-y-2 text-muted-foreground text-sm">
										<li>Full Name: {appl.personalInfo.fullName}</li>
										<li>Gender: {appl.personalInfo.gender}</li>
										<li>Date of Birth: {appl.personalInfo.dob}</li>
										<li>Language: {appl.personalInfo.language}</li>
										<li>Address: {appl.personalInfo.address}</li>
									</ul>
								</div>
								<div>
									<h4 className="mb-2 font-semibold text-foreground text-sm">
										Professional Info
									</h4>
									<p className="mb-2 text-muted-foreground text-sm">
										{appl.professionalInfo.about}
									</p>
									<ul className="space-y-2 text-muted-foreground text-sm">
										<li>Current Job: {appl.professionalInfo.currentJob}</li>
										<li>Experience: {appl.professionalInfo.experience}</li>
										<li>
											Highest Qualification:{" "}
											{appl.professionalInfo.highestQualification}
										</li>
										<li>
											Skills:{" "}
											{appl.professionalInfo.skills.map((s) => (
												<span
													key={s}
													className="mr-2 rounded-full bg-muted px-2 py-1 text-foreground text-xs"
												>
													{s}
												</span>
											))}
										</li>
									</ul>
								</div>
							</div>

							<div className="space-y-3">
								<h4 className="font-semibold text-foreground text-sm">
									Interview Schedule
								</h4>
								<div className="space-y-3">
									{appl.interviews.map((interview) => (
										<div
											key={interview.date + interview.title}
											className="flex items-center justify-between rounded-lg border border-border p-4"
										>
											<div>
												<p className="font-semibold text-foreground">
													{interview.title}
												</p>
												<p className="text-muted-foreground text-xs">
													{interview.date} • {interview.time}
												</p>
												<p className="text-muted-foreground text-xs">
													{interview.location}
												</p>
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
