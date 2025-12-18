"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

function Header() {
	return (
		<header className="sticky top-0 z-50 border-border/60 border-b bg-background/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/75">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4">
					{/* Logo */}
					<Link href="/" className="flex items-center gap-2 font-bold text-xl">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
							<span className="font-bold text-primary-foreground">J</span>
						</div>
						<div className="flex flex-col leading-tight">
							<span className="text-foreground">Ажил-GO</span>
							<span className="hidden font-normal text-muted-foreground text-xs sm:block">
								Ажлын платформ
							</span>
						</div>
					</Link>

					{/* Navigation */}
					<nav className="hidden items-center gap-8 md:flex">
						<Link
							href="/find-jobs"
							className="font-medium text-foreground text-sm transition-colors hover:text-primary"
						>
							Ажлуудыг хайх
						</Link>
						<Link
							href="/browse-companies"
							className="font-medium text-foreground text-sm transition-colors hover:text-primary"
						>
							Компанийн жагсаалт
						</Link>
					</nav>

					{/* Auth Buttons */}
					<div className="flex items-center gap-3">
						<Link href="/login">
							<Button variant="ghost" size="sm">
								Нэвтрэх
							</Button>
						</Link>
						<Link href="/signup">
							<Button size="sm" className="bg-primary hover:bg-primary/90">
								Бүртгүүлэх
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
export default Header;
