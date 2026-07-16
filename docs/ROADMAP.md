# Product Roadmap — Kinovia

> A co-pilot for adult children helping aging parents stay independent.

---

## Overview

| Phase | Timeline | Focus | Status |
|-------|----------|-------|--------|
| Phase 1 | Now — MVP | Core family dashboard, parent autonomy tools, secure sharing | ✅ Complete |
| Phase 2 | Q3–Q4 2026 | Real auth, real data, integrations, alerts | 🔄 In development |
| Phase 3 | 2027 | B2B distribution, compliance, scale | 📋 Planned |
| Phase 4 | 2028+ | AI, voice, IoT, international | 🔭 Exploratory |

---

## Phase 1 — MVP (✅ Complete)

**Theme:** "Get the core loop right — shared visibility with preserved autonomy."

| Feature | Description | Status |
|---------|-------------|--------|
| **Landing Page** | Product website at kinovia.ctonew.app with value prop, feature overview, waitlist | ✅ Live |
| **Child Dashboard** | Full-family dashboard: status overview, alerts feed, quick actions. Built with TanStack Start + React + Tailwind | ✅ Complete |
| **Parent App Experience** | Simplified "coming soon" parent-facing view — large text, minimal UI, autonomy-first messaging | ✅ Complete |
| **Bill Center** | Shared bill dashboard — track due dates, mark paid, set alerts. Family members see what's coming and what's overdue | ✅ Complete |
| **Document Vault** | Secure document storage — upload, categorize, share medical/financial/legal documents between family members | ✅ Complete |
| **MFA / Password Hub** | Shared credential vault — family members can access parent accounts when needed, with parent-granted permissions | ✅ Complete |
| **Permission System** | Parents control exactly what each child can see and do. Grant/revoke access per feature (bills, documents, passwords) | ✅ Complete |
| **Caregiver Notifications** | Alerts for upcoming bills, missing payments, new documents, calendar events | ✅ Complete |
| **Appointment Tracking** | Shared calendar for medical appointments, reminders, family visibility | ✅ Complete |
| **Scam Safety Center** | Educational content and safety tips. Static page ready for live scam detection integration | ✅ Complete |
| **11 PRs Merged** | Full codebase delivered, reviewed, and merged | ✅ Complete |

---

## Phase 2 — Real Infrastructure & Integrations (🔄 Q3–Q4 2026)

**Theme:** "Make it production-ready with real data, real auth, and the first automated safety net."

| Feature | Description | Target | Priority |
|---------|-------------|--------|----------|
| **Real Authentication** | Auth0 or Clerk integration — email/password, SSO, magic links. Separate flows for parent vs. child onboarding | Q3 2026 | P0 |
| **Persistent Database** | PostgreSQL via Supabase or Turso — replace in-memory / local-only data with proper persistence, backups, multi-region | Q3 2026 | P0 |
| **Bill Pay Integration** | Plaid for account linking + Stripe for payment execution — auto-detect bills, pay directly from the dashboard | Q3 2026 | P0 |
| **Scam Detection Engine** | Twilio Lookup API for phone number reputation checks. Real-time SMS/email forwarding for analysis. Proactive alerts to children when parent is contacted by known scam numbers | Q3 2026 | P1 |
| **Medication Reminders** | Push notifications (web + mobile) for medication schedules. Family sees adherence. Parent confirms doses with a single tap | Q4 2026 | P1 |
| **Calendar Sync** | Two-way sync with Google Calendar and Apple Calendar for appointments. Auto-detect new appointments and cross-reference with family calendars | Q4 2026 | P1 |
| **Mobile App (React Native)** | Lightweight mobile version — notifications, quick bill pay, camera document upload | Q4 2026 | P2 |
| **Email Integration** | Forward parent's email to Kinovia — auto-categorize bills, healthcare communications, and personal messages | Q4 2026 | P2 |
| **Automated Bill Detection** | Machine learning to detect recurring bills from email/statement uploads and auto-populate the bill center | Q4 2026 | P2 |

