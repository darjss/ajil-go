"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

const jobListings = [
  {
    id: 1,
    title: "Сошиал медиа туслах",
    company: "Nomad",
    location: "Парис, Франц",
    type: "Бүтэн цагийн",
    icon: "N",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    applied: 5,
    capacity: 10,
    color: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Брэнд дизайнер",
    company: "Dropbox",
    location: "Сан Франциско, АНУ",
    type: "Бүтэн цагийн",
    icon: "D",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    applied: 2,
    capacity: 10,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Интерактив хөгжүүлэгч",
    company: "Terraform",
    location: "Хамбург, Герман",
    type: "Бүтэн цагийн",
    icon: "T",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    applied: 8,
    capacity: 12,
    color: "bg-cyan-500",
  },
  {
    id: 4,
    title: "Имэйл маркетинг мэргэжилтэн",
    company: "Revolut",
    location: "Мадрид, Испани",
    type: "Бүтэн цагийн",
    icon: "R",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    applied: 0,
    capacity: 10,
    color: "bg-red-500",
  },
  {
    id: 5,
    title: "Ахлах инженер",
    company: "Canva",
    location: "Анкара, Турк",
    type: "Бүтэн цагийн",
    icon: "C",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    applied: 5,
    capacity: 10,
    color: "bg-orange-400",
  },
  {
    id: 6,
    title: "Бүтээгдэхүүний дизайнер",
    company: "ClassPass",
    location: "Берлин, Герман",
    type: "Бүтэн цагийн",
    icon: "P",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
    applied: 5,
    capacity: 10,
    color: "bg-blue-600",
  },
]

const featuredJobs = [
  {
    id: 1,
    title: "Имэйл маркетинг мэргэжилтэн",
    company: "Revolut",
    location: "Мадрид, Испани",
    type: "Бүтэн цагийн",
    icon: "R",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "Брэнд дизайнер",
    company: "Dropbox",
    location: "Сан Франциско, АНУ",
    type: "Бүтэн цагийн",
    icon: "D",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Шууд жагсаалт",
    company: "Direct",
    location: "Берлин, Герман",
    type: "Бүтэн цагийн",
    icon: "DL",
    color: "bg-black",
  },
  {
    id: 4,
    title: "Бүтээгдэхүүний дизайнер",
    company: "ClassPass",
    location: "Манчестер, Их Британи",
    type: "Бүтэн цагийн",
    icon: "CP",
    color: "bg-orange-600",
  },
  {
    id: 5,
    title: "Брэнд стратегич",
    company: "Gobadly",
    location: "Марсель, Франц",
    type: "Бүтэн цагийн",
    icon: "GB",
    color: "bg-purple-600",
  },
  {
    id: 6,
    title: "Өгөгдлийн шинжээч",
    company: "Twitter",
    location: "Сан Диего, АНУ",
    type: "Бүтэн цагийн",
    icon: "TW",
    color: "bg-blue-400",
  },
]

const categories = [
  { name: "Дизайн", count: "235 нээлттэй ажлын байр" },
  { name: "Борлуулалт", count: "756 нээлттэй ажлын байр" },
  { name: "Маркетинг", count: "140 нээлттэй ажлын байр" },
  { name: "Санхүү", count: "555 нээлттэй ажлын байр" },
  { name: "Технологи", count: "436 нээлттэй ажлын байр" },
  { name: "Инженерчлэл", count: "640 нээлттэй ажлын байр" },
  { name: "Бизнес", count: "211 нээлттэй ажлын байр" },
  { name: "Хүний нөөц", count: "346 нээлттэй ажлын байр" },
]

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Илүү ихийг нээ
                <br />
                <span className="text-primary">5000+ ажлаас</span>
                <br />
                Сонголтоо хий
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Шинэ карьерийн боломж хайж буй, стартапд дуртай ажил хайгчдад зориулсан платформ.
              </p>

              {/* Search Bar */}
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Ажлын нэр эсвэл түлхүүр үг"
                  className="flex-1 px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground"
                />
                <select className="px-4 py-3 border border-border rounded-lg bg-card text-foreground">
                  <option>Флоренц, Итали</option>
                </select>
                <Button className="bg-primary hover:bg-primary/90">Ажил хайх</Button>
              </div>

              <p className="text-sm text-muted-foreground">Тренд: UI дизайнер, UX судлаач, Андроид, Админ</p>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center gap-8">
                <div className="bg-card rounded-lg p-8 text-center border border-border">
                  <div className="text-4xl font-bold text-foreground mb-2">100K+</div>
                  <p className="text-muted-foreground">Эндээс ажилд орсон хүмүүс</p>
                </div>
              </div>
            </div>
          </div>

          {/* Companies Featured */}
          <div className="mb-16">
            <p className="text-sm text-muted-foreground mb-4">Бидэнтэй хамт өсөж буй компаниуд</p>
            <div className="flex flex-wrap gap-6 items-center">
              {["Vodafone", "Intel", "Tesla", "AMD", "Talkit"].map((company) => (
                <span key={company} className="text-lg font-semibold text-muted-foreground">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Explore by Category */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Ангилалаар <span className="text-primary">хайх</span>
              </h2>
            </div>
            <Link href="/find-jobs" className="text-primary hover:underline text-sm font-medium">
              Бүх ажлыг харах
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-2xl font-bold text-primary mb-2">✦</div>
                <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground">{cat.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Онцлох <span className="text-primary">ажлууд</span>
            </h2>
            <Link href="/find-jobs" className="text-primary hover:underline text-sm font-medium">
              Бүх ажлыг харах
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${job.color} rounded-lg text-white flex items-center justify-center font-bold text-sm`}
                  >
                    {job.icon}
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{job.type}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{job.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {job.company} • {job.location}
                </p>
                <Link href="/find-jobs" className="text-primary text-sm font-medium hover:underline">
                  Дэлгэрэнгүй
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Jobs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Шинээр <span className="text-primary">нээлттэй ажлууд</span>
            </h2>
            <Link href="/find-jobs" className="text-primary hover:underline text-sm font-medium">
              Бүх ажлыг харах
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 ${job.color} rounded-lg text-white flex items-center justify-center font-bold`}
                    >
                      {job.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{job.type}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  {job.applied} хүн өргөдөл өгсөн, багтаамж {job.capacity}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16 my-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ажлын зар тавихаа өнөөдрөөс эхлүүл</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">Зөвхөн $10-оор ажлын зар тавина</p>
            <Link href="/signup">
              <Button className="bg-white text-primary hover:bg-gray-100">Үнэгүй бүртгүүлэх</Button>
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
