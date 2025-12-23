"use client";

import { useQuery } from "@tanstack/react-query";
import {
	ChevronRight,
	HelpCircle,
	LayoutDashboard,
	ListTodo,
	LogOut,
	Menu,
	MessageSquare,
	PlusCircle,
	Settings,
	Sparkles,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { authClient } from "@/lib/auth-client";
import { userQueries } from "@/lib/queries";

interface SidebarItem {
	href: string;
	icon: React.ReactNode;
	label: string;
	badge?: string | number;
}

const navItems: SidebarItem[] = [
	{
		label: "Хяналтын самбар",
		href: "/client/dashboard",
		icon: <LayoutDashboard className="h-5 w-5" />,
	},
	{
		label: "Миний даалгаврууд",
		href: "/client/tasks",
		icon: <ListTodo className="h-5 w-5" />,
	},
	{
		label: "Даалгавар нийтлэх",
		href: "/client/post-task",
		icon: <PlusCircle className="h-5 w-5" />,
	},
	{
		label: "Мессежүүд",
		href: "/client/messages",
		icon: <MessageSquare className="h-5 w-5" />,
	},
];

const settingNav: SidebarItem[] = [
	{
		label: "Тохиргоо",
		href: "/client/settings",
		icon: <Settings className="h-5 w-5" />,
	},
	{
		label: "Тусламж",
		href: "/help",
		icon: <HelpCircle className="h-5 w-5" />,
	},
];

function NavBlock({
	items,
	title,
	onNavigate,
}: {
	items: SidebarItem[];
	title?: string;
	onNavigate?: () => void;
}) {
	const pathname = usePathname();

	return (
		<div className="space-y-1">
			{title && (
				<p className="mb-2 px-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
					{title}
				</p>
			)}
			{items.map((item) => {
				const isActive =
					pathname === item.href || pathname.startsWith(`${item.href}/`);
				return (
					<Link
						key={item.href}
						href={item.href as Route}
						onClick={onNavigate}
						className={`group relative flex items-center gap-3 rounded-sm px-3 py-2 font-body text-sm font-medium transition-all duration-200 ${
							isActive
								? "bg-primary/10 text-primary"
								: "text-muted-foreground hover:bg-muted hover:text-foreground"
						}`}
					>
						{isActive && (
							<span className="absolute inset-y-0 left-0 w-0.5 rounded-none bg-primary" />
						)}
						<span
							className={`transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
						>
							{item.icon}
						</span>
						<span className="flex-1">{item.label}</span>
						{item.badge && (
							<span className="flex h-5 min-w-5 items-center justify-center rounded-sm bg-primary px-1.5 font-mono text-[10px] font-semibold text-primary-foreground">
								{item.badge}
							</span>
						)}
						{isActive && <ChevronRight className="h-4 w-4 text-primary/50" />}
					</Link>
				);
			})}
		</div>
	);
}

function UserProfileCard({ onNavigate }: { onNavigate?: () => void }) {
	const router = useRouter();
	const { data: user, isLoading } = useQuery(userQueries.me());

	const handleSignOut = async () => {
		await authClient.signOut();
		onNavigate?.();
		router.push("/login");
	};

	if (isLoading) {
		return (
			<div className="flex items-center gap-3 rounded-sm bg-muted/50 p-3">
				<Skeleton className="h-9 w-9 rounded-sm" />
				<div className="min-w-0 flex-1">
					<Skeleton className="mb-1 h-3.5 w-24" />
					<Skeleton className="h-3 w-32" />
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-3 rounded-sm border border-border bg-card p-3 shadow-sm">
				<UserAvatar
					name={user?.name}
					image={user?.image}
					size="sm"
					className="ring-1 ring-border"
				/>
				<div className="min-w-0 flex-1">
					<p className="truncate font-body text-sm font-semibold text-foreground">
						{user?.name || "Хэрэглэгч"}
					</p>
					<p className="truncate font-mono text-xs text-muted-foreground">
						{user?.email || ""}
					</p>
				</div>
			</div>
			<Button
				variant="ghost"
				size="sm"
				onClick={handleSignOut}
				className="w-full justify-start gap-2 rounded-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
			>
				<LogOut className="h-4 w-4" />
				Гарах
			</Button>
		</div>
	);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
	return (
		<>
			<div className="border-b border-border p-6">
				<Link
					href="/"
					className="flex items-center gap-2.5"
					onClick={onNavigate}
				>
					<div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
						<Sparkles className="h-4 w-4" />
					</div>
					<span className="font-display text-xl font-bold tracking-tight text-foreground">
						Ажил-GO
					</span>
				</Link>
			</div>

			<div className="flex-1 overflow-y-auto p-4">
				<nav className="space-y-6">
					<NavBlock items={navItems} onNavigate={onNavigate} />
					<div className="h-px bg-border" />
					<NavBlock
						items={settingNav}
						title="Тохиргоо"
						onNavigate={onNavigate}
					/>
				</nav>
			</div>

			<div className="border-t border-border p-4">
				<UserProfileCard onNavigate={onNavigate} />
			</div>
		</>
	);
}

export function ClientSidebar() {
	return (
		<aside className="hidden w-72 flex-col border-r border-border bg-card lg:flex">
			<SidebarContent />
		</aside>
	);
}

export function MobileHeader() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();

	const currentPage = [...navItems, ...settingNav].find(
		(item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
	);

	return (
		<header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg lg:hidden">
			<Sheet open={open} onOpenChange={setOpen}>
				<SheetTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						className="shrink-0 rounded-sm hover:bg-muted"
					>
						<Menu className="h-5 w-5" />
						<span className="sr-only">Цэс нээх</span>
					</Button>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="flex w-80 flex-col border-r border-border p-0 [&>button]:hidden"
				>
					<SheetHeader className="sr-only">
						<SheetTitle>Навигаци</SheetTitle>
					</SheetHeader>
					<div className="flex h-full flex-col bg-card">
						<SidebarContent onNavigate={() => setOpen(false)} />
					</div>
				</SheetContent>
			</Sheet>

			<div className="flex items-center gap-2">
				<div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
					<Sparkles className="h-3.5 w-3.5" />
				</div>
				<span className="font-display text-lg font-bold tracking-tight text-foreground">
					{currentPage?.label || "Ажил-GO"}
				</span>
			</div>

			<div className="w-10" />
		</header>
	);
}
