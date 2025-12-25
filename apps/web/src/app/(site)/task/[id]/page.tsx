import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Suspense } from "react";

import { serverApi } from "@/lib/api.server";
import { getQueryClient } from "@/lib/get-query-client";
import { taskQueries } from "@/lib/queries";
import { formatBudget } from "@/lib/utils";

import { TaskDetailContent, TaskDetailSkeleton } from "./task-detail-content";

interface TaskDetailPageProps {
	params: Promise<{ id: string }>;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({
	params,
}: TaskDetailPageProps): Promise<Metadata> {
	const { id } = await params;

	try {
		const task = await serverApi.getTask(id);

		if (!task) {
			return {
				title: "Даалгавар олдсонгүй | Ажил-GO",
				description: "Энэ даалгавар устсан эсвэл байхгүй байна",
			};
		}

		const budget = formatBudget(task.budgetMin, task.budgetMax);
		const location = task.isRemote
			? "Алсаас ажиллах боломжтой"
			: task.city || "Газар дээр";

		return {
			title: `${task.title} | Ажил-GO`,
			description:
				task.description?.slice(0, 160) || `${task.title} - ${budget}`,
			openGraph: {
				title: task.title,
				description:
					task.description?.slice(0, 160) || `${task.title} - ${budget}`,
				type: "article",
				siteName: "Ажил-GO",
			},
			twitter: {
				card: "summary",
				title: task.title,
				description:
					task.description?.slice(0, 160) || `${task.title} - ${budget}`,
			},
			other: {
				"task:budget": budget,
				"task:location": location,
				"task:category": task.category?.name || "",
			},
		};
	} catch {
		return {
			title: "Даалгавар олдсонгүй | Ажил-GO",
			description: "Энэ даалгавар устсан эсвэл байхгүй байна",
		};
	}
}

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
	const { id } = await params;
	const queryClient = getQueryClient();

	// Prefetch task data on the server
	await queryClient.prefetchQuery(taskQueries.detail(id));

	return (
		<main className="min-h-screen bg-background">
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<TaskDetailSkeleton />}>
					<TaskDetailContent taskId={id} />
				</Suspense>
			</HydrationBoundary>
		</main>
	);
}
