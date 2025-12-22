"use client";

import type { ReviewApiResponse, UpdateUserBody } from "@ajil-go/contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	Award,
	Briefcase,
	CheckCircle2,
	Edit3,
	MapPin,
	Phone,
	Save,
	Star,
	User,
	X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { reviewsApi, usersApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { userKeys, userQueries } from "@/lib/queries";

function ProfileHeaderSkeleton() {
	return (
		<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 shadow-xl">
			<div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
				<Skeleton className="h-28 w-28 rounded-2xl bg-white/20" />
				<div className="flex-1 space-y-3 text-center sm:text-left">
					<Skeleton className="mx-auto h-8 w-48 bg-white/20 sm:mx-0" />
					<Skeleton className="mx-auto h-4 w-32 bg-white/20 sm:mx-0" />
					<div className="flex flex-wrap justify-center gap-4 sm:justify-start">
						<Skeleton className="h-6 w-24 bg-white/20" />
						<Skeleton className="h-6 w-24 bg-white/20" />
					</div>
				</div>
			</div>
		</div>
	);
}

function StatsCardSkeleton() {
	return (
		<Card className="border-slate-100">
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-8 w-16" />
					</div>
					<Skeleton className="h-12 w-12 rounded-xl" />
				</div>
			</CardContent>
		</Card>
	);
}

function FormFieldSkeleton() {
	return (
		<div className="space-y-2">
			<Skeleton className="h-4 w-20" />
			<Skeleton className="h-9 w-full" />
		</div>
	);
}

function ReviewCardSkeleton() {
	return (
		<div className="rounded-xl bg-slate-50/50 p-4">
			<div className="flex items-start gap-3">
				<Skeleton className="h-10 w-10 rounded-full" />
				<div className="flex-1 space-y-2">
					<Skeleton className="h-4 w-32" />
					<Skeleton className="h-3 w-24" />
					<Skeleton className="mt-2 h-12 w-full" />
				</div>
			</div>
		</div>
	);
}

function StarRating({
	rating,
	size = "md",
}: {
	rating: number;
	size?: "sm" | "md" | "lg";
}) {
	const sizeClasses = {
		sm: "text-sm",
		md: "text-base",
		lg: "text-xl",
	};

	const fullStars = Math.floor(rating);
	const hasHalfStar = rating % 1 >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<span className={`inline-flex items-center gap-0.5 ${sizeClasses[size]}`}>
			{Array.from({ length: fullStars }).map((_, i) => (
				<span key={`full-${i.toString()}`} className="text-amber-400">
					★
				</span>
			))}
			{hasHalfStar && <span className="text-amber-400">★</span>}
			{Array.from({ length: emptyStars }).map((_, i) => (
				<span key={`empty-${i.toString()}`} className="text-slate-300">
					☆
				</span>
			))}
		</span>
	);
}

