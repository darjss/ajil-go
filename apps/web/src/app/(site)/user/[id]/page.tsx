"use client";

import type { ReviewApiResponse } from "@ajil-go/contract";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, Edit3, MapPin, Star, User, UserX } from "lucide-react";
import Link from "next/link";
import { use } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	getUserInitials,
	ProfileHeaderSkeleton,
	ProfileStatsCards,
	ReviewsSection,
	SkillsDisplay,
	StatsCardSkeleton,
} from "@/components/users";
import { reviewsApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { userQueries } from "@/lib/queries";

interface UserProfilePageProps {
	params: Promise<{ id: string }>;
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
	) as ReviewApiResponse[];

	const userInitials = getUserInitials(userData?.name);

	if (isUserLoading) {
		return (
			<div className="min-h-screen bg-muted p-6 lg:p-8">
				<div className="mx-auto max-w-4xl space-y-8">
					<ProfileHeaderSkeleton />
					<div className="grid gap-4 sm:grid-cols-3">
						{Array.from({ length: 3 }).map((_, i) => (
							<StatsCardSkeleton key={`stats-skeleton-${i.toString()}`} />
						))}
					</div>
					<Card className="border-border">
						<CardHeader>
							<Skeleton className="h-6 w-40 rounded-none" />
						</CardHeader>
						<CardContent>
							<Skeleton className="h-24 w-full rounded-none" />
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (userError || !userData) {
		return (
			<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16">
				<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-none bg-muted">
					<UserX className="h-12 w-12 text-muted-foreground" />
				</div>
				<h1 className="mb-2 font-display text-2xl text-foreground">
					Хэрэглэгч олдсонгүй
				</h1>
				<p className="mb-8 max-w-md text-center text-muted-foreground">
					Энэ хэрэглэгч байхгүй эсвэл устгагдсан байна
				</p>
				<Link href="/tasks">
					<Button className="bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl">
						Даалгаврууд руу буцах
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-muted p-6 lg:p-8">
			<div className="mx-auto max-w-4xl space-y-8">
				<ProfileHeader
					userData={userData}
					userInitials={userInitials}
					isOwnProfile={isOwnProfile}
					session={session}
				/>

				<ProfileStatsCards
					stats={{
						avgRatingAsWorker: userData.avgRatingAsWorker,
						avgRatingAsClient: userData.avgRatingAsClient,
						completedTasksAsWorker: userData.completedTasksAsWorker,
					}}
				/>

				<Card className="border-border">
					<CardHeader className="pb-4">
						<CardTitle className="flex items-center gap-2 font-display text-lg text-foreground">
							<User className="h-5 w-5 text-primary" />
							Тухай
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
							{userData?.bio || "Танилцуулга оруулаагүй байна"}
						</p>
					</CardContent>
				</Card>

				<SkillsDisplay skills={userData?.skills} />

				<ReviewsSection
					reviews={allReviews}
					isLoading={isReviewsLoading}
					showReviewType={true}
					emptyMessage="Үнэлгээ байхгүй байна"
					emptyDescription="Энэ хэрэглэгч одоогоор үнэлгээ аваагүй байна"
				/>
			</div>
		</div>
	);
}

interface ProfileHeaderProps {
	userData: {
		name: string;
		image?: string | null;
		city?: string | null;
		avgRatingAsWorker?: number;
		completedTasksAsWorker?: number;
	};
	userInitials: string;
	isOwnProfile: boolean;
	session: { user?: { id: string } } | null;
}

function ProfileHeader({
	userData,
	userInitials,
	isOwnProfile,
	session,
}: ProfileHeaderProps) {
	return (
		<div className="relative overflow-hidden rounded-none bg-primary p-8 shadow-xl">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="-right-20 -top-20 absolute h-64 w-64 rounded-none bg-primary-foreground/10 blur-3xl" />
				<div className="-bottom-32 -left-20 absolute h-80 w-80 rounded-none bg-primary-foreground/5 blur-3xl" />
				<div className="absolute right-0 bottom-0 left-0 h-px bg-primary-foreground/20" />
			</div>

			<div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
				<Avatar className="h-28 w-28 rounded-none border-4 border-primary-foreground/30 shadow-2xl">
					<AvatarImage
						src={userData?.image || undefined}
						alt={userData?.name}
					/>
					<AvatarFallback className="rounded-none bg-primary-foreground/20 font-display text-2xl text-primary-foreground">
						{userInitials}
					</AvatarFallback>
				</Avatar>

				<div className="flex-1 text-center sm:text-left">
					<div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
						<div>
							<h1 className="font-display text-3xl text-primary-foreground drop-shadow-sm">
								{userData?.name || "Нэргүй хэрэглэгч"}
							</h1>
							{userData?.city && (
								<p className="mt-1 flex items-center justify-center gap-1.5 text-primary-foreground/80 sm:justify-start">
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
									className="bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/30"
								>
									<Edit3 className="mr-1.5 h-4 w-4" />
									Профайл засах
								</Button>
							</Link>
						)}
					</div>
					<div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
						<div className="flex items-center gap-1.5 rounded-none bg-primary-foreground/20 px-3 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
							<Star className="h-4 w-4 text-accent" />
							<span className="font-mono font-semibold">
								{userData?.avgRatingAsWorker?.toFixed(1) || "0.0"}
							</span>
							<span className="text-primary-foreground/70">үнэлгээ</span>
						</div>
						<div className="flex items-center gap-1.5 rounded-none bg-primary-foreground/20 px-3 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
							<CheckCircle2 className="h-4 w-4 text-accent" />
							<span className="font-mono font-semibold">
								{userData?.completedTasksAsWorker || 0}
							</span>
							<span className="text-primary-foreground/70">дууссан</span>
						</div>
					</div>
				</div>
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
