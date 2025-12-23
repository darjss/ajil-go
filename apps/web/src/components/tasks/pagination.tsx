import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) {
	if (totalPages <= 1) return null;

	const pages: (number | string)[] = [];

	if (totalPages <= 7) {
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i);
		}
	} else {
		pages.push(1);
		if (currentPage > 3) pages.push("ellipsis-start");

		const start = Math.max(2, currentPage - 1);
		const end = Math.min(totalPages - 1, currentPage + 1);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (currentPage < totalPages - 2) pages.push("ellipsis-end");
		pages.push(totalPages);
	}

	return (
		<div className="flex items-center justify-center gap-2">
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
				className="border-border disabled:opacity-50"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			{pages.map((page) =>
				typeof page === "number" ? (
					<Button
						key={`page-${page}`}
						variant={page === currentPage ? "default" : "outline"}
						size="icon"
						onClick={() => onPageChange(page)}
						className={
							page === currentPage
								? "bg-primary text-primary-foreground"
								: "border-border"
						}
					>
						{page}
					</Button>
				) : (
					<span key={page} className="px-2 font-mono text-muted-foreground">
						...
					</span>
				),
			)}
			<Button
				variant="outline"
				size="icon"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				className="border-border disabled:opacity-50"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
