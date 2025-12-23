import { redirect } from "next/navigation";
import type React from "react";

import { serverApi } from "@/lib/api.server";
import { MobileHeader, WorkerSidebar } from "./components/sidebar";

export default async function WorkerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await serverApi.getMe();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex min-h-screen bg-background dark:bg-background">
			<WorkerSidebar />
			<div className="flex flex-1 flex-col">
				<MobileHeader />
				<main className="min-h-[calc(100vh-4rem)] flex-1 overflow-x-hidden lg:min-h-screen">
					{children}
				</main>
			</div>
		</div>
	);
}
