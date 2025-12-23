import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat("mn-MN", {
		style: "decimal",
		maximumFractionDigits: 0,
	}).format(amount);
}

export function formatDate(date: Date | string): string {
	return new Intl.DateTimeFormat("mn-MN", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date(date));
}

export function formatDateShort(date: Date | string): string {
	return new Intl.DateTimeFormat("mn-MN", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(date));
}

export function formatTimeAgo(date: Date | string): string {
	const now = new Date();
	const diff = now.getTime() - new Date(date).getTime();
	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(hours / 24);

	if (minutes < 1) return "Саяхан";
	if (minutes < 60) return `${minutes} минутын өмнө`;
	if (hours < 24) return `${hours} цагийн өмнө`;
	if (days < 7) return `${days} өдрийн өмнө`;
	return formatDateShort(date);
}

export function getInitials(name: string | null | undefined): string {
	if (!name) return "?";
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

export function truncate(str: string, length: number): string {
	if (str.length <= length) return str;
	return `${str.slice(0, length)}...`;
}

export function formatBudget(min: number, max: number | null): string {
	const formatted = formatCurrency(min);
	if (max && max !== min) {
		return `${formatted}₮ - ${formatCurrency(max)}₮`;
	}
	return `${formatted}₮`;
}

export function formatMessageTime(date: Date | string): string {
	const now = new Date();
	const messageDate = new Date(date);
	const diffMs = now.getTime() - messageDate.getTime();
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return "Одоо";
	if (diffMins < 60) return `${diffMins}м`;
	if (diffHours < 24) return `${diffHours}ц`;
	if (diffDays < 7) return `${diffDays}ө`;

	return messageDate.toLocaleDateString("mn-MN", {
		month: "short",
		day: "numeric",
	});
}

export function formatFullTime(date: Date | string): string {
	return new Date(date).toLocaleTimeString("mn-MN", {
		hour: "2-digit",
		minute: "2-digit",
	});
}
