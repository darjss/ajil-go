# Ajil-GO Frontend Overhaul Tasks

## Design Direction: Pastel Gumroad-Inspired

**Reference**: Gumroad's clean, friendly aesthetic but softer/less brutalist
- Soft pastel color palette (lavender, soft pink, mint, peach, cream)
- Light/cream backgrounds instead of dark gradients
- Rounded corners, soft shadows, friendly feel
- No harsh dark gradients or brutalist elements
- Clean typography with good whitespace
- Subtle pastel accents, not saturated colors

## Phase 1: Theme & Design System

- [x] Define Ocean Blue/Slate color theme in CSS variables (OLD - to be replaced)
- [x] Light mode theme variables (OLD)
- [x] Dark mode theme variables (OLD)
- [x] Add success/warning/info semantic colors (OLD)
- [ ] **NEW: Define pastel color palette** - lavender primary, soft pink accent, mint success, peach warning
- [ ] **NEW: Update light mode with cream/white backgrounds, pastel accents**
- [ ] **NEW: Update dark mode with softer dark tones, pastel highlights**
- [ ] **NEW: Remove all gradient-heavy patterns from design system**

## Phase 2: Shared Utilities & Components

- [x] Create `lib/utils.ts` with formatCurrency, formatDate, formatTimeAgo, getInitials
- [x] Create `StarRating` component
- [x] Create `StatusBadge` component (task & bid statuses)
- [x] Create `UserAvatar` component
- [x] Create `StatCard` and `StatCardSkeleton` components
- [x] Create `PageHeader` and `PageSection` components
- [x] Create `EmptyState`, `LoadingState`, `ErrorState` components
- [x] Install shadcn Form component with react-hook-form

## Phase 3: Query Layer

- [x] Create `queries/skills.ts` for skills data
- [x] Export skills from `queries/index.ts`

## Phase 4: Layout Components

- [x] Refactor Header - semantic colors, no gradients (OLD)
- [x] Refactor Footer - semantic colors, no gradients (OLD)
- [x] Refactor Worker Sidebar - semantic colors, no gradients (OLD)
- [x] Refactor Client Sidebar - semantic colors, no gradients (OLD)
- [ ] **NEW: Redesign Header** - pastel palette, softer look, clean navigation
- [ ] **NEW: Redesign Footer** - pastel palette, friendly footer
- [ ] **NEW: Redesign Worker Sidebar** - pastel accents, soft active states
- [ ] **NEW: Redesign Client Sidebar** - pastel accents, soft active states

## Phase 5: Public Pages (site)

- [ ] **Homepage (`/`)** - complete redesign with pastel theme
  - [ ] Hero section: Remove dark gradient, use light bg with pastel accents
  - [ ] Categories section: Pastel category cards
  - [ ] Featured tasks: Cleaner task cards with pastel badges
  - [ ] How it works: Soft pastel step indicators
  - [ ] Stats section: Clean stats with pastel icons
  - [ ] CTA section: Light/pastel CTA instead of dark gradient
- [ ] **Tasks Browse (`/tasks`)** - pastel filters, clean task cards
- [ ] **Task Detail (`/task/[id]`)** - pastel sections, react-hook-form for bids
- [ ] **Public User Profile (`/user/[id]`)** - pastel profile cards
- [ ] **Login page (`/login`)** - friendly pastel auth UI
- [ ] **Signup page (`/signup`)** - friendly pastel auth UI

## Phase 6: Worker Dashboard Pages

- [x] Refactor Worker Dashboard (`/worker/dashboard`) - use StatCard, PageHeader (OLD)
- [ ] **NEW: Redesign Worker Dashboard** - pastel stat cards, clean layout
- [ ] **Worker Bids (`/worker/bids`)** - pastel status badges, clean table
- [ ] **Worker Tasks (`/worker/tasks`)** - pastel task cards
- [ ] **Worker Messages (`/worker/messages`)** - soft chat UI
- [ ] **Worker Profile (`/worker/profile`)** - pastel profile editor, react-hook-form
- [ ] **Worker Settings (`/worker/settings`)** - clean settings UI

## Phase 7: Client Dashboard Pages

