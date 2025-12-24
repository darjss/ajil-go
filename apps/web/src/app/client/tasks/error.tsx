"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ClientTasksError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Client tasks error:", error);
	}, [error]);

	return (
		<div className="flex min-h-[60vh] items-center justify-center p-6 lg:p-8">
			<Card className="w-full max-w-md rounded-none border-destructive/20">
				<CardContent className="flex flex-col items-center p-8 text-center">
					<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-destructive/10">
						<AlertTriangle className="h-8 w-8 text-destructive" />
					</div>
					<h2 className="mb-2 font-display font-semibold text-foreground text-xl">
						Алдаа гарлаа
					</h2>
					<p className="mb-6 max-w-md text-muted-foreground">
						Таны даалгавруудыг ачаалахад алдаа гарлаа. Дахин оролдоно уу.
					</p>
					{error.digest && (
						<p className="mb-4 font-mono text-muted-foreground text-xs">
							Алдааны код: {error.digest}
						</p>
					)}
					<Button
						onClick={reset}
						className="gap-2 rounded-none"
						variant="default"
					>
						<RefreshCw className="h-4 w-4" />
						Дахин оролдох
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
