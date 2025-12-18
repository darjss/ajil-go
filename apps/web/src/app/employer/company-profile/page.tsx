"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { perks } from "../data";

export default function EmployerCompanyProfilePage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">
						Company Profile
					</h1>
					<Button variant="outline" size="sm">
						Edit Profile
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-6 px-6 py-8">
				<div className="space-y-4 rounded-lg border border-border bg-white p-6 shadow-sm">
					<div className="flex items-start justify-between gap-4">
						<div className="flex items-start gap-4">
							<div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-3xl">
								N
							</div>
							<div>
								<h2 className="font-bold text-2xl text-foreground">Nomad</h2>
								<p className="text-primary text-sm hover:underline">
									https://nomad.com
								</p>
								<p className="mt-1 text-muted-foreground text-sm">
									Founded July 31, 2011 • 4000+ employees • 20 countries •
									Social & Non-Profit
								</p>
							</div>
						</div>
						<div className="flex gap-2">
							<Button variant="outline" size="sm">
								Public View
							</Button>
							<Button variant="outline" size="sm">
								Profile Settings
							</Button>
						</div>
					</div>

					<section className="space-y-2">
						<h3 className="font-semibold text-foreground text-lg">
							Company Profile
						</h3>
						<p className="text-muted-foreground text-sm leading-relaxed">
							Nomad is a software platform for starting and running internet
							businesses. Millions of businesses rely on Stripe's software tools
							to accept payments, expand globally, and manage their businesses
							online.
						</p>
					</section>
				</div>

				<div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
					<section className="space-y-4 rounded-lg border border-border bg-white p-6 shadow-sm">
						<h3 className="font-semibold text-foreground text-lg">
							Working at Nomad
						</h3>
						<div className="grid gap-3 md:grid-cols-3">
							<div className="col-span-2 h-48 rounded-lg bg-muted" />
							<div className="space-y-3">
								<div className="h-16 rounded-lg bg-muted" />
								<div className="h-16 rounded-lg bg-muted" />
								<div className="h-16 rounded-lg bg-muted" />
							</div>
						</div>
					</section>

					<aside className="space-y-4">
						<div className="space-y-2 rounded-lg border border-border bg-white p-4 shadow-sm">
							<h4 className="font-semibold text-foreground text-sm">Contact</h4>
							<div className="flex flex-wrap gap-2 text-primary text-xs">
								<Link href="#">twitter.com/Nomad</Link>
								<Link href="#">facebook.com/NomadHQ</Link>
								<Link href="#">linkedin.com/company/nomad</Link>
								<Link href="mailto:nomad@gmail.com">nomad@gmail.com</Link>
							</div>
						</div>
						<div className="space-y-2 rounded-lg border border-border bg-white p-4 shadow-sm">
							<h4 className="font-semibold text-foreground text-sm">
								Office Locations
							</h4>
							<ul className="space-y-1 text-muted-foreground text-sm">
								<li>🇺🇸 United States • Head Quarter</li>
								<li>🇬🇧 England</li>
								<li>🇯🇵 Japan</li>
								<li>🇦🇺 Australia</li>
								<li>🇨🇳 China</li>
							</ul>
						</div>
					</aside>
				</div>

				<section className="space-y-4 rounded-lg border border-border bg-white p-6 shadow-sm">
					<div className="flex items-center justify-between">
						<h3 className="font-semibold text-foreground text-lg">Benefit</h3>
						<Button variant="outline" size="sm">
							+
						</Button>
					</div>
					<div className="grid gap-4 md:grid-cols-3">
						{perks.map((perk) => (
							<div
								key={perk.title}
								className="space-y-2 rounded-lg border border-border p-4"
							>
								<div className="text-2xl">{perk.icon}</div>
								<p className="font-semibold text-foreground">{perk.title}</p>
								<p className="text-muted-foreground text-sm">{perk.body}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
