import Link from "next/link";
import { socialLinks, socialProfiles } from "../data";

export function InfoCard({
	title,
	children,
	aside,
}: {
	title: string;
	children: React.ReactNode;
	aside?: React.ReactNode;
}) {
	return (
		<div className="bg-white border border-border rounded-lg shadow-sm p-5 space-y-3">
			<div className="flex items-start justify-between gap-3">
				<h3 className="text-lg font-semibold text-foreground">{title}</h3>
				{aside}
			</div>
			{children}
		</div>
	);
}

export function DetailCard() {
	return (
		<div className="bg-white border border-border rounded-lg shadow-sm p-5 space-y-4">
			<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Нэмэлт мэдээлэл</h3>
			<div className="space-y-3 text-sm">
				{socialLinks.map((link) => (
					<div key={link.label} className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-none">
						<div>
							<p className="font-semibold text-foreground">{link.label}</p>
							<p className="text-muted-foreground">{link.value}</p>
						</div>
						<Link href={link.href} className="text-primary text-xs hover:underline">
							Засах
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}

export function SocialLinksCard() {
	return (
		<div className="bg-white border border-border rounded-lg shadow-sm p-5 space-y-4">
			<h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Социал холбоос</h3>
			<div className="space-y-3 text-sm">
				{socialProfiles.map((link) => (
					<div key={link.label} className="flex items-start justify-between gap-3 border-b border-border/60 pb-3 last:border-none">
						<div>
							<p className="font-semibold text-foreground">{link.label}</p>
							<p className="text-muted-foreground">{link.value}</p>
						</div>
						<Link href={link.href} className="text-primary text-xs hover:underline">
							Очих
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
