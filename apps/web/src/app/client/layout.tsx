"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect } from "react";

import { ClientSidebar, MobileHeader } from "@/app/client/components/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { userQueries } from "@/lib/queries";

function LoadingState() {
	return (
		<div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
			<aside className="hidden w-72 flex-col border-slate-200/70 border-r bg-white lg:flex dark:border-slate-800 dark:bg-slate-900">
				<div className="border-slate-200/70 border-b p-6 dark:border-slate-800">
					<Skeleton className="h-9 w-32" />
				</div>
				<div className="flex-1 p-4">
					<div className="space-y-2">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
				<div className="border-slate-200/70 border-t p-4 dark:border-slate-800">
					<Skeleton className="h-16 w-full" />
				</div>
			</aside>
			<div className="flex flex-1 flex-col">
				<div className="flex h-16 items-center border-slate-200/70 border-b px-4 lg:hidden dark:border-slate-800">
					<Skeleton className="h-8 w-8 rounded-lg" />
					<Skeleton className="ml-3 h-6 w-32" />
				</div>
				<main className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center lg:min-h-screen">
					<div className="flex flex-col items-center gap-4">
						<div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
						<p className="text-slate-500">Уншиж байна...</p>
					</div>
				</main>
			</div>
		</div>
	);
}

export default function ClientLayout({ children }: { children: ReactNode }) {
	const router = useRouter();
	const { data: user, isLoading, error } = useQuery(userQueries.me());

	useEffect(() => {
		if (!isLoading && (error || !user)) {
			router.push("/login");
		}
	}, [isLoading, error, user, router]);

	if (isLoading) {
		return <LoadingState />;
	}

	if (!user) {
		return <LoadingState />;
	}

	return (
		<div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
			<ClientSidebar />
			<div className="flex flex-1 flex-col">
				<MobileHeader />
				<main className="min-h-[calc(100vh-4rem)] flex-1 overflow-x-hidden lg:min-h-screen">
					{children}
				</main>
			</div>
		</div>
	);
}
