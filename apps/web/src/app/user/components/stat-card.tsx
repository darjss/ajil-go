export function StatCard({
	title,
	value,
	icon,
}: {
	title: string;
	value: string;
	icon: string;
}) {
	return (
		<div className="flex items-center justify-between rounded-lg border border-border bg-white p-5 shadow-sm">
			<div>
				<p className="mb-2 text-muted-foreground text-sm">{title}</p>
				<p className="font-bold text-3xl text-foreground">{value}</p>
			</div>
			<span className="text-2xl">{icon}</span>
		</div>
	);
}
