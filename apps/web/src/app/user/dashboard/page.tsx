"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { applicationHistory, notifications, statCards, userProfile } from "../data";
import { StatCard } from "../components/stat-card";
import { ApplicationTable } from "../components/application-table";
import { NotificationList } from "../components/notification-list";

export default function DashboardPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<div>
						<p className="text-xs text-muted-foreground">Сайн уу, {userProfile.name}</p>
						<h1 className="text-2xl font-bold text-foreground">Хяналтын самбар</h1>
					</div>
					<div className="flex items-center gap-4">
						<Button variant="outline" size="sm" className="text-sm">
							7 сарын 19 - 7 сарын 25 📅
						</Button>
						<Link href="/" className="text-primary text-sm font-semibold hover:underline">
							Нүүр рүү буцах
						</Link>
					</div>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
				<div>
					<h2 className="text-xl font-semibold text-foreground mb-2">Товч мэдээлэл</h2>
					<p className="text-sm text-muted-foreground">
						Өргөдөл, ярилцлагын явцыг нэг дороос хянаарай. Ажлын шинэ боломжуудыг анхаарах шаардлагатай.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-4">
					{statCards.map((card) => (
						<StatCard key={card.title} {...card} />
					))}
				</div>

				<div className="grid lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2">
						<ApplicationTable rows={applicationHistory} />
					</div>
					<div className="lg:col-span-1">
						<NotificationList items={notifications} />
					</div>
				</div>

				<div className="bg-gradient-to-r from-primary/10 via-white to-primary/5 border border-border rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
					<div>
						<p className="text-sm font-semibold text-primary mb-1">Зөвлөгөө</p>
						<h3 className="text-lg font-bold text-foreground mb-1">Өргөдлөө 7 хоногийн дараа дахин сануулаарай</h3>
						<p className="text-sm text-muted-foreground">
							Шинэ боломж харагдвал \"Миний өргөдлүүд\" хэсгээс дагах хүсэлт илгээн статусаа хурдан шинэчлүүлээрэй.
						</p>
					</div>
					<Button className="bg-primary text-white hover:bg-primary/90">Миний өргөдлүүд рүү</Button>
				</div>
			</div>
		</div>
	);
}
