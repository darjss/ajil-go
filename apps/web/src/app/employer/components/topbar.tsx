import { Button } from "@/components/ui/button";

export function TopBar({ title }: { title: string }) {
	return (
		<header className="border-border border-b bg-white">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
				<h1 className="font-bold text-2xl text-foreground">{title}</h1>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm">
						Нүүр рүү буцах
					</Button>
					<Button
						size="sm"
						className="bg-primary text-white hover:bg-primary/90"
					>
						+ Post a job
					</Button>
				</div>
			</div>
		</header>
	);
}
