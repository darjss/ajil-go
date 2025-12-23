import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { ClientSidebar, MobileHeader } from "@/app/client/components/sidebar";
import { serverApi } from "@/lib/api.server";

export default async function ClientLayout({
	children,
}: { children: ReactNode }) {
	const user = await serverApi.getMe();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex min-h-screen bg-background">
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
