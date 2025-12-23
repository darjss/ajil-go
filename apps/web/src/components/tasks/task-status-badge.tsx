import { Badge } from "@/components/ui/badge";

import { getTaskStatusConfig, type TaskStatus } from "./types";

interface TaskStatusBadgeProps {
	status: TaskStatus | string;
	className?: string;
	showIcon?: boolean;
}

export function TaskStatusBadge({
	status,
	className,
	showIcon: _showIcon,
}: TaskStatusBadgeProps) {
	const config = getTaskStatusConfig(status);

	return (
		<Badge className={`${config.className} ${className || ""}`}>
			{config.label}
		</Badge>
	);
}
