"use client"

import type React from "react"

import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sign up:", formData)
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

        {/* Right side - Sign up form */}
        <div className="max-w-md mx-auto w-full">
          <div className="mb-8">
            <div className="flex gap-4 mb-6">
              <button className="px-4 py-2 border-b-2 border-primary text-primary font-medium text-sm">
                Ажил хайгч
              </button>
              <button className="px-4 py-2 text-muted-foreground font-medium text-sm">Компани</button>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2">Илүү олон боломжуудыг нээ</h1>
          <p className="text-muted-foreground mb-8">Хамтдаа тохирох ажлыг олцгооё.</p>

          {/* Google Sign Up */}
          <Button className="w-full mb-6 border border-border bg-card text-foreground hover:bg-muted h-12">
            <span className="mr-2">🔍</span>
            Google-ээр бүртгүүлэх
          </Button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-background text-muted-foreground">Эсвэл имэйлээр бүртгүүл</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                Бүтэн нэр
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Нэрээ оруулна уу"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

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

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
              Бүртгүүлэх
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Бүртгэлтэй юу?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Нэвтрэх
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            'Бүртгүүлэх' дээр дарснаар{" "}
            <a href="#" className="text-primary hover:underline">
              Үйлчилгээний нөхцөл
            </a>{" "}
            болон{" "}
            <a href="#" className="text-primary hover:underline">
              Нууцлалын бодлого
            </a>
            -той танилцаж, зөвшөөрсөнд тооцно.
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}
