import { Award } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { UserSkillItem } from "./types";

interface SkillsDisplayProps {
	skills?: UserSkillItem[];
}

export function SkillsDisplay({ skills }: SkillsDisplayProps) {
	return (
		<Card className="border-border">
			<CardHeader className="pb-4">
				<CardTitle className="flex items-center gap-2 font-display text-lg text-foreground">
					<Award className="h-5 w-5 text-primary" />
					Ур чадварууд
				</CardTitle>
			</CardHeader>
			<CardContent>
				{skills && skills.length > 0 ? (
					<div className="flex flex-wrap gap-2">
						{skills.map((userSkill, index) => {
							const skillName =
								userSkill.skill?.name || userSkill.customSkill?.name;
							if (!skillName) return null;
							return (
								<Badge
									key={`skill-${index.toString()}`}
									variant="outline"
									className="border-primary/30 bg-primary/5 px-3 py-1.5 text-primary transition-colors hover:bg-primary/10"
								>
									{skillName}
								</Badge>
							);
						})}
					</div>
				) : (
					<SkillsEmptyState />
				)}
			</CardContent>
		</Card>
	);
}

function SkillsEmptyState() {
	return (
		<div className="flex flex-col items-center justify-center py-8 text-center">
			<div className="mb-3 flex h-14 w-14 items-center justify-center rounded-none bg-muted">
				<Award className="h-7 w-7 text-muted-foreground" />
			</div>
			<p className="font-medium text-muted-foreground">
				Ур чадвар бүртгэгдээгүй байна
			</p>
		</div>
	);
}
