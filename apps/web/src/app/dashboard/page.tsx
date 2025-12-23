"use client";

import { ArrowRight, Briefcase, ClipboardList, Loader2 } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

export default function DashboardPage() {
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();
	const [isNavigating, setIsNavigating] = useState(false);

	useEffect(() => {
		if (!isPending && !session) {
			router.push("/login");
		}
	}, [session, isPending, router]);

	if (isPending || !session) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-muted">
				<Loader2 className="h-8 w-8 animate-spin text-primary" />
			</div>
		);
	}

	const handleNavigate = (path: Route) => {
		setIsNavigating(true);
		router.push(path);
	};

	return (
		<div className="min-h-screen bg-muted">
			<div className="border-border border-b bg-background/80 backdrop-blur-sm">
				<div className="mx-auto max-w-4xl px-6 py-4">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary">
							<span className="font-bold text-primary-foreground">А</span>
						</div>
						<div>
							<h1 className="font-display text-foreground text-xl">Ажил-GO</h1>
							<p className="text-muted-foreground text-sm">
								Даалгаврын платформ
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto max-w-4xl px-6 py-16">
				<div className="mb-12 text-center">
					<h2 className="mb-3 font-display text-3xl text-foreground">
						Сайн байна уу, {session.user.name}!
					</h2>
					<p className="text-lg text-muted-foreground">
						Өнөөдөр ямар үүргээр ажиллах вэ?
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<Card
						className="group cursor-pointer border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
						onClick={() => handleNavigate("/worker/dashboard")}
					>
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-primary shadow-lg transition-transform group-hover:scale-105">
								<Briefcase className="h-8 w-8 text-primary-foreground" />
							</div>
							<CardTitle className="font-display text-xl">Гүйцэтгэгч</CardTitle>
							<CardDescription className="text-base">
								Даалгавар хайж, санал илгээж, орлого олох
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="mb-6 space-y-2 text-muted-foreground text-sm">
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-none bg-primary" />
									Нээлттэй даалгаврууд хайх
								</li>
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-none bg-primary" />
									Өөрийн саналуудыг удирдах
								</li>
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-none bg-primary" />
									Захиалагчтай холбогдох
								</li>
							</ul>
							<Button
								className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
								disabled={isNavigating}
							>
								{isNavigating ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									<>
										Гүйцэтгэгчээр үргэлжлүүлэх
										<ArrowRight className="ml-2 h-4 w-4" />
									</>
								)}
							</Button>
						</CardContent>
					</Card>

					<Card
						className="group cursor-pointer border-2 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
						onClick={() => handleNavigate("/client/dashboard")}
					>
						<CardHeader className="pb-4">
							<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-none bg-secondary shadow-lg transition-transform group-hover:scale-105">
								<ClipboardList className="h-8 w-8 text-secondary-foreground" />
							</div>
							<CardTitle className="font-display text-xl">Захиалагч</CardTitle>
							<CardDescription className="text-base">
								Даалгавар нийтлэх, гүйцэтгэгч сонгох
							</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="mb-6 space-y-2 text-muted-foreground text-sm">
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-none bg-secondary-foreground" />
									Шинэ даалгавар нийтлэх
								</li>
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-none bg-secondary-foreground" />
									Ирсэн саналуудыг харах
								</li>
								<li className="flex items-center gap-2">
									<div className="h-1.5 w-1.5 rounded-none bg-secondary-foreground" />
									Гүйцэтгэгчтэй холбогдох
								</li>
							</ul>
							<Button
								className="w-full"
								variant="secondary"
								disabled={isNavigating}
							>
								{isNavigating ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : (
									<>
										Захиалагчаар үргэлжлүүлэх
										<ArrowRight className="ml-2 h-4 w-4" />
									</>
								)}
							</Button>
						</CardContent>
					</Card>
				</div>

				<p className="mt-8 text-center text-muted-foreground text-sm">
					Та хоёр үүргийг хослуулан ашиглаж болно. Хүссэн үедээ хооронд нь
					шилжих боломжтой.
				</p>
			</div>
		</div>
	);
}
