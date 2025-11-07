# Wireframe App - Full Application Structure & Routing

## Project Overview
A React + TypeScript wireframe application for a freelance marketplace/contract management platform.

**Tech Stack:**
- React 18.2
- TypeScript 5.6
- React Router 6.28
- Vite 5.4

---

## Complete Page Structure & Navigation Flow

### 1. Authentication Flow (Public Routes)

#### `/` - Sign In Page
- **File:** [src/pages/auth/SignIn.tsx](src/pages/auth/SignIn.tsx)
- **Purpose:** Landing page with sign-in form
- **Links to:**
  - `/sign-up` - Create account
  - `/kyc` - KYC verification
  - `/main` - Skip to main (demo shortcut)

#### `/sign-up` - Sign Up Page
- **File:** [src/pages/auth/SignUp.tsx](src/pages/auth/SignUp.tsx)
- **Purpose:** Account creation/registration
- **Links to:**
  - `/` - Back to sign in

#### `/kyc` - KYC Verification Gate
- **File:** [src/pages/kyc/KycGate.tsx](src/pages/kyc/KycGate.tsx)
- **Purpose:** Know Your Customer verification status
- **Current State:** Shows mock "approved" status
- **Links to:**
  - `/main` - Go to main application

---

### 2. Main Application (Protected Routes with Shell Layout)

**Shell Component** provides:
- Header with app branding ("Wireframe" logo)
- Top navigation bar with links to all main sections
- Active route highlighting

#### `/main` - Main Dashboard
- **File:** [src/pages/main/MainPage.tsx](src/pages/main/MainPage.tsx)
- **Purpose:** Central hub with quick access cards
- **Quick Access Cards:**
  - Edit Profile → `/user/edit`
  - My Proposals → `/proposals/mine`
  - Incoming Offers → `/proposals/incoming`
  - My Contracts → `/contracts`
  - Chats → `/chats`

---

### 3. Proposals Module

#### `/proposals/incoming` - Incoming Offers List
- **File:** [src/pages/proposals/IncomingList.tsx](src/pages/proposals/IncomingList.tsx)
- **Purpose:** View proposals/offers received from others
- **Data Source:** `apiListIncoming()` from mockApi
- **Displays:** Title, budget range, author, status
- **Actions:**
  - Open proposal → `/proposals/:id`

#### `/proposals/mine` - My Proposals List
- **File:** [src/pages/proposals/MyList.tsx](src/pages/proposals/MyList.tsx)
- **Purpose:** View proposals you have sent
- **Data Source:** `apiListMine()` from mockApi
- **Displays:** Title, budget range, status
- **Actions:**
  - Open proposal → `/proposals/:id`

#### `/proposals/:id` - Proposal Details Page
- **File:** [src/pages/proposals/Details.tsx](src/pages/proposals/Details.tsx)
- **Purpose:** View individual proposal with full details
- **Data Source:** `apiGetProposal(id)` from mockApi
- **Features:**
  - Budget information
  - Job description section
  - Embedded chat interface (mock)
  - Action buttons:
    - Counter Offer (shows alert modal - mock)
    - Approve → Create Contract (navigates to `/contracts/c1`)
    - Decline (navigates back)

---

### 4. Contracts Module

#### `/contracts` - Contract List
- **File:** [src/pages/contracts/ContractList.tsx](src/pages/contracts/ContractList.tsx)
- **Purpose:** View all contracts overview
- **Data Source:** `apiListContracts()` from mockApi
- **Displays:** Title, role (client/freelancer), status
- **Actions:**
  - Open contract → `/contracts/:id`

#### `/contracts/:id` - Contract Page (Tabbed Interface)
- **File:** [src/pages/contracts/ContractPage.tsx](src/pages/contracts/ContractPage.tsx)
- **Purpose:** Detailed contract management with multiple sections
- **Tab Navigation:**
  - **Overview** - Contract summary
  - **Milestones** - Payment milestones management
  - **Chat** - Contract-specific chat
  - **Files** - Shared documents
  - **Activity** - Timeline of events

##### Contract Tabs Detail:

**Overview Tab**
- **File:** [src/pages/contracts/tabs/OverviewTab.tsx](src/pages/contracts/tabs/OverviewTab.tsx)
- **Shows:** Client/freelancer info, total amount, status, progress

