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
		<div className="space-y-3 rounded-lg border border-border bg-white p-5 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<h3 className="font-semibold text-foreground text-lg">{title}</h3>
				{aside}
			</div>
			{children}
		</div>
	);
}

export function DetailCard() {
	return (
		<div className="space-y-4 rounded-lg border border-border bg-white p-5 shadow-sm">
			<h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
				Нэмэлт мэдээлэл
			</h3>
			<div className="space-y-3 text-sm">
				{socialLinks.map((link) => (
					<div
						key={link.label}
						className="flex items-start justify-between gap-3 border-border/60 border-b pb-3 last:border-none"
					>
						<div>
							<p className="font-semibold text-foreground">{link.label}</p>
							<p className="text-muted-foreground">{link.value}</p>
						</div>
						<Link
							href={link.href}
							className="text-primary text-xs hover:underline"
						>
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
		<div className="space-y-4 rounded-lg border border-border bg-white p-5 shadow-sm">
			<h3 className="font-semibold text-foreground text-sm uppercase tracking-wide">
				Социал холбоос
			</h3>
			<div className="space-y-3 text-sm">
				{socialProfiles.map((link) => (
					<div
						key={link.label}
						className="flex items-start justify-between gap-3 border-border/60 border-b pb-3 last:border-none"
					>
						<div>
							<p className="font-semibold text-foreground">{link.label}</p>
							<p className="text-muted-foreground">{link.value}</p>
						</div>
						<Link
							href={link.href}
							className="text-primary text-xs hover:underline"
						>
							Очих
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
