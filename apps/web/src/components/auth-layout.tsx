import type React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="flex min-h-screen items-center justify-center bg-background py-12 relative overflow-hidden">
			<div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
				<div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--primary),_transparent_50%)]" />
				<div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--secondary),_transparent_50%)]" />
			</div>
			<div className="w-full max-w-md px-4 relative z-10">{children}</div>
		</section>
	);
}
