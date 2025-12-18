import type React from "react";
import { UserSidebar } from "@/app/user/components/sidebar";

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-slate-50">
			<div className="flex">
				<UserSidebar />
				<main className="min-h-screen flex-1">{children}</main>
			</div>
		</div>
	);
}