function formatDate(date: Date): string {
	return new Intl.DateTimeFormat("mn-MN", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
}

export default function WorkerProfilePage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { data: session, isPending: isSessionLoading } =
		authClient.useSession();

	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<UpdateUserBody>({
		name: "",
		bio: "",
		phone: "",
		address: "",
		city: "",
	});

	useEffect(() => {
		if (!isSessionLoading && !session?.user) {
			router.push("/login");
		}
	}, [session, isSessionLoading, router]);

	const userId = session?.user?.id;

	const { data: userData, isLoading: isUserLoading } = useQuery({
		...userQueries.me(),
		enabled: !!userId,
	});

	const { data: reviewsData, isLoading: isReviewsLoading } = useQuery({
		queryKey: ["reviews", "received", userId],
		queryFn: () =>
			reviewsApi.list({ targetId: userId, type: "CLIENT_TO_WORKER" }),
		enabled: !!userId,
	});

	const updateProfileMutation = useMutation({
		mutationFn: (data: UpdateUserBody) => {
			if (!userId) {
				return Promise.reject(new Error("User ID is required"));
			}
			return usersApi.update(userId, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.me() });
			setIsEditing(false);
		},
	});

	useEffect(() => {
		if (userData) {
			setFormData({
				name: userData.name || "",
				bio: userData.bio || "",
				phone: userData.phone || "",
				address: userData.address || "",
				city: userData.city || "",
			});
		}
	}, [userData]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		updateProfileMutation.mutate(formData);
	};

	const handleCancel = () => {
		if (userData) {
			setFormData({
				name: userData.name || "",
				bio: userData.bio || "",
				phone: userData.phone || "",
				address: userData.address || "",
				city: userData.city || "",
			});
		}
		setIsEditing(false);
	};

	const reviews = reviewsData?.data || [];
	const userInitials =
		userData?.name
			?.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) || "??";

	if (isSessionLoading || isUserLoading) {
		return (
			<div className="min-h-screen p-6 lg:p-8">
				<div className="mx-auto max-w-4xl space-y-8">
					<ProfileHeaderSkeleton />
					<div className="grid gap-4 sm:grid-cols-3">
						{Array.from({ length: 3 }).map((_, i) => (
							<StatsCardSkeleton key={`stats-skeleton-${i.toString()}`} />
						))}
					</div>
					<Card className="border-slate-100">
						<CardHeader>
							<Skeleton className="h-6 w-40" />
						</CardHeader>
						<CardContent className="space-y-4">
							{Array.from({ length: 5 }).map((_, i) => (
								<FormFieldSkeleton key={`form-skeleton-${i.toString()}`} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-6 lg:p-8">
			<div className="mx-auto max-w-4xl space-y-8">
				<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 shadow-xl">
					<div className="pointer-events-none absolute inset-0 overflow-hidden">
						<div className="-right-20 -top-20 absolute h-64 w-64 rounded-full bg-white/10 blur-3xl" />
						<div className="-bottom-32 -left-20 absolute h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
						<div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
					</div>

					<div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
						<Avatar className="h-28 w-28 rounded-2xl border-4 border-white/30 shadow-2xl">
							<AvatarImage
								src={userData?.image || undefined}
								alt={userData?.name}
							/>
							<AvatarFallback className="rounded-2xl bg-white/20 font-bold text-2xl text-white">
								{userInitials}
							</AvatarFallback>
						</Avatar>

						<div className="flex-1 text-center sm:text-left">
							<h1 className="font-bold text-3xl text-white drop-shadow-sm">
								{userData?.name || "Нэргүй хэрэглэгч"}
							</h1>
							{userData?.city && (
								<p className="mt-1 flex items-center justify-center gap-1.5 text-white/80 sm:justify-start">
									<MapPin className="h-4 w-4" />
									{userData.city}
								</p>
							)}
							<div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
								<div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
									<Star className="h-4 w-4 text-amber-300" />
									<span className="font-semibold">
										{userData?.avgRatingAsWorker?.toFixed(1) || "0.0"}
									</span>
									<span className="text-white/70">үнэлгээ</span>
								</div>
								<div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
									<CheckCircle2 className="h-4 w-4 text-emerald-300" />
									<span className="font-semibold">
										{userData?.completedTasksAsWorker || 0}
									</span>
									<span className="text-white/70">дууссан</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-3">
					<Card className="group overflow-hidden border-amber-100 transition-all hover:border-amber-200 hover:shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-slate-500 text-sm">
										Гүйцэтгэгчийн үнэлгээ
									</p>
									<div className="mt-1 flex items-center gap-2">
										<p className="font-bold text-2xl text-amber-600">
											{userData?.avgRatingAsWorker?.toFixed(1) || "0.0"}
										</p>
										<StarRating
											rating={userData?.avgRatingAsWorker || 0}
											size="sm"
										/>
									</div>
								</div>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 transition-colors group-hover:from-amber-200 group-hover:to-amber-100">
									<Star className="h-6 w-6" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="group overflow-hidden border-emerald-100 transition-all hover:border-emerald-200 hover:shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-slate-500 text-sm">Дууссан даалгавар</p>
									<p className="mt-1 font-bold text-2xl text-emerald-600">
										{userData?.completedTasksAsWorker || 0}
									</p>
								</div>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 transition-colors group-hover:from-emerald-200 group-hover:to-emerald-100">
									<Briefcase className="h-6 w-6" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="group overflow-hidden border-cyan-100 transition-all hover:border-cyan-200 hover:shadow-lg">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-slate-500 text-sm">Захиалагчийн үнэлгээ</p>
									<div className="mt-1 flex items-center gap-2">
										<p className="font-bold text-2xl text-cyan-600">
											{userData?.avgRatingAsClient?.toFixed(1) || "0.0"}
										</p>
										<StarRating
											rating={userData?.avgRatingAsClient || 0}
											size="sm"
										/>
									</div>
								</div>
								<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-50 text-cyan-600 transition-colors group-hover:from-cyan-200 group-hover:to-cyan-100">
									<Award className="h-6 w-6" />
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<Card className="border-slate-100">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-slate-800">
							<User className="h-5 w-5 text-emerald-600" />
							Хувийн мэдээлэл
						</CardTitle>
						{!isEditing ? (
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => setIsEditing(true)}
								className="border-emerald-200 text-emerald-600 hover:bg-emerald-50"
							>
								<Edit3 className="mr-1.5 h-4 w-4" />
								Засах
							</Button>
						) : (
							<div className="flex gap-2">
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={handleCancel}
									className="border-slate-200 text-slate-600 hover:bg-slate-50"
								>
									<X className="mr-1.5 h-4 w-4" />
									Цуцлах
								</Button>
								<Button
									type="button"
									size="sm"
									onClick={handleSave}
									disabled={updateProfileMutation.isPending}
									className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/20 shadow-lg hover:shadow-emerald-500/30"
								>
									<Save className="mr-1.5 h-4 w-4" />
									{updateProfileMutation.isPending
										? "Хадгалж байна..."
										: "Хадгалах"}
								</Button>
							</div>
						)}
					</CardHeader>
					<CardContent className="space-y-6 pt-4">
						<div className="grid gap-6 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name" className="text-slate-700">
									Нэр
								</Label>
								{isEditing ? (
									<Input
										id="name"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										placeholder="Таны нэр"
										className="border-slate-200 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
									/>
								) : (
									<p className="rounded-md bg-slate-50 px-3 py-2 text-slate-700">
										{userData?.name || "—"}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="phone" className="text-slate-700">
									<Phone className="mr-1.5 inline h-4 w-4 text-slate-400" />
									Утас
								</Label>
								{isEditing ? (
									<Input
										id="phone"
										name="phone"
										value={formData.phone}
										onChange={handleInputChange}
										placeholder="Утасны дугаар"
										className="border-slate-200 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
									/>
								) : (
									<p className="rounded-md bg-slate-50 px-3 py-2 text-slate-700">
										{userData?.phone || "—"}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="city" className="text-slate-700">
									<MapPin className="mr-1.5 inline h-4 w-4 text-slate-400" />
									Хот
								</Label>
								{isEditing ? (
									<Input
										id="city"
										name="city"
										value={formData.city}
										onChange={handleInputChange}
										placeholder="Хот/Аймаг"
										className="border-slate-200 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
									/>
								) : (
									<p className="rounded-md bg-slate-50 px-3 py-2 text-slate-700">
										{userData?.city || "—"}
									</p>
								)}
							</div>

							<div className="space-y-2">
								<Label htmlFor="address" className="text-slate-700">
									Хаяг
								</Label>
								{isEditing ? (
									<Input
										id="address"
										name="address"
										value={formData.address}
										onChange={handleInputChange}
										placeholder="Дэлгэрэнгүй хаяг"
										className="border-slate-200 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
									/>
								) : (
									<p className="rounded-md bg-slate-50 px-3 py-2 text-slate-700">
										{userData?.address || "—"}
									</p>
								)}
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="bio" className="text-slate-700">
								Танилцуулга
							</Label>
							{isEditing ? (
								<Textarea
									id="bio"
									name="bio"
									value={formData.bio}
									onChange={handleInputChange}
									placeholder="Өөрийгөө танилцуулна уу..."
									rows={4}
									className="resize-none border-slate-200 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
								/>
							) : (
								<p className="min-h-[80px] whitespace-pre-wrap rounded-md bg-slate-50 px-3 py-2 text-slate-700">
									{userData?.bio || "Танилцуулга оруулаагүй байна"}
								</p>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className="border-slate-100">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-slate-800">
							<Award className="h-5 w-5 text-emerald-600" />
							Ур чадварууд
						</CardTitle>
					</CardHeader>
					<CardContent>
						{userData?.skills && userData.skills.length > 0 ? (
							<div className="flex flex-wrap gap-2">
								{userData.skills.map((userSkill, index) => {
									const skillName =
										userSkill.skill?.name || userSkill.customSkill?.name;
									if (!skillName) return null;
									return (
										<Badge
											key={`skill-${index.toString()}`}
											variant="outline"
											className="border-emerald-200 bg-emerald-50/50 px-3 py-1.5 text-emerald-700 transition-colors hover:bg-emerald-100"
										>
											{skillName}
										</Badge>
									);
								})}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-8 text-center">
								<div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
									<Award className="h-7 w-7 text-slate-400" />
								</div>
								<p className="font-medium text-slate-600">
									Ур чадвар бүртгэгдээгүй байна
								</p>
								<p className="mt-1 text-slate-400 text-sm">
									Админтай холбогдон ур чадвараа нэмүүлнэ үү
								</p>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="border-slate-100">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-slate-800">
							<Star className="h-5 w-5 text-amber-500" />
							Үнэлгээнүүд
							{reviews.length > 0 && (
								<span className="rounded-full bg-slate-100 px-2 py-0.5 font-normal text-slate-500 text-sm">
									{reviews.length}
								</span>
							)}
						</CardTitle>
					</CardHeader>
					<CardContent>
						{isReviewsLoading ? (
							<div className="space-y-4">
								{Array.from({ length: 3 }).map((_, i) => (
									<ReviewCardSkeleton key={`review-skeleton-${i.toString()}`} />
								))}
							</div>
						) : reviews.length > 0 ? (
							<div className="space-y-4">
								{reviews.map((review: ReviewApiResponse) => (
									<div
										key={review.id}
										className="rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50/50 to-white p-4 transition-all hover:border-slate-200 hover:shadow-sm"
									>
										<div className="flex items-start gap-3">
											<Avatar className="h-10 w-10">
												<AvatarImage
													src={review.author?.image || undefined}
													alt={review.author?.name}
												/>
												<AvatarFallback className="bg-gradient-to-br from-emerald-100 to-cyan-100 font-medium text-emerald-700 text-sm">
													{review.author?.name
														?.split(" ")
														.map((n) => n[0])
														.join("")
														.toUpperCase()
														.slice(0, 2) || "??"}
												</AvatarFallback>
											</Avatar>
											<div className="flex-1">
												<div className="flex flex-wrap items-center gap-2">
													<span className="font-medium text-slate-800">
														{review.author?.name || "Нэргүй"}
													</span>
													<StarRating rating={review.rating} size="sm" />
												</div>
												<p className="mt-0.5 text-slate-400 text-xs">
													{formatDate(review.createdAt)}
												</p>
												{review.comment && (
													<p className="mt-2 text-slate-600 text-sm leading-relaxed">
														{review.comment}
													</p>
												)}
												{review.task && (
													<p className="mt-2 text-slate-400 text-xs">
														Даалгавар: {review.task.title}
													</p>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center py-12 text-center">
								<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50">
									<Star className="h-8 w-8 text-amber-300" />
								</div>
								<h3 className="font-semibold text-slate-700">
									Үнэлгээ байхгүй байна
								</h3>
								<p className="mt-1 text-slate-500 text-sm">
									Даалгавар гүйцэтгэсний дараа захиалагчаас үнэлгээ авах
									боломжтой
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
