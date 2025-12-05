"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Route } from "next"

const companyDetails = {
  1: {
    name: "Stripe",
    icon: "S",
    color: "bg-blue-600",
    location: "Парис, Франц",
    founded: "2011 оны 7 сарын 31",
    employees: "4000+ хүн",
    industry: "Төлбөрийн платформ",
    website: "https://stripe.com",
    description:
      "Stripe нь интернэт бизнес эхлүүлж, хөгжүүлэхэд зориулагдсан платформ. Дэлхийн сая сая бизнес Stripe-ийн хэрэгслээр төлбөр хүлээн авч, олон улсад тэлж, онлайн бизнесээ удирддаг. Stripe нь нийт 728,000 ам.долларын борлуулалт хийсэн.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Ruby", "Magento"],
    officeLocations: [
      { country: "АНУ", flag: "🇺🇸" },
      { country: "Их Британи", flag: "🇬🇧" },
      { country: "Япон", flag: "🇯🇵" },
      { country: "Австрали", flag: "🇦🇺" },
      { country: "Хятад", flag: "🇨🇳" },
    ],
    teamMembers: [
      { name: "Celestin Gardinier", role: "Гүйцэтгэх захирал, хамтран үүсгэн байгуулагч", image: "👨‍💼" },
      { name: "Raymond Chribert", role: "Хамтран үүсгэн байгуулагч", image: "👨‍💼" },
      { name: "Annette Black", role: "Ерөнхий захирал", image: "👩‍💼" },
      { name: "Bernard Alexander", role: "Ерөнхий захирал", image: "👨‍💼" },
      { name: "Christine Jhonson", role: "Ерөнхий захирал", image: "👩‍💼" },
    ],
    jobCount: 7,
  },
}

const jobs = [
  {
    id: 1,
    title: "Сошиал медиа туслах",
    company: "Nomad",
    location: "Парис, Франц",
    type: "Бүтэн цагийн",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    icon: "N",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Сошиал медиа туслах",
    company: "Notify",
    location: "Парис, Франц",
    type: "Бүтэн цагийн",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    icon: "NO",
    color: "bg-cyan-500",
  },
  {
    id: 3,
    title: "Брэнд дизайнер",
    company: "Dropbox",
    location: "Сан Франциско, АНУ",
    type: "Бүтэн цагийн",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    icon: "D",
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "Брэнд дизайнер",
    company: "Maze",
    location: "Сан Франциско, АНУ",
    type: "Бүтэн цагийн",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    icon: "M",
    color: "bg-blue-400",
  },
  {
    id: 5,
    title: "Интерактив хөгжүүлэгч",
    company: "Terraform",
    location: "Хамбург, Герман",
    type: "Бүтэн цагийн",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    icon: "T",
    color: "bg-purple-500",
  },
  {
    id: 6,
    title: "Интерактив хөгжүүлэгч",
    company: "Udacity",
    location: "Хамбург, Герман",
    type: "Бүтэн цагийн",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    icon: "U",
    color: "bg-orange-500",
  },
]

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const company = companyDetails[params.id as unknown as keyof typeof companyDetails] || companyDetails[1]

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground">
          <span>Нүүр</span> / <span>Компаниуд</span> / <span>{company.name}</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Company Header */}
          <div className="flex items-start justify-between mb-8 pb-8 border-b border-border">
            <div className="flex items-start gap-4">
              <div
                className={`w-20 h-20 ${company.color} rounded-lg text-white flex items-center justify-center font-bold text-2xl`}
              >
                {company.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{company.name}</h1>
                <p className="text-muted-foreground">{company.website}</p>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary/90">Өргөдөл илгээх</Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Profile */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Компанийн танилцуулга</h2>
                <p className="text-muted-foreground leading-relaxed">{company.description}</p>
              </section>

              {/* Tech Stack */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Технологийн стек</h2>
                <p className="text-muted-foreground mb-4">{company.name} дараах технологи ашигладаг</p>
                <div className="flex flex-wrap gap-4">
                  {company.techStack.map((tech) => (
                    <div
                      key={tech}
                      className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center text-center"
                    >
                      <span className="font-semibold text-foreground text-xs">{tech}</span>
                    </div>
                  ))}
                </div>
                <Link href="#" className="text-primary text-sm font-medium hover:underline mt-4 inline-block">
                  Бүх технологи →
                </Link>
              </section>

              {/* Office Location */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Оффисын байршил</h2>
                <p className="text-muted-foreground mb-4">Stripe-ийн оффисууд {company.officeLocations.length} улсад байрладаг.</p>
                <div className="space-y-3">
                  {company.officeLocations.map((office) => (
                    <div key={office.country} className="flex items-center gap-3">
                      <span className="text-2xl">{office.flag}</span>
                      <span className="text-foreground">{office.country}</span>
                    </div>
                  ))}
                </div>
                <Link href="#" className="text-primary text-sm font-medium hover:underline mt-4 inline-block">
                  Байршлуудыг үзэх →
                </Link>
              </section>

              {/* Team */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Баг</h2>
                  <Link href="#" className="text-primary text-sm hover:underline font-medium">
                    Бүгдийг харах (47)
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {company.teamMembers.map((member) => (
                    <div key={member.name} className="text-center">
                      <div className="text-4xl mb-3">{member.image}</div>
                      <h3 className="font-semibold text-foreground text-sm">{member.name}</h3>
                      <p className="text-xs text-muted-foreground">{member.role}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Jobs */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Нээлттэй ажлууд</h2>
                  <Link href={"/find-jobs" as Route} className="text-primary text-sm hover:underline font-medium">
                    Бүх ажлыг харах →
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {jobs.map((job) => (
                    <Link key={job.id} href={`/job/${job.id}` as Route }>
                      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`w-10 h-10 ${job.color} rounded-lg text-white flex items-center justify-center font-bold text-sm `}
                          >
                            {job.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm">{job.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {job.company} • {job.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-4">
                <h3 className="font-semibold text-foreground mb-6">Компанийн товч</h3>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Байгуулагдсан</p>
                  <p className="text-sm font-semibold text-foreground">{company.founded}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Ажилчид</p>
                  <p className="text-sm font-semibold text-foreground">{company.employees}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Байршил</p>
                  <p className="text-sm font-semibold text-foreground">{company.location}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Салбар</p>
                  <p className="text-sm font-semibold text-foreground">{company.industry}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Нээлттэй ажлын байр</p>
                  <p className="text-sm font-semibold text-foreground">{company.jobCount} ажил</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
