"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { ListTodo, Loader2, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense, useState } from "react";

import type { TaskStatus } from "@/components/tasks";
import {
	Pagination,
	TASK_TABS,
	TaskCard,
	TaskCardCompactSkeleton,
} from "@/components/tasks";
import { Button } from "@/components/ui/button";
import { taskQueries, userQueries } from "@/lib/queries";

type TabFilter = "all" | TaskStatus;

const tabs = TASK_TABS;

function TaskListSkeleton() {
	return (
		<div className="grid gap-4 md:grid-cols-2">
			<TaskCardCompactSkeleton />
			<TaskCardCompactSkeleton />
			<TaskCardCompactSkeleton />
			<TaskCardCompactSkeleton />
		</div>
	);
}

function TaskListContent({
	activeTab,
	page,
	setPage,
}: {
	activeTab: TabFilter;
	page: number;
	setPage: (page: number) => void;
}) {
	const { data: user } = useQuery(userQueries.me());

	const { data: tasksData } = useSuspenseQuery(
		taskQueries.list({
			posterId: user?.id,
			status: activeTab === "all" ? undefined : activeTab,
			page,
			limit: 10,
		}),
	);

	if (!tasksData?.data.length) {
		return (
			<div className="flex flex-col items-center justify-center rounded-none border border-border border-dashed py-16 dark:border-border">
				<ListTodo className="mb-4 h-12 w-12 text-muted-foreground dark:text-muted-foreground" />
				<h3 className="mb-2 font-semibold text-lg text-foreground dark:text-foreground">
					Даалгавар олдсонгүй
				</h3>
				<p className="mb-6 max-w-sm text-center text-muted-foreground dark:text-muted-foreground">
					{activeTab === "all"
						? "Та одоогоор даалгавар нийтлээгүй байна"
						: "Энэ ангилалд даалгавар байхгүй байна"}
				</p>
				<Link href="/client/post-task">
					<Button className="gap-2 bg-primary text-primary-foreground">
						<PlusCircle className="h-4 w-4" />
						Шинэ даалгавар нийтлэх
					</Button>
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="grid gap-4 md:grid-cols-2">
				{tasksData.data.map((task) => (
					<TaskCard key={task.id} task={task} variant="client" />
				))}
			</div>
			<Pagination
				currentPage={page}
				totalPages={tasksData.meta.totalPages}
				onPageChange={setPage}
			/>
		</>
	);
}

export default function ClientTasksPage() {
	const [activeTab, setActiveTab] = useState<TabFilter>("all");
	const [page, setPage] = useState(1);
	const { data: user } = useQuery(userQueries.me());

	const handleTabChange = (tab: TabFilter) => {
		setActiveTab(tab);
		setPage(1);
	};

	return (
		<div className="p-6 lg:p-8">
			<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="font-display font-bold text-2xl text-foreground tracking-tight lg:text-3xl dark:text-foreground">
						Миний даалгаврууд
					</h1>
					<p className="mt-1 text-muted-foreground dark:text-muted-foreground">
						Таны нийтэлсэн бүх даалгаврууд
					</p>
				</div>
				<Link href="/client/post-task">
					<Button className="gap-2 bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90">
						<PlusCircle className="h-4 w-4" />
						Даалгавар нийтлэх
					</Button>
				</Link>
			</div>

			<div className="mb-6 overflow-x-auto">
				<div className="flex gap-1 rounded-none bg-muted p-1 dark:bg-muted">
					{tabs.map((tab) => (
						<button
							key={tab.value}
							type="button"
							onClick={() => handleTabChange(tab.value)}
							className={`whitespace-nowrap rounded-lg px-4 py-2 font-medium text-sm transition-all ${
								activeTab === tab.value
									? "bg-background text-foreground shadow-sm dark:bg-background dark:text-foreground"
									: "text-muted-foreground hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground"
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<Suspense fallback={<TaskListSkeleton />}>
				{user ? (
					<TaskListContent
						activeTab={activeTab}
						page={page}
						setPage={setPage}
					/>
				) : (
					<div className="flex items-center justify-center py-20">
						<Loader2 className="h-8 w-8 animate-spin text-primary" />
					</div>
				)}
			</Suspense>
		</div>
	);
}
