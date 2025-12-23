import { Check, CheckCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatMessageTime } from "@/lib/utils";
import type { Conversation } from "./types";

interface ConversationItemProps {
	conversation: Conversation;
	isActive: boolean;
	currentUserId: string;
	defaultOtherUserLabel?: string;
	onClick: () => void;
}

export function ConversationItem({
	conversation,
	isActive,
	currentUserId,
	defaultOtherUserLabel = "Хэрэглэгч",
	onClick,
}: ConversationItemProps) {
	const isMyMessage = conversation.lastMessage?.senderId === currentUserId;
	const otherUser = conversation.otherUser;

	return (
		<button
			type="button"
			onClick={onClick}
			className={`group flex w-full items-start gap-3 rounded-none p-3 text-left transition-all duration-200 ${
				isActive ? "bg-primary/10 shadow-sm" : "hover:bg-muted"
			}`}
		>
			<div className="relative">
				<Avatar className="h-12 w-12 shadow-sm ring-2 ring-background">
					<AvatarImage src={otherUser?.image || undefined} />
					<AvatarFallback className="bg-primary font-semibold text-primary-foreground">
						{otherUser?.name?.charAt(0) || "?"}
					</AvatarFallback>
				</Avatar>
				{conversation.unreadCount > 0 && (
					<span className="-right-1 -top-1 absolute flex h-5 min-w-5 items-center justify-center rounded-none bg-primary px-1.5 font-mono font-bold text-[10px] text-primary-foreground shadow-lg">
						{conversation.unreadCount > 9 ? "9+" : conversation.unreadCount}
					</span>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="mb-0.5 flex items-center justify-between gap-2">
					<p
						className={`truncate font-semibold text-sm ${isActive ? "text-primary" : "text-foreground"}`}
					>
						{otherUser?.name || defaultOtherUserLabel}
					</p>
					<span className="shrink-0 font-mono text-[11px] text-muted-foreground">
						{conversation.lastMessage
							? formatMessageTime(conversation.lastMessage.createdAt)
							: ""}
					</span>
				</div>
				<p className="mb-1 truncate text-muted-foreground text-xs">
					{conversation.task.title}
				</p>
				{conversation.lastMessage && (
					<div className="flex items-center gap-1.5">
						{isMyMessage && (
							<span className="shrink-0 text-primary">
								{conversation.lastMessage.isRead ? (
									<CheckCheck className="h-3.5 w-3.5" />
								) : (
									<Check className="h-3.5 w-3.5" />
								)}
							</span>
						)}
						<p
							className={`truncate text-sm ${
								conversation.unreadCount > 0 && !isMyMessage
									? "font-medium text-foreground"
									: "text-muted-foreground"
							}`}
						>
							{conversation.lastMessage.content}
						</p>
					</div>
				)}
			</div>
		</button>
	);
}
