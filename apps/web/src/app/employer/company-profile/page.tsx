"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { perks } from "../data";

export default function EmployerCompanyProfilePage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">Company Profile</h1>
					<Button variant="outline" size="sm">
						Edit Profile
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
				<div className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-4">
					<div className="flex items-start justify-between gap-4">
						<div className="flex items-start gap-4">
							<div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">N</div>
							<div>
								<h2 className="text-2xl font-bold text-foreground">Nomad</h2>
								<p className="text-sm text-primary hover:underline">https://nomad.com</p>
								<p className="text-sm text-muted-foreground mt-1">Founded July 31, 2011 • 4000+ employees • 20 countries • Social & Non-Profit</p>
							</div>
						</div>
						<div className="flex gap-2">
							<Button variant="outline" size="sm">Public View</Button>
							<Button variant="outline" size="sm">Profile Settings</Button>
						</div>
					</div>

					<section className="space-y-2">
						<h3 className="text-lg font-semibold text-foreground">Company Profile</h3>
						<p className="text-sm text-muted-foreground leading-relaxed">
							Nomad is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online.
						</p>
					</section>
				</div>

				<div className="grid lg:grid-cols-[2fr_1fr] gap-6">
					<section className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-4">
						<h3 className="text-lg font-semibold text-foreground">Working at Nomad</h3>
						<div className="grid md:grid-cols-3 gap-3">
							<div className="col-span-2 rounded-lg bg-muted h-48" />
							<div className="space-y-3">
								<div className="rounded-lg bg-muted h-16" />
								<div className="rounded-lg bg-muted h-16" />
								<div className="rounded-lg bg-muted h-16" />
							</div>
						</div>
					</section>

					<aside className="space-y-4">
						<div className="bg-white border border-border rounded-lg shadow-sm p-4 space-y-2">
							<h4 className="text-sm font-semibold text-foreground">Contact</h4>
							<div className="flex flex-wrap gap-2 text-xs text-primary">
								<Link href="#">twitter.com/Nomad</Link>
								<Link href="#">facebook.com/NomadHQ</Link>
								<Link href="#">linkedin.com/company/nomad</Link>
								<Link href="mailto:nomad@gmail.com">nomad@gmail.com</Link>
							</div>
						</div>
						<div className="bg-white border border-border rounded-lg shadow-sm p-4 space-y-2">
							<h4 className="text-sm font-semibold text-foreground">Office Locations</h4>
							<ul className="space-y-1 text-sm text-muted-foreground">
								<li>🇺🇸 United States • Head Quarter</li>
								<li>🇬🇧 England</li>
								<li>🇯🇵 Japan</li>
								<li>🇦🇺 Australia</li>
								<li>🇨🇳 China</li>
							</ul>
						</div>
					</aside>
				</div>

				<section className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-4">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold text-foreground">Benefit</h3>
						<Button variant="outline" size="sm">+</Button>
					</div>
					<div className="grid md:grid-cols-3 gap-4">
						{perks.map((perk) => (
							<div key={perk.title} className="border border-border rounded-lg p-4 space-y-2">
								<div className="text-2xl">{perk.icon}</div>
								<p className="font-semibold text-foreground">{perk.title}</p>
								<p className="text-sm text-muted-foreground">{perk.body}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
