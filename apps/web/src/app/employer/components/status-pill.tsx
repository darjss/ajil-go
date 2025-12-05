import type { HiringStage } from "../data";

const styles: Record<HiringStage, string> = {
	"In Review": "bg-amber-100 text-amber-700",
	Shortlisted: "bg-blue-100 text-blue-700",
	Interview: "bg-indigo-100 text-indigo-700",
	Hired: "bg-emerald-100 text-emerald-700",
	Declined: "bg-red-100 text-red-700",
};

export function StatusPill({ stage }: { stage: HiringStage }) {
	return <span className={`px-3 py-1 text-xs rounded-full font-semibold ${styles[stage]}`}>{stage}</span>;
}
