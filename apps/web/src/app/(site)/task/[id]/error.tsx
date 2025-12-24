"use client";

import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TaskDetailError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error("Task detail error:", error);
	}, [error]);

	return (
		<div className="min-h-screen bg-background py-8">
			<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
				<Card className="rounded-none border-destructive/20">
					<CardContent className="flex flex-col items-center p-8 text-center">
						<div className="mb-6 flex h-16 w-16 items-center justify-center rounded-none bg-destructive/10">
							<AlertTriangle className="h-8 w-8 text-destructive" />
						</div>
						<h2 className="mb-2 font-display font-semibold text-foreground text-xl">
							Даалгавар олдсонгүй
						</h2>
						<p className="mb-6 max-w-md text-muted-foreground">
							Даалгаврыг ачаалахад алдаа гарлаа. Даалгавар устгагдсан эсвэл
							хандах эрхгүй байж болно.
						</p>
						{error.digest && (
							<p className="mb-4 font-mono text-muted-foreground text-xs">
								Алдааны код: {error.digest}
							</p>
						)}
						<div className="flex gap-3">
							<Link href="/tasks">
								<Button variant="outline" className="gap-2 rounded-none">
									<ArrowLeft className="h-4 w-4" />
									Даалгаврууд руу буцах
								</Button>
							</Link>
							<Button
								onClick={reset}
								className="gap-2 rounded-none"
								variant="default"
							>
								<RefreshCw className="h-4 w-4" />
								Дахин оролдох
							</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
