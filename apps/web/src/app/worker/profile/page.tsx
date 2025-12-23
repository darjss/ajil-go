"use client";

import type { UpdateUserBody } from "@ajil-go/contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
	FormFieldSkeleton,
	getUserInitials,
	ProfileHeaderSkeleton,
	ProfileStatsCards,
	ReviewsSection,
	SkillsDisplay,
	StatsCardSkeleton,
} from "@/components/users";
import { reviewsApi, usersApi } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { userKeys, userQueries } from "@/lib/queries";

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
	const userInitials = getUserInitials(userData?.name);

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
					<Card className="border-border">
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
				<WorkerProfileHeader userData={userData} userInitials={userInitials} />

				<ProfileStatsCards
					stats={{
						avgRatingAsWorker: userData?.avgRatingAsWorker ?? 0,
						avgRatingAsClient: userData?.avgRatingAsClient ?? 0,
						completedTasksAsWorker: userData?.completedTasksAsWorker ?? 0,
					}}
				/>

				<Card className="border-border">
					<CardHeader className="flex flex-row items-center justify-between pb-2">
						<CardTitle className="flex items-center gap-2 font-semibold text-lg text-foreground">
							<User className="h-5 w-5 text-primary" />
							Хувийн мэдээлэл
						</CardTitle>
						{!isEditing ? (
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => setIsEditing(true)}
								className="border-primary/30 text-primary hover:bg-primary/10"
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
									className="border-border text-muted-foreground hover:bg-muted"
								>
									<X className="mr-1.5 h-4 w-4" />
									Цуцлах
								</Button>
								<Button
									type="button"
									size="sm"
									onClick={handleSave}
									disabled={updateProfileMutation.isPending}
									className="bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
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
						<ProfileFormFields
							formData={formData}
							userData={userData}
							isEditing={isEditing}
							onInputChange={handleInputChange}
						/>
					</CardContent>
				</Card>

				<SkillsDisplay skills={userData?.skills} />

				<ReviewsSection
					reviews={reviews}
					isLoading={isReviewsLoading}
					showReviewType={false}
					emptyMessage="Үнэлгээ байхгүй байна"
					emptyDescription="Даалгавар гүйцэтгэсний дараа захиалагчаас үнэлгээ авах боломжтой"
				/>
			</div>
		</div>
	);
}

interface WorkerProfileHeaderProps {
	userData?: {
		name?: string;
		image?: string | null;
		city?: string | null;
		avgRatingAsWorker?: number;
		completedTasksAsWorker?: number;
	};
	userInitials: string;
}

function WorkerProfileHeader({
	userData,
	userInitials,
}: WorkerProfileHeaderProps) {
	return (
		<div className="relative overflow-hidden rounded-none bg-primary p-8 shadow-lg">
			<div className="pointer-events-none absolute inset-0 overflow-hidden">
				<div className="-right-20 -top-20 absolute h-64 w-64 rounded-none bg-primary-foreground/10" />
				<div className="-bottom-32 -left-20 absolute h-80 w-80 rounded-none bg-primary-foreground/5" />
				<div className="absolute right-0 bottom-0 left-0 h-px bg-primary-foreground/20" />
			</div>

			<div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row sm:items-start">
				<Avatar className="h-28 w-28 rounded-none border-4 border-primary-foreground/30 shadow-2xl">
					<AvatarImage
						src={userData?.image || undefined}
						alt={userData?.name}
					/>
					<AvatarFallback className="rounded-none bg-primary-foreground/20 font-bold text-2xl text-primary-foreground">
						{userInitials}
					</AvatarFallback>
				</Avatar>

				<div className="flex-1 text-center sm:text-left">
					<h1 className="font-bold text-3xl text-primary-foreground drop-shadow-sm">
						{userData?.name || "Нэргүй хэрэглэгч"}
					</h1>
					{userData?.city && (
						<p className="mt-1 flex items-center justify-center gap-1.5 text-primary-foreground/80 sm:justify-start">
							<MapPin className="h-4 w-4" />
							{userData.city}
						</p>
					)}
					<div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
						<div className="flex items-center gap-1.5 rounded-none bg-primary-foreground/20 px-3 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
							<Star className="h-4 w-4 text-primary-foreground" />
							<span className="font-semibold">
								{userData?.avgRatingAsWorker?.toFixed(1) || "0.0"}
							</span>
							<span className="text-primary-foreground/70">үнэлгээ</span>
						</div>
						<div className="flex items-center gap-1.5 rounded-none bg-primary-foreground/20 px-3 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
							<CheckCircle2 className="h-4 w-4 text-primary-foreground" />
							<span className="font-semibold">
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

interface ProfileFormFieldsProps {
	formData: UpdateUserBody;
	userData?: {
		name?: string;
		phone?: string | null;
		city?: string | null;
		address?: string | null;
		bio?: string | null;
	};
	isEditing: boolean;
	onInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => void;
}

function ProfileFormFields({
	formData,
	userData,
	isEditing,
	onInputChange,
}: ProfileFormFieldsProps) {
	return (
		<>
			<div className="grid gap-6 sm:grid-cols-2">
				<div className="space-y-2">
					<Label htmlFor="name" className="text-foreground">
						Нэр
					</Label>
					{isEditing ? (
						<Input
							id="name"
							name="name"
							value={formData.name}
							onChange={onInputChange}
							placeholder="Таны нэр"
							className="border-border focus-visible:border-primary focus-visible:ring-primary/20"
						/>
					) : (
						<p className="rounded-sm bg-muted px-3 py-2 text-foreground">
							{userData?.name || "—"}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="phone" className="text-foreground">
						<Phone className="mr-1.5 inline h-4 w-4 text-muted-foreground" />
						Утас
					</Label>
					{isEditing ? (
						<Input
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={onInputChange}
							placeholder="Утасны дугаар"
							className="border-border focus-visible:border-primary focus-visible:ring-primary/20"
						/>
					) : (
						<p className="rounded-sm bg-muted px-3 py-2 text-foreground">
							{userData?.phone || "—"}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="city" className="text-foreground">
						<MapPin className="mr-1.5 inline h-4 w-4 text-muted-foreground" />
						Хот
					</Label>
					{isEditing ? (
						<Input
							id="city"
							name="city"
							value={formData.city}
							onChange={onInputChange}
							placeholder="Хот/Аймаг"
							className="border-border focus-visible:border-primary focus-visible:ring-primary/20"
						/>
					) : (
						<p className="rounded-sm bg-muted px-3 py-2 text-foreground">
							{userData?.city || "—"}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="address" className="text-foreground">
						Хаяг
					</Label>
					{isEditing ? (
						<Input
							id="address"
							name="address"
							value={formData.address}
							onChange={onInputChange}
							placeholder="Дэлгэрэнгүй хаяг"
							className="border-border focus-visible:border-primary focus-visible:ring-primary/20"
						/>
					) : (
						<p className="rounded-sm bg-muted px-3 py-2 text-foreground">
							{userData?.address || "—"}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="bio" className="text-foreground">
					Танилцуулга
				</Label>
				{isEditing ? (
					<Textarea
						id="bio"
						name="bio"
						value={formData.bio}
						onChange={onInputChange}
						placeholder="Өөрийгөө танилцуулна уу..."
						rows={4}
						className="resize-none border-border focus-visible:border-primary focus-visible:ring-primary/20"
					/>
				) : (
					<p className="min-h-[80px] whitespace-pre-wrap rounded-sm bg-muted px-3 py-2 text-foreground">
						{userData?.bio || "Танилцуулга оруулаагүй байна"}
					</p>
				)}
			</div>
		</>
	);
}
