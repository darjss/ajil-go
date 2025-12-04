"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { Route } from "next"

const recommendedCompanies = [
  {
    id: 1,
    name: "Nomad",
    jobCount: 3,
    icon: "N",
    color: "bg-emerald-500",
    revenue: "$728,000 in sales (USD)",
    description: "Nomad is located in Paris, France",
    service: "Business Service",
  },
  {
    id: 2,
    name: "Discord",
    jobCount: 3,
    icon: "D",
    color: "bg-blue-500",
    revenue: "$1.2B in funding",
    description: "Well love to work with someone like you. We care about creating a delightful experience.",
    service: "Business Service",
  },
  {
    id: 3,
    name: "Maze",
    jobCount: 3,
    icon: "M",
    color: "bg-blue-400",
    revenue: "$250M in funding",
    description: "We're a passionate bunch working from all over the world to build the future of rapid testing.",
    service: "Business Service",
  },
  {
    id: 4,
    name: "Udacity",
    jobCount: 3,
    icon: "U",
    color: "bg-cyan-500",
    revenue: "$50M in funding",
    description:
      "Udacity is a new type of online university that teaches the actual programming and skills for career.",
    service: "Business Service",
  },
  {
    id: 5,
    name: "Webflow",
    jobCount: 3,
    icon: "W",
    color: "bg-purple-500",
    revenue: "$120M in funding",
    description: "Webflow is the first design and hosting platform built from the ground up for the mobile age.",
    service: "Business Service",
  },
  {
    id: 6,
    name: "Foundation",
    jobCount: 3,
    icon: "F",
    color: "bg-black",
    revenue: "$50M in funding",
    description:
      "Foundation helps creators mint and auction their digital artworks as NFTs on the Ethereum blockchain.",
    service: "Crypto",
  },
]

const companies = [
  { name: "Pentagram", count: "3 Jobs", icon: "P", color: "bg-red-600" },
  { name: "Wolff Olins", count: "3 Jobs", icon: "WO", color: "bg-black" },
  { name: "Clay", count: "3 Jobs", icon: "C", color: "bg-gray-800" },
  { name: "MediaMonks", count: "3 Jobs", icon: "M", color: "bg-gray-900" },
  { name: "Packer", count: "3 Jobs", icon: "P", color: "bg-orange-500" },
  { name: "Square", count: "3 Jobs", icon: "S", color: "bg-black" },
  { name: "Divvy", count: "3 Jobs", icon: "D", color: "bg-gray-600" },
  { name: "WebFlow", count: "3 Jobs", icon: "W", color: "bg-purple-500" },
]

const categories = [
  { name: "Design", icon: "✦" },
  { name: "Fintech", icon: "💳" },
  { name: "Hosting", icon: "🌐" },
  { name: "Business Service", icon: "💼" },
  { name: "Developer", icon: "< />" },
]

export default function BrowseCompaniesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Find your dream <span className="text-primary">companies</span>
              </h1>
              <p className="text-muted-foreground mb-8 text-lg">Find the dream companies you dream work for</p>

              {/* Search Bar */}
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Company name or keyword"
                  className="flex-1 px-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground"
                />
                <select className="px-4 py-3 border border-border rounded-lg bg-card text-foreground">
                  <option>Florence, Italy</option>
                </select>
                <Button className="bg-primary hover:bg-primary/90">Search</Button>
              </div>

              <p className="text-sm text-muted-foreground">Popular: Twitter, Microsoft, Apple, Facebook</p>
            </div>

            <div className="hidden md:block">
              <div className="bg-card rounded-lg p-8 text-center border border-border">
                <div className="text-4xl font-bold text-primary mb-2">5000+</div>
                <p className="text-muted-foreground">Jobs Available</p>
              </div>
            </div>
          </div>

          {/* Featured CTA */}
          <div className="bg-primary text-primary-foreground rounded-lg p-8 md:p-12 flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-2">Start posting jobs today</h2>
              <p className="text-primary-foreground/90">Start posting jobs for only $10</p>
            </div>
            <Button className="bg-white text-primary hover:bg-gray-100">Sign Up For Free</Button>
          </div>
        </section>

        {/* Recommended Companies */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Recommended <span className="text-primary">Companies</span>
            </h2>
            <p className="text-muted-foreground">Based on your profile, company preferences, and recent activity</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {recommendedCompanies.map((company) => (
              <Link key={company.id} href={`/company/${company.id}` as Route}>
                <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow h-full cursor-pointer">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 ${company.color} rounded-lg text-white flex items-center justify-center font-bold`}
                    >
                      {company.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{company.name}</h3>
                      <p className="text-sm text-primary">{company.jobCount} Jobs</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{company.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      {company.service}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Explore by Category */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Explore by <span className="text-primary">category</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-primary text-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer md:col-span-1 col-span-2 md:col-span-auto"
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <h3 className="font-semibold">{cat.name}</h3>
              </div>
            ))}
            <div className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer flex items-center justify-center">
              <span className="text-xl">→</span>
            </div>
          </div>
        </section>

        {/* Companies by Category - Design */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-foreground mb-2">Design</h2>
          <p className="text-muted-foreground mb-6">24 Results</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {companies.map((company) => (
              <div
                key={company.name}
                className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div
                  className={`w-16 h-16 ${company.color} rounded-lg text-white flex items-center justify-center font-bold text-lg mx-auto mb-4`}
                >
                  {company.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{company.name}</h3>
                <p className="text-sm text-primary">{company.count}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="#" className="text-primary hover:underline font-medium">
              View more Design companies →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
