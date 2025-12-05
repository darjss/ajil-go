import type { Status } from "../data";

const statusClass: Record<Status, string> = {
	"Шалгаж байна": "bg-yellow-100 text-yellow-700",
	"Шалгарсан": "bg-blue-100 text-blue-700",
	"Татгалзсан": "bg-red-100 text-red-700",
	"Интервью": "bg-indigo-100 text-indigo-700",
	"Санал тавьсан": "bg-emerald-100 text-emerald-700",
	"Таарахгүй": "bg-gray-100 text-gray-700",
};

export function StatusBadge({ status }: { status: Status }) {
	return <span className={`text-xs font-medium px-3 py-1 rounded-full ${statusClass[status]}`}>{status}</span>;
}
