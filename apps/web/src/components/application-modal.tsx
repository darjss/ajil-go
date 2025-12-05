"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useState } from "react"

interface ApplicationModalProps {
  isOpen: boolean
  jobTitle: string
  companyName: string
  onClose: () => void
}

export function ApplicationModal({ isOpen, jobTitle, companyName, onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    linkedInUrl: "",
    portfolioUrl: "",
    additionalInfo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Application submitted:", formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border sticky top-0 bg-card">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{jobTitle}</h2>
            <p className="text-sm text-muted-foreground">{companyName}</p>
          </div>
          <button onClick={onClose} className="text-2xl text-muted-foreground hover:text-foreground">
            ×
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="font-semibold text-foreground mb-4">Өргөдлөө илгээх</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Дараах мэдээллийг заавал бөглөж, зөвхөн {companyName}-д илгээнэ.
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Бүтэн нэр</label>
              <input
                type="text"
                name="fullName"
                placeholder="Нэрээ оруулна уу"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Имэйл хаяг</label>
              <input
                type="email"
                name="email"
                placeholder="Имэйлээ оруулна уу"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Утасны дугаар</label>
            <input
              type="tel"
              name="phone"
              placeholder="Утасны дугаараа оруулна уу"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Одоогийн эсвэл өмнөх албан тушаал</label>
            <input
              type="text"
              name="jobTitle"
              placeholder="Одоогийн/өмнөх албан тушаал"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="border-t border-border pt-6">
            <h4 className="font-semibold text-foreground mb-4">ХОЛБООСУУД</h4>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">LinkedIn холбоос</label>
              <input
                type="url"
                name="linkedInUrl"
                placeholder="LinkedIn профайлын холбоос"
                value={formData.linkedInUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">Портфолио холбоос</label>
              <input
                type="url"
                name="portfolioUrl"
                placeholder="Портфолио, вебсайт, Behance гэх мэт"
                value={formData.portfolioUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Нэмэлт мэдээлэл</label>
            <textarea
              name="additionalInfo"
              placeholder="Хуулга, уриалга эсвэл нэмэлт мэдээллээ бичээрэй"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted-foreground mt-2">Дээд тал нь 500 тэмдэгт</p>
          </div>

          <div className="flex items-center gap-2">
            <input type="file" id="resume" hidden />
            <label
              htmlFor="resume"
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted text-sm text-foreground"
            >
              📎 CV/Resume хавсаргах
            </label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12">
            Өргөдөл илгээх
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Өргөдлөө илгээснээр{" "}
            <a href="#" className="text-primary hover:underline">
              үйлчилгээний нөхцөл
            </a>{" "}
            болон{" "}
            <a href="#" className="text-primary hover:underline">
              нууцлалын бодлого
            </a>
            -г зөвшөөрсөнд тооцно.
          </p>
        </form>
      </div>
    </div>
  )
}