- [x] Refactor Client Dashboard (`/client/dashboard`) - use StatCard, PageHeader (OLD)
- [ ] **NEW: Redesign Client Dashboard** - pastel stat cards, clean layout
- [ ] **Client Tasks (`/client/tasks`)** - pastel task management
- [ ] **Client Task Bids (`/client/tasks/[id]/bids`)** - pastel bid cards
- [ ] **Client Post Task (`/client/post-task`)** - friendly form with pastel accents, react-hook-form
- [ ] **Client Messages (`/client/messages`)** - soft chat UI
- [ ] **Client Settings (`/client/settings`)** - clean settings UI

## Phase 8: Role Selection

- [ ] **Dashboard Role Selection (`/dashboard`)** - pastel role cards

## Phase 9: Forms Refactoring (react-hook-form + shadcn Form)

- [ ] Bid submission form (task detail page)
- [ ] Post task form (client post-task page)
- [ ] Profile edit form (worker profile page)
- [ ] Login form
- [ ] Signup form

## Phase 10: Code Quality & Cleanup

- [ ] Remove all inline utility functions (use lib/utils.ts)
- [ ] Remove all hardcoded slate/emerald/cyan/amber colors
- [ ] Remove all gradient classes (bg-gradient-to-*, from-*, to-*)
- [ ] Replace dark hero sections with light pastel alternatives
- [ ] Ensure all pages work in dark mode (with pastel dark theme)
- [ ] Fix array index key warnings
- [ ] Add explicit type prop to all buttons

## Phase 11: Testing & Polish

- [ ] Verify light mode looks correct with pastel theme
- [ ] Verify dark mode looks correct with pastel dark theme
- [ ] Verify all forms submit correctly
- [ ] Verify navigation works
- [ ] Run TypeScript type check
- [ ] Visual QA pass on all pages

---

## Phase 12: Missing Pages & Features

### 12.1 Client Profile Page (`/client/profile`)
- [ ] Create `/client/profile/page.tsx` - similar to worker profile but for clients
- [ ] Display client stats (tasks posted, completed, avg rating as client)
- [ ] Show reviews received as a client (WORKER_TO_CLIENT reviews)
- [ ] Profile edit form with react-hook-form (name, bio, phone, address, city)
- [ ] Reuse profile components from worker profile where possible

### 12.2 Task Edit Page (`/client/tasks/[id]/edit`)
- [ ] Create `/client/tasks/[id]/edit/page.tsx`
- [ ] Pre-populate form with existing task data
- [ ] Use react-hook-form with Zod validation (reuse CreateTaskBody schema)
- [ ] Only allow editing OPEN status tasks
- [ ] Redirect to task detail page after successful edit

### 12.3 Review Submission Page (`/task/[id]/review`)
- [ ] Create `/(site)/task/[id]/review/page.tsx`
- [ ] Check user is task poster OR assigned worker
- [ ] Check task status is COMPLETED or REVIEWED
- [ ] Determine review type based on user role (CLIENT_TO_WORKER or WORKER_TO_CLIENT)
- [ ] Star rating input (1-5)
- [ ] Comment textarea (optional, max 1000 chars)
- [ ] Submit via reviews API
- [ ] Redirect to task detail page after submission
- [ ] Show error if user already submitted a review for this task

### 12.4 Email Verification Page (`/verify-email`)
- [ ] Create `/(site)/verify-email/page.tsx`
- [ ] Handle verification token from URL params
- [ ] Show success/error states
- [ ] Redirect to dashboard on success

---

## Phase 13: Component Extraction & Consolidation

### 13.1 Homepage Components → `components/home/`
Extract from `(site)/page.tsx` (741 lines):
- [ ] `components/home/hero-section.tsx` - Hero with stats card
- [ ] `components/home/categories-section.tsx` - Category grid with cards
- [ ] `components/home/category-card.tsx` - Individual category card
- [ ] `components/home/featured-tasks-section.tsx` - Recent tasks grid
- [ ] `components/home/how-it-works-section.tsx` - Steps for clients & workers
- [ ] `components/home/stats-section.tsx` - Platform statistics
- [ ] `components/home/cta-section.tsx` - Call to action
- [ ] `components/home/index.ts` - Barrel export

