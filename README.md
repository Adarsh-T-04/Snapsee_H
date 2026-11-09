# Snapsee Digital Advertising Agency Platform

Production-ready digital advertising & performance marketing agency website engineered with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Prisma ORM**, and **PostgreSQL**.

Built with the visual quality, conversion architecture, and typography of top-tier creative digital agencies such as *Social Beat*, *Schbang*, and *WATConsult*.

---

## 🚀 Key Features

### 1. High-Converting Agency Frontend
- **Homepage**:
  - Hero with high-impact headline: *"WE DON'T JUST RUN ADS. WE BUILD BRANDS THAT GROW."*
  - Fast-Track Interactive Growth Strategy estimator
  - Live agency metrics ticker (₹45Cr+ revenue, 4.2x ROAS, 180+ campaigns, 98.4% retention)
  - Trusted-by brand credentials
  - 14 full-spectrum digital marketing services overview
  - Featured case studies with performance metrics
  - 4-step scientific growth formula
  - Transparent pricing preview
  - Client video & executive testimonials
  - Categorized FAQ accordion
  - High-intent conversion CTA sections
- **All 14 Detailed Services (`/services`)**:
  1. Social Media Marketing
  2. Meta Ads (Facebook & Instagram)
  3. Google Ads (Search & Performance Max)
  4. Search Engine Optimization (SEO)
  5. High-Converting Website Development
  6. Branding & Identity Design
  7. Graphic Design & Collateral
  8. Video Editing & Reels Production
  9. Content Marketing & Copywriting
  10. Influencer Marketing & PR
  11. B2B & B2C Lead Generation
  12. Full-Funnel Performance Marketing
  13. Marketing Automation & CRM
  14. Complete Digital Marketing Management
  - Each service includes: Description, Business Benefits, Tangible Deliverables, 4-step Working Process, and Direct Enquiry CTA.
- **Portfolio & Case Studies (`/portfolio`)**:
  - Filterable case studies (Meta Ads, B2B Lead Gen, Google Search, Reels Production, Rebranding, App Installs)
  - Clear, ethical disclaimer distinguishing demo benchmark projects from live client NDAs
  - Direct quantifiable results metrics (ROAS, pipeline value, CAC reduction, organic reach)
- **Pricing & Packages (`/pricing`)**:
  - **Starter Plan**: ₹9,999/month
  - **Growth Plan**: ₹19,999/month *(Recommended)*
  - **Premium Plan**: ₹39,999/month
  - Complete Side-by-Side Feature Comparison Table
  - Interactive Custom Scope Retainer Calculator
  - Clear billing notes: Ad spend separate, 18% GST extra, website development quoted separately
- **Professional 11-Field Enquiry Form (`/contact`)**:
  1. Full Name
  2. Company / Business Name
  3. Email Address
  4. Phone Number
  5. Website URL
  6. Industry
  7. Services Required (multi-select chips)
  8. Interested Pricing Plan
  9. Monthly Marketing Budget
  10. Project Description & Objectives
  11. Preferred Contact Method (WhatsApp / Email / Phone)
  - Real-time frontend and backend validation with Zod
  - Unique enquiry tracking ID generation (`ENQ-2026-XXXX`)
  - Automated customer confirmation email (Resend)
  - Automated agency admin notification email
  - Spam honeypot protection
- **Additional Pages & Integrations**:
  - About Us with story, mission/vision, leadership team, and milestones (`/about`)
  - Searchable Knowledge Base & FAQ (`/faq`)
  - Agency Terms & Conditions (`/terms`)
  - Privacy Policy compliant with DPDP Act 2023 (`/privacy`)
  - Custom 404 page (`/not-found`)
  - Dynamic `sitemap.xml` and `robots.txt`
  - Floating WhatsApp chat widget (`+91 98765 43210`)
  - Click-to-call direct dialers
  - Cookie & analytics consent banner

---

### 2. Full-Stack Backend & Admin CRM (`/admin`)

- **Secure Session Authentication**:
  - Protected session tokens using `jose` / `bcryptjs`
  - Login at `/admin/login` (Default demo: `admin@snapsee.com` / `Admin@Snapsee2026!`)
  - Session verification middleware & logout handler
- **Executive Analytics Dashboard (`/admin`)**:
  - Total inquiries, new leads, converted clients, and close rate
  - Active Monthly Recurring Revenue (MRR)
  - Active projects counter
  - Channel attribution bar chart (Direct, Organic, WhatsApp, Google)
  - Sales pipeline breakdown
  - Recent inbound inquiries table
