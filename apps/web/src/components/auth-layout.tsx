import type React from "react";

export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background py-12">
			<div className="pointer-events-none absolute inset-0 z-0 opacity-20">
				<div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top_right,_var(--primary),_transparent_50%)]" />
				<div className="absolute right-0 bottom-0 h-full w-full bg-[radial-gradient(circle_at_bottom_left,_var(--secondary),_transparent_50%)]" />
			</div>
			<div className="relative z-10 w-full max-w-md px-4">{children}</div>
		</section>
	);
}
