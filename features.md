# Ajil-Go: Micro Task Marketplace

A TaskRabbit-like platform for finding people to do micro tasks.

## Core Features (Must Have)

### Authentication & Users
- [x] User registration with email/password
- [x] Social login (Google)
- [ ] User profile management (bio, phone, avatar, location)
- [ ] User skills management (add/remove skills)
- [ ] User dashboard with stats

### Task Management
- [ ] Create task with title, description, budget, deadline
- [ ] Edit/update own tasks
- [ ] Delete/cancel own tasks
- [ ] Task categories (predefined by admin)
- [ ] Task skill requirements
- [ ] Task location (remote or on-site with lat/lng)
- [ ] Task attachments (images, documents)
- [ ] Task search with filters (category, location, budget, status)
- [ ] Task listing with pagination

### Bidding System
- [ ] Submit bid on task with price and proposal
- [ ] View bids on own posted tasks
- [ ] Accept/reject bids
- [ ] Withdraw own bid
- [ ] One bid per user per task

### Task Workflow
- [ ] Task status management (open -> assigned -> in-progress -> completed -> reviewed)
- [ ] Mark task as started (worker)
- [ ] Mark task as completed (worker)
- [ ] Confirm task completion (poster)

### Reviews & Ratings
- [ ] Rate and review worker after task completion
- [ ] Rate and review task poster after task completion
- [ ] Display average ratings on user profiles
- [ ] View review history

## Secondary Features (Should Have)

### Notifications
- [ ] Email notification when bid received
- [ ] Email notification when bid accepted/rejected
- [ ] Email notification when task status changes
- [ ] Email notification for new messages

### Messaging
- [ ] Send messages within task context
- [ ] Message history per task
- [ ] Mark messages as read

### Payment Tracking (Simulated)
- [ ] Track payment status per task
- [ ] Simulated escrow (hold -> release -> refund)
- [ ] Payment history

### Search & Discovery
- [ ] Location-based task search (Redis geospatial)
- [ ] Search tasks by keyword
- [ ] Filter by category, budget range, deadline
- [ ] Sort by date, price, distance

## Nice to Have (If Time Permits)

### Enhanced Features
- [ ] Real-time notifications (WebSocket)
- [ ] Real-time chat
- [ ] Task templates for common jobs
- [ ] Saved/favorite tasks
- [ ] Worker availability calendar

### Verification & Trust
- [ ] Email verification badge
- [ ] Phone verification
- [ ] ID verification (simulated)
- [ ] Skill verification/badges
- [ ] Featured/trusted worker status

### Admin Panel
- [ ] Manage categories
- [ ] Manage predefined skills
- [ ] View all tasks and users
- [ ] Handle disputes
- [ ] Platform analytics

### Mobile Experience
- [ ] Responsive design
- [ ] PWA support
- [ ] Push notifications

## Technical Requirements

### Stack
- **Frontend**: Next.js (App Router), React, TailwindCSS, shadcn/ui
- **Backend**: Hono.js REST API
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Better Auth
- **Cache/Geo**: Redis (Upstash) for geospatial queries
- **Storage**: Cloud storage for file uploads
- **Email**: Email service for notifications

### Team Division (5 Members)

| Member | Area | Responsibilities |
|--------|------|------------------|
| 1 | Auth & Users | Profile management, skills, dashboard |
| 2 | Tasks | Task CRUD, categories, search/filter |
| 3 | Bidding & Workflow | Bid system, task status transitions |
| 4 | Reviews & Messaging | Rating system, email notifications, messages |
| 5 | Frontend Lead | UI components, API integration, responsive design |

## Database Models

- `User` (extended via Better Auth) - core user with profile fields
- `Skill` - predefined skills
- `CustomSkill` - user-created skills
- `UserSkill` - junction table for user skills
- `Category` - task categories
- `Task` - main task entity
- `TaskSkill` - required skills for a task
- `TaskBid` - bids on tasks
- `Review` - reviews between users
- `Message` - in-task messaging
- `TaskAttachment` - file attachments
- `Payment` - payment tracking (simulated)
