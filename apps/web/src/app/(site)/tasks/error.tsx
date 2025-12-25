"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TasksError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error("Tasks page error:", error);
	}, [error]);

	return (
		<div className="min-h-screen bg-background">
			<div className="mx-auto flex max-w-2xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
				<Card className="w-full rounded-none border-destructive/20">
					<CardContent className="flex flex-col items-center p-8 text-center">
						<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-destructive/10">
							<AlertTriangle className="h-8 w-8 text-destructive" />
						</div>
						<h2 className="mb-2 font-display font-semibold text-foreground text-xl">
							Алдаа гарлаа
						</h2>
						<p className="mb-6 max-w-md text-muted-foreground">
							Даалгавруудыг ачаалахад алдаа гарлаа. Дахин оролдоно уу.
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
		</div>
	);
}
