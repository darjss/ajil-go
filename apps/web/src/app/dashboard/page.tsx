"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const applicationHistory = [
  {
    id: 1,
    jobTitle: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    dateApplied: "24 July 2021",
    status: "In Review",
    icon: "N",
    color: "bg-emerald-500",
  },
  {
    id: 2,
    jobTitle: "Social Media Assistant",
    company: "Udacity",
    location: "New York, USA",
    dateApplied: "23 July 2021",
    status: "Shortlisted",
    icon: "U",
    color: "bg-cyan-500",
  },
  {
    id: 3,
    jobTitle: "Social Media Assistant",
    company: "Packer",
    location: "Madrid, Spain",
    dateApplied: "22 July 2021",
    status: "Declined",
    icon: "P",
    color: "bg-red-500",
  },
]

const upcomingInterviews = [
  {
    id: 1,
    name: "Joe Bartmann",
    role: "HR Manager at Divvy",
    time: "10:00 AM",
    date: "Today, 26 November",
    avatar: "👨‍💼",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="flex">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-64 bg-blue-50 border-r border-border">
          <div className="p-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-8">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">J</span>
              </div>
              <span className="text-foreground">JobHuntly</span>
            </Link>

            {/* Navigation */}
            <nav className="space-y-1">
              <NavItem
                icon="🏠"
                label="Dashboard"
                active={activeTab === "dashboard"}
                onClick={() => setActiveTab("dashboard")}
              />
              <NavItem
                icon="💬"
                label="Messages"
                badge={1}
                active={activeTab === "messages"}
                onClick={() => setActiveTab("messages")}
              />
              <NavItem
                icon="📋"
                label="My Applications"
                active={activeTab === "applications"}
                onClick={() => setActiveTab("applications")}
              />
              <NavItem icon="🔍" label="Find Jobs" active={activeTab === "jobs"} onClick={() => setActiveTab("jobs")} />
              <NavItem
                icon="🏢"
                label="Browse Companies"
                active={activeTab === "companies"}
                onClick={() => setActiveTab("companies")}
              />
              <NavItem
                icon="👤"
                label="My Public Profile"
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              />
            </nav>

            {/* Settings Section */}
            <div className="border-t border-border mt-6 pt-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">SETTINGS</p>
              <nav className="space-y-1">
                <NavItem icon="⚙️" label="Settings" />
                <NavItem icon="❓" label="Help Center" />
              </nav>
            </div>
          </div>

          {/* User Info */}
          <div className="absolute bottom-0 left-0 w-64 p-6 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-400 rounded-full text-white flex items-center justify-center">J</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Jake Gyll</p>
                <p className="text-xs text-muted-foreground truncate">jakegyll@email.com</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top Header */}
          <header className="border-b border-border bg-white sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 h-16">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative text-muted-foreground hover:text-foreground">🔔</button>
                <Link href="/" className="text-primary hover:underline text-sm font-medium">
                  Back to homepage
                </Link>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-6 md:p-8">
            {/* Greeting */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Good morning, Jake</h2>
              <p className="text-muted-foreground">
                Here is what's happening with your job search applications from July 19 - July 25.
              </p>
            </div>

            {/* Date Range Selector */}
            <div className="mb-8 flex items-center gap-4">
              <Button variant="outline" className="text-sm bg-transparent">
                Jul 19 - Jul 25 📅
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Total Jobs Applied */}
              <StatCard title="Total Jobs Applied" value="45" icon="📄" trend="up" />

              {/* Jobs Applied Status */}
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Jobs Applied Status</h3>
                <div className="flex items-center gap-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#5B21B6"
                        strokeWidth="8"
                        strokeDasharray={`${45 * Math.PI * 0.6 * 2} ${45 * Math.PI * 2}`}
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="45"
                        fill="none"
                        stroke="#DBEAFE"
                        strokeWidth="8"
                        strokeDasharray={`${45 * Math.PI * 0.4 * 2} ${45 * Math.PI * 2}`}
                        strokeDashoffset={`-${45 * Math.PI * 0.6 * 2}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      <span className="text-sm text-foreground">60% Unsuitable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
                      <span className="text-sm text-foreground">40% Interviewed</span>
                    </div>
                  </div>
                </div>
                <Link href="#" className="text-primary text-sm font-medium hover:underline mt-4 inline-block">
                  View All Applications →
                </Link>
              </div>

              {/* Upcoming Interviews */}
              <div className="bg-white border border-border rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Upcoming Interviews</h3>
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div key={interview.id}>
                      <p className="text-sm font-medium text-foreground">{interview.date}</p>
                      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-foreground">{interview.time}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="text-2xl">{interview.avatar}</div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{interview.name}</p>
                            <p className="text-xs text-muted-foreground">{interview.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Applications History */}
            <div className="bg-white border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-6">Recent Applications History</h3>

              <div className="space-y-4">
                {applicationHistory.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`w-12 h-12 ${app.color} rounded-lg text-white flex items-center justify-center font-bold `}
                      >
                        {app.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground">{app.jobTitle}</h4>
                        <p className="text-sm text-muted-foreground">
                          {app.company} • {app.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Date Applied</p>
                      <p className="text-sm font-semibold text-foreground">{app.dateApplied}</p>
                    </div>
                    <div className="ml-4">
                      <StatusBadge status={app.status} />
                    </div>
                    <button className="ml-4 text-muted-foreground hover:text-foreground">⋯</button>
                  </div>
                ))}
              </div>

              <Link href="#" className="text-primary text-sm font-medium hover:underline mt-6 inline-block">
                View all applications history →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function NavItem({
  icon,
  label,
  badge,
  active,
  onClick,
}: {
  icon: string
  label: string
  badge?: number
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-blue-100 text-foreground"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  )
}

function StatCard({
  title,
  value,
  icon,
  trend,
}: {
  title: string
  value: string
  icon: string
  trend?: "up" | "down"
}) {
  return (
    <div className="bg-white border border-border rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-4xl font-bold text-foreground">{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "In Review": "bg-yellow-100 text-yellow-700",
    Shortlisted: "bg-blue-100 text-blue-700",
    Declined: "bg-red-100 text-red-700",
  }

  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${colors[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  )
}
