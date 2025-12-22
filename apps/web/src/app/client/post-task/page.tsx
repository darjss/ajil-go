"use client";

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
import { Suspense, useState } from "react";

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

interface TaskFormData {
	title: string;
	description: string;
	categoryId: string;
	budgetMin: number | undefined;
	budgetMax: number | undefined;
	isRemote: boolean;
	city: string;
	address: string;
	deadline: string;
	estimatedHours: number | undefined;
	skillIds: string[];
}

const initialFormData: TaskFormData = {
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
};

function FormSkeleton() {
	const skeletons = ["skel-1", "skel-2", "skel-3", "skel-4", "skel-5"];
	return (
		<Card className="border-slate-200/70 dark:border-slate-800">
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
	const [formData, setFormData] = useState<TaskFormData>(initialFormData);
	const [errors, setErrors] = useState<
		Partial<Record<keyof TaskFormData, string>>
	>({});

	const { data: user } = useQuery(userQueries.me());
	const { data: categoriesData } = useSuspenseQuery(
		categoryQueries.list({ limit: 50 }),
	);
	const { data: skillsData } = useQuery({
		queryKey: ["skills"],
		queryFn: () => skillsApi.list({ limit: 100 }),
	});

	const createTaskMutation = useMutation({
		mutationFn: async (data: TaskFormData) => {
			if (!user?.id) throw new Error("Нэвтэрнэ үү");

			return tasksApi.create({
				title: data.title,
				description: data.description,
				categoryId: data.categoryId,
				budgetMin: data.budgetMin || 0,
				budgetMax: data.budgetMax || undefined,
				isRemote: data.isRemote,
				city: data.isRemote ? undefined : data.city || undefined,
				address: data.isRemote ? undefined : data.address || undefined,
				deadline: data.deadline ? new Date(data.deadline) : undefined,
				estimatedHours: data.estimatedHours || undefined,
				posterId: user.id,
				skillIds: data.skillIds.length > 0 ? data.skillIds : undefined,
			});
		},
		onSuccess: (task) => {
			router.push(`/client/tasks/${task.id}/bids`);
		},
	});

	const validateForm = (): boolean => {
		const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

		if (!formData.title.trim()) {
			newErrors.title = "Гарчиг оруулна уу";
		} else if (formData.title.length < 10) {
			newErrors.title = "Гарчиг хамгийн багадаа 10 тэмдэгт байх ёстой";
		}

		if (!formData.description.trim()) {
			newErrors.description = "Тайлбар оруулна уу";
		} else if (formData.description.length < 30) {
			newErrors.description = "Тайлбар хамгийн багадаа 30 тэмдэгт байх ёстой";
		}

		if (!formData.categoryId) {
			newErrors.categoryId = "Ангилал сонгоно уу";
		}

		if (!formData.budgetMin || formData.budgetMin <= 0) {
			newErrors.budgetMin = "Төсөв оруулна уу";
		}

		if (
			formData.budgetMax &&
			formData.budgetMin &&
			formData.budgetMax < formData.budgetMin
		) {
			newErrors.budgetMax = "Дээд төсөв доод төсвөөс их байх ёстой";
		}

		if (!formData.isRemote && !formData.city.trim()) {
			newErrors.city = "Хот оруулна уу";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;
		createTaskMutation.mutate(formData);
	};

	const handleChange = (
		field: keyof TaskFormData,
		value: TaskFormData[keyof TaskFormData],
	) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const toggleSkill = (skillId: string) => {
		setFormData((prev) => ({
			...prev,
			skillIds: prev.skillIds.includes(skillId)
				? prev.skillIds.filter((id) => id !== skillId)
				: [...prev.skillIds, skillId],
		}));
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<Card className="border-slate-200/70 dark:border-slate-800">
				<CardHeader className="border-slate-100 border-b dark:border-slate-800">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
							<FileText className="h-5 w-5 text-white" />
						</div>
						<div>
							<CardTitle className="font-semibold text-lg text-slate-900 dark:text-white">
								Үндсэн мэдээлэл
							</CardTitle>
							<p className="text-slate-500 text-sm dark:text-slate-400">
								Даалгаврын гарчиг болон тайлбар
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6 pt-6">
					<div className="space-y-2">
						<Label
							htmlFor="title"
							className="font-medium text-slate-700 dark:text-slate-300"
						>
							Гарчиг <span className="text-red-500">*</span>
						</Label>
						<Input
							id="title"
							placeholder="Жишээ: Байрны цэвэрлэгээ хийлгэх"
							value={formData.title}
							onChange={(e) => handleChange("title", e.target.value)}
							className={errors.title ? "border-red-500" : ""}
						/>
						{errors.title && (
							<p className="text-red-500 text-sm">{errors.title}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="description"
							className="font-medium text-slate-700 dark:text-slate-300"
						>
							Тайлбар <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="description"
							placeholder="Даалгаврын дэлгэрэнгүй тайлбар бичнэ үү..."
							rows={5}
							value={formData.description}
							onChange={(e) => handleChange("description", e.target.value)}
							className={errors.description ? "border-red-500" : ""}
						/>
						{errors.description && (
							<p className="text-red-500 text-sm">{errors.description}</p>
						)}
					</div>

					<div className="space-y-2">
						<Label
							htmlFor="category"
							className="font-medium text-slate-700 dark:text-slate-300"
						>
							Ангилал <span className="text-red-500">*</span>
						</Label>
						<Select
							value={formData.categoryId}
							onValueChange={(value) => handleChange("categoryId", value)}
						>
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
						{errors.categoryId && (
							<p className="text-red-500 text-sm">{errors.categoryId}</p>
						)}
					</div>
				</CardContent>
			</Card>

			<Card className="border-slate-200/70 dark:border-slate-800">
				<CardHeader className="border-slate-100 border-b dark:border-slate-800">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
							<DollarSign className="h-5 w-5 text-white" />
						</div>
						<div>
							<CardTitle className="font-semibold text-lg text-slate-900 dark:text-white">
								Төсөв
							</CardTitle>
							<p className="text-slate-500 text-sm dark:text-slate-400">
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
								className="font-medium text-slate-700 dark:text-slate-300"
							>
								Доод төсөв (₮) <span className="text-red-500">*</span>
							</Label>
							<Input
								id="budgetMin"
								type="number"
								placeholder="50,000"
								value={formData.budgetMin || ""}
								onChange={(e) =>
									handleChange(
										"budgetMin",
										e.target.value ? Number(e.target.value) : undefined,
									)
								}
								className={errors.budgetMin ? "border-red-500" : ""}
							/>
							{errors.budgetMin && (
								<p className="text-red-500 text-sm">{errors.budgetMin}</p>
							)}
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="budgetMax"
								className="font-medium text-slate-700 dark:text-slate-300"
							>
								Дээд төсөв (₮)
							</Label>
							<Input
								id="budgetMax"
								type="number"
								placeholder="100,000"
								value={formData.budgetMax || ""}
								onChange={(e) =>
									handleChange(
										"budgetMax",
										e.target.value ? Number(e.target.value) : undefined,
									)
								}
								className={errors.budgetMax ? "border-red-500" : ""}
							/>
							{errors.budgetMax && (
								<p className="text-red-500 text-sm">{errors.budgetMax}</p>
							)}
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2">
						<div className="space-y-2">
							<Label
								htmlFor="deadline"
								className="font-medium text-slate-700 dark:text-slate-300"
							>
								<Calendar className="mr-1 inline h-4 w-4" />
								Эцсийн хугацаа
							</Label>
							<Input
								id="deadline"
								type="date"
								value={formData.deadline}
								onChange={(e) => handleChange("deadline", e.target.value)}
								min={new Date().toISOString().split("T")[0]}
							/>
						</div>
						<div className="space-y-2">
							<Label
								htmlFor="estimatedHours"
								className="font-medium text-slate-700 dark:text-slate-300"
							>
								<Clock className="mr-1 inline h-4 w-4" />
								Тооцоолсон цаг
							</Label>
							<Input
								id="estimatedHours"
								type="number"
								placeholder="Жишээ: 3"
								value={formData.estimatedHours || ""}
								onChange={(e) =>
									handleChange(
										"estimatedHours",
										e.target.value ? Number(e.target.value) : undefined,
									)
								}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card className="border-slate-200/70 dark:border-slate-800">
				<CardHeader className="border-slate-100 border-b dark:border-slate-800">
					<div className="flex items-center gap-3">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-500">
							<MapPin className="h-5 w-5 text-white" />
						</div>
						<div>
							<CardTitle className="font-semibold text-lg text-slate-900 dark:text-white">
								Байршил
							</CardTitle>
							<p className="text-slate-500 text-sm dark:text-slate-400">
								Даалгаврын гүйцэтгэх байршил
							</p>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6 pt-6">
					<div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
						<Checkbox
							id="isRemote"
							checked={formData.isRemote}
							onCheckedChange={(checked) => handleChange("isRemote", !!checked)}
						/>
						<div className="flex-1">
							<Label
								htmlFor="isRemote"
								className="flex cursor-pointer items-center gap-2 font-medium text-slate-900 dark:text-white"
							>
								<Wifi className="h-4 w-4 text-emerald-500" />
								Алсаас ажиллах боломжтой
							</Label>
							<p className="text-slate-500 text-sm dark:text-slate-400">
								Гүйцэтгэгч хаанаас ч гүйцэтгэх боломжтой
							</p>
						</div>
					</div>

					{!formData.isRemote && (
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label
									htmlFor="city"
									className="font-medium text-slate-700 dark:text-slate-300"
								>
									Хот <span className="text-red-500">*</span>
								</Label>
								<Input
									id="city"
									placeholder="Улаанбаатар"
									value={formData.city}
									onChange={(e) => handleChange("city", e.target.value)}
									className={errors.city ? "border-red-500" : ""}
								/>
								{errors.city && (
									<p className="text-red-500 text-sm">{errors.city}</p>
								)}
							</div>
							<div className="space-y-2">
								<Label
									htmlFor="address"
									className="font-medium text-slate-700 dark:text-slate-300"
								>
									Хаяг
								</Label>
								<Input
									id="address"
									placeholder="Дүүрэг, хороо, байр"
									value={formData.address}
									onChange={(e) => handleChange("address", e.target.value)}
								/>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{skillsData?.data && skillsData.data.length > 0 && (
				<Card className="border-slate-200/70 dark:border-slate-800">
					<CardHeader className="border-slate-100 border-b dark:border-slate-800">
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
								<Tag className="h-5 w-5 text-white" />
							</div>
							<div>
								<CardTitle className="font-semibold text-lg text-slate-900 dark:text-white">
									Шаардлагатай чадвар
								</CardTitle>
								<p className="text-slate-500 text-sm dark:text-slate-400">
									Гүйцэтгэгчид шаардлагатай чадварууд
								</p>
							</div>
						</div>
					</CardHeader>
					<CardContent className="pt-6">
						<div className="flex flex-wrap gap-2">
							{skillsData.data.map((skill) => {
								const isSelected = formData.skillIds.includes(skill.id);
								return (
									<Badge
										key={skill.id}
										variant={isSelected ? "default" : "outline"}
										className={`cursor-pointer transition-all ${
											isSelected
												? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
												: "hover:border-emerald-500 hover:text-emerald-600"
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
					className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/20 shadow-lg transition-all hover:shadow-emerald-500/30 hover:shadow-xl sm:w-auto"
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
						className="mb-4 inline-flex items-center gap-2 font-medium text-slate-500 text-sm transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
					>
						<ArrowLeft className="h-4 w-4" />
						Хяналтын самбар
					</Link>
					<h1 className="font-bold text-2xl text-slate-900 tracking-tight lg:text-3xl dark:text-white">
						Шинэ даалгавар{" "}
						<span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
							нийтлэх
						</span>
					</h1>
					<p className="mt-1 text-slate-500 dark:text-slate-400">
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
