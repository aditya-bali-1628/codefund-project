# Copilot Instructions for getmechai

## Project Overview
- This is a Next.js app (App Router) for a platform where fans can support creators by buying them a "chai" (donation/payments).
- Main features: user profiles, payment integration (Razorpay), supporter listing, and authentication (NextAuth).

## Key Architecture & Data Flow
- **Pages:**
  - Main landing: `app/page.js`
  - User profile/payment: `app/[username]/page.js` (renders `components/Paymentpage.js`)
  - Auth: `app/api/auth/[...nextauth]/route.js`
  - Payment API: `app/api/razorpay/route.js`
- **Components:**
  - UI: `components/Navbar.js`, `components/Footer.js`, `components/Paymentpage.js`, etc.
  - Session/context: `components/SessionWrapper.js`
- **Database:**
  - Connection: `db/dbconnect.js`
  - Models: `models/user.js`, `models/Payment.js`
- **Actions:**
  - All server-side logic (fetching users/payments, payment initiation, profile update) is in `actions/useractions.js`.

## Developer Workflows
- **Start dev server:** `npm run dev` (see README)
- **API endpoints:** All under `/api/` (Next.js route handlers)
- **Payment flow:**
  - Frontend calls `initiate` (from `useractions.js`) to start payment, then Razorpay checkout is opened.
  - After payment, verification is handled via `/api/razorpay` route.
- **Authentication:** Uses NextAuth, session available via `useSession()`.

## Project-Specific Patterns
- **Server actions:** All backend logic is abstracted in `actions/useractions.js` and called from components/pages.
- **Environment variables:** Payment API base URL via `process.env.NEXT_PUBLIC_BASE_URL`.
- **Error handling:** Frontend expects JSON from API; if HTML is returned, check for misconfigured endpoints or server errors.
- **Styling:** Uses Tailwind CSS (see class names in components).
- **Images:** Profile/cover images use Next.js `Image` component, fallback to default if missing.

## Integration Points
- **Razorpay:** Payment integration via frontend script and backend verification.
- **NextAuth:** User authentication and session management.

## Conventions
- **Component naming:** PascalCase for React components.
- **API routes:** All custom logic in `/api/` subfolders, using Next.js route handlers.
- **Actions:** All server-side logic in `actions/`, imported and used in pages/components.

## Examples
- To fetch user/payment data: `await fetchuser(username)` and `await fetchPayments(username)` from `useractions.js`.
- To initiate payment: `await initiate(amount, username, paymentform)`.
- To update profile: `await updateprofile(username, data)`.

---
If any section is unclear or missing, please provide feedback or specify which workflow/component needs more detail.
