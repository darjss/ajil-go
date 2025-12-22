import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getInitials } from "@/lib/utils";

interface UserAvatarProps {
	name?: string | null;
	image?: string | null;
	size?: "sm" | "md" | "lg" | "xl";
	className?: string;
}

const sizeMap = {
	sm: "h-8 w-8 text-xs",
	md: "h-10 w-10 text-sm",
	lg: "h-12 w-12 text-base",
	xl: "h-16 w-16 text-lg",
};

export function UserAvatar({
	name,
	image,
	size = "md",
	className,
}: UserAvatarProps) {
	return (
		<Avatar className={cn(sizeMap[size], className)}>
			<AvatarImage src={image ?? undefined} alt={name ?? "User"} />
			<AvatarFallback className="bg-primary/10 font-medium text-primary">
				{getInitials(name)}
			</AvatarFallback>
		</Avatar>
	);
}
