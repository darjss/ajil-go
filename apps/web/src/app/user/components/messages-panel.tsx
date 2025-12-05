"use client";

import { useMemo, useState } from "react";
import { messageThreads, messagesByThread } from "../data";

export function MessagesPanel() {
	const [activeId, setActiveId] = useState(messageThreads[0]?.id ?? "");
	const activeMessages = useMemo(() => messagesByThread[activeId] ?? [], [activeId]);
	const activeThread = useMemo(() => messageThreads.find((t) => t.id === activeId), [activeId]);

	return (
		<div className="grid lg:grid-cols-[320px_1fr] bg-white border border-border rounded-lg shadow-sm overflow-hidden">
			<div className="border-r border-border">
				<div className="p-4">
					<input
						className="w-full rounded-lg border border-border px-3 py-2 text-sm bg-card"
						placeholder="Зурвас хайх"
					/>
				</div>
				<div className="divide-y divide-border max-h-[600px] overflow-y-auto">
					{messageThreads.map((thread) => {
						const active = thread.id === activeId;
						return (
							<button
								key={thread.id}
								onClick={() => setActiveId(thread.id)}
								className={`w-full text-left px-4 py-3 flex items-start gap-3 transition-colors ${
									active ? "bg-primary/10" : "hover:bg-muted"
								}`}
							>
								<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{thread.avatar}</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between gap-2">
										<p className="font-semibold text-foreground truncate">{thread.name}</p>
										<span className="text-[11px] text-muted-foreground">{thread.time}</span>
									</div>
									<p className="text-xs text-muted-foreground truncate">{thread.role}</p>
									<p className="text-sm text-foreground truncate mt-1">
										{thread.snippet}
										{thread.unread ? <span className="text-primary ml-2">•</span> : null}
									</p>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			<div className="flex flex-col min-h-[500px]">
				<div className="p-4 border-b border-border flex items-center justify-between">
					<div>
						<p className="text-sm text-muted-foreground">{activeThread?.role}</p>
						<h3 className="text-lg font-semibold text-foreground">{activeThread?.name}</h3>
					</div>
					<button className="text-muted-foreground hover:text-foreground text-lg">⋯</button>
				</div>
				<div className="flex-1 bg-slate-50 px-6 py-4 space-y-4 overflow-y-auto">
					{activeMessages.map((msg, idx) => (
						<div key={idx} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
							<div
								className={`max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
									msg.from === "me" ? "bg-primary text-white" : "bg-white border border-border text-foreground"
								}`}
							>
								<p>{msg.text}</p>
								<p className={`text-[11px] mt-1 ${msg.from === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
									{msg.time}
								</p>
							</div>
						</div>
					))}
				</div>
				<div className="p-4 border-t border-border flex items-center gap-3">
					<input
						className="flex-1 rounded-lg border border-border px-4 py-3 text-sm bg-card"
						placeholder="Зурвас бичих..."
					/>
					<button className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-primary/90">Илгээх</button>
				</div>
			</div>
		</div>
	);
}
