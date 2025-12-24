import { ChevronLeft, Clock } from "lucide-react";
import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Conversation } from "./types";

interface ChatHeaderProps {
	conversation: Conversation;
	defaultOtherUserLabel?: string;
	onBack: () => void;
	extraActions?: ReactNode;
}

export function ChatHeader({
	conversation,
	defaultOtherUserLabel = "Хэрэглэгч",
	onBack,
	extraActions,
}: ChatHeaderProps) {
	const otherUser = conversation.otherUser;
	const task = conversation.task;

	return (
		<div className="flex shrink-0 items-center gap-3 border-border border-b bg-background/80 px-4 py-3 backdrop-blur-sm">
			<Button
				variant="ghost"
				size="icon"
				className="lg:hidden"
				onClick={onBack}
			>
				<ChevronLeft className="h-5 w-5" />
			</Button>
			<Avatar className="h-10 w-10 ring-2 ring-primary/20">
				<AvatarImage src={otherUser?.image || undefined} />
				<AvatarFallback className="bg-primary font-semibold text-primary-foreground">
					{otherUser?.name?.charAt(0) || "?"}
				</AvatarFallback>
			</Avatar>
			<div className="min-w-0 flex-1">
				<p className="truncate font-semibold text-foreground">
					{otherUser?.name || defaultOtherUserLabel}
				</p>
				<p className="truncate text-muted-foreground text-xs">{task?.title}</p>
			</div>
			<div className="flex items-center gap-2">
				{extraActions}
				<Badge
					variant="outline"
					className="shrink-0 border-primary/30 text-primary"
				>
					<Clock className="mr-1 h-3 w-3" />
					{task?.status === "IN_PROGRESS"
						? "Гүйцэтгэж буй"
						: task?.status === "COMPLETED"
							? "Дууссан"
							: "Идэвхтэй"}
				</Badge>
			</div>
		</div>
	);
}