**Milestones Tab**
- **File:** [src/pages/contracts/tabs/MilestonesTab.tsx](src/pages/contracts/tabs/MilestonesTab.tsx)
- **Shows:** List of payment milestones
- **Actions per Milestone:** Fund, Submit, Approve, Dispute, Withdraw buttons
- **Example Milestones:** Design ($500), Dev ($800), Launch ($200)

**Chat Tab**
- **File:** [src/pages/contracts/tabs/ChatTab.tsx](src/pages/contracts/tabs/ChatTab.tsx)
- **Shows:** Chat messages placeholder within contract context

**Files Tab**
- **File:** [src/pages/contracts/tabs/FilesTab.tsx](src/pages/contracts/tabs/FilesTab.tsx)
- **Shows:** List of shared files (currently: spec.pdf, design.png)

**Activity Tab**
- **File:** [src/pages/contracts/tabs/ActivityTab.tsx](src/pages/contracts/tabs/ActivityTab.tsx)
- **Shows:** Timeline of contract events (milestone funding, approvals, etc.)

---

### 5. Chat Module

#### `/chats` - Chat List
- **File:** [src/pages/chats/ChatList.tsx](src/pages/chats/ChatList.tsx)
- **Purpose:** List of all chat conversations
- **Current Chats:**
  - Contract: Website build → `/chats/1`
  - Proposal: Landing redesign → `/chats/2`

#### `/chats/:id` - Chat Dialog
- **File:** [src/pages/chats/ChatDialog.tsx](src/pages/chats/ChatDialog.tsx)
- **Purpose:** Individual chat conversation thread
- **Shows:** Messages placeholder with dialog ID

---

### 6. Notifications Module

#### `/notifications` - Notifications List
- **File:** [src/pages/notifications/NotificationsList.tsx](src/pages/notifications/NotificationsList.tsx)
- **Purpose:** View all notifications with read/unread status
- **Data Source:** `apiListNotifications()` from mockApi
- **Features:**
  - Bell icon in header with unread count badge
  - Auto-polls every 30 seconds for new notifications
  - Type-specific icons and colors (new_bid, message, status_change, contract)
  - Mark as read on click
  - "Mark all as read" button
  - Relative time formatting (e.g., "2h ago", "3d ago")
  - Links to relevant pages (jobs, proposals, contracts, chats)
- **Notification Types:**
  - 💼 New Bid - When someone submits a bid on your job
  - 💬 Message - New chat messages
  - 🔄 Status Change - Proposal accepted/rejected
  - 📝 Contract - Contract events

---

### 7. User Profile Module

#### `/user/edit` - Edit Profile
- **File:** [src/pages/user/EditProfile.tsx](src/pages/user/EditProfile.tsx)
- **Purpose:** Edit user profile information
- **Fields:**
  - Name input
  - Avatar URL input
- **Actions:** Save button (mock)

---

## Data Models

**Location:** [src/lib/mockApi.ts](src/lib/mockApi.ts)

### Proposal Type
```typescript
{
  id: string;
  author: string;
  title: string;
  budgetMin: number;
  budgetMax: number;
  status: "sent" | "in_discussion";
}
```

### Contract Type
```typescript
{
  id: string;
  title: string;
  role: "client" | "freelancer";
  status: "pending" | "active" | "completed";
}
```

### Notification Type
```typescript
{
  id: string;
  type: "new_bid" | "message" | "status_change" | "contract";
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}
```

### Mock Data
- **Incoming Proposals:** 2 items (from Haim, David)
- **My Proposals:** 1 item (React migration)
- **Contracts:** 2 items (Website build, Mobile app QA)
- **Notifications:** 5 items (2 unread, 3 read)

---

## Navigation Architecture

