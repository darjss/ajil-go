"use client";

import {
	Briefcase,
	ChevronDown,
	ClipboardList,
	HelpCircle,
	LogOut,
	Menu,
	Plus,
	Search,
	Settings,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navLinks: { href: Route; label: string; icon: typeof Search }[] = [
	{
		href: "/tasks",
		label: "Даалгавар хайх",
		icon: Search,
	},
	{
		href: "/how-it-works" as Route,
		label: "Хэрхэн ажилладаг",
		icon: HelpCircle,
	},
];

const workerDashboardLinks: {
	href: Route;
	label: string;
	icon: typeof Briefcase;
}[] = [
	{
		href: "/worker/dashboard",
		label: "Гүйцэтгэгчийн хэсэг",
		icon: Briefcase,
	},
	{
		href: "/worker/bids",
		label: "Миний өргөдлүүд",
		icon: ClipboardList,
	},
];

const clientDashboardLinks: {
	href: Route;
	label: string;
	icon: typeof ClipboardList;
}[] = [
	{
		href: "/client/dashboard",
		label: "Захиалагчийн хэсэг",
		icon: ClipboardList,
	},
	{
		href: "/client/tasks",
		label: "Миний даалгаврууд",
		icon: Briefcase,
	},
];

function Header() {
	const router = useRouter();
	const pathname = usePathname();
	const { data: session, isPending } = authClient.useSession();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleSignOut = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/");
				},
			},
		});
	};

	const isActiveLink = (href: string) => pathname === href;

	return (
		<header className="sticky top-0 z-50 w-full border-border border-b bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<Link
						href="/"
						className="group flex items-center gap-2.5 transition-opacity hover:opacity-80"
					>
						<div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-none bg-primary shadow-sm transition-transform duration-200 group-hover:scale-105">
							<span className="font-bold text-lg text-primary-foreground tracking-tight">
								A
							</span>
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-foreground text-lg leading-none tracking-tight">
								Ажил-GO
							</span>
							<span className="mt-0.5 hidden text-[10px] text-muted-foreground sm:block">
								Даалгаврын платформ
							</span>
						</div>
					</Link>

					<nav className="hidden items-center gap-1 md:flex">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className={cn(
									"flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm transition-all duration-200",
									isActiveLink(link.href)
										? "bg-accent text-accent-foreground"
										: "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
								)}
							>
								<link.icon className="size-4" />
								{link.label}
							</Link>
						))}
					</nav>

					<div className="hidden items-center gap-3 md:flex">
						{isPending ? (
							<>
								<Skeleton className="h-9 w-20" />
								<Skeleton className="h-9 w-32" />
							</>
						) : session ? (
							<>
								<Button asChild className="gap-2 shadow-sm">
									<Link href="/client/post-task">
										<Plus className="size-4" />
										Даалгавар нийтлэх
									</Link>
								</Button>

								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" className="gap-2 pr-3 pl-2">
											<UserAvatar
												name={session.user.name}
												image={session.user.image}
												size="sm"
												className="size-7"
											/>
											<span className="max-w-24 truncate font-medium text-sm">
												{session.user.name}
											</span>
											<ChevronDown className="size-4 text-muted-foreground" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-56">
										<DropdownMenuLabel className="font-normal">
											<div className="flex flex-col gap-1">
												<p className="font-medium text-sm">
													{session.user.name}
												</p>
												<p className="text-muted-foreground text-xs">
													{session.user.email}
												</p>
											</div>
										</DropdownMenuLabel>
										<DropdownMenuSeparator />

										<DropdownMenuGroup>
											<DropdownMenuLabel className="text-muted-foreground text-xs">
												Гүйцэтгэгч
											</DropdownMenuLabel>
											{workerDashboardLinks.map((link) => (
												<DropdownMenuItem key={link.href} asChild>
													<Link
														href={link.href}
														className="cursor-pointer gap-2"
													>
														<link.icon className="size-4" />
														{link.label}
													</Link>
												</DropdownMenuItem>
											))}
										</DropdownMenuGroup>

										<DropdownMenuSeparator />

										<DropdownMenuGroup>
											<DropdownMenuLabel className="text-muted-foreground text-xs">
												Захиалагч
											</DropdownMenuLabel>
											{clientDashboardLinks.map((link) => (
												<DropdownMenuItem key={link.href} asChild>
													<Link
														href={link.href}
														className="cursor-pointer gap-2"
													>
														<link.icon className="size-4" />
														{link.label}
													</Link>
												</DropdownMenuItem>
											))}
										</DropdownMenuGroup>

										<DropdownMenuSeparator />

										<DropdownMenuItem asChild>
											<Link
												href="/worker/settings"
												className="cursor-pointer gap-2"
											>
												<Settings className="size-4" />
												Тохиргоо
											</Link>
										</DropdownMenuItem>

										<DropdownMenuSeparator />

										<DropdownMenuItem
											onClick={handleSignOut}
											className="cursor-pointer gap-2 text-destructive focus:bg-destructive/10 focus:text-destructive"
										>
											<LogOut className="size-4" />
											Гарах
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</>
						) : (
							<>
								<Button variant="ghost" asChild>
									<Link href="/login">Нэвтрэх</Link>
								</Button>
								<Button asChild className="shadow-sm">
									<Link href="/signup">Бүртгүүлэх</Link>
								</Button>
							</>
						)}
					</div>

					<Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
						<SheetTrigger asChild className="md:hidden">
							<Button variant="ghost" size="icon" className="shrink-0">
								<Menu className="size-5" />
								<span className="sr-only">Цэс нээх</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-full max-w-sm">
							<SheetHeader className="border-border border-b pb-4">
								<SheetTitle className="flex items-center gap-2.5">
									<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
										<span className="font-bold text-primary-foreground text-sm">
											A
										</span>
									</div>
									<span className="font-bold text-lg">Ажил-GO</span>
								</SheetTitle>
							</SheetHeader>

							<div className="flex flex-col gap-4 py-6">
								<nav className="flex flex-col gap-1">
									{navLinks.map((link) => (
										<SheetClose key={link.href} asChild>
											<Link
												href={link.href}
												className={cn(
													"flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-sm transition-colors",
													isActiveLink(link.href)
														? "bg-accent text-accent-foreground"
														: "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
												)}
											>
												<link.icon className="size-5" />
												{link.label}
											</Link>
										</SheetClose>
									))}
								</nav>

								{isPending ? (
									<div className="flex flex-col gap-2 px-3">
										<Skeleton className="h-10 w-full" />
										<Skeleton className="h-10 w-full" />
									</div>
								) : session ? (
									<>
										<div className="border-border border-t pt-4">
											<div className="mb-4 flex items-center gap-3 px-3">
												<UserAvatar
													name={session.user.name}
													image={session.user.image}
													size="md"
												/>
												<div className="flex flex-col">
													<span className="font-medium text-sm">
														{session.user.name}
													</span>
													<span className="text-muted-foreground text-xs">
														{session.user.email}
													</span>
												</div>
											</div>

											<SheetClose asChild>
												<Link href="/client/post-task" className="block px-3">
													<Button className="w-full gap-2">
														<Plus className="size-4" />
														Даалгавар нийтлэх
													</Button>
												</Link>
											</SheetClose>
										</div>

										<div className="border-border border-t pt-4">
											<p className="mb-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
												Гүйцэтгэгч
											</p>
											<nav className="flex flex-col gap-1">
												{workerDashboardLinks.map((link) => (
													<SheetClose key={link.href} asChild>
														<Link
															href={link.href}
															className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent/50 hover:text-foreground"
														>
															<link.icon className="size-5" />
															{link.label}
														</Link>
													</SheetClose>
												))}
											</nav>
										</div>

										<div className="border-border border-t pt-4">
											<p className="mb-2 px-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
												Захиалагч
											</p>
											<nav className="flex flex-col gap-1">
												{clientDashboardLinks.map((link) => (
													<SheetClose key={link.href} asChild>
														<Link
															href={link.href}
															className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent/50 hover:text-foreground"
														>
															<link.icon className="size-5" />
															{link.label}
														</Link>
													</SheetClose>
												))}
											</nav>
										</div>

										<div className="border-border border-t pt-4">
											<nav className="flex flex-col gap-1">
												<SheetClose asChild>
													<Link
														href="/worker/settings"
														className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-muted-foreground text-sm transition-colors hover:bg-accent/50 hover:text-foreground"
													>
														<Settings className="size-5" />
														Тохиргоо
													</Link>
												</SheetClose>
												<SheetClose asChild>
													<button
														type="button"
														onClick={handleSignOut}
														className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 font-medium text-destructive text-sm transition-colors hover:bg-destructive/10"
													>
														<LogOut className="size-5" />
														Гарах
													</button>
												</SheetClose>
											</nav>
										</div>
									</>
								) : (
									<div className="flex flex-col gap-2 border-border border-t px-3 pt-4">
										<SheetClose asChild>
											<Link href="/login">
												<Button variant="outline" className="w-full">
													Нэвтрэх
												</Button>
											</Link>
										</SheetClose>
										<SheetClose asChild>
											<Link href="/signup">
												<Button className="w-full">Бүртгүүлэх</Button>
											</Link>
										</SheetClose>
									</div>
								)}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}

export default Header;
