// Force dynamic rendering for tasks pages
export const dynamic = "force-dynamic";

export default function TasksLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
