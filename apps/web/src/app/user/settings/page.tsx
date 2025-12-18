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
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">Тохиргоо</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
				<div className="flex flex-wrap gap-4 border-border border-b">
					{tabs.map((tab) => (
						<button
							key={tab.key}
							className={`border-b-2 px-3 py-3 font-semibold text-sm ${
								tab.key === "profile"
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>

				<section className="space-y-6 rounded-lg border border-border bg-white p-6 shadow-sm">
					<div>
						<h2 className="font-semibold text-foreground text-lg">
							Үндсэн мэдээлэл
						</h2>
						<p className="text-muted-foreground text-sm">
							Хувийн мэдээллээ хаанаас ч шинэчилж болно.
						</p>
					</div>

					<div className="grid items-center gap-6 md:grid-cols-[1fr_2fr]">
						<div className="space-y-2">
							<p className="font-semibold text-foreground text-sm">
								Профайл зураг
							</p>
							<p className="text-muted-foreground text-sm">
								Энэ зураг нийтэд харагдана. Рекрутерүүд таныг танихад тусална.
							</p>
						</div>
						<div className="flex flex-wrap items-center gap-6">
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted text-2xl">
								{userProfile.avatar}
							</div>
							<div className="rounded-xl border-2 border-primary/40 border-dashed bg-primary/5 px-6 py-4 text-center text-muted-foreground text-sm">
								<p className="mb-1 font-semibold text-primary">
									Зураг солих эсвэл drop хийх
								</p>
								<p>SVG, PNG, JPG эсвэл GIF (400x400 хүртэл)</p>
							</div>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Бүтэн нэр *
							</label>
							<input
								defaultValue={settingsProfile.fullName}
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
								placeholder="Нэрээ оруулна уу"
							/>
						</div>
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Утас *
							</label>
							<input
								defaultValue={settingsProfile.phone}
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
								placeholder="+976 88888888"
							/>
						</div>
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Имэйл *
							</label>
							<input
								defaultValue={settingsProfile.email}
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
								placeholder="Имэйлээ оруулна уу"
							/>
						</div>
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Төрсөн өдөр *
							</label>
							<input
								type="date"
								defaultValue={settingsProfile.dob}
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
							/>
						</div>
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Хүйс *
							</label>
							<select
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
								defaultValue={settingsProfile.gender}
							>
								<option>Эрэгтэй</option>
								<option>Эмэгтэй</option>
								<option>Бусад</option>
							</select>
						</div>
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Акаунтын төрөл *
							</label>
							<div className="flex gap-4">
								<label className="flex items-center gap-2 text-sm">
									<input
										type="radio"
										name="accountType"
										defaultChecked={settingsProfile.accountType === "jobseeker"}
									/>
									<span>Ажил хайгч</span>
								</label>
								<label className="flex items-center gap-2 text-sm">
									<input
										type="radio"
										name="accountType"
										defaultChecked={settingsProfile.accountType === "employer"}
									/>
									<span>Ажил олгогч</span>
								</label>
							</div>
						</div>
					</div>

					<div className="flex justify-end">
						<Button className="bg-primary text-white hover:bg-primary/90">
							Профайл хадгалах
						</Button>
					</div>
				</section>

				<section className="space-y-6 rounded-lg border border-border bg-white p-6 shadow-sm">
					<div>
						<h2 className="font-semibold text-foreground text-lg">
							Нэвтрэх мэдээлэл
						</h2>
						<p className="text-muted-foreground text-sm">
							Имэйл, нууц үгээ шинэчилж, акаунтаа аюулгүй байлгаарай.
						</p>
					</div>

					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Имэйл солих
							</label>
							<input
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
								placeholder="Шинэ имэйл"
							/>
						</div>
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Хуучин нууц үг
							</label>
							<input
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
								placeholder="Хуучин нууц үг"
							/>
							<p className="text-muted-foreground text-xs">
								Доод тал нь 8 тэмдэгт
							</p>
						</div>
						<div className="space-y-2">
							<label className="font-semibold text-foreground text-sm">
								Шинэ нууц үг
							</label>
							<input
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm"
								placeholder="Шинэ нууц үг"
							/>
							<p className="text-muted-foreground text-xs">
								Доод тал нь 8 тэмдэгт
							</p>
						</div>
					</div>

					<div className="flex gap-3">
						<Button className="bg-primary text-white hover:bg-primary/90">
							Имэйл шинэчлэх
						</Button>
						<Button
							variant="outline"
							className="border-primary/40 text-primary"
						>
							Нууц үг солих
						</Button>
					</div>
				</section>

				<section className="space-y-6 rounded-lg border border-border bg-white p-6 shadow-sm">
					<div>
						<h2 className="font-semibold text-foreground text-lg">
							Мэдэгдлийн тохиргоо
						</h2>
						<p className="text-muted-foreground text-sm">
							Өөрт тохирсон мэдэгдлийг сонгоно уу.
						</p>
					</div>

					<div className="space-y-4">
						{notificationPreferences.map((pref) => (
							<label
								key={pref.key}
								className="flex items-start gap-3 rounded-lg border border-border p-4 hover:shadow-sm"
							>
								<input
									type="checkbox"
									defaultChecked={pref.enabled}
									className="mt-1"
								/>
								<div>
									<p className="font-semibold text-foreground">{pref.label}</p>
									<p className="text-muted-foreground text-sm">
										{pref.description}
									</p>
								</div>
							</label>
						))}
					</div>

					<div className="flex justify-end">
						<Button className="bg-primary text-white hover:bg-primary/90">
							Хадгалах
						</Button>
					</div>
				</section>
			</div>
		</div>
	);
}