---

## Phase 3 — B2B & Compliance (📋 2027)

**Theme:** "Scale through partnerships. Become the trusted OS for family caregiving."

| Feature | Description | Target | Priority |
|---------|-------------|--------|----------|
| **HIPAA Compliance** | BAA execution, audit controls, access logs, encrypted PHI storage, breach notification procedures | Q1 2027 | P0 |
| **SOC 2 Type II Certification** | Formal audit — security, availability, confidentiality controls. Required for enterprise sales | Q2 2027 | P0 |
| **Employer Benefit Program** | White-label version for HR departments — offer Kinovia as a caregiver benefit. $5–10/employee/mo | Q2 2027 | P1 |
| **Health Insurer Partnership** | Bundled with Medicare Advantage and Medigap plans — reduce member churn, improve health outcomes | Q2 2027 | P1 |
| **Enterprise Dashboard** | HR/insurer portal — aggregated (anonymized) insights, ROI reporting, member engagement metrics | Q3 2027 | P1 |
| **White-Label Option** | Custom branding, domain, and feature set for enterprise partners | Q3 2027 | P2 |
| **Care Coordinator Integration** | API for professional care managers, social workers, and geriatric care coordinators to have limited read access | Q3 2027 | P2 |
| **Advanced Permission Roles** | Child, grandchild, neighbor, care coordinator, POA — granular access levels for the whole care circle | Q4 2027 | P2 |
| **Emergency Response Integration** | Integration with medical alert systems, 911 fallback, emergency contact routing | Q4 2027 | P3 |

---

## Phase 4 — AI, Voice, IoT & Expansion (🔭 2028+)

**Theme:** "Anticipate needs before they become crises. Reach beyond the screen."

| Feature | Description | Target | Priority |
|---------|-------------|--------|----------|
| **AI Spending Insights** | Detect unusual spending patterns (potential fraud), track recurring costs, forecast future expenses | Q1 2028 | P1 |
| **Health Trend Alerts** | Analyze medication adherence, appointment frequency, and reported symptoms — flag concerning trends to family | Q1 2028 | P1 |
| **Voice Interface** | "Hey Kinovia — what bills are due this week?" Voice-first interaction for less tech-comfortable users | Q2 2028 | P1 |
| **Smart Home Integration** | Connect with smart sensors (fall detection, motion, door open/close alerts). Alexa/Google Home skill | Q2 2028 | P2 |
| **Automated Care Reports** | For families with paid caregivers — auto-generated daily/weekly reports on visits, activities, and alerts | Q3 2028 | P2 |
| **International Expansion** | Multi-language support (Spanish, Mandarin, Tagalog — top caregiver languages). Localized bill pay, pharmacy, and healthcare integration per country | Q3 2028 | P2 |
| **Family Social Features** | Shared photo journal, milestones, gratitude feed — not just task management, but connection | Q3 2028 | P3 |
| **Advanced AI Companion** | Conversation agent for parents — friendly check-ins, medication reminders, cognitive engagement activities | Q4 2028 | P3 |
| **Legacy & Estate Planning** | Document execution (will, living will, POA), integration with estate planning services, digital legacy transfer | Q4 2028 | P3 |

---

## Success Criteria by Phase

| Phase | Success Metric | Target |
|-------|----------------|--------|
| Phase 1 | MVP activated families | 50+ families using core features |
| Phase 2 | Paid conversions, low churn | < 5% monthly churn, > 200 paying families |
| Phase 3 | B2B contracts signed | 3+ employer/insurer partnerships |
| Phase 4 | Revenue diversification | 40% revenue from B2B, 30% AI/voice add-ons |

---

## Key Dependencies

- **Phase 2:** Plaid API access, Stripe Connect, Twilio Lookup API, Apple/Google Calendar API
- **Phase 3:** HIPAA compliance audit firm, SOC 2 auditor, enterprise sales hires
- **Phase 4:** AI/ML infrastructure, IoT hardware partnerships, localization vendors

---

*Last updated: July 2026*
