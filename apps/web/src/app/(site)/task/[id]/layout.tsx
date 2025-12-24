// Force dynamic rendering for task detail pages
export const dynamic = "force-dynamic";

export default function TaskDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
