"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	DetailCard,
	InfoCard,
	SocialLinksCard,
} from "../components/profile-cards";
import {
	educations,
	experiences,
	portfolios,
	profileHero,
	skills,
} from "../data";

export default function ProfilePage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">Миний профайл</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
				<div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
					<div className="relative h-32 w-full bg-gradient-to-r from-primary/70 to-purple-500">
						{profileHero.banner && (
							<Image
								src={profileHero.banner}
								alt=""
								fill
								className="object-cover opacity-80"
								priority
							/>
						)}
					</div>
					<div className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between">
						<div className="flex items-center gap-4">
							<div className="-mt-12 h-20 w-20 rounded-full border-4 border-white bg-white shadow">
								{profileHero.avatar ? (
									<Image
										src={profileHero.avatar}
										alt={profileHero.name}
										width={80}
										height={80}
										className="rounded-full object-cover"
									/>
								) : (
									<div className="h-full w-full rounded-full bg-muted" />
								)}
							</div>
							<div>
								<h2 className="font-bold text-foreground text-xl">
									{profileHero.name}
								</h2>
								<p className="text-muted-foreground text-sm">
									{profileHero.title}
								</p>
								<p className="mt-1 text-muted-foreground text-sm">
									📍 {profileHero.location}
								</p>
								<div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 font-semibold text-emerald-700 text-xs">
									<span>✔</span>
									<span>{profileHero.availability}</span>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm">
								Профайл засах
							</Button>
							<Button
								size="sm"
								className="bg-primary text-white hover:bg-primary/90"
							>
								Холбогдох
							</Button>
						</div>
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
					<div className="space-y-6">
						<InfoCard
							title="Намтар"
							aside={
								<Link href="#" className="text-primary text-sm hover:underline">
									Засах
								</Link>
							}
						>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{profileHero.about}
							</p>
						</InfoCard>

						<InfoCard
							title="Туршлага"
							aside={
								<Button variant="outline" size="sm">
									+
								</Button>
							}
						>
							<div className="space-y-4">
								{experiences.map((exp) => (
									<div
										key={`${exp.company}-${exp.role}`}
										className="flex gap-3 rounded-lg border border-border p-4"
									>
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
											{exp.logo}
										</div>
										<div className="flex-1">
											<p className="font-semibold text-foreground">
												{exp.role}
											</p>
											<p className="text-muted-foreground text-sm">
												{exp.company} • {exp.type} • {exp.period}
											</p>
											<p className="text-muted-foreground text-xs">
												{exp.location}
											</p>
											<p className="mt-2 text-muted-foreground text-sm">
												{exp.desc}
											</p>
										</div>
										<Link
											href="#"
											className="text-primary text-sm hover:underline"
										>
											Засах
										</Link>
									</div>
								))}
								<button className="font-semibold text-primary text-sm hover:underline">
									Дахин туршлага нэмэх →
								</button>
							</div>
						</InfoCard>

						<InfoCard
							title="Боловсрол"
							aside={
								<Button variant="outline" size="sm">
									+
								</Button>
							}
						>
							<div className="space-y-4">
								{educations.map((edu) => (
									<div
										key={edu.school}
										className="flex gap-3 rounded-lg border border-border p-4"
									>
										<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
											{edu.logo}
										</div>
										<div className="flex-1">
											<p className="font-semibold text-foreground">
												{edu.school}
											</p>
											<p className="text-muted-foreground text-sm">
												{edu.degree}
											</p>
											<p className="text-muted-foreground text-xs">
												{edu.period}
											</p>
											<p className="mt-2 text-muted-foreground text-sm">
												{edu.desc}
											</p>
										</div>
										<Link
											href="#"
											className="text-primary text-sm hover:underline"
										>
											Засах
										</Link>
									</div>
								))}
								<button className="font-semibold text-primary text-sm hover:underline">
									Дахин боловсрол нэмэх →
								</button>
							</div>
						</InfoCard>

						<InfoCard
							title="Ур чадвар"
							aside={
								<Button variant="outline" size="sm">
									+
								</Button>
							}
						>
							<div className="flex flex-wrap gap-2">
								{skills.map((skill) => (
									<span
										key={skill}
										className="rounded-full border border-border px-3 py-1 text-foreground text-sm"
									>
										{skill}
									</span>
								))}
							</div>
						</InfoCard>

						<InfoCard
							title="Портфолио"
							aside={
								<Button variant="outline" size="sm">
									+
								</Button>
							}
						>
							<div className="grid gap-3 md:grid-cols-2">
								{portfolios.map((item) => (
									<div
										key={item.title}
										className="rounded-lg border border-border p-3"
									>
										<div className="mb-3 aspect-[4/3] rounded-lg bg-muted" />
										<p className="font-semibold text-foreground text-sm">
											{item.title}
										</p>
										<Link
											href={item.href as Route}
											className="text-primary text-xs hover:underline"
										>
											Дэлгэрэнгүй →
										</Link>
									</div>
								))}
							</div>
						</InfoCard>
					</div>

					<div className="space-y-6">
						<DetailCard />
						<SocialLinksCard />
					</div>
				</div>
			</div>
		</div>
	);
}
