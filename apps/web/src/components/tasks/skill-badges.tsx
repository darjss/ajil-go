import { Badge } from "@/components/ui/badge";

import type { TaskSkillDisplay } from "./types";

interface SkillBadgesProps {
	skills: TaskSkillDisplay[];
	className?: string;
}

export function SkillBadges({ skills, className }: SkillBadgesProps) {
	if (!skills || skills.length === 0) return null;

	return (
		<div className={`flex flex-wrap gap-2 ${className || ""}`}>
			{skills.map((taskSkill) => {
				const skillName = taskSkill.skill?.name || taskSkill.customSkill?.name;
				if (!skillName) return null;

				const skillId =
					taskSkill.skill?.id || taskSkill.customSkill?.id || skillName;

				return (
					<Badge
						key={`skill-${skillId}`}
						variant="outline"
						className="bg-background"
					>
						{skillName}
					</Badge>
				);
			})}
		</div>
	);
}
