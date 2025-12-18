"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
			{title ? (
				<p className="mb-2 font-semibold text-[11px] text-muted-foreground uppercase">
					{title}
				</p>
			) : null}
			{items.map((item) => {
				const active = pathname === item.href;
				return (
					<Link
						key={item.href}
						href={item.href as Route}
						className={`flex items-center gap-3 rounded-lg px-4 py-3 font-medium text-sm transition-colors ${
							active
								? "bg-primary/10 text-primary"
								: "text-foreground hover:bg-muted"
						}`}
					>
						<span>{item.icon}</span>
						<span className="flex-1">{item.label}</span>
						{item.badge ? (
							<span className="rounded-full bg-primary px-2 py-0.5 text-[11px] text-white">
								{item.badge}
							</span>
						) : null}
					</Link>
				);
			})}
		</div>
	);
}

export function UserSidebar() {
	return (
		<aside className="hidden w-72 flex-col justify-between border-border/70 border-r bg-white lg:flex">
			<div>
				<div className="p-6">
					<h1 className="mb-8 font-bold text-foreground text-xl">Ажил-GO</h1>
					<NavBlock items={navItems} />
					<div className="mt-8">
						<NavBlock items={settingNav} title="ТОХИРГОО" />
					</div>
				</div>
			</div>

			<div className="border-border/70 border-t p-6">
				<div className="flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
						{userProfile.avatar}
					</div>
					<div className="min-w-0 flex-1">
						<p className="truncate font-semibold text-foreground text-sm">
							{userProfile.name}
						</p>
						<p className="truncate text-muted-foreground text-xs">
							{userProfile.email}
						</p>
					</div>
				</div>
			</div>
		</aside>
	);
}
