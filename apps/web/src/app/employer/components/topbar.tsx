import { Button } from "@/components/ui/button";

export function TopBar({ title }: { title: string }) {
	return (
		<header className="border-b border-border bg-white">
			<div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
				<h1 className="text-2xl font-bold text-foreground">{title}</h1>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
					<Button size="sm" className="bg-primary text-white hover:bg-primary/90">
						+ Post a job
					</Button>
				</div>
			</div>
		</header>
	);
}
