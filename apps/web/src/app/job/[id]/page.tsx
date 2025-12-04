"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { ApplicationModal } from "@/components/application-modal"

const jobDetails = {
  1: {
    title: "Social Media Assistant",
    company: "Stripe",
    location: "Paris, France",
    type: "Full-Time",
    icon: "S",
    color: "bg-blue-600",
    description:
      "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and encourage others to engage with our content.",
    responsibilities: [
      "Community engagement to ensure that is supported and actively represented online",
      "Focus on social media content distribution and publication",
      "Marketing and strategy support",
      "Stay on top of trends on social media platforms, and suggest content ideas to the organization",
      "Engage with online communities",
    ],
    whoYouAre: [
      "You get energy from people and building the ideal work environment",
      "You have a sense for beautiful spaces and office experiences",
      "You are a confident office manager, ready for added responsibilities",
      "You are detail-oriented and creative",
      "You're a growth marketer and know how to run campaigns",
    ],
    niceToHaves: ["Fluent in English", "Project management skills", "Copy editing skills"],
    perksAndBenefits: [
      {
        title: "Full Healthcare",
        description: "We believe in thriving communities and that starts with our team being happy and healthy.",
      },
      {
        title: "Unlimited Vacation",
        description: "We believe you should have a flexible schedule that makes life fun.",
      },
      {
        title: "Skill Development",
        description: "We believe in always learning and up our skills. Whether it's a course or offline conference.",
      },
      {
        title: "Team Summits",
        description:
          "Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.",
      },
      {
        title: "Remote Working",
        description:
          "You know how you perform your best work from home, office, or a coffee shop or anywhere when you feel like it.",
      },
      {
        title: "Commuter Benefits",
        description: "We're grateful for all the time and energy each team member puts into getting to work every day.",
      },
    ],
    appliedCount: 5,
    capacity: 10,
    applyBefore: "July 31, 2021",
    jobMarked: "July 1, 2021",
    salary: "$75k - $85k USD",
  },
}

const similarJobs = [
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    icon: "N",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    id: 3,
    title: "Social Media Assistant",
    company: "Notify",
    location: "Paris, France",
    type: "Full-Time",
    icon: "NO",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    id: 4,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full-Time",
    icon: "D",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    id: 5,
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, USA",
    type: "Full-Time",
    icon: "M",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    id: 6,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    icon: "T",
    tags: ["Full-Time", "Marketing", "Design"],
  },
  {
    id: 7,
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    type: "Full-Time",
    icon: "U",
    tags: ["Full-Time", "Marketing", "Design"],
  },
]

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = jobDetails[params.id as unknown  as  keyof typeof jobDetails] || jobDetails[1]
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground">
          <span>Home</span> / <span>Companies</span> / <span>Nomad</span> / <span>Social Media Assistant</span>
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
              <Button variant="outline">📤</Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsModalOpen(true)}>
                Apply
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{job.description}</p>
              </section>

              {/* Responsibilities */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Responsibilities</h2>
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Who You Are</h2>
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Nice-To-Haves</h2>
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Perks & Benefits</h2>
                <p className="text-sm text-muted-foreground mb-6">This job comes with several perks and benefits</p>
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
                      Read more about {job.company}
                    </a>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Stripe is a software platform for starting and running internet businesses. Millions of businesses
                  rely on Stripe's software tools to accept payments, expand globally, and manage their businesses
                  online.
                </p>
              </section>

              {/* Similar Jobs */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    Similar <span className="text-primary">Jobs</span>
                  </h2>
                  <Link href="/find-jobs" className="text-primary text-sm hover:underline">
                    Show all jobs →
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
                <h3 className="font-semibold text-foreground mb-6">About this role</h3>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Applied</p>
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
                  <p className="text-xs text-muted-foreground mb-1">Apply Before</p>
                  <p className="text-sm font-semibold text-foreground">{job.applyBefore}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Job Marked</p>
                  <p className="text-sm font-semibold text-foreground">{job.jobMarked}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Job Type</p>
                  <p className="text-sm font-semibold text-foreground">{job.type}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Salary</p>
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

      <Footer />
    </>
  )
}
