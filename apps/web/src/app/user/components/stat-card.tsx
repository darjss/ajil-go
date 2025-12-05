export function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
	return (
		<div className="bg-white border border-border rounded-lg p-5 flex items-center justify-between shadow-sm">
			<div>
				<p className="text-sm text-muted-foreground mb-2">{title}</p>
				<p className="text-3xl font-bold text-foreground">{value}</p>
			</div>
			<span className="text-2xl">{icon}</span>
		</div>
	);
}
