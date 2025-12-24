"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
	const router = useRouter();
	const { isPending } = authClient.useSession();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		remember: false,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		await authClient.signIn.email(
			{
				email: formData.email,
				password: formData.password,
			},
			{
				onSuccess: () => {
					router.push("/dashboard");
					toast.success("Амжилттай нэвтэрлээ");
				},
				onError: (error) => {
					toast.error(error.error.message || error.error.statusText);
				},
			},
		);

		setIsSubmitting(false);
	};

	const handleGoogleSignIn = () => {
		authClient.signIn.social({
			provider: "google",
			callbackURL: `${window.location.origin}/dashboard`,
		});
	};

	if (isPending) {
		return <Loader />;
	}

	return (
		<div className="grid min-h-screen w-full lg:grid-cols-2">
			<div className="hidden flex-col justify-between border-r bg-muted/30 p-12 lg:flex">
				<div className="font-bold font-display text-4xl uppercase tracking-tight">
					Ajil-Go
				</div>
				<div className="max-w-xl">
					<h1 className="font-bold font-display text-7xl text-primary uppercase leading-none tracking-tighter">
						Ирээдүйгээ
						<br />
						Бүтээ
					</h1>
				</div>
				<div className="font-mono text-muted-foreground text-xs">
					© 2025 AJIL GO INC.
				</div>
			</div>

			<div className="flex flex-col justify-center px-8 py-12 lg:px-24">
				<div className="mx-auto w-full max-w-sm space-y-8">
					<div className="space-y-2">
						<h2 className="font-bold font-display text-4xl tracking-tight">
							Нэвтрэх
						</h2>
						<p className="font-body text-lg text-muted-foreground">
							Системд нэвтрэхийн тулд мэдээллээ оруулна уу.
						</p>
					</div>

					<div className="space-y-6">
						<Button
							variant="outline"
							onClick={handleGoogleSignIn}
							className="h-12 w-full rounded-none border-2 border-border font-mono text-xs uppercase tracking-wider hover:bg-muted"
						>
							<Search className="mr-2 h-4 w-4" /> Google-ээр нэвтрэх
						</Button>

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<span className="w-full border-border border-t" />
							</div>
							<div className="relative flex justify-center text-xs uppercase">
								<span className="bg-background px-2 font-mono text-muted-foreground">
									Эсвэл
								</span>
							</div>
						</div>

						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="space-y-2">
								<Label
									htmlFor="email"
									className="font-mono text-muted-foreground text-xs uppercase tracking-wider"
								>
									Имэйл
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="name@example.com"
									value={formData.email}
									onChange={handleChange}
									required
									className="h-12 rounded-none border-2 border-input bg-transparent px-4 focus-visible:border-primary focus-visible:ring-0"
								/>
							</div>
							<div className="space-y-2">
								<div className="flex items-center justify-between">
									<Label
										htmlFor="password"
										className="font-mono text-muted-foreground text-xs uppercase tracking-wider"
									>
										Нууц үг
									</Label>
								</div>
								<Input
									id="password"
									name="password"
									type="password"
									value={formData.password}
									onChange={handleChange}
									required
									className="h-12 rounded-none border-2 border-input bg-transparent px-4 focus-visible:border-primary focus-visible:ring-0"
								/>
							</div>

							<div className="flex items-center space-x-2 py-2">
								<Checkbox
									id="remember"
									checked={formData.remember}
									onCheckedChange={(checked) =>
										setFormData((prev) => ({
											...prev,
											remember: checked === true,
										}))
									}
									className="rounded-none border-2 border-muted-foreground data-[state=checked]:border-primary data-[state=checked]:bg-primary"
								/>
								<Label
									htmlFor="remember"
									className="font-body font-normal text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Намайг сана
								</Label>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="h-14 w-full rounded-none bg-primary font-bold font-mono text-primary-foreground text-sm uppercase tracking-widest transition-all hover:bg-primary/90"
							>
								{isSubmitting ? "Уншиж байна..." : "Нэвтрэх"}
							</Button>
						</form>

						<div className="pt-4 text-center font-body text-muted-foreground text-sm">
							Бүртгэлгүй юу?{" "}
							<Link
								href="/signup"
								className="font-bold text-primary underline decoration-2 underline-offset-4 hover:text-primary/80"
							>
								Бүртгүүлэх
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
