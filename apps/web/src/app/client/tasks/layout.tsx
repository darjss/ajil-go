// Force dynamic rendering for client tasks pages
export const dynamic = "force-dynamic";

export default function ClientTasksLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
