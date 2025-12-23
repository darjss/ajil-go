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
import { useState } from "react";

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
			<Card className="rounded-none border-border">
				<CardHeader>
					<Skeleton className="h-6 w-48 rounded-sm" />
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-12 w-full rounded-sm" />
					<Skeleton className="h-12 w-full rounded-sm" />
				</CardContent>
			</Card>
			<Card className="rounded-none border-border">
				<CardHeader>
					<Skeleton className="h-6 w-36 rounded-sm" />
				</CardHeader>
				<CardContent className="space-y-4">
					<Skeleton className="h-12 w-full rounded-sm" />
					<Skeleton className="h-12 w-full rounded-sm" />
					<Skeleton className="h-12 w-full rounded-sm" />
				</CardContent>
			</Card>
			<Card className="rounded-none border-border">
				<CardHeader>
					<Skeleton className="h-6 w-24 rounded-sm" />
				</CardHeader>
				<CardContent>
					<Skeleton className="h-12 w-full rounded-sm" />
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

	// Auth is handled by server-side layout

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
						<Skeleton className="h-8 w-32 rounded-sm" />
						<Skeleton className="h-4 w-64 rounded-sm" />
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
						<div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary text-primary-foreground">
							<Settings className="h-5 w-5" />
						</div>
						<div>
							<h1 className="font-display text-2xl text-foreground lg:text-3xl">
								Тохиргоо
							</h1>
							<p className="font-body text-muted-foreground text-sm">
								Бүртгэл болон мэдэгдлийн тохиргоо
							</p>
						</div>
					</div>
				</header>

				<Card className="overflow-hidden rounded-none border-border transition-all hover:shadow-sm">
					<CardHeader className="border-border border-b bg-muted">
						<CardTitle className="flex items-center gap-2 font-display text-foreground text-lg">
							<User className="h-5 w-5 text-primary" />
							Бүртгэлийн мэдээлэл
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="space-y-4">
							<div className="flex items-center justify-between rounded-none bg-muted/50 p-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary/10 text-primary">
										<Mail className="h-5 w-5" />
									</div>
									<div>
										<Label className="font-mono text-muted-foreground text-xs uppercase tracking-wider">
											Имэйл хаяг
										</Label>
										<p className="font-body text-foreground">
											{session?.user?.email || "—"}
										</p>
									</div>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden rounded-none border-border transition-all hover:shadow-sm">
					<CardHeader className="border-border border-b bg-muted">
						<CardTitle className="flex items-center gap-2 font-display text-foreground text-lg">
							<Bell className="h-5 w-5 text-primary" />
							Мэдэгдэл
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="space-y-1">
							<div className="flex items-center justify-between rounded-none p-4 transition-colors hover:bg-muted/50">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-none bg-secondary/20 text-secondary-foreground">
										<Mail className="h-5 w-5" />
									</div>
									<div>
										<Label
											htmlFor="email-notifications"
											className="cursor-pointer font-body text-foreground"
										>
											Имэйл мэдэгдэл
										</Label>
										<p className="font-body text-muted-foreground text-sm">
											Имэйлээр мэдэгдэл хүлээн авах
										</p>
									</div>
								</div>
								<Switch
									id="email-notifications"
									checked={emailNotifications}
									onCheckedChange={setEmailNotifications}
									className="data-[state=checked]:bg-primary"
								/>
							</div>

							<div className="flex items-center justify-between rounded-none p-4 transition-colors hover:bg-muted/50">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary/10 text-primary">
										<Bell className="h-5 w-5" />
									</div>
									<div>
										<Label
											htmlFor="new-task-notifications"
											className="cursor-pointer font-body text-foreground"
										>
											Шинэ даалгаврын мэдэгдэл
										</Label>
										<p className="font-body text-muted-foreground text-sm">
											Даалгаврын статус өөрчлөгдөхөд мэдэгдэл авах
										</p>
									</div>
								</div>
								<Switch
									id="new-task-notifications"
									checked={newTaskNotifications}
									onCheckedChange={setNewTaskNotifications}
									className="data-[state=checked]:bg-primary"
								/>
							</div>

							<div className="flex items-center justify-between rounded-none p-4 transition-colors hover:bg-muted/50">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-none bg-accent/20 text-accent-foreground">
										<Bell className="h-5 w-5" />
									</div>
									<div>
										<Label
											htmlFor="bid-notifications"
											className="cursor-pointer font-body text-foreground"
										>
											Саналын мэдэгдэл
										</Label>
										<p className="font-body text-muted-foreground text-sm">
											Шинэ санал ирэхэд мэдэгдэл авах
										</p>
									</div>
								</div>
								<Switch
									id="bid-notifications"
									checked={bidNotifications}
									onCheckedChange={setBidNotifications}
									className="data-[state=checked]:bg-primary"
								/>
							</div>

							<div className="flex items-center justify-between rounded-none p-4 transition-colors hover:bg-muted/50">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-none bg-secondary/20 text-secondary-foreground">
										<MessageSquare className="h-5 w-5" />
									</div>
									<div>
										<Label
											htmlFor="message-notifications"
											className="cursor-pointer font-body text-foreground"
										>
											Мессежийн мэдэгдэл
										</Label>
										<p className="font-body text-muted-foreground text-sm">
											Шинэ мессеж ирэхэд мэдэгдэл авах
										</p>
									</div>
								</div>
								<Switch
									id="message-notifications"
									checked={messageNotifications}
									onCheckedChange={setMessageNotifications}
									className="data-[state=checked]:bg-primary"
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="overflow-hidden rounded-none border-border transition-all hover:shadow-sm">
					<CardHeader className="border-border border-b bg-muted">
						<CardTitle className="flex items-center gap-2 font-display text-foreground text-lg">
							<Globe className="h-5 w-5 text-primary" />
							Хэл
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="flex items-center justify-between rounded-none bg-muted/50 p-4">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 items-center justify-center rounded-none bg-secondary/20 text-secondary-foreground">
									<Globe className="h-5 w-5" />
								</div>
								<div>
									<Label className="font-body text-foreground">
										Интерфэйсийн хэл
									</Label>
									<p className="font-body text-muted-foreground text-sm">
										Програмын үзүүлэх хэлийг сонгох
									</p>
								</div>
							</div>
							<Select value={language} onValueChange={setLanguage}>
								<SelectTrigger className="w-36 rounded-none border-border bg-card">
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

				<Card className="overflow-hidden rounded-none border-border transition-all hover:shadow-sm">
					<CardContent className="p-6">
						<Button
							type="button"
							variant="outline"
							className="w-full justify-center gap-2 rounded-none border-border py-6 text-muted-foreground transition-all hover:border-primary hover:bg-muted"
							onClick={handleLogout}
							disabled={isLoggingOut}
						>
							<LogOut className="h-5 w-5" />
							{isLoggingOut ? "Гарч байна..." : "Гарах"}
						</Button>
					</CardContent>
				</Card>

				<Card className="overflow-hidden rounded-none border-destructive/50 bg-destructive/5 transition-all hover:shadow-sm">
					<CardHeader className="border-destructive/30 border-b">
						<CardTitle className="flex items-center gap-2 font-display text-destructive text-lg">
							<AlertTriangle className="h-5 w-5" />
							Аюултай бүс
						</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="rounded-none border border-destructive/30 bg-card p-4">
							<div className="flex items-start gap-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none bg-destructive/10 text-destructive">
									<Trash2 className="h-5 w-5" />
								</div>
								<div className="flex-1">
									<h3 className="font-display text-destructive">
										Бүртгэл устгах
									</h3>
									<p className="mt-1 font-body text-destructive/80 text-sm">
										Анхааруулга: Бүртгэлээ устгавал таны бүх мэдээлэл,
										даалгавар, санал бүгд устах болно. Энэ үйлдлийг буцаах
										боломжгүй.
									</p>
									<Button
										type="button"
										variant="destructive"
										className="mt-4 gap-2 rounded-none"
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
