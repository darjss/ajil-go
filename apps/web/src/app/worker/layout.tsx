import type React from "react";
import { WorkerSidebar } from "./components/sidebar";

export default function WorkerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
			<div className="flex">
				<WorkerSidebar />
				<main className="min-h-screen flex-1">{children}</main>
			</div>
		</div>
	);
}
