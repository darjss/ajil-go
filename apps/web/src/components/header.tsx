"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold">J</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-foreground">Ажил-GO</span>
              <span className="hidden sm:block text-xs font-normal text-muted-foreground">
                Стартап ажлын платформ
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/find-jobs"
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Ажлуудыг хайх
            </Link>
            <Link
              href="/browse-companies"
              className="text-foreground hover:text-primary transition-colors text-sm font-medium"
            >
              Компанийн жагсаалт
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Нэвтрэх
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Бүртгүүлэх
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header;
