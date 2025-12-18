import Link from "next/link";
import type { Status } from "../data";
import { StatusBadge } from "./status-badge";

export interface ApplicationRow {
	id: number;
	company: string;
	role: string;
	location: string;
	date: string;
	status: Status;
	icon: string;
	color: string;
}

export function ApplicationTable({ rows }: { rows: ApplicationRow[] }) {
	return (
		<div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
			<div className="flex items-center justify-between border-border border-b px-6 py-4">
				<h3 className="font-semibold text-foreground text-lg">
					Сүүлийн өргөдлүүд
				</h3>
				<Link
					href="/user/applications"
					className="text-primary text-sm hover:underline"
				>
					Өргөдлийн түүх →
				</Link>
			</div>
			<div className="divide-y divide-border">
				{rows.map((row) => (
					<div key={row.id} className="flex items-center gap-4 px-6 py-4">
						<div
							className={`h-12 w-12 ${row.color} flex items-center justify-center rounded-lg font-bold text-white`}
						>
							{row.icon}
						</div>
						<div className="min-w-0 flex-1">
							<p className="font-semibold text-foreground">{row.role}</p>
							<p className="text-muted-foreground text-sm">
								{row.company} • {row.location}
							</p>
						</div>
						<div className="w-32 text-muted-foreground text-sm">
							{formatDate(row.date)}
						</div>
						<StatusBadge status={row.status} />
						<button className="text-lg text-muted-foreground hover:text-foreground">
							⋯
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

function formatDate(date: string) {
	const d = new Date(date);
	return d.toLocaleDateString("mn-MN", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}
