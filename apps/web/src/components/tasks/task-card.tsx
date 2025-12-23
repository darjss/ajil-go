import {
	ArrowRight,
	Calendar,
	Edit2,
	Eye,
	MapPin,
	MoreVertical,
	Trash2,
	Users,
	Wifi,
	XCircle,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatBudget, formatDateShort, formatTimeAgo } from "@/lib/utils";

import { TaskStatusBadge } from "./task-status-badge";
import type { TaskApiResponse, TaskCardVariant } from "./types";

interface TaskCardProps {
	task: TaskApiResponse;
	variant?: TaskCardVariant;
}

export function TaskCard({ task, variant = "default" }: TaskCardProps) {
	if (variant === "client") {
		return <ClientTaskCard task={task} />;
	}

	return <DefaultTaskCard task={task} />;
}

function DefaultTaskCard({ task }: { task: TaskApiResponse }) {
	const bidCount = task._count?.bids || 0;

	return (
		<Card className="group h-full overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-primary hover:shadow-md">
			<CardContent className="flex h-full flex-col p-6">
				<div className="mb-4 flex flex-wrap items-start gap-2">
					{task.category && (
						<Badge
							variant="secondary"
							className="shrink-0 rounded-sm font-mono text-xs"
						>
							{task.category.name}
						</Badge>
					)}
					<Badge
						variant="outline"
						className="shrink-0 rounded-sm font-mono text-xs"
					>
						{task.isRemote ? (
							<>
								<Wifi className="mr-1 h-3 w-3" />
								Алсаас
							</>
						) : (
							<>
								<MapPin className="mr-1 h-3 w-3" />
								{task.city || "Газар дээр"}
							</>
						)}
					</Badge>
					{task.deadline && (
						<Badge
							variant="outline"
							className="ml-auto shrink-0 rounded-sm font-mono text-xs"
						>
							<Calendar className="mr-1 h-3 w-3" />
							{formatDateShort(task.deadline)}
						</Badge>
					)}
				</div>

				<Link href={`/task/${task.id}`} className="group/link mb-2 block">
					<h3 className="line-clamp-2 font-display text-xl font-bold tracking-tight text-foreground transition-colors group-hover/link:text-primary">
						{task.title}
					</h3>
				</Link>
				<p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground leading-relaxed">
					{task.description}
				</p>

				<div className="mb-4 border-l-2 border-primary bg-muted/30 p-4">
					<div className="flex items-center justify-between">
						<span className="text-sm text-muted-foreground font-medium">
							Төсөв
						</span>
						<span className="font-mono text-lg font-bold text-primary">
							{formatBudget(task.budgetMin, task.budgetMax)}
						</span>
					</div>
				</div>

				<div className="flex items-center justify-between border-t border-border pt-4">
					<div className="flex items-center gap-3">
						<Avatar className="h-9 w-9 rounded-sm ring-1 ring-border">
							<AvatarImage src={task.poster?.image || undefined} />
							<AvatarFallback className="rounded-sm bg-muted font-medium text-muted-foreground text-sm">
								{task.poster?.name?.charAt(0) || "?"}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0">
							<p className="truncate text-sm font-medium text-foreground">
								{task.poster?.name || "Захиалагч"}
							</p>
							<div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
								<span>{formatTimeAgo(task.createdAt)}</span>
								<span className="text-border">•</span>
								<span className="flex items-center gap-1">
									<Users className="h-3 w-3" />
									{bidCount} санал
								</span>
							</div>
						</div>
					</div>

					<Link href={`/task/${task.id}`}>
						<Button
							size="sm"
							className="rounded-sm bg-primary text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
						>
							Санал илгээх
							<ArrowRight className="ml-1 h-4 w-4" />
						</Button>
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}

function ClientTaskCard({ task }: { task: TaskApiResponse }) {
	const bidCount = task._count?.bids || 0;

	return (
		<Card className="group overflow-hidden rounded-sm border border-border bg-card transition-all hover:border-primary hover:shadow-md">
			<CardContent className="p-0">
				<div className="p-5">
					<div className="mb-3 flex items-start justify-between gap-3">
						<div className="flex flex-wrap items-center gap-2">
							<TaskStatusBadge status={task.status} />
							{task.isRemote ? (
								<Badge
									variant="outline"
									className="rounded-sm font-mono text-xs"
								>
									<Wifi className="mr-1 h-3 w-3" />
									Алсаас
								</Badge>
							) : (
								<Badge
									variant="outline"
									className="rounded-sm font-mono text-xs"
								>
									<MapPin className="mr-1 h-3 w-3" />
									{task.city || "Газар дээр"}
								</Badge>
							)}
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
								>
									<MoreVertical className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="rounded-sm">
								<DropdownMenuItem asChild className="rounded-sm">
									<Link
										href={`/client/tasks/${task.id}/bids`}
										className="flex items-center gap-2"
									>
										<Eye className="h-4 w-4" />
										Саналууд харах
									</Link>
								</DropdownMenuItem>
								{task.status === "OPEN" && (
									<>
										<DropdownMenuItem className="flex items-center gap-2 rounded-sm">
											<Edit2 className="h-4 w-4" />
											Засах
										</DropdownMenuItem>
										<DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive rounded-sm">
											<XCircle className="h-4 w-4" />
											Цуцлах
										</DropdownMenuItem>
									</>
								)}
								<DropdownMenuItem className="flex items-center gap-2 text-destructive focus:text-destructive rounded-sm">
									<Trash2 className="h-4 w-4" />
									Устгах
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					<Link
						href={`/client/tasks/${task.id}/bids`}
						className="mb-2 block font-display text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary"
					>
						{task.title}
					</Link>
					<p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
						{task.description}
					</p>

					<div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
						<span className="font-mono font-medium text-foreground">
							{formatBudget(task.budgetMin, task.budgetMax)}
						</span>
						{task.deadline && (
							<span className="flex items-center gap-1 font-mono text-xs">
								<Calendar className="h-4 w-4" />
								{formatDateShort(task.deadline)}
							</span>
						)}
					</div>
				</div>

				<div className="flex items-center justify-between border-t border-border bg-muted/30 px-5 py-3">
					<div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
						<Calendar className="h-4 w-4" />
						<span>Нийтэлсэн: {formatDateShort(task.createdAt)}</span>
					</div>
					<Link
						href={`/client/tasks/${task.id}/bids`}
						className="flex items-center gap-1.5 rounded-sm bg-primary/10 px-3 py-1.5 font-mono text-xs font-medium text-primary transition-colors hover:bg-primary/20"
					>
						<Users className="h-4 w-4" />
						{bidCount} санал
					</Link>
				</div>
			</CardContent>
		</Card>
	);
}
