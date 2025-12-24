// Force dynamic rendering for user profile pages
export const dynamic = "force-dynamic";

export default function UserProfileLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
