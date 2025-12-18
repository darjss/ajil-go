import type React from "react";
import { EmployerSidebar } from "./components/sidebar";

export default function EmployerLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-slate-50">
			<div className="flex">
				<EmployerSidebar />
				<main className="min-h-screen flex-1">{children}</main>
			</div>
		</div>
	);
}
