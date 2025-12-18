"use client";

import { useMemo, useState } from "react";
import { messagesByThread, messageThreads } from "../data";

export function MessagesPanel() {
	const [activeId, setActiveId] = useState(messageThreads[0]?.id ?? "");
	const activeMessages = useMemo(
		() => messagesByThread[activeId] ?? [],
		[activeId],
	);
	const activeThread = useMemo(
		() => messageThreads.find((t) => t.id === activeId),
		[activeId],
	);

	return (
		<div className="grid overflow-hidden rounded-lg border border-border bg-white shadow-sm lg:grid-cols-[320px_1fr]">
			<div className="border-border border-r">
				<div className="p-4">
					<input
						className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm"
						placeholder="Зурвас хайх"
					/>
				</div>
				<div className="max-h-[600px] divide-y divide-border overflow-y-auto">
					{messageThreads.map((thread) => {
						const active = thread.id === activeId;
						return (
							<button
								key={thread.id}
								onClick={() => setActiveId(thread.id)}
								className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
									active ? "bg-primary/10" : "hover:bg-muted"
								}`}
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
									{thread.avatar}
								</div>
								<div className="min-w-0 flex-1">
									<div className="flex items-center justify-between gap-2">
										<p className="truncate font-semibold text-foreground">
											{thread.name}
										</p>
										<span className="text-[11px] text-muted-foreground">
											{thread.time}
										</span>
									</div>
									<p className="truncate text-muted-foreground text-xs">
										{thread.role}
									</p>
									<p className="mt-1 truncate text-foreground text-sm">
										{thread.snippet}
										{thread.unread ? (
											<span className="ml-2 text-primary">•</span>
										) : null}
									</p>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			<div className="flex min-h-[500px] flex-col">
				<div className="flex items-center justify-between border-border border-b p-4">
					<div>
						<p className="text-muted-foreground text-sm">
							{activeThread?.role}
						</p>
						<h3 className="font-semibold text-foreground text-lg">
							{activeThread?.name}
						</h3>
					</div>
					<button className="text-lg text-muted-foreground hover:text-foreground">
						⋯
					</button>
				</div>
				<div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 px-6 py-4">
					{activeMessages.map((msg, idx) => (
						<div
							key={idx}
							className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
						>
							<div
								className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
									msg.from === "me"
										? "bg-primary text-white"
										: "border border-border bg-white text-foreground"
								}`}
							>
								<p>{msg.text}</p>
								<p
									className={`mt-1 text-[11px] ${msg.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
								>
									{msg.time}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="flex items-center gap-3 border-border border-t p-4">
					<input
						className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-sm"
						placeholder="Зурвас бичих..."
					/>
					<button className="rounded-lg bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90">
						Илгээх
					</button>
				</div>
			</div>
		</div>
	);
}