```
/ (Sign In)
├── /sign-up
├── /kyc
│
└── [Shell Layout]
    ├── /main (Dashboard)
    │
    ├── /jobs ✨ NEW
    │   ├── /browse (Browse Jobs - Marketplace)
    │   ├── /my-posts (My Job Posts - As Client)
    │   ├── /create (Post a Job)
    │   └── /:jobId/bids (View Bids for Job)
    │
    ├── /proposals
    │   ├── /incoming (Incoming Offers from Clients)
    │   ├── /mine (My Bids on Jobs)
    │   ├── /received (Bids Received on My Jobs) ✨ NEW
    │   ├── /create (Create Proposal/Bid) ✨ UPDATED
    │   └── /:id (Proposal Details) ✨ UPDATED
    │
    ├── /contracts
    │   ├── / (List)
    │   └── /:id (Contract Page with Tabs)
    │       ├── Overview
    │       ├── Milestones
    │       ├── Chat
    │       ├── Files
    │       └── Activity
    │
    ├── /chats
    │   ├── / (List)
    │   └── /:id (Dialog)
    │
    ├── /notifications ✨ NEW
    │   └── / (Notifications List)
    │
    └── /user
        └── /edit (Profile)
```

---

## Recently Implemented Features ✨

### 1. Complete Job Posting & Bidding System

**New Pages Added:**
1. ✅ **Browse Jobs** (`/jobs/browse`) - Marketplace to find and bid on jobs
2. ✅ **My Job Posts** (`/jobs/my-posts`) - Jobs you posted as a client
3. ✅ **Post a Job** (`/jobs/create`) - Create new job posting with form
4. ✅ **Job Details** (`/jobs/:id`) - View full job description before bidding
5. ✅ **Job Bids** (`/jobs/:jobId/bids`) - View all bids for a specific job with actions
6. ✅ **Received Bids** (`/proposals/received`) - All bids received on your job posts
7. ✅ **Create Proposal** (`/proposals/create`) - Submit bid on a job (with jobId parameter)

**Enhanced Existing Pages:**
- ✅ **Proposal Details** - Context-aware actions for incoming offers vs your bids
- ✅ **Incoming Offers** - Proper workflow with Counter Offer, Accept, Decline
- ✅ **My Bids** - Shows job context, status badges, conditional actions
- ✅ **Main Dashboard** - Reorganized into Freelancer/Client/General sections

**New Components:**
- ✅ **FormInput** - Reusable input component with validation
- ✅ **FormTextarea** - Reusable textarea component

**Data Model Updates:**
- ✅ Added `Job` type with marketplace data
- ✅ Updated `Proposal` type with `jobId`, `jobTitle`, and enhanced status
- ✅ Complete mock data for jobs, bids, and offers
- ✅ New API functions: `apiBrowseJobs`, `apiCreateJob`, `apiGetJobBids`, etc.

---

### 2. Notification System

**New Pages Added:**
1. ✅ **Notifications List** (`/notifications`) - View all notifications with read/unread status

**Header Enhancement:**
- ✅ **Bell Icon with Badge** - Shows unread notification count in header navigation
- ✅ **Auto-Polling** - Checks for new notifications every 30 seconds

**Features:**
- ✅ Type-specific icons and colors (💼 new_bid, 💬 message, 🔄 status_change, 📝 contract)
- ✅ Mark as read on click
- ✅ "Mark all as read" button
- ✅ Relative time formatting (e.g., "2h ago", "3d ago")
- ✅ Visual distinction between read/unread (background color, blue dot)
- ✅ Direct links to relevant pages

**Data Model Updates:**
- ✅ Added `Notification` type with read status and timestamps
- ✅ Mock notifications data (5 items, 2 unread)
- ✅ New API functions: `apiListNotifications`, `apiGetUnreadCount`, `apiMarkNotificationRead`, `apiMarkAllNotificationsRead`

---

## Still Missing/Potential Pages

### Critical Missing Pages:

1. **User Profile View** (`/user/:id` or `/profile/:id`)
   - Currently only edit page exists
   - Should show public profile of other users (clients/freelancers)

2. **Settings Page** (`/settings`)
   - Account settings, preferences, payment methods, etc.

### Nice-to-Have Pages:

3. **Dashboard/Analytics** (`/dashboard` or enhanced `/main`)
   - Earnings overview, active contracts summary, metrics

4. **Payment History** (`/payments` or `/transactions`)
   - Transaction history, invoices, payment methods

5. **Dispute Resolution** (`/disputes/:id`)
   - Dedicated page for handling milestone disputes

6. **Help/Support** (`/help` or `/support`)
   - FAQ, contact support, documentation

