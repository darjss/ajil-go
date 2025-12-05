"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import type { ReactNode } from "react";
import { navItems, settingNav, userProfile } from "@/app/user/data";

type SidebarItem = {
	href: string;
	icon: ReactNode;
	label: string;
	badge?: string | number;
};

function NavBlock({ items, title }: { items: SidebarItem[]; title?: string }) {
	const pathname = usePathname();
	return (
		<div className="space-y-1">
			{title ? <p className="text-[11px] font-semibold text-muted-foreground uppercase mb-2">{title}</p> : null}
			{items.map((item) => {
				const active = pathname === item.href;
				return (
					<Link
						key={item.href}
						href={item.href as Route}
						className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
							active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
						}`}
					>
						<span>{item.icon}</span>
						<span className="flex-1">{item.label}</span>
						{item.badge ? (
							<span className="text-[11px] px-2 py-0.5 rounded-full bg-primary text-white">{item.badge}</span>
						) : null}
					</Link>
				);
			})}
		</div>
	);
}

export function UserSidebar() {
	return (
		<aside className="hidden lg:flex w-72 bg-white border-r border-border/70 flex-col justify-between">
			<div>
				<div className="p-6">
					<h1 className="text-xl font-bold text-foreground mb-8">Ажил-GO</h1>
					<NavBlock items={navItems} />
					<div className="mt-8">
						<NavBlock items={settingNav} title="ТОХИРГОО" />
					</div>
				</div>
			</div>

			<div className="p-6 border-t border-border/70">
				<div className="flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{userProfile.avatar}</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-semibold text-foreground truncate">{userProfile.name}</p>
						<p className="text-xs text-muted-foreground truncate">{userProfile.email}</p>
					</div>
				</div>
			</div>
		</aside>
	);
}
