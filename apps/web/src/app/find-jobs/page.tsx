"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Route } from "next"
import { useState } from "react"

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
    icon: "CP",
    tags: ["Full-Time", "Marketing", "Design"],
    applied: 5,
    capacity: 10,
    color: "bg-blue-600",
  },
]

export default function FindJobsPage() {
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["Business", "Technology"])
  const [selectedLevel, setSelectedLevel] = useState<string[]>(["Director"])
  const [selectedSalary, setSelectedSalary] = useState<string[]>(["$3000 or above"])

  const toggleFilter = (value: string, filter: string[], setFilter: (arr: string[]) => void) => {
    setFilter(filter.includes(value) ? filter.filter((f) => f !== value) : [...filter, value])
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground">
          <span>Home</span> / <span>Find Jobs</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="md:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                {/* Employment Type */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center justify-between">
                    Type of Employment
                    <span className="text-xs">▼</span>
                  </h3>
                  <div className="space-y-2">
                    {["Full-time (3)", "Part-Time (5)", "Remote (2)", "Internship (24)", "Contract (3)"].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center justify-between">
                    Categories
                    <span className="text-xs">▼</span>
                  </h3>
                  <div className="space-y-2">
                    {[
                      "Design (24)",
                      "Sales (3)",
                      "Marketing (3)",
                      "Business (3)",
                      "Human Resource (6)",
                      "Finance (4)",
                      "Engineering (4)",
                      "Technology (5)",
                    ].map((item) => (
                      <label key={item} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded"
                          defaultChecked={["Business (3)", "Technology (5)"].includes(item)}
                        />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Job Level */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center justify-between">
                    Job Level
                    <span className="text-xs">▼</span>
                  </h3>
                  <div className="space-y-2">
                    {["Entry Level (57)", "Mid Level (3)", "Senior Level (5)", "Director (12)", "VP or Above (8)"].map(
                      (item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded"
                            defaultChecked={item === "Director (12)"}
                          />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center justify-between">
                    Salary Range
                    <span className="text-xs">▼</span>
                  </h3>
                  <div className="space-y-2">
                    {["$700 - $1000 (4)", "$100 - $1500 (6)", "$1500 - $2000 (10)", "$3000 or above (4)"].map(
                      (item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded"
                            defaultChecked={item === "$3000 or above (4)"}
                          />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              {/* Search and Sort */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">All Jobs</h2>
                  <div className="flex items-center gap-4">
                    <select className="px-3 py-2 text-sm border border-border rounded-lg bg-card text-foreground">
                      <option>Most relevant</option>
                      <option>Latest</option>
                      <option>Most applied</option>
                    </select>
                    <div className="flex gap-2">
                      <button className="p-2 border border-border rounded-lg hover:bg-muted">⊞</button>
                      <button className="p-2 border border-border rounded-lg hover:bg-muted">≡</button>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Showing 73 results</p>
              </div>

              {/* Job Listings */}
              <div className="space-y-4">
                {jobListings.map((job) => (
                  <div
                    key={job.id}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-14 h-14 ${job.color} rounded-lg text-white flex items-center justify-center font-bold`}
                      >
                        {job.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {job.company} • {job.location}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {job.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full border border-border text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          {job.applied} applied of {job.capacity} capacity
                        </p>
                      </div>
                    </div>
                    <Link href={`/job/${job.id}` as Route}>
                      <Button className="bg-primary hover:bg-primary/90">Apply</Button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-8">
                <button className="px-3 py-2 border border-border rounded-lg text-muted-foreground hover:bg-muted">
                  ←
                </button>
                {[1, 2, 3, "...", 33].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 rounded-lg ${page === 1 ? "bg-primary text-white" : "border border-border text-muted-foreground hover:bg-muted"}`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 border border-border rounded-lg text-muted-foreground hover:bg-muted">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
