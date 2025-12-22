"use client";

import {
	Briefcase,
	FileText,
	HelpCircle,
	LayoutDashboard,
	LogOut,
	Menu,
	MessageSquare,
	Settings,
	User,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { UserAvatar } from "@/components/user-avatar";
import { authClient } from "@/lib/auth-client";

type SidebarItem = {
	href: string;
	icon: ReactNode;
	label: string;
	badge?: string | number;
};

const navItems: SidebarItem[] = [
	{
		label: "Хяналтын самбар",
		href: "/worker/dashboard",
		icon: <LayoutDashboard className="h-5 w-5" />,
	},
	{
		label: "Миний саналууд",
		href: "/worker/bids",
		icon: <FileText className="h-5 w-5" />,
	},
	{
		label: "Идэвхтэй даалгаврууд",
		href: "/worker/tasks",
		icon: <Briefcase className="h-5 w-5" />,
	},
	{
		label: "Мессежүүд",
		href: "/worker/messages",
		icon: <MessageSquare className="h-5 w-5" />,
	},
	{
		label: "Миний профайл",
		href: "/worker/profile",
		icon: <User className="h-5 w-5" />,
	},
];

const settingsNav: SidebarItem[] = [
	{
		label: "Тохиргоо",
		href: "/worker/settings",
		icon: <Settings className="h-5 w-5" />,
	},
	{
		label: "Тусламж",
		href: "/help",
		icon: <HelpCircle className="h-5 w-5" />,
	},
];

function NavBlock({ items, title }: { items: SidebarItem[]; title?: string }) {
	const pathname = usePathname();
	return (
		<div className="space-y-1">
			{title ? (
				<p className="mb-3 px-4 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
					{title}
				</p>
			) : null}
			{items.map((item) => {
				const active = pathname === item.href;
				return (
					<Link
						key={item.href}
						href={item.href as Route}
						className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-sm transition-all duration-200 ${
							active
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
					>
						{active && (
							<span className="absolute left-0 h-8 w-1 rounded-r-full bg-primary" />
						)}
						<span
							className={`transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
						>
							{item.icon}
						</span>
						<span className="flex-1">{item.label}</span>
						{item.badge ? (
							<span className="rounded-full bg-primary px-2.5 py-0.5 font-semibold text-[11px] text-primary-foreground shadow-sm">
								{item.badge}
							</span>
						) : null}
					</Link>
				);
			})}
		</div>
	);
}

function SidebarContent() {
	const router = useRouter();
	const { data: session } = authClient.useSession();

	const handleLogout = async () => {
		await authClient.signOut();
		router.push("/login");
	};

	return (
		<div className="flex h-full flex-col">
			<div className="p-6">
				<Link href="/" className="group flex items-center gap-3">
					<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-lg transition-shadow">
						<Briefcase className="h-5 w-5 text-primary-foreground" />
					</div>
					<span className="font-bold text-foreground text-xl tracking-tight">
						Ажил-GO
					</span>
				</Link>
			</div>

			<div className="flex-1 overflow-y-auto px-3">
				<NavBlock items={navItems} />
				<div className="my-6 h-px bg-border" />
				<NavBlock items={settingsNav} title="Тохиргоо" />
			</div>

			<div className="border-border border-t p-4">
				<div className="flex items-center gap-3 rounded-xl bg-muted p-3">
					<UserAvatar
						name={session?.user?.name}
						image={session?.user?.image}
						size="md"
						className="ring-2 ring-primary/20 ring-offset-2 ring-offset-background"
					/>
					<div className="min-w-0 flex-1">
						<p className="truncate font-semibold text-foreground text-sm">
							{session?.user?.name || "Хэрэглэгч"}
						</p>
						<p className="truncate text-muted-foreground text-xs">
							{session?.user?.email || ""}
						</p>
					</div>
					<Button
						variant="ghost"
						size="icon"
						onClick={handleLogout}
						className="h-8 w-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
						title="Гарах"
						type="button"
					>
						<LogOut className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

function DesktopSidebar() {
	return (
		<aside className="hidden w-72 flex-col border-border border-r bg-card backdrop-blur-xl lg:flex">
			<SidebarContent />
		</aside>
	);
}

function MobileSidebar() {
	return (
		<div className="fixed top-4 left-4 z-50 lg:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Button
						size="icon"
						variant="outline"
						className="h-10 w-10 rounded-xl border-border bg-background/90 shadow-lg backdrop-blur-sm"
						type="button"
					>
						<Menu className="h-5 w-5 text-muted-foreground" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="w-72 p-0">
					<SheetHeader className="sr-only">
						<SheetTitle>Цэс</SheetTitle>
					</SheetHeader>
					<SidebarContent />
				</SheetContent>
			</Sheet>
		</div>
	);
}

export function WorkerSidebar() {
	return (
		<>
			<DesktopSidebar />
			<MobileSidebar />
		</>
	);
}
