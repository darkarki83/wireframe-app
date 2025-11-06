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

### 6. User Profile Module

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

### Mock Data
- **Incoming Proposals:** 2 items (from Haim, David)
- **My Proposals:** 1 item (React migration)
- **Contracts:** 2 items (Website build, Mobile app QA)

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
    ├── /proposals
    │   ├── /incoming (List)
    │   ├── /mine (List)
    │   └── /:id (Details)
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
    └── /user
        └── /edit (Profile)
```

---

## Missing/Potential Pages

### Critical Missing Pages:

1. **Create Proposal Page** (`/proposals/create` or `/proposals/new`)
   - Currently users can view proposals but no UI to create one
   - Should include: title, description, budget fields, submit button

2. **Search/Browse Jobs Page** (`/jobs` or `/browse`)
   - No way to discover new jobs/opportunities
   - Should show available jobs that users can submit proposals to

3. **User Profile View** (`/user/:id` or `/profile/:id`)
   - Currently only edit page exists
   - Should show public profile of other users (clients/freelancers)

4. **Notifications Page** (`/notifications`)
   - No notification system for new proposals, messages, milestone approvals

5. **Settings Page** (`/settings`)
   - Account settings, preferences, payment methods, etc.

### Nice-to-Have Pages:

6. **Dashboard/Analytics** (`/dashboard` or enhanced `/main`)
   - Earnings overview, active contracts summary, metrics

7. **Payment History** (`/payments` or `/transactions`)
   - Transaction history, invoices, payment methods

8. **Dispute Resolution** (`/disputes/:id`)
   - Dedicated page for handling milestone disputes

9. **Help/Support** (`/help` or `/support`)
   - FAQ, contact support, documentation

10. **Search Results** (`/search`)
    - Global search for proposals, contracts, users

11. **Forgot Password Flow** (`/forgot-password`, `/reset-password`)
    - Password recovery pages

12. **Email Verification** (`/verify-email`)
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

### ✅ Implemented:
- All authentication flow pages
- Main dashboard with navigation
- Proposals listing (incoming & mine)
- Proposal details with actions
- Contract listing
- Contract details with 5 tabs
- Chat list and dialog
- User profile editing
- Mock API with async simulation

### ⚠️ Incomplete/Mock:
- All forms (no actual submission logic)
- Chat functionality (placeholder only)
- File upload/download
- Payment processing
- Dispute resolution logic
- User authentication (no auth state management)
- API integration (all data is mocked)

### ❌ Missing:
- Create proposal functionality
- Job browsing/search
- Public user profiles
- Notifications system
- Settings page
- Payment history
- Help/documentation

---

## Next Steps Recommendations

1. **Implement Create Proposal Page** - Most critical missing feature
2. **Add Job Browse/Search** - Complete the proposal workflow
3. **Build Notification System** - Keep users informed
4. **Create Settings Page** - User preferences and configuration
5. **Add User Profile View** - See other users' information
6. **Implement Real Forms** - Add validation and submission logic
7. **Add State Management** - Context or Redux for auth and global state
8. **Build Search Functionality** - Global search across the app
