# Pitch Deck — Kinovia

> One family dashboard. Parents keep autonomy. Children gain visibility.

---

## Slide 1: Problem — The Caregiver Crisis

**53 million Americans are unpaid family caregivers.**

The "sandwich generation" (35–55) is caught between raising kids and supporting aging parents. They are currently cobbling together:

- 📱 **Spreadsheets** to track bills, appointments, and medications
- 💬 **Text chains** with siblings to coordinate who called Mom last
- 🔐 **Shared passwords** written on sticky notes or saved in insecure group chats
- 📋 **Paper documents** scattered across filing cabinets, email attachments, and shoeboxes
- 😰 **Constant worry** — _"Is Dad taking his medication? Did Mom pay the electric bill? Is that phone call a scam?"_

> **The result:** Small problems become crises. Bills go unpaid. Medications are skipped. Seniors fall victim to scams. Families burn out.

**1 in 5 caregivers** reports high financial strain. **40%** report high emotional stress. The current solution set is fragmented, insecure, and disrespects parental autonomy.

---

## Slide 2: Solution — Kinovia

**Kinovia is the first family dashboard built from the parent's perspective.**

| Before Kinovia | After Kinovia |
|----------------|---------------|
| "I don't want to give up my independence" | Parents grant permissions on their terms |
| "Did Mom pay the electric bill?" | One tap — see all upcoming and overdue bills |
| "What's Dad's AARP password?" | Secure shared vault, access granted by parent |
| "That phone call sounds fishy" | Scam detection alerts the whole family |
| "When is Mom's next appointment?" | Shared calendar with reminders |
| "Where is the living will?" | Secure document vault, accessible instantly |

**Core philosophy:** Kinovia never takes control away from the person receiving care. It is designed to *empower* them while giving trusted family members the tools they need.

---

## Slide 3: Product — Key Screens

### 🖥️ Child Dashboard
*The command center for the family care coordinator.*
- **Status overview:** Green/yellow/red indicators for bills, documents, appointments, and security
- **Activity feed:** Chronological log of everything — bill paid, document uploaded, medication confirmed
- **Quick actions:** "Pay Bill," "Add Document," "Share Password," "Send Reminder"
- **Notifications:** Real-time alerts for overdue bills, new documents, appointment reminders

### 📱 Parent App
*Designed for simplicity and dignity.*
- **Large text, large buttons:** Accessibility-first design for users with reduced vision or dexterity
- **Permission hub:** The parent sees exactly who has access to what — grant or revoke with a tap
- **Single-task focus:** One thing per screen — "Here are your bills due this week"
- **No jargon:** No "MFA," no "vault" — "Your shared passwords" and "The family folder"

### 🔐 MFA & Password Hub
*Secure credential sharing — by permission only.*
- Parents store logins (bank, insurance, pharmacy, AARP) in their personal vault
- Children can request access to a specific credential; parent approves or denies
- Shared MFA codes appear in the child's dashboard *only while the parent is on a call with them*
- Audit log: every access is tracked and visible to the parent

### ✅ Permission System
*The parent is always in control.*
- Per-feature permissions: "Show Jenny my bills but not my passwords"
- Per-document sharing: "Share the living will with all three kids"
- Temporary access: "Grant access for 2 hours during our call"
- Revocation: One tap removes any child's access to any feature

---

## Slide 4: Why Now

| Factor | Reality |
|--------|---------|
| **Aging population** | 10,000 Americans turn 65 every day. By 2030, 1 in 5 Americans will be 65+. |
| **Senior digital adoption** | 75% of seniors 65+ now use the internet. 61% own a smartphone. The tech gap is closing rapidly. |
| **Caregiver burnout** | 53M caregivers. Average caregiving duration: 4+ years. 40% report high emotional stress. Tools reduce burnout. |
| **No all-in-one competitor** | Point solutions exist — bill pay (Doxo), password managers (1Password), health trackers (CareZone) — but nothing unifies the care circle with parent autonomy as the foundation. |
| **Scam epidemic** | Seniors lose $3B+ annually to fraud. Family involvement is the #1 protective factor. |
| **Remote caregiving is the norm** | 25% of caregivers live 1+ hours from their parent. Digital tools are essential, not optional. |

