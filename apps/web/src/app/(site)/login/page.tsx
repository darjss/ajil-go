"use client";

import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Login:", formData);
	};

	return (
		<AuthLayout>
			<div className="grid items-center gap-12 md:grid-cols-2">
				{/* Left side - Image and testimonial */}
				<div className="hidden flex-col items-center md:flex">
					<div className="mb-8">
						<div className="mb-6 text-5xl">👨‍💼</div>
					</div>
					<div className="max-w-sm rounded-lg border border-border bg-card p-8 text-center">
						<div className="mb-2 font-bold text-4xl text-primary">100K+</div>
						<p className="mb-6 text-muted-foreground">
							Эндээс ажилд орсон хүмүүс
						</p>
						<div className="border-border border-t pt-6">
							<p className="mb-2 font-semibold text-foreground text-sm">
								Adam Sandler
							</p>
							<p className="mb-4 text-muted-foreground text-xs">
								Canva-ийн ахлах инженер
							</p>
							<blockquote className="text-foreground text-sm italic">
								"Стартап сонирхдог, карьерийн дараагийн алхмаа хайж буй ажил
								хайгчдад маш тохиромжтой платформ."
							</blockquote>
						</div>
					</div>
				</div>

				{/* Right side - Login form */}
				<div className="mx-auto w-full max-w-md">
					<div className="mb-8">
						<div className="mb-6 flex gap-4">
							<button className="border-primary border-b-2 px-4 py-2 font-medium text-primary text-sm">
								Ажил хайгч
							</button>
							<button className="px-4 py-2 font-medium text-muted-foreground text-sm">
								Компани
							</button>
						</div>
					</div>

					<h1 className="mb-2 font-bold text-3xl text-foreground">
						Дахин тавтай морил
					</h1>

					{/* Google Login */}
					<Button className="mb-6 h-12 w-full border border-border bg-card text-foreground hover:bg-muted">
						<span className="mr-2">🔍</span>
						Google-ээр нэвтрэх
					</Button>

					{/* Divider */}
					<div className="relative mb-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-border border-t" />
						</div>
						<div className="relative flex justify-center text-xs">
							<span className="bg-background px-2 text-muted-foreground">
								Эсвэл имэйлээр нэвтэр
							</span>
						</div>
					</div>

					{/* Form */}
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label
								htmlFor="email"
								className="mb-2 block font-medium text-foreground text-sm"
							>
								Имэйл хаяг
							</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Имэйл хаягаа оруулна уу"
								value={formData.email}
								onChange={handleChange}
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="mb-2 block font-medium text-foreground text-sm"
							>
								Нууц үг
							</label>
							<input
								type="password"
								id="password"
								name="password"
								placeholder="Нууц үгээ оруулна уу"
								value={formData.password}
								onChange={handleChange}
								className="w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
							/>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								id="remember"
								name="remember"
								checked={formData.remember}
								onChange={handleChange}
								className="h-4 w-4 rounded border-border"
							/>
							<label
								htmlFor="remember"
								className="ml-2 text-foreground text-sm"
							>
								Намайг сана
							</label>
						</div>

						<Button
							type="submit"
							className="h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90"
						>
							Нэвтрэх
						</Button>
					</form>

					{/* Sign Up Link */}
					<p className="mt-6 text-center text-muted-foreground text-sm">
						Бүртгэлгүй байна уу?{" "}
						<Link
							href="/signup"
							className="font-medium text-primary hover:underline"
						>
							Бүртгүүлэх
						</Link>
					</p>
				</div>
			</div>
		</AuthLayout>
	);
}
