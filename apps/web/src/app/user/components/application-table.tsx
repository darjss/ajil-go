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
		<div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm">
			<div className="px-6 py-4 border-b border-border flex items-center justify-between">
				<h3 className="text-lg font-semibold text-foreground">Сүүлийн өргөдлүүд</h3>
				<Link href="/user/applications" className="text-sm text-primary hover:underline">
					Өргөдлийн түүх →
				</Link>
			</div>
			<div className="divide-y divide-border">
				{rows.map((row) => (
					<div key={row.id} className="px-6 py-4 flex items-center gap-4">
						<div className={`w-12 h-12 ${row.color} rounded-lg text-white flex items-center justify-center font-bold`}>
							{row.icon}
						</div>
						<div className="flex-1 min-w-0">
							<p className="font-semibold text-foreground">{row.role}</p>
							<p className="text-sm text-muted-foreground">
								{row.company} • {row.location}
							</p>
						</div>
						<div className="text-sm text-muted-foreground w-32">{formatDate(row.date)}</div>
						<StatusBadge status={row.status} />
						<button className="text-muted-foreground hover:text-foreground text-lg">⋯</button>
					</div>
				))}
			</div>
		</div>
	);
}

function formatDate(date: string) {
	const d = new Date(date);
	return d.toLocaleDateString("mn-MN", { year: "numeric", month: "short", day: "numeric" });
}
