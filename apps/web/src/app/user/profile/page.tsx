"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	educations,
	experiences,
	portfolios,
	profileHero,
	skills,
} from "../data";
import { DetailCard, InfoCard, SocialLinksCard } from "../components/profile-cards";
import type { Route } from "next";

export default function ProfilePage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">Миний профайл</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
				<div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
					<div className="h-32 w-full relative bg-gradient-to-r from-primary/70 to-purple-500">
						{profileHero.banner && (
							<Image src={profileHero.banner} alt="" fill className="object-cover opacity-80" priority />
						)}
					</div>
					<div className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
						<div className="flex items-center gap-4">
							<div className="w-20 h-20 rounded-full bg-white -mt-12 border-4 border-white shadow">
								{profileHero.avatar ? (
									<Image
										src={profileHero.avatar}
										alt={profileHero.name}
										width={80}
										height={80}
										className="rounded-full object-cover"
									/>
								) : (
									<div className="w-full h-full rounded-full bg-muted" />
								)}
							</div>
							<div>
								<h2 className="text-xl font-bold text-foreground">{profileHero.name}</h2>
								<p className="text-sm text-muted-foreground">{profileHero.title}</p>
								<p className="text-sm text-muted-foreground mt-1">📍 {profileHero.location}</p>
								<div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
									<span>✔</span>
									<span>{profileHero.availability}</span>
								</div>
							</div>
						</div>
						<div className="flex items-center gap-2">
							<Button variant="outline" size="sm">
								Профайл засах
							</Button>
							<Button size="sm" className="bg-primary text-white hover:bg-primary/90">
								Холбогдох
							</Button>
						</div>
					</div>
				</div>

				<div className="grid lg:grid-cols-[2fr_1fr] gap-6">
					<div className="space-y-6">
						<InfoCard
							title="Намтар"
							aside={<Link href="#" className="text-primary text-sm hover:underline">Засах</Link>}
						>
							<p className="text-sm text-muted-foreground leading-relaxed">{profileHero.about}</p>
						</InfoCard>

						<InfoCard
							title="Туршлага"
							aside={<Button variant="outline" size="sm">+</Button>}
						>
							<div className="space-y-4">
								{experiences.map((exp) => (
									<div key={`${exp.company}-${exp.role}`} className="flex gap-3 border border-border rounded-lg p-4">
										<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{exp.logo}</div>
										<div className="flex-1">
											<p className="font-semibold text-foreground">{exp.role}</p>
											<p className="text-sm text-muted-foreground">
												{exp.company} • {exp.type} • {exp.period}
											</p>
											<p className="text-xs text-muted-foreground">{exp.location}</p>
											<p className="text-sm text-muted-foreground mt-2">{exp.desc}</p>
										</div>
										<Link href="#" className="text-primary text-sm hover:underline">
											Засах
										</Link>
									</div>
								))}
								<button className="text-primary text-sm font-semibold hover:underline">Дахин туршлага нэмэх →</button>
							</div>
						</InfoCard>

						<InfoCard
							title="Боловсрол"
							aside={<Button variant="outline" size="sm">+</Button>}
						>
							<div className="space-y-4">
								{educations.map((edu) => (
									<div key={edu.school} className="flex gap-3 border border-border rounded-lg p-4">
										<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{edu.logo}</div>
										<div className="flex-1">
											<p className="font-semibold text-foreground">{edu.school}</p>
											<p className="text-sm text-muted-foreground">{edu.degree}</p>
											<p className="text-xs text-muted-foreground">{edu.period}</p>
											<p className="text-sm text-muted-foreground mt-2">{edu.desc}</p>
										</div>
										<Link href="#" className="text-primary text-sm hover:underline">
											Засах
										</Link>
									</div>
								))}
								<button className="text-primary text-sm font-semibold hover:underline">Дахин боловсрол нэмэх →</button>
							</div>
						</InfoCard>

						<InfoCard
							title="Ур чадвар"
							aside={<Button variant="outline" size="sm">+</Button>}
						>
							<div className="flex flex-wrap gap-2">
								{skills.map((skill) => (
									<span key={skill} className="px-3 py-1 rounded-full border border-border text-sm text-foreground">
										{skill}
									</span>
								))}
							</div>
						</InfoCard>

						<InfoCard
							title="Портфолио"
							aside={<Button variant="outline" size="sm">+</Button>}
						>
							<div className="grid md:grid-cols-2 gap-3">
								{portfolios.map((item) => (
									<div key={item.title} className="border border-border rounded-lg p-3">
										<div className="aspect-[4/3] rounded-lg bg-muted mb-3" />
										<p className="font-semibold text-foreground text-sm">{item.title}</p>
										<Link href={item.href as Route} className="text-xs text-primary hover:underline">
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