### 13.2 Task Components → `components/tasks/`
Extract from `(site)/tasks/page.tsx` (821 lines) and `(site)/task/[id]/page.tsx` (831 lines):
- [ ] `components/tasks/task-card.tsx` - Task card for listings (reusable across homepage, browse, dashboards)
- [ ] `components/tasks/task-card-skeleton.tsx` - Loading skeleton for task card
- [ ] `components/tasks/task-grid.tsx` - Grid layout for task cards
- [ ] `components/tasks/task-filters.tsx` - Search, category, location, budget filters
- [ ] `components/tasks/task-header.tsx` - Task detail page header (title, status, poster info)
- [ ] `components/tasks/task-details.tsx` - Task description, budget, deadline, location
- [ ] `components/tasks/skill-badges.tsx` - Display skill tags (reusable)
- [ ] `components/tasks/index.ts` - Barrel export

### 13.3 Bid Components → `components/bids/`
Extract from `(site)/task/[id]/page.tsx`, `client/tasks/[id]/bids/page.tsx`, `worker/bids/page.tsx`:
- [ ] `components/bids/bid-card.tsx` - Individual bid display
- [ ] `components/bids/bid-card-skeleton.tsx` - Loading skeleton
- [ ] `components/bids/bid-list.tsx` - List of bids with empty state
- [ ] `components/bids/bid-form.tsx` - Bid submission form with react-hook-form
- [ ] `components/bids/bid-actions.tsx` - Accept/reject buttons for task owner
- [ ] `components/bids/index.ts` - Barrel export

### 13.4 User/Profile Components → `components/users/`
Extract from `(site)/user/[id]/page.tsx` (511 lines) and `worker/profile/page.tsx` (644 lines):
- [ ] `components/users/profile-header.tsx` - Avatar, name, rating, stats
- [ ] `components/users/profile-stats.tsx` - Stats grid (tasks completed, rating, etc.)
- [ ] `components/users/skills-list.tsx` - Display user skills
- [ ] `components/users/skills-manager.tsx` - Add/remove skills (for profile edit)
- [ ] `components/users/review-card.tsx` - Individual review display
- [ ] `components/users/review-card-skeleton.tsx` - Loading skeleton
- [ ] `components/users/review-list.tsx` - List of reviews with tabs/filters
- [ ] `components/users/profile-form.tsx` - Profile edit form with react-hook-form
- [ ] `components/users/index.ts` - Barrel export

### 13.5 Messaging Components → `components/messages/` (CONSOLIDATION)
Consolidate `worker/messages/page.tsx` (607 lines) and `client/messages/page.tsx` (606 lines):
- [ ] `components/messages/conversation-list.tsx` - Sidebar with conversation list
- [ ] `components/messages/conversation-item.tsx` - Individual conversation preview
- [ ] `components/messages/conversation-list-skeleton.tsx` - Loading skeleton
- [ ] `components/messages/chat-header.tsx` - Selected conversation header
- [ ] `components/messages/message-bubble.tsx` - Individual message display
- [ ] `components/messages/message-input.tsx` - Message input with send button
- [ ] `components/messages/messages-page.tsx` - Full page component accepting `role: "worker" | "client"` prop
- [ ] `components/messages/index.ts` - Barrel export
- [ ] Refactor `worker/messages/page.tsx` to use `<MessagesPage role="worker" />`
- [ ] Refactor `client/messages/page.tsx` to use `<MessagesPage role="client" />`

### 13.6 Form Schemas → `lib/schemas/`
Create centralized Zod schemas for forms:
- [ ] `lib/schemas/auth.ts` - Login, signup schemas
- [ ] `lib/schemas/task.ts` - Create task, update task schemas
- [ ] `lib/schemas/bid.ts` - Create bid, update bid schemas
- [ ] `lib/schemas/review.ts` - Create review schema
- [ ] `lib/schemas/profile.ts` - Update profile schema
- [ ] `lib/schemas/message.ts` - Create message schema
- [ ] `lib/schemas/index.ts` - Barrel export

---

## Phase 14: Code Quality & Deduplication

