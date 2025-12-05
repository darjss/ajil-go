import type React from "react"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-7xl px-4">{children}</div>
    </section>
  )
}
