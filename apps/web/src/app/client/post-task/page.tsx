"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
	ArrowLeft,
	ArrowRight,
	Calendar,
	CheckCircle2,
	Clock,
	DollarSign,
	FileText,
	Loader2,
	MapPin,
	Tag,
	Wifi,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { Controller, useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { skillsApi, tasksApi } from "@/lib/api";
import { categoryQueries, userQueries } from "@/lib/queries";
import { type CreateTaskFormData, createTaskFormSchema } from "@/lib/schemas";

function FormSkeleton() {
	const skeletons = ["skel-1", "skel-2", "skel-3", "skel-4", "skel-5"];
	return (
		<Card className="border-border dark:border-border">
			<CardHeader>
				<Skeleton className="h-7 w-40" />
			</CardHeader>
			<CardContent className="space-y-6">
				{skeletons.map((id) => (
					<div key={id} className="space-y-2">
						<Skeleton className="h-4 w-24" />
						<Skeleton className="h-10 w-full" />
					</div>
				))}
			</CardContent>
		</Card>
	);
}

function PostTaskForm() {
	const router = useRouter();

	const { data: user } = useQuery(userQueries.me());
	const { data: categoriesData } = useSuspenseQuery(
		categoryQueries.list({ limit: 50 }),
	);
	const { data: skillsData } = useQuery({
		queryKey: ["skills"],
		queryFn: () => skillsApi.list({ limit: 100 }),
	});

	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CreateTaskFormData>({
		resolver: zodResolver(createTaskFormSchema),
		defaultValues: {
			title: "",
			description: "",
			categoryId: "",
			budgetMin: undefined,
			budgetMax: undefined,
			isRemote: true,
			city: "",
			address: "",
			deadline: "",
			estimatedHours: undefined,
			skillIds: [],
		},
	});

	const isRemote = watch("isRemote");
	const selectedSkillIds = watch("skillIds");

	const createTaskMutation = useMutation({
		mutationFn: async (data: CreateTaskFormData) => {
			if (!user?.id) throw new Error("Нэвтэрнэ үү");

			return tasksApi.create({
				title: data.title,
				description: data.description,
				categoryId: data.categoryId,
				budgetMin: data.budgetMin,
				budgetMax: data.budgetMax ? Number(data.budgetMax) : undefined,
				isRemote: data.isRemote,
				city: data.isRemote ? undefined : data.city || undefined,
				address: data.isRemote ? undefined : data.address || undefined,
				deadline: data.deadline ? new Date(data.deadline) : undefined,
				estimatedHours: data.estimatedHours
					? Number(data.estimatedHours)
					: undefined,
				posterId: user.id,
				skillIds: data.skillIds.length > 0 ? data.skillIds : undefined,
			});
		},
		onSuccess: (task) => {
			router.push(`/client/tasks/${task.id}/bids`);
		},
	});

	const onSubmit = (data: CreateTaskFormData) => {
		createTaskMutation.mutate(data);
	};

	const toggleSkill = (skillId: string) => {
		const current = selectedSkillIds || [];
		const updated = current.includes(skillId)
			? current.filter((id) => id !== skillId)
			: [...current, skillId];
		setValue("skillIds", updated);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
			<Card className="border-border dark:border-border">
				<CardHeader className="border-border border-b dark:border-border">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-none bg-primary">
							<FileText className="h-5 w-5 text-primary-foreground" />
						</div>
						<div>
							<CardTitle className="font-semibold text-lg text-foreground dark:text-foreground">
								Үндсэн мэдээлэл
							</CardTitle>
							<p className="text-muted-foreground text-sm dark:text-muted-foreground">
								Даалгаврын гарчиг болон тайлбар
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6 pt-6">
					<div className="space-y-2">
						<Label
							htmlFor="title"
							className="font-medium text-foreground dark:text-foreground"
						>
							Гарчиг <span className="text-red-500">*</span>
						</Label>
						<Input
							id="title"
							placeholder="Жишээ: Байрны цэвэрлэгээ хийлгэх"
							{...register("title")}
							className={errors.title ? "border-red-500" : ""}
						/>
						{errors.title && (
							<p className="text-red-500 text-sm">{errors.title.message}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="description"
							className="font-medium text-foreground dark:text-foreground"
						>
							Тайлбар <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="description"
							placeholder="Даалгаврын дэлгэрэнгүй тайлбар бичнэ үү..."
							rows={5}
							{...register("description")}
							className={errors.description ? "border-red-500" : ""}
						/>
						{errors.description && (
							<p className="text-red-500 text-sm">
								{errors.description.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="category"
							className="font-medium text-foreground dark:text-foreground"
						>
							Ангилал <span className="text-red-500">*</span>
						</Label>
						<Controller
							name="categoryId"
							control={control}
							render={({ field }) => (
								<Select value={field.value} onValueChange={field.onChange}>
									<SelectTrigger
										className={errors.categoryId ? "border-red-500" : ""}
									>
										<SelectValue placeholder="Ангилал сонгоно уу" />
									</SelectTrigger>
									<SelectContent>
										{categoriesData?.data.map((category) => (
											<SelectItem key={category.id} value={category.id}>
												{category.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>
						{errors.categoryId && (
							<p className="text-red-500 text-sm">
								{errors.categoryId.message}
							</p>
						)}
					</div>
				</CardContent>
			</Card>

			<Card className="border-border dark:border-border">
				<CardHeader className="border-border border-b dark:border-border">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-none bg-accent">
							<DollarSign className="h-5 w-5 text-accent-foreground" />
						</div>
						<div>
							<CardTitle className="font-semibold text-lg text-foreground dark:text-foreground">
								Төсөв
							</CardTitle>
							<p className="text-muted-foreground text-sm dark:text-muted-foreground">
								Даалгаврын төсөв болон хугацаа
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6 pt-6">
					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label
								htmlFor="budgetMin"
								className="font-medium text-foreground dark:text-foreground"
							>
								Доод төсөв (₮) <span className="text-red-500">*</span>
							</Label>
							<Input
								id="budgetMin"
								type="number"
								placeholder="50,000"
								{...register("budgetMin")}
								className={errors.budgetMin ? "border-red-500" : ""}
							/>
							{errors.budgetMin && (
								<p className="text-red-500 text-sm">
									{errors.budgetMin.message}
								</p>
							)}
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="budgetMax"
								className="font-medium text-foreground dark:text-foreground"
							>
								Дээд төсөв (₮)
							</Label>
							<Input
								id="budgetMax"
								type="number"
								placeholder="100,000"
								{...register("budgetMax")}
								className={errors.budgetMax ? "border-red-500" : ""}
							/>
							{errors.budgetMax && (
								<p className="text-red-500 text-sm">
									{errors.budgetMax.message}
								</p>
							)}
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label
								htmlFor="deadline"
								className="font-medium text-foreground dark:text-foreground"
							>
								<Calendar className="mr-1 inline h-4 w-4" />
								Эцсийн хугацаа
							</Label>
							<Input
								id="deadline"
								type="date"
								{...register("deadline")}
								min={new Date().toISOString().split("T")[0]}
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="estimatedHours"
								className="font-medium text-foreground dark:text-foreground"
							>
								<Clock className="mr-1 inline h-4 w-4" />
								Тооцоолсон цаг
							</Label>
							<Input
								id="estimatedHours"
								type="number"
								placeholder="Жишээ: 3"
								{...register("estimatedHours")}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-border dark:border-border">
				<CardHeader className="border-border border-b dark:border-border">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-none bg-secondary">
							<MapPin className="h-5 w-5 text-secondary-foreground" />
						</div>
						<div>
							<CardTitle className="font-semibold text-lg text-foreground dark:text-foreground">
								Байршил
							</CardTitle>
							<p className="text-muted-foreground text-sm dark:text-muted-foreground">
								Даалгаврын гүйцэтгэх байршил
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6 pt-6">
					<div className="flex items-center gap-3 rounded-none bg-muted p-4 dark:bg-muted">
						<Controller
							name="isRemote"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="isRemote"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<div className="flex-1">
							<Label
								htmlFor="isRemote"
								className="flex cursor-pointer items-center gap-2 font-medium text-foreground dark:text-foreground"
							>
								<Wifi className="h-4 w-4 text-primary" />
								Алсаас ажиллах боломжтой
							</Label>
							<p className="text-muted-foreground text-sm dark:text-muted-foreground">
								Гүйцэтгэгч хаанаас ч гүйцэтгэх боломжтой
							</p>
						</div>
					</div>

					{!isRemote && (
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label
									htmlFor="city"
									className="font-medium text-foreground dark:text-foreground"
								>
									Хот <span className="text-red-500">*</span>
								</Label>
								<Input
									id="city"
									placeholder="Улаанбаатар"
									{...register("city")}
									className={errors.city ? "border-red-500" : ""}
								/>
								{errors.city && (
									<p className="text-red-500 text-sm">{errors.city.message}</p>
								)}
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="address"
									className="font-medium text-foreground dark:text-foreground"
								>
									Хаяг
								</Label>
								<Input
									id="address"
									placeholder="Дүүрэг, хороо, байр"
									{...register("address")}
								/>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{skillsData?.data && skillsData.data.length > 0 && (
				<Card className="border-border dark:border-border">
					<CardHeader className="border-border border-b dark:border-border">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-none bg-muted">
								<Tag className="h-5 w-5 text-muted-foreground" />
							</div>
							<div>
								<CardTitle className="font-semibold text-lg text-foreground dark:text-foreground">
									Шаардлагатай чадвар
								</CardTitle>
								<p className="text-muted-foreground text-sm dark:text-muted-foreground">
									Гүйцэтгэгчид шаардлагатай чадварууд
								</p>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-6">
						<div className="flex flex-wrap gap-2">
							{skillsData.data.map((skill) => {
								const isSelected = selectedSkillIds?.includes(skill.id);
								return (
									<Badge
										key={skill.id}
										variant={isSelected ? "default" : "outline"}
										className={`cursor-pointer transition-all ${
											isSelected
												? "bg-primary text-primary-foreground"
												: "hover:border-primary hover:text-primary"
										}`}
										onClick={() => toggleSkill(skill.id)}
									>
										{isSelected && <CheckCircle2 className="mr-1 h-3 w-3" />}
										{skill.name}
									</Badge>
								);
							})}
						</div>
					</CardContent>
				</Card>
			)}

			<div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
				<Link href="/client/dashboard">
					<Button
						type="button"
						variant="outline"
						className="w-full gap-2 sm:w-auto"
					>
						<ArrowLeft className="h-4 w-4" />
						Буцах
					</Button>
				</Link>
				<Button
					type="submit"
					disabled={createTaskMutation.isPending}
					className="w-full gap-2 bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 sm:w-auto"
				>
					{createTaskMutation.isPending ? (
						<>
							<Loader2 className="h-4 w-4 animate-spin" />
							Нийтэлж байна...
						</>
					) : (
						<>
							Даалгавар нийтлэх
							<ArrowRight className="h-4 w-4" />
						</>
					)}
				</Button>
			</div>

			{createTaskMutation.isError && (
				<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-400">
					Алдаа гарлаа: {createTaskMutation.error.message}
				</div>
			)}
		</form>
	);
}

export default function PostTaskPage() {
	return (
		<div className="p-6 lg:p-8">
			<div className="mx-auto max-w-3xl">
				<div className="mb-8">
					<Link
						href="/client/dashboard"
						className="mb-4 inline-flex items-center gap-2 font-medium text-muted-foreground text-sm transition-colors hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
					>
						<ArrowLeft className="h-4 w-4" />
						Хяналтын самбар
					</Link>
					<h1 className="font-display font-bold text-2xl text-foreground tracking-tight lg:text-3xl dark:text-foreground">
						Шинэ даалгавар <span className="text-primary">нийтлэх</span>
					</h1>
					<p className="mt-1 text-muted-foreground dark:text-muted-foreground">
						Даалгаврын мэдээллээ оруулаад гүйцэтгэгчдээс санал хүлээн аваарай
					</p>
				</div>

				<Suspense fallback={<FormSkeleton />}>
					<PostTaskForm />
				</Suspense>
			</div>
		</div>
	);
}