### 14.1 Remove Inline Utility Functions
These files have duplicated utility functions that should use `lib/utils.ts`:
- [ ] `(site)/page.tsx` - Remove `formatBudget`, `formatTimeAgo` (use lib/utils)
- [ ] `(site)/tasks/page.tsx` - Remove `formatBudget`, `formatTimeAgo` (use lib/utils)
- [ ] `(site)/task/[id]/page.tsx` - Remove `formatBudget`, `formatTimeAgo`, `formatDate` (use lib/utils)
- [ ] `(site)/user/[id]/page.tsx` - Remove `formatDate` (use lib/utils)
- [ ] `worker/messages/page.tsx` - Remove `formatMessageTime`, `formatFullTime` (add to lib/utils)
- [ ] `client/messages/page.tsx` - Remove `formatMessageTime`, `formatFullTime` (add to lib/utils)
- [ ] `worker/profile/page.tsx` - Remove `formatDate` (use lib/utils)
- [ ] `worker/bids/page.tsx` - Remove duplicate formatters (use lib/utils)
- [ ] `worker/tasks/page.tsx` - Remove duplicate formatters (use lib/utils)
- [ ] `client/tasks/page.tsx` - Remove duplicate formatters (use lib/utils)
- [ ] `client/tasks/[id]/bids/page.tsx` - Remove duplicate formatters (use lib/utils)
- [ ] `client/post-task/page.tsx` - Remove duplicate formatters (use lib/utils)

### 14.2 Add Missing Utility Functions to `lib/utils.ts`
- [ ] Add `formatBudget(min: number, max: number | null): string`
- [ ] Add `formatMessageTime(date: Date): string` - Short format (Одоо, 5м, 2ц, 3ө)
- [ ] Add `formatFullTime(date: Date): string` - HH:MM format

### 14.3 Use Shared State Components
Replace inline EmptyState/LoadingState definitions with `components/states.tsx`:
- [ ] `worker/messages/page.tsx` - Use shared EmptyState
- [ ] `client/messages/page.tsx` - Use shared EmptyState
- [ ] `(site)/tasks/page.tsx` - Use shared EmptyState, LoadingState
- [ ] `worker/bids/page.tsx` - Use shared EmptyState
- [ ] `worker/tasks/page.tsx` - Use shared EmptyState
- [ ] `client/tasks/page.tsx` - Use shared EmptyState

### 14.4 Fix Type Safety Issues
- [ ] Add explicit `type="button"` or `type="submit"` to all Button components
- [ ] Replace array index keys with stable IDs where possible
- [ ] Ensure all async handlers are properly typed

---

## Phase 15: Reviews Integration

### 15.1 Add Reviews Query Layer
- [ ] Create `lib/queries/reviews.ts` with review query functions
- [ ] Export from `lib/queries/index.ts`

### 15.2 Review Prompt After Task Completion
- [ ] Add "Leave a Review" button on task detail page when:
  - Task status is COMPLETED or REVIEWED
  - Current user is poster or assigned worker
  - User hasn't already reviewed
- [ ] Link to `/task/[id]/review` page

### 15.3 Display Reviews on Task Detail
- [ ] Show reviews section on completed task detail page
- [ ] Display both CLIENT_TO_WORKER and WORKER_TO_CLIENT reviews

---

## Implementation Priority Order

**Priority 1 - Code Quality (do first, makes other work easier):**
1. Phase 14.2 - Add missing utility functions
2. Phase 14.1 - Remove inline utility functions
3. Phase 13.6 - Create form schemas

**Priority 2 - Component Extraction (reduces code duplication):**
1. Phase 13.5 - Messaging consolidation (biggest win, ~1200 lines → ~300 lines)
2. Phase 13.2 - Task components (reused across 5+ pages)
3. Phase 13.4 - User/Profile components
4. Phase 13.3 - Bid components
5. Phase 13.1 - Homepage components

**Priority 3 - Missing Features:**
1. Phase 12.3 - Review submission page (completes core workflow)
2. Phase 15 - Reviews integration
3. Phase 12.2 - Task edit page
4. Phase 12.1 - Client profile page
5. Phase 12.4 - Email verification (lower priority)

**Priority 4 - Design Updates (after functionality is solid):**
1. Phases 1-8, 10-11 (pastel theme redesign)