- **Enquiry Management System (`/admin/enquiries`)**:
  - Complete pipeline status transitions:
    `NEW` → `CONTACTED` → `MEETING_SCHEDULED` → `PROPOSAL_SENT` → `NEGOTIATION` → `CONVERTED` → `REJECTED`
  - Assign leads to team members
  - Internal call notes and communication log
  - Real-time keyword search and status filter tabs
  - One-click CSV export
- **Client Retainer Management (`/admin/clients`)**:
  - Add and edit active client accounts
  - Track monthly retainer fees and active MRR
  - Status tracking: `ONBOARDING`, `ACTIVE`, `PAUSED`, `COMPLETED`
  - Client project brief notes
- **Pricing & Plans Editor (`/admin/pricing`)**:
  - Change monthly prices, taglines, active status, and "Most Popular" flags in real-time

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom dark luxury agency theme (`#08080A`, Electric Orange `#FF5E1E`, Neon Purple `#8B5CF6`)
- **Animations**: Framer Motion & CSS keyframe glow pulses
- **Icons**: Lucide React
- **ORM & Database**: Prisma ORM with PostgreSQL (Supabase or Neon)
- **Validation**: Zod
- **Authentication**: Session cookies with `jose` & `bcryptjs`
- **Email Service**: Resend (with development fallback logger)
- **Analytics**: Google Analytics 4 & Meta (Facebook) Pixel

---

## 📦 Getting Started

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Review the values in `.env`:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/snapsee_agency?schema=public"
JWT_SECRET="snapsee_super_secret_session_token_key_2026_xyz123"
ADMIN_SESSION_COOKIE="snapsee_admin_session"
RESEND_API_KEY="re_your_api_key_here"
RESEND_FROM_EMAIL="agency@snapsee.com"
ADMIN_NOTIFICATION_EMAIL="adarshtripathi969@gmail.com"
NEXT_PUBLIC_WHATSAPP_NUMBER="919695478967"
NEXT_PUBLIC_CONTACT_PHONE="+91 96954 78967"
NEXT_PUBLIC_CONTACT_EMAIL="adarshtripathi969@gmail.com"
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-SNAPSEE2026"
NEXT_PUBLIC_META_PIXEL_ID="987654321012345"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 3. Generate Prisma Client & Database

```bash
# Generate Prisma Client
npx prisma generate

# If using a live PostgreSQL instance (Supabase or Neon):
npx prisma db push
npm run seed
```

*Note: If no PostgreSQL instance is connected yet, the application automatically runs on a high-fidelity in-memory data store seeded with complete mock data so you can test all features and the admin dashboard immediately.*

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the agency website.

To access the admin dashboard:
- Navigate to: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: `adarshtripathi969@gmail.com`
- **Password**: `Admin@Snapsee2026!` (Click "Auto-fill" on the login screen for instant demo access)

---

## 🚢 Deployment Instructions

### Deploying to Vercel

1. Push your repository to GitHub, GitLab, or Bitbucket.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and import the repository.
3. In **Environment Variables**, add:
   - `DATABASE_URL` (from Supabase or Neon)
   - `JWT_SECRET` (generate a strong random 32+ character string)
   - `RESEND_API_KEY` (from your Resend account)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_SITE_URL` (your custom domain or vercel.app URL)
4. Click **Deploy**.

### Setting Up PostgreSQL Database (Supabase or Neon)

- **Neon**:
  1. Create a project at [neon.tech](https://neon.tech).
  2. Copy the Connection String with pooled connection enabled.
  3. Set `DATABASE_URL` in Vercel environment variables.
- **Supabase**:
  1. Create a project at [supabase.com](https://supabase.com).
  2. Under Project Settings → Database → Connection Pooling, copy the URI.
  3. Run `npx prisma db push` to create the tables.

---

## 🧪 Testing the Complete Lead & Admin Flow

1. Open `/contact`.
2. Fill out the 11 fields (select services, monthly budget, and preferred contact).
3. Click **Submit Your Enquiry**.
4. You will receive an immediate confirmation with a unique ID (e.g., `ENQ-2026-1043`).
5. Open `/admin/enquiries` and observe the new lead appear at the top.
6. Open the lead drawer, update the pipeline stage to `MEETING_SCHEDULED`, add an internal note, and download the full CSV export.

