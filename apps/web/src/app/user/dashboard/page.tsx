"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ApplicationTable } from "../components/application-table";
import { NotificationList } from "../components/notification-list";
import { StatCard } from "../components/stat-card";
import {
	applicationHistory,
	notifications,
	statCards,
	userProfile,
} from "../data";

export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<div>
						<p className="text-muted-foreground text-xs">
							Сайн уу, {userProfile.name}
						</p>
						<h1 className="font-bold text-2xl text-foreground">
							Хяналтын самбар
						</h1>
					</div>
					<div className="flex items-center gap-4">
						<Button variant="outline" size="sm" className="text-sm">
							7 сарын 19 - 7 сарын 25 📅
						</Button>
						<Link
							href="/"
							className="font-semibold text-primary text-sm hover:underline"
						>
							Нүүр рүү буцах
						</Link>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
				<div>
					<h2 className="mb-2 font-semibold text-foreground text-xl">
						Товч мэдээлэл
					</h2>
					<p className="text-muted-foreground text-sm">
						Өргөдөл, ярилцлагын явцыг нэг дороос хянаарай. Ажлын шинэ
						боломжуудыг анхаарах шаардлагатай.
					</p>
				</div>

				<div className="grid gap-4 md:grid-cols-3">
					{statCards.map((card) => (
						<StatCard key={card.title} {...card} />
					))}
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<ApplicationTable rows={applicationHistory} />
					</div>
					<div className="lg:col-span-1">
						<NotificationList items={notifications} />
					</div>
				</div>

				<div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border bg-gradient-to-r from-primary/10 via-white to-primary/5 p-6 shadow-sm md:flex-row md:items-center">
					<div>
						<p className="mb-1 font-semibold text-primary text-sm">Зөвлөгөө</p>
						<h3 className="mb-1 font-bold text-foreground text-lg">
							Өргөдлөө 7 хоногийн дараа дахин сануулаарай
						</h3>
						<p className="text-muted-foreground text-sm">
							Шинэ боломж харагдвал \"Миний өргөдлүүд\" хэсгээс дагах хүсэлт
							илгээн статусаа хурдан шинэчлүүлээрэй.
						</p>
					</div>
					<Button className="bg-primary text-white hover:bg-primary/90">
						Миний өргөдлүүд рүү
					</Button>
				</div>
			</div>
		</div>
	);
}
