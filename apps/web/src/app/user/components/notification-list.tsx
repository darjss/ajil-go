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
		<div className="rounded-lg border border-border bg-white shadow-sm">
			<div className="flex items-center justify-between border-border border-b px-6 py-4">
				<h3 className="font-semibold text-foreground text-lg">Мэдэгдэл</h3>
				<button className="text-primary text-sm hover:underline">
					Бүгдийг уншсанд тооцох
				</button>
			</div>
			<div className="divide-y divide-border">
				{items.map((item, idx) => (
					<div key={idx} className="flex items-start gap-3 px-6 py-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
							{item.avatar}
						</div>
						<div className="min-w-0 flex-1">
							<div className="flex flex-wrap items-center gap-2">
								<p className="font-semibold text-foreground">{item.title}</p>
								<span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] text-primary">
									{item.tag}
								</span>
							</div>
							<p className="text-muted-foreground text-sm">{item.body}</p>
							<p className="mt-1 text-muted-foreground text-xs">{item.time}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
