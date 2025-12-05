"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { ApplicationModal } from "@/components/application-modal"

const jobDetails = {
  1: {
    title: "Сошиал медиа туслах",
    company: "Stripe",
    location: "Парис, Франц",
    type: "Бүтэн цагийн",
    icon: "S",
    color: "bg-blue-600",
    description:
      "Stripe нь манай онлайн сувгуудыг идэвхтэй өсгөх сошиал медиа маркетингийн мэргэжилтэн хайж байна. Та контент бэлтгэж, нийтэлж, олон нийттэй харилцаж, үр дүнтэй оролцоог бий болгоход төвлөрнө.",
    responsibilities: [
      "Олон нийтийн оролцоог идэвхтэй дэмжиж, брэндийг онлайн орчинд төлөөлөх",
      "Сошиал медиа контентын төлөвлөгөө гаргаж, зөв сувгаар түгээх",
      "Маркетингийн стратеги, кампанит ажилд дэмжлэг үзүүлэх",
      "Сошиал медиа трэндүүдийг ажиглаж, контентийн шинэ санаа санал болгох",
      "Онлайн хамт олон, хэрэглэгчидтэй тогтмол харилцах",
    ],
    whoYouAre: [
      "Хүмүүсээс энерги авч, багаар хамтран ажиллахыг хүсдэг",
      "Албан тасалгааны орчны гоо зүй, туршлагад анхааралтай",
      "Нэмэлт үүрэг хариуцлага авахаас айдаггүй туршлагатай оффис менежер",
      "Дэлгэрч, бүтээлч, жижиг зүйлд анхаардаг",
      "Өсөлтийн маркетер тул кампанит ажил удирдах туршлагатай",
    ],
    niceToHaves: ["Англи хэлэнд чөлөөтэй", "Төслийн удирдлагын чадвар", "Контент, текст найруулгын ур чадвар"],
    perksAndBenefits: [
      {
        title: "Бүрэн эрүүл мэндийн даатгал",
        description: "Багийн гишүүд эрүүл, аз жаргалтай байж гэмээнэ хамт олон цэцэглэнэ гэж бид итгэдэг.",
      },
      {
        title: "Хязгааргүй амралт",
        description: "Ажил, амьдралын уян хатан цагийн хуваарьтай байж, сэргэх боломжийг дэмжинэ.",
      },
      {
        title: "Ур чадвар хөгжүүлэлт",
        description: "Онлайн сургалт, оффлайн уулзалт гээд шинэ мэдлэгээр байнга өөрийгөө хөгжүүлэхэд урамшуулна.",
      },
      {
        title: "Багийн уулзалт",
        description:
          "6 сар тутам багийнхаа амжилт, төлөвлөгөөг ярилцаж, амарч, нэг зорилгоо шинэчилдэг.",
      },
      {
        title: "Алсаас ажиллах нөхцөл",
        description:
          "Гэр, оффис, кофе шоп гээд хамгийн бүтээмжтэй газраасаа ажиллах сонголттой.",
      },
      {
        title: "Замын урамшуулал",
        description: "Өдөр бүр ажилдаа ирэх замын цаг, хүч хөдөлмөрийг үнэлж, урамшуулал олгодог.",
      },
    ],
    appliedCount: 5,
    capacity: 10,
    applyBefore: "2021 оны 7 сарын 31",
    jobMarked: "2021 оны 7 сарын 1",
    salary: "$75k - $85k (USD)",
  },
}

