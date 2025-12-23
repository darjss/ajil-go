import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { serverApi } from "@/lib/api.server";

export default async function DashboardLayout({
	children,
}: { children: ReactNode }) {
	const user = await serverApi.getMe();

	if (!user) {
		redirect("/login");
	}

	return <>{children}</>;
}
