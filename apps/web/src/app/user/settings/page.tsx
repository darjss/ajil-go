"use client";

import { Button } from "@/components/ui/button";
import { notificationPreferences, settingsProfile, userProfile } from "../data";

const tabs = [
	{ key: "profile", label: "Профайл" },
	{ key: "login", label: "Нэвтрэх" },
	{ key: "notifications", label: "Мэдэгдэл" },
];

export default function SettingsPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">Тохиргоо</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
				<div className="flex flex-wrap gap-4 border-b border-border">
					{tabs.map((tab) => (
						<button
							key={tab.key}
							className={`px-3 py-3 text-sm font-semibold border-b-2 ${
								tab.key === "profile" ? "border-primary text-primary" : "border-transparent text-muted-foreground"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				<section className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-6">
					<div>
						<h2 className="text-lg font-semibold text-foreground">Үндсэн мэдээлэл</h2>
						<p className="text-sm text-muted-foreground">Хувийн мэдээллээ хаанаас ч шинэчилж болно.</p>
					</div>

					<div className="grid md:grid-cols-[1fr_2fr] gap-6 items-center">
						<div className="space-y-2">
							<p className="text-sm font-semibold text-foreground">Профайл зураг</p>
							<p className="text-sm text-muted-foreground">
								Энэ зураг нийтэд харагдана. Рекрутерүүд таныг танихад тусална.
							</p>
						</div>
						<div className="flex items-center gap-6 flex-wrap">
							<div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl">{userProfile.avatar}</div>
							<div className="border-2 border-dashed border-primary/40 rounded-xl px-6 py-4 text-sm text-center text-muted-foreground bg-primary/5">
								<p className="font-semibold text-primary mb-1">Зураг солих эсвэл drop хийх</p>
								<p>SVG, PNG, JPG эсвэл GIF (400x400 хүртэл)</p>
							</div>
						</div>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Бүтэн нэр *</label>
							<input
								defaultValue={settingsProfile.fullName}
								className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-card"
								placeholder="Нэрээ оруулна уу"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Утас *</label>
							<input
								defaultValue={settingsProfile.phone}
								className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-card"
								placeholder="+976 88888888"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Имэйл *</label>
							<input
								defaultValue={settingsProfile.email}
								className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-card"
								placeholder="Имэйлээ оруулна уу"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Төрсөн өдөр *</label>
							<input
								type="date"
								defaultValue={settingsProfile.dob}
								className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-card"
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Хүйс *</label>
							<select className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-card" defaultValue={settingsProfile.gender}>
								<option>Эрэгтэй</option>
								<option>Эмэгтэй</option>
								<option>Бусад</option>
							</select>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Акаунтын төрөл *</label>
							<div className="flex gap-4">
								<label className="flex items-center gap-2 text-sm">
									<input type="radio" name="accountType" defaultChecked={settingsProfile.accountType === "jobseeker"} />
									<span>Ажил хайгч</span>
								</label>
								<label className="flex items-center gap-2 text-sm">
									<input type="radio" name="accountType" defaultChecked={settingsProfile.accountType === "employer"} />
									<span>Ажил олгогч</span>
								</label>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<Button className="bg-primary text-white hover:bg-primary/90">Профайл хадгалах</Button>
					</div>
				</section>

				<section className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-6">
					<div>
						<h2 className="text-lg font-semibold text-foreground">Нэвтрэх мэдээлэл</h2>
						<p className="text-sm text-muted-foreground">Имэйл, нууц үгээ шинэчилж, акаунтаа аюулгүй байлгаарай.</p>
					</div>

					<div className="grid md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Имэйл солих</label>
							<input className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-card" placeholder="Шинэ имэйл" />
						</div>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Хуучин нууц үг</label>
							<input className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-card" placeholder="Хуучин нууц үг" />
							<p className="text-xs text-muted-foreground">Доод тал нь 8 тэмдэгт</p>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-semibold text-foreground">Шинэ нууц үг</label>
							<input className="w-full rounded-lg border border-border px-4 py-3 text-sm bg-card" placeholder="Шинэ нууц үг" />
							<p className="text-xs text-muted-foreground">Доод тал нь 8 тэмдэгт</p>
						</div>
					</div>

					<div className="flex gap-3">
						<Button className="bg-primary text-white hover:bg-primary/90">Имэйл шинэчлэх</Button>
						<Button variant="outline" className="text-primary border-primary/40">
							Нууц үг солих
						</Button>
					</div>
				</section>

				<section className="bg-white border border-border rounded-lg shadow-sm p-6 space-y-6">
					<div>
						<h2 className="text-lg font-semibold text-foreground">Мэдэгдлийн тохиргоо</h2>
						<p className="text-sm text-muted-foreground">Өөрт тохирсон мэдэгдлийг сонгоно уу.</p>
					</div>

					<div className="space-y-4">
						{notificationPreferences.map((pref) => (
							<label key={pref.key} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:shadow-sm">
								<input type="checkbox" defaultChecked={pref.enabled} className="mt-1" />
								<div>
									<p className="font-semibold text-foreground">{pref.label}</p>
									<p className="text-sm text-muted-foreground">{pref.description}</p>
								</div>
							</label>
						))}
					</div>

					<div className="flex justify-end">
						<Button className="bg-primary text-white hover:bg-primary/90">Хадгалах</Button>
					</div>
				</section>
			</div>
		</div>
	);
}
