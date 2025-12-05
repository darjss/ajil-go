"use client";

import { Button } from "@/components/ui/button";
import { MessagesPanel } from "../components/messages-panel";

export default function EmployerMessagesPage() {
	return (
		<div className="min-h-screen bg-slate-50">
			<header className="border-b border-border bg-white">
				<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
					<h1 className="text-2xl font-bold text-foreground">Messages</h1>
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
				</div>
			</header>

			<div className="max-w-6xl mx-auto px-6 py-8 space-y-4">
				<p className="text-sm text-muted-foreground">Candidate conversations</p>
				<MessagesPanel />
			</div>
		</div>
	);
}
