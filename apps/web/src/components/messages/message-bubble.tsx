import type { MessageApiResponse } from "@ajil-go/contract";
import { Check, CheckCheck } from "lucide-react";
import { formatFullTime } from "@/lib/utils";

interface MessageBubbleProps {
	message: MessageApiResponse;
	isOwn: boolean;
	showTime: boolean;
}

export function MessageBubble({
	message,
	isOwn,
	showTime,
}: MessageBubbleProps) {
	return (
		<div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
			<div
				className={`group relative max-w-[75%] ${isOwn ? "order-2" : "order-1"}`}
			>
				<div
					className={`rounded-none px-4 py-2.5 ${
						isOwn
							? "bg-primary text-primary-foreground shadow-lg"
							: "bg-card text-foreground shadow-md ring-1 ring-border"
					}`}
				>
					<p className="text-sm leading-relaxed">{message.content}</p>
				</div>
				{showTime && (
					<div
						className={`mt-1 flex items-center gap-1.5 ${isOwn ? "justify-end" : "justify-start"}`}
					>
						<span className="font-mono text-[11px] text-muted-foreground">
							{formatFullTime(message.createdAt)}
						</span>
						{isOwn && (
							<span className="text-primary">
								{message.isRead ? (
									<CheckCheck className="h-3.5 w-3.5" />
								) : (
									<Check className="h-3.5 w-3.5" />
								)}
							</span>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
