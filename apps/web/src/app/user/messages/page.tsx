"use client";

import { Button } from "@/components/ui/button";
import { MessagesPanel } from "../components/messages-panel";

export default function MessagesPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-border border-b bg-white">
				<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
					<h1 className="font-bold text-2xl text-foreground">Мессежүүд</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="mx-auto max-w-6xl space-y-4 px-6 py-8">
				<p className="text-muted-foreground text-sm">
					Рекрутерүүдтэй хийсэн сүүлийн харилцаагаа эндээс хараарай.
				</p>
				<MessagesPanel />
			</div>
		</div>
	);
}
