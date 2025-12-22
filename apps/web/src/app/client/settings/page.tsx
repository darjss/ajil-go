"use client";

import {
	AlertTriangle,
	Bell,
	Globe,
	LogOut,
	Mail,
	MessageSquare,
	Settings,
	Trash2,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth-client";

function SettingsSkeleton() {
	return (
		<div className="space-y-6">
			<Card className="border-slate-100">
				<CardHeader>
					<Skeleton className="h-6 w-48" />
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</CardContent>
			</Card>
			<Card className="border-slate-100">
				<CardHeader>
					<Skeleton className="h-6 w-36" />
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</CardContent>
			</Card>
			<Card className="border-slate-100">
				<CardHeader>
					<Skeleton className="h-6 w-24" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-12 w-full" />
				</CardContent>
			</Card>
		</div>
	);
}

export default function ClientSettingsPage() {
	const router = useRouter();
	const { data: session, isPending: isSessionLoading } =
		authClient.useSession();

	const [emailNotifications, setEmailNotifications] = useState(true);
	const [newTaskNotifications, setNewTaskNotifications] = useState(true);
	const [bidNotifications, setBidNotifications] = useState(true);
	const [messageNotifications, setMessageNotifications] = useState(true);
	const [language, setLanguage] = useState("mn");
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	useEffect(() => {
		if (!isSessionLoading && !session?.user) {
			router.push("/login");
		}
	}, [session, isSessionLoading, router]);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await authClient.signOut();
			router.push("/");
		} catch (error) {
			console.error("Logout error:", error);
			setIsLoggingOut(false);
		}
	};

	if (isSessionLoading) {
		return (
			<div className="min-h-screen p-6 lg:p-8">
				<div className="mx-auto max-w-2xl space-y-8">
					<div className="space-y-2">
						<Skeleton className="h-8 w-32" />
						<Skeleton className="h-4 w-64" />
					</div>
					<SettingsSkeleton />
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6 lg:p-8">
			<div className="mx-auto max-w-2xl space-y-8">
				<header>
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white shadow-emerald-500/20 shadow-lg">
							<Settings className="h-5 w-5" />
						</div>
						<div>
							<h1 className="font-bold text-2xl text-slate-800 lg:text-3xl">
								Тохиргоо
							</h1>
							<p className="text-slate-500 text-sm">
								Бүртгэл болон мэдэгдлийн тохиргоо
							</p>
						</div>
					</div>
				</header>

				<Card className="overflow-hidden border-slate-100 transition-all hover:shadow-md">
					<CardHeader className="border-slate-100 border-b bg-gradient-to-r from-slate-50 to-slate-100/50">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-slate-800">
							<User className="h-5 w-5 text-emerald-600" />
							Бүртгэлийн мэдээлэл
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-cyan-100 text-emerald-600">
										<Mail className="h-5 w-5" />
									</div>
									<div>
										<Label className="font-medium text-slate-500 text-xs uppercase tracking-wider">
											Имэйл хаяг
										</Label>
										<p className="font-medium text-slate-800">
											{session?.user?.email || "—"}
										</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-slate-100 transition-all hover:shadow-md">
					<CardHeader className="border-slate-100 border-b bg-gradient-to-r from-slate-50 to-slate-100/50">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-slate-800">
							<Bell className="h-5 w-5 text-emerald-600" />
							Мэдэгдэл
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="space-y-1">
							<div className="flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-slate-50/80">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 text-blue-600">
										<Mail className="h-5 w-5" />
									</div>
									<div>
										<Label
											htmlFor="email-notifications"
											className="cursor-pointer font-medium text-slate-800"
										>
											Имэйл мэдэгдэл
										</Label>
										<p className="text-slate-500 text-sm">
											Имэйлээр мэдэгдэл хүлээн авах
										</p>
									</div>
								</div>
								<Switch
									id="email-notifications"
									checked={emailNotifications}
									onCheckedChange={setEmailNotifications}
									className="data-[state=checked]:bg-emerald-500"
								/>
							</div>

							<div className="flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-slate-50/80">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600">
										<Bell className="h-5 w-5" />
									</div>
									<div>
										<Label
											htmlFor="new-task-notifications"
											className="cursor-pointer font-medium text-slate-800"
										>
											Шинэ даалгаврын мэдэгдэл
										</Label>
										<p className="text-slate-500 text-sm">
											Даалгаврын статус өөрчлөгдөхөд мэдэгдэл авах
										</p>
									</div>
								</div>
								<Switch
									id="new-task-notifications"
									checked={newTaskNotifications}
									onCheckedChange={setNewTaskNotifications}
									className="data-[state=checked]:bg-emerald-500"
								/>
							</div>

							<div className="flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-slate-50/80">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600">
										<Bell className="h-5 w-5" />
									</div>
									<div>
										<Label
											htmlFor="bid-notifications"
											className="cursor-pointer font-medium text-slate-800"
										>
											Саналын мэдэгдэл
										</Label>
										<p className="text-slate-500 text-sm">
											Шинэ санал ирэхэд мэдэгдэл авах
										</p>
									</div>
								</div>
								<Switch
									id="bid-notifications"
									checked={bidNotifications}
									onCheckedChange={setBidNotifications}
									className="data-[state=checked]:bg-emerald-500"
								/>
							</div>

							<div className="flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-slate-50/80">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-600">
										<MessageSquare className="h-5 w-5" />
									</div>
									<div>
										<Label
											htmlFor="message-notifications"
											className="cursor-pointer font-medium text-slate-800"
										>
											Мессежийн мэдэгдэл
										</Label>
										<p className="text-slate-500 text-sm">
											Шинэ мессеж ирэхэд мэдэгдэл авах
										</p>
									</div>
								</div>
								<Switch
									id="message-notifications"
									checked={messageNotifications}
									onCheckedChange={setMessageNotifications}
									className="data-[state=checked]:bg-emerald-500"
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-slate-100 transition-all hover:shadow-md">
					<CardHeader className="border-slate-100 border-b bg-gradient-to-r from-slate-50 to-slate-100/50">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-slate-800">
							<Globe className="h-5 w-5 text-emerald-600" />
							Хэл
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="flex items-center justify-between rounded-xl bg-slate-50/80 p-4">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-100 to-violet-50 text-violet-600">
									<Globe className="h-5 w-5" />
								</div>
								<div>
									<Label className="font-medium text-slate-800">
										Интерфэйсийн хэл
									</Label>
									<p className="text-slate-500 text-sm">
										Програмын үзүүлэх хэлийг сонгох
									</p>
								</div>
							</div>
							<Select value={language} onValueChange={setLanguage}>
								<SelectTrigger className="w-36 border-slate-200 bg-white">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="mn">🇲🇳 Монгол</SelectItem>
									<SelectItem value="en">🇺🇸 English</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-slate-100 transition-all hover:shadow-md">
					<CardContent className="p-6">
						<Button
							type="button"
							variant="outline"
							className="w-full justify-center gap-2 border-slate-200 py-6 text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50"
							onClick={handleLogout}
							disabled={isLoggingOut}
						>
							<LogOut className="h-5 w-5" />
							{isLoggingOut ? "Гарч байна..." : "Гарах"}
						</Button>
					</CardContent>
				</Card>

				<Card className="overflow-hidden border-red-200 bg-gradient-to-br from-red-50/50 to-orange-50/30 transition-all hover:shadow-md">
					<CardHeader className="border-red-100 border-b">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-red-700">
							<AlertTriangle className="h-5 w-5" />
							Аюултай бүс
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="rounded-xl border border-red-200 bg-white p-4">
							<div className="flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-100 to-red-50 text-red-600">
									<Trash2 className="h-5 w-5" />
								</div>
								<div className="flex-1">
									<h3 className="font-semibold text-red-800">Бүртгэл устгах</h3>
									<p className="mt-1 text-red-600/80 text-sm">
										Анхааруулга: Бүртгэлээ устгавал таны бүх мэдээлэл,
										даалгавар, санал бүгд устах болно. Энэ үйлдлийг буцаах
										боломжгүй.
									</p>
									<Button
										type="button"
										variant="destructive"
										className="mt-4 gap-2 bg-red-600 hover:bg-red-700"
									>
										<Trash2 className="h-4 w-4" />
										Бүртгэл устгах
									</Button>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