7. **Search Results** (`/search`)
   - Global search for proposals, contracts, users

8. **Forgot Password Flow** (`/forgot-password`, `/reset-password`)
   - Password recovery pages

9. **Email Verification** (`/verify-email`)
    - Email confirmation page

---

## Route Configuration

**File:** [src/app/routes.tsx](src/app/routes.tsx)

Uses `createBrowserRouter` from React Router v6 with nested routes under Shell layout.

---

## Styling

**Global Styles:** [index.html](index.html)
- Minimal inline CSS
- Utility classes: `.wrap`, `.grid`, `.card`, `.tabbar`
- Navigation styling with `.active` state
- System font stack

---

## Current Implementation Status

### ✅ Fully Implemented:
- All authentication flow pages (Sign In, Sign Up, KYC)
- Main dashboard organized by role (Freelancer/Client/General)
- **Complete Job Marketplace System:**
  - Browse jobs with submission workflow
  - Job details page with full description
  - Post jobs as a client
  - View and manage bids on posted jobs
  - Context-aware bid management (Discuss, Accept, Reject)
- **Complete Proposal/Bid System:**
  - Incoming job offers (direct from clients)
  - My bids on marketplace jobs
  - Received bids on your job posts
  - Create proposals/bids with job context
  - Proposal details with role-based actions
- **Notification System:**
  - Bell icon in header with unread count badge
  - Notifications list page with read/unread status
  - Auto-polling for new notifications
  - Type-specific icons and colors
  - Mark as read functionality
- **Reusable Form Components:**
  - FormInput with validation
  - FormTextarea for descriptions
- Contract listing and details with 5 tabs (Overview, Milestones, Chat, Files, Activity)
- Chat list and dialog placeholders
- User profile editing
- Comprehensive mock API with async simulation
- **Navigation improvements:**
  - Back buttons on detail pages
  - Status badges with colors
  - Conditional action buttons based on status
  - Context-aware routing

### ⚠️ Incomplete/Mock (UI exists, logic needs work):
- Chat functionality (placeholder only, no real messaging)
- File upload/download (UI shown, no actual files)
- Payment processing (buttons exist, no real transactions)
- Dispute resolution (buttons exist, no workflow)
- User authentication (no auth state management, direct navigation)
- All data is mocked (no real backend API integration)
- Form submissions work but don't persist to real database

### ❌ Still Missing:
- Public user profiles (can't view other users)
- Settings page (no app configuration)
- Payment history page
- Help/documentation pages
- Search functionality (no filtering or search)

---

## Next Steps Recommendations

### High Priority:
1. ✅ ~~**Implement Create Proposal Page**~~ - **COMPLETED**
2. ✅ ~~**Add Job Browse/Search**~~ - **COMPLETED**
3. ✅ ~~**Add Job Details Page**~~ (`/jobs/:id`) - **COMPLETED**
4. ✅ ~~**Build Notification System**~~ - **COMPLETED**
5. **Create Settings Page** - User preferences, payment methods, notification settings
6. **Add User Profile View** (`/user/:id`) - See public profiles of other users
7. **Add State Management** - Context or Redux for auth state, user data, real-time updates

### Medium Priority:
8. **Implement Real Backend API** - Replace mock data with actual backend
9. **Add Search/Filter Functionality** - Filter jobs by category, budget, date
10. **Build Real Chat System** - Replace placeholder with actual messaging
11. **File Upload/Management** - Real file handling for contracts and proposals
12. **Add Job Categories/Tags** - Organize jobs by type (design, development, etc.)

### Low Priority:
13. **Payment History Page** - Transaction logs and invoices
14. **Analytics Dashboard** - Earnings, active contracts, performance metrics
15. **Help/Documentation** - FAQ, guides, support contact
16. **Advanced Filters** - Location, skills required, project duration
17. **Reviews/Ratings System** - Rate clients and freelancers after contracts

---

## Summary

The application now has a **complete dual-role marketplace system** where users can:
- **As Freelancers:** Browse jobs, submit bids, receive direct offers, manage proposals
- **As Clients:** Post jobs, receive bids, review and manage proposals, hire freelancers

All major workflows are implemented with proper navigation, back buttons, status indicators, and context-aware actions!
