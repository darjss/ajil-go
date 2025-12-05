interface NotificationItem {
	title: string;
	body: string;
	status: string;
	time: string;
	avatar: string;
	tag: string;
}

export function NotificationList({ items }: { items: NotificationItem[] }) {
	return (
		<div className="bg-white border border-border rounded-lg shadow-sm">
			<div className="px-6 py-4 border-b border-border flex items-center justify-between">
				<h3 className="text-lg font-semibold text-foreground">Мэдэгдэл</h3>
				<button className="text-sm text-primary hover:underline">Бүгдийг уншсанд тооцох</button>
			</div>
			<div className="divide-y divide-border">
				{items.map((item, idx) => (
					<div key={idx} className="px-6 py-4 flex items-start gap-3">
						<div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">{item.avatar}</div>
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<p className="font-semibold text-foreground">{item.title}</p>
								<span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.tag}</span>
							</div>
							<p className="text-sm text-muted-foreground">{item.body}</p>
							<p className="text-xs text-muted-foreground mt-1">{item.time}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