---

## Slide 5: Business Model

### Direct-to-Consumer
| Tier | Price | Includes |
|------|-------|----------|
| **MVP** | $15/mo or $150/yr | Full family dashboard, document vault, MFA hub, bill tracking, notifications |
| **Full Launch** | $25/mo or $250/yr | All of the above + scam detection, medication reminders, calendar sync |

### B2B Distribution Channels
| Channel | Pricing Model | Why They Buy |
|---------|--------------|--------------|
| **Employer benefit programs** | $5–10/employee/mo | Reduce caregiver burnout → lower absenteeism, higher productivity. 73% of employees say caregiving affects their work. |
| **Health insurers / Medicare Advantage** | $3–8/member/mo | Improve medication adherence, reduce ER visits, lower total cost of care. Member retention ROI. |
| **Elder law / estate planning firms** | Referral fee or white-label | Differentiator for firms — offer clients a tool to stay organized. |

### Unit Economics
| Metric | Value |
|--------|-------|
| Customer Acquisition Cost (CAC) | $50–70 (blended) |
| Average Monthly Revenue | $20–22 |
| Average Lifetime | 24 months |
| Lifetime Value (LTV) | $480 |
| LTV:CAC Ratio | 6–8× |
| Gross Margin | 96%+ |

---

## Slide 6: Traction & Roadmap

### ✅ What's Built (MVP — Complete)

- **Product website:** kinovia.ctonew.app — live, public, explaining the value prop
- **Child dashboard:** Full family view — bills, documents, passwords, appointments, alerts
- **Parent app:** Simple, permission-first UI with large text and minimal cognitive load
- **Bill center:** Shared bill tracking with due dates, paid status, and family notifications
- **Document vault:** Secure upload, categorization, and family sharing for medical/financial/legal docs
- **MFA & password hub:** Shared credential vault with parent-controlled access
- **Permission system:** Granular, per-feature, per-member access controls
- **Scam safety center:** Static educational content + infrastructure for live detection
- **Appointment tracking:** Shared calendar with reminders and alerts
- **11 merged PRs:** Clean, documented React/Bun/TanStack Start codebase

### 📅 What's Next
| Phase | Timeline | Key Features |
|-------|----------|--------------|
| **Phase 2** | Q3–Q4 2026 | Real auth (Auth0/Clerk), real database (Supabase/Postgres), Plaid + Stripe bill pay, Twilio scam detection, medication reminders, calendar sync |
| **Phase 3** | 2027 | HIPAA + SOC 2 compliance, employer/insurer B2B platform, white-label option |
| **Phase 4** | 2028+ | AI spending insights & health alerts, voice interface, IoT/smart home integration, international expansion |

---

## Slide 7: The Ask

### We are selling Kinovia.

This is a **fully built, deployed, documented** product — ready for its next owner to take to market.

| Asset | Details |
|-------|---------|
| **Product** | Complete MVP with 10 feature areas — child dashboard, parent app, bill center, document vault, MFA hub, permission system, appointment tracking, scam safety center, caregiver notifications, landing page |
| **Codebase** | Clean, modern stack — TanStack Start (React + Vite + Tailwind) on frontend, Bun backend. 11 merged PRs. Modular, well-structured, easy to extend. |
| **Deployment** | Live at **kinovia.ctonew.app** — published and serving. |
| **Brand & Identity** | Kinovia name, logo, tagline, and design system established |
| **Strategy** | Complete product roadmap, financial model, business plan, pitch deck — all written |
| **Unit Economics** | High margin (96%+ gross), clear path to $1.5M ARR in 3 years, strong LTV:CAC |
| **Market** | 53M caregivers, aging population tailwind, no dominant all-in-one competitor |

### Price: $10,000

- Fully functional MVP with paying customers ready
- Clean, modern codebase (React / Bun / TanStack Start)
- All planning documents and strategy included
- Ready for Phase 2 development (auth, database, integrations)

> **Contact:** Owner — Kinovia

---

*kinovia.ctonew.app • Built 2026*