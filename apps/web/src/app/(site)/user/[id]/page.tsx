"use client";

import type { ReviewApiResponse } from "@ajil-go/contract";
import { useQuery } from "@tanstack/react-query";
import {
	Award,
	Briefcase,
	CheckCircle2,
	Edit3,
	MapPin,
	Star,
	User,
	UserX,
} from "lucide-react";
import Link from "next/link";
import { use } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { reviewsApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { userQueries } from "@/lib/queries";

interface UserProfilePageProps {
	params: Promise<{ id: string }>;
}

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

function UserProfileContent({ userId }: { userId: string }) {
	const { data: session } = authClient.useSession();
	const isOwnProfile = session?.user?.id === userId;

	const {
		data: userData,
		isLoading: isUserLoading,
		error: userError,
	} = useQuery({
		...userQueries.detail(userId),
	});

	const { data: workerReviewsData, isLoading: isWorkerReviewsLoading } =
		useQuery({
			queryKey: ["reviews", "received", userId, "CLIENT_TO_WORKER"],
			queryFn: () =>
				reviewsApi.list({ targetId: userId, type: "CLIENT_TO_WORKER" }),
			enabled: !!userId,
		});

	const { data: clientReviewsData, isLoading: isClientReviewsLoading } =
		useQuery({
			queryKey: ["reviews", "received", userId, "WORKER_TO_CLIENT"],
			queryFn: () =>
				reviewsApi.list({ targetId: userId, type: "WORKER_TO_CLIENT" }),
			enabled: !!userId,
		});

	const isReviewsLoading = isWorkerReviewsLoading || isClientReviewsLoading;
	const workerReviews = workerReviewsData?.data || [];
	const clientReviews = clientReviewsData?.data || [];
	const allReviews = [...workerReviews, ...clientReviews].sort(
		(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
	);

	const userInitials =
		userData?.name
			?.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2) || "??";

	if (isUserLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white p-6 lg:p-8">
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
						<CardContent>
							<Skeleton className="h-24 w-full" />
						</CardContent>
					</Card>
					<Card className="border-slate-100">
						<CardHeader>
							<Skeleton className="h-6 w-32" />
						</CardHeader>
						<CardContent className="space-y-4">
							{Array.from({ length: 3 }).map((_, i) => (
								<ReviewCardSkeleton key={`review-skeleton-${i.toString()}`} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (userError || !userData) {
		return (
			<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
				<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200">
					<UserX className="h-12 w-12 text-slate-400" />
				</div>
				<h1 className="mb-2 font-bold text-2xl text-slate-800">
					Хэрэглэгч олдсонгүй
				</h1>
				<p className="mb-8 max-w-md text-center text-slate-500">
					Энэ хэрэглэгч байхгүй эсвэл устгагдсан байна
				</p>
				<Link href="/tasks">
					<Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg hover:shadow-xl">
						Даалгаврууд руу буцах
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50/50 to-white p-6 lg:p-8">
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
							<div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
								<div>
									<h1 className="font-bold text-3xl text-white drop-shadow-sm">
										{userData?.name || "Нэргүй хэрэглэгч"}
									</h1>
									{userData?.city && (
										<p className="mt-1 flex items-center justify-center gap-1.5 text-white/80 sm:justify-start">
											<MapPin className="h-4 w-4" />
											{userData.city}
										</p>
									)}
								</div>
								{isOwnProfile && (
									<Link
										href={session?.user ? "/worker/profile" : "/client/profile"}
									>
										<Button
											variant="secondary"
											size="sm"
											className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
										>
											<Edit3 className="mr-1.5 h-4 w-4" />
											Профайл засах
										</Button>
									</Link>
								)}
							</div>
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
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-slate-800">
							<User className="h-5 w-5 text-emerald-600" />
							Тухай
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="whitespace-pre-wrap text-slate-600 leading-relaxed">
							{userData?.bio || "Танилцуулга оруулаагүй байна"}
						</p>
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
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="border-slate-100">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-slate-800">
							<Star className="h-5 w-5 text-amber-500" />
							Үнэлгээнүүд
							{allReviews.length > 0 && (
								<span className="rounded-full bg-slate-100 px-2 py-0.5 font-normal text-slate-500 text-sm">
									{allReviews.length}
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
						) : allReviews.length > 0 ? (
							<div className="space-y-4">
								{allReviews.map((review: ReviewApiResponse) => (
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
													<Badge
														variant="outline"
														className={
															review.type === "CLIENT_TO_WORKER"
																? "border-emerald-200 bg-emerald-50 text-emerald-700"
																: "border-cyan-200 bg-cyan-50 text-cyan-700"
														}
													>
														{review.type === "CLIENT_TO_WORKER"
															? "Захиалагчаас"
															: "Гүйцэтгэгчээс"}
													</Badge>
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
									Энэ хэрэглэгч одоогоор үнэлгээ аваагүй байна
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
	const resolvedParams = use(params);

	return (
		<main className="min-h-screen bg-background">
			<UserProfileContent userId={resolvedParams.id} />
		</main>
	);
}
