"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const companyDetails = {
  1: {
    name: "Stripe",
    icon: "S",
    color: "bg-blue-600",
    location: "Paris, France",
    founded: "July 31, 2011",
    employees: "4000+",
    industry: "Payment Gateway",
    website: "https://stripe.com",
    description:
      "Stripe is a software platform for starting and running internet businesses. Millions of businesses rely on Stripe's software tools to accept payments, expand globally, and manage their businesses online. Stripe has generated $728,000 in sales (USD).",
    techStack: ["HTML5", "CSS3", "JavaScript", "Ruby", "Magento"],
    officeLocations: [
      { country: "United States", flag: "🇺🇸" },
      { country: "England", flag: "🇬🇧" },
      { country: "Japan", flag: "🇯🇵" },
      { country: "Australia", flag: "🇦🇺" },
      { country: "China", flag: "🇨🇳" },
    ],
    teamMembers: [
      { name: "Celestin Gardinier", role: "CEO & Co-Founder", image: "👨‍💼" },
      { name: "Raymond Chribert", role: "Co-Founder", image: "👨‍💼" },
      { name: "Annette Black", role: "Managing Director", image: "👩‍💼" },
      { name: "Bernard Alexander", role: "Managing Director", image: "👨‍💼" },
      { name: "Christine Jhonson", role: "Managing Director", image: "👩‍💼" },
    ],
    jobCount: 7,
  },
}

const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Social Media Assistant",
    company: "Notify",
    location: "Paris, France",
    type: "Full-Time",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-cyan-500",
  },
  {
    id: 3,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full-Time",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, USA",
    type: "Full-Time",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-blue-400",
  },
  {
    id: 5,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-purple-500",
  },
  {
    id: 6,
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    type: "Full-Time",
    tags: ["Full-Time", "Marketing", "Design"],
    color: "bg-orange-500",
  },
]

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  const company = companyDetails[params.id as unknown as keyof typeof companyDetails] || companyDetails[1]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground">
          <span>Home</span> / <span>Companies</span> / <span>Nomad</span>
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
            <Button className="bg-primary hover:bg-primary/90">Apply</Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Company Profile */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Company Profile</h2>
                <p className="text-muted-foreground leading-relaxed">{company.description}</p>
              </section>

              {/* Tech Stack */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Tech stack</h2>
                <p className="text-muted-foreground mb-4">Stripe uses</p>
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
                  View tech stack →
                </Link>
              </section>

              {/* Office Location */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">Office Location</h2>
                <p className="text-muted-foreground mb-4">
                  Stripe offices spread across {company.officeLocations.length} countries
                </p>
                <div className="space-y-3">
                  {company.officeLocations.map((office) => (
                    <div key={office.country} className="flex items-center gap-3">
                      <span className="text-2xl">{office.flag}</span>
                      <span className="text-foreground">{office.country}</span>
                    </div>
                  ))}
                </div>
                <Link href="#" className="text-primary text-sm font-medium hover:underline mt-4 inline-block">
                  View countries →
                </Link>
              </section>

              {/* Team */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Team</h2>
                  <Link href="#" className="text-primary text-sm hover:underline font-medium">
                    See all (47)
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
                  <h2 className="text-2xl font-bold text-foreground">Open Jobs</h2>
                  <Link href="/find-jobs" className="text-primary text-sm hover:underline font-medium">
                    Show all jobs →
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {jobs.map((job) => (
                    <Link key={job.id} href={`/job/${job.id}`}>
                      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`w-10 h-10 ${job.color} rounded-lg text-white flex items-center justify-center font-bold text-sm `}
                          >
                            S
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
                <h3 className="font-semibold text-foreground mb-6">About this company</h3>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Founded</p>
                  <p className="text-sm font-semibold text-foreground">{company.founded}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Employees</p>
                  <p className="text-sm font-semibold text-foreground">{company.employees}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="text-sm font-semibold text-foreground">{company.location}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Industry</p>
                  <p className="text-sm font-semibold text-foreground">{company.industry}</p>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-xs text-muted-foreground mb-1">Job Openings</p>
                  <p className="text-sm font-semibold text-foreground">{company.jobCount} jobs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