const similarJobs = [
  {
    id: 2,
    title: "Сошиал медиа туслах",
    company: "Nomad",
    location: "Парис, Франц",
    type: "Бүтэн цагийн",
    icon: "N",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
  },
  {
    id: 3,
    title: "Сошиал медиа туслах",
    company: "Notify",
    location: "Парис, Франц",
    type: "Бүтэн цагийн",
    icon: "NO",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
  },
  {
    id: 4,
    title: "Брэнд дизайнер",
    company: "Dropbox",
    location: "Сан Франциско, АНУ",
    type: "Бүтэн цагийн",
    icon: "D",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
  },
  {
    id: 5,
    title: "Брэнд дизайнер",
    company: "Maze",
    location: "Сан Франциско, АНУ",
    type: "Бүтэн цагийн",
    icon: "M",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
  },
  {
    id: 6,
    title: "Интерактив хөгжүүлэгч",
    company: "Terraform",
    location: "Хамбург, Герман",
    type: "Бүтэн цагийн",
    icon: "T",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
  },
  {
    id: 7,
    title: "Интерактив хөгжүүлэгч",
    company: "Udacity",
    location: "Хамбург, Герман",
    type: "Бүтэн цагийн",
    icon: "U",
    tags: ["Бүтэн цагийн", "Маркетинг", "Дизайн"],
  },
]

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = jobDetails[params.id as unknown as keyof typeof jobDetails] || jobDetails[1]
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground">
          <span>Нүүр</span> / <span>Компаниуд</span> / <span>{job.company}</span> / <span>{job.title}</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {/* Job Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              <div
                className={`w-16 h-16 ${job.color} rounded-lg text-white flex items-center justify-center font-bold text-lg`}
              >
                {job.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{job.title}</h1>
                <p className="text-muted-foreground">
                  {job.company} • {job.location} • {job.type}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" aria-label="Зар хуваалцах">
                📤
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsModalOpen(true)}>
                Өргөдөл илгээх
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Ажлын товч</h2>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </section>

              {/* Responsibilities */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Үндсэн үүрэг</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Who You Are */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Таны тухай</h2>
                <ul className="space-y-3">
                  {job.whoYouAre.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Nice-To-Haves */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Давуу талууд</h2>
                <ul className="space-y-3">
                  {job.niceToHaves.map((item, i) => (
                    <li key={i} className="flex gap-3 text-muted-foreground">
                      <span className="text-primary mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Perks & Benefits */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Бонус ба урамшуулал</h2>
                <p className="text-sm text-muted-foreground mb-6">Энэ ажлын байранд дараах боломжууд багтсан</p>
                <div className="grid md:grid-cols-2 gap-6">
                  {job.perksAndBenefits.map((perk, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-2xl">💼</span>
                      <div>
                        <h3 className="font-semibold text-foreground">{perk.title}</h3>
                        <p className="text-sm text-muted-foreground">{perk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Company Info */}
              <section className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-12 h-12 ${job.color} rounded-lg text-white flex items-center justify-center font-bold`}
                  >
                    {job.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{job.company}</h3>
                    <a href="#" className="text-primary text-sm hover:underline">
                      {job.company}-ийн талаар дэлгэрэнгүй унших
                    </a>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Stripe нь интернэт бизнес эхлүүлж, хөгжүүлэхэд зориулсан программын платформ. Дэлхийн сая сая
                  бизнес Stripe-ийн хэрэгслээр төлбөр хүлээн авч, олон улсад тэлж, санхүүгийн менежментээ хийдэг.
                </p>
              </section>

              {/* Similar Jobs */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Ижил төстэй <span className="text-primary">ажлууд</span>
                  </h2>
                  <Link href="/find-jobs" className="text-primary text-sm hover:underline">
                    Бүх ажлыг харах →
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {similarJobs.map((similarJob) => (
                    <div
                      key={similarJob.id}
                      className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-lg text-white flex items-center justify-center font-bold text-sm">
                          {similarJob.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm">{similarJob.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {similarJob.company} • {similarJob.location}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {similarJob.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-20 space-y-4">
                <h3 className="font-semibold text-foreground mb-6">Энэ ажлын мэдээлэл</h3>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Өргөдөл өгсөн</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(job.appliedCount / job.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {job.appliedCount}/{job.capacity}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Өргөдөл авах эцсийн өдөр</p>
                  <p className="text-sm font-semibold text-foreground">{job.applyBefore}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Зар нийтэлсэн</p>
                  <p className="text-sm font-semibold text-foreground">{job.jobMarked}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Ажлын төрөл</p>
                  <p className="text-sm font-semibold text-foreground">{job.type}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Цалин</p>
                  <p className="text-sm font-semibold text-foreground">{job.salary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ApplicationModal
        isOpen={isModalOpen}
        jobTitle={job.title}
        companyName={job.company}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
