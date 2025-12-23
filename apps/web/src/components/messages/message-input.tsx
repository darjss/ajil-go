"use client";

import { Loader2, Send } from "lucide-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
	value: string;
	onChange: (value: string) => void;
	onSend: () => void;
	isPending: boolean;
}

export function MessageInput({
	value,
	onChange,
	onSend,
	isPending,
}: MessageInputProps) {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				onSend();
			}
		},
		[onSend],
	);

	return (
		<div className="shrink-0 border-border border-t bg-background/80 p-4 backdrop-blur-sm">
			<div className="flex items-end gap-3">
				<div className="relative flex-1">
					<Input
						value={value}
						onChange={(e) => onChange(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Мессеж бичих..."
						className="border-border bg-background pr-4"
						disabled={isPending}
					/>
				</div>
				<Button
					onClick={onSend}
					disabled={!value.trim() || isPending}
					className="shrink-0 bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90"
				>
					{isPending ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : (
						<Send className="h-4 w-4" />
					)}
					<span className="ml-2 hidden sm:inline">Илгээх</span>
				</Button>
			</div>
		</div>
	);
}
