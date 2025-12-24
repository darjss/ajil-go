// Force dynamic rendering for client pages
export const dynamic = "force-dynamic";

export default function ClientPostTaskLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
