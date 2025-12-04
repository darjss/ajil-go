"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const jobListings = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    icon: "N",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
    color: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full-Time",
    icon: "D",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 2,
    capacity: 10,
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    icon: "T",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 8,
    capacity: 12,
    color: "bg-cyan-500",
  },
  {
    id: 4,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full-Time",
    icon: "R",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 0,
    capacity: 10,
    color: "bg-red-500",
  },
  {
    id: 5,
    title: "Lead Engineer",
    company: "Canva",
    location: "Ankara, Turkey",
    type: "Full-Time",
    icon: "C",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
    color: "bg-orange-400",
  },
  {
    id: 6,
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    type: "Full-Time",
    icon: "P",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
    color: "bg-blue-600",
  },
]

const featuredJobs = [
  {
    id: 1,
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    type: "Full-Time",
    icon: "R",
    color: "bg-red-500",
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full-Time",
    icon: "D",
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "Direct Listed",
    company: "Direct",
    location: "Berlin, Germany",
    type: "Full-Time",
    icon: "DL",
    color: "bg-black",
  },
  {
    id: 4,
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    type: "Full-Time",
    icon: "CP",
    color: "bg-orange-600",
  },
  {
    id: 5,
    title: "Brand Strategist",
    company: "Gobadly",
    location: "Marseille, France",
    type: "Full-Time",
    icon: "GB",
    color: "bg-purple-600",
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    type: "Full-Time",
    icon: "TW",
    color: "bg-blue-400",
  },
]

const categories = [
  { name: "Design", count: "235 jobs available" },
  { name: "Sales", count: "756 jobs available" },
  { name: "Marketing", count: "140 jobs available" },
  { name: "Finance", count: "555 jobs available" },
  { name: "Technology", count: "436 jobs available" },
  { name: "Engineering", count: "640 jobs available" },
  { name: "Business", count: "211 jobs available" },
  { name: "Human Resource", count: "346 jobs available" },
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Discover more
                <br />
                <span className="text-primary">than 5000+</span>
                <br />
                Jobs
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">
                Great platform for the job seeker that searching for new career heights and passionate about startups.
              </p>

              {/* Search Bar */}
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  className="flex-1 px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground"
                />
                <select className="px-4 py-3 border border-border rounded-lg bg-card text-foreground">
                  <option>Florence, Italy</option>
                </select>
                <Button className="bg-primary hover:bg-primary/90">Search my job</Button>
              </div>

              <p className="text-sm text-muted-foreground">Popular: UI Designer, UX Researcher, Android, Admin</p>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center gap-8">
                <div className="bg-card rounded-lg p-8 text-center border border-border">
                  <div className="text-4xl font-bold text-foreground mb-2">100K+</div>
                  <p className="text-muted-foreground">People got hired</p>
                </div>
              </div>
            </div>
          </div>

          {/* Companies Featured */}
          <div className="mb-16">
            <p className="text-sm text-muted-foreground mb-4">Companies we helped grow</p>
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
                Explore by <span className="text-primary">category</span>
              </h2>
            </div>
            <Link href="/find-jobs" className="text-primary hover:underline text-sm font-medium">
              Show all jobs
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
              Featured <span className="text-primary">jobs</span>
            </h2>
            <Link href="/find-jobs" className="text-primary hover:underline text-sm font-medium">
              Show all jobs
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
                  Open job
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Jobs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Latest <span className="text-primary">jobs open</span>
            </h2>
            <Link href="/find-jobs" className="text-primary hover:underline text-sm font-medium">
              Show all jobs
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
                  {job.applied} applied of {job.capacity} capacity
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-white py-16 my-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Start posting jobs today</h2>
            <p className="text-lg mb-8 text-primary-foreground/90">Start posting jobs for only $10</p>
            <Link href="/signup">
              <Button className="bg-white text-primary hover:bg-gray-100">Sign Up For Free</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
