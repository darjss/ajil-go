import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-12">
        <div className="w-full max-w-7xl px-4">{children}</div>
      </main>
      <Footer />
    </>
  )
}
