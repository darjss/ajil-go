"use client"

import type React from "react"

import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", formData)
  }

  return (
    <AuthLayout>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left side - Image and testimonial */}
        <div className="hidden md:flex flex-col items-center">
          <div className="mb-8">
            <div className="text-5xl mb-6">👨‍💼</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-8 text-center max-w-sm">
            <div className="text-4xl font-bold text-primary mb-2">100K+</div>
            <p className="text-muted-foreground mb-6">Эндээс ажилд орсон хүмүүс</p>
            <div className="border-t border-border pt-6">
              <p className="text-sm font-semibold text-foreground mb-2">Adam Sandler</p>
              <p className="text-xs text-muted-foreground mb-4">Canva-ийн ахлах инженер</p>
              <blockquote className="text-sm italic text-foreground">
                "Стартап сонирхдог, карьерийн дараагийн алхмаа хайж буй ажил хайгчдад маш тохиромжтой платформ."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="flex gap-4 mb-6">
              <button className="px-4 py-2 border-b-2 border-primary text-primary font-medium text-sm">
                Ажил хайгч
              </button>
              <button className="px-4 py-2 text-muted-foreground font-medium text-sm">Компани</button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Дахин тавтай морил</h1>

          {/* Google Login */}
          <Button className="w-full mb-6 border border-border bg-card text-foreground hover:bg-muted h-12">
            <span className="mr-2">🔍</span>
            Google-ээр нэвтрэх
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-background text-muted-foreground">Эсвэл имэйлээр нэвтэр</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Имэйл хаяг
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Имэйл хаягаа оруулна уу"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Нууц үг
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Нууц үгээ оруулна уу"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="w-4 h-4 rounded border-border"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-foreground">
                Намайг сана
              </label>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
              Нэвтрэх
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Бүртгэлгүй байна уу?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Бүртгүүлэх
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
