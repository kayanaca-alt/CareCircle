# Product Requirements Document — Kinovia

> A co-pilot for adult children helping aging parents stay independent.

**Version:** 1.0  
**Status:** Draft  
**Last updated:** July 2026

---

## 1. Product Overview & Vision

Kinovia is a family dashboard that helps adult children support their aging parents while preserving the parent's dignity, privacy, and autonomy. Unlike existing tools that either surveil seniors or silo caregiving tasks, Kinovia combines bill monitoring, shared credential access, document storage, scam detection, medication reminders, and appointment tracking into one platform — with the parent always in control of what is shared and with whom.

**Core Philosophy:** Kinovia never takes control away from the person receiving care. It is designed to *empower* them while giving trusted family members the visibility and tools they need. Security, transparency, and user trust always come before growth or convenience.

### Product Principles

1. **Parent autonomy first.** Nothing happens without permissions the parent chooses. The parent sees and controls everything.
2. **Dignity-preserving design.** The parent-facing experience uses large text, simple language, and single-task focus. No jargon, no surveillance metaphors, no infantilizing UI.
3. **Child visibility with guardrails.** Adult children see what they need to help — not what they want to snoop on. Every access is auditable.
4. **Crisis prevention, not crisis response.** Alerts and early-warning signals let families catch small issues before they become emergencies.
5. **One family dashboard.** No more spreadsheets, text chains, sticky notes, and scattered logins.

---

## 2. User Personas

### 2.1 Adult Child Caregiver — "Yani"

| Attribute | Detail |
|-----------|--------|
| **Age** | 38 |
| **Role** | Designated family coordinator |
| **Tech comfort** | High — uses productivity tools daily |
| **Context** | Married, two kids under 10, lives 45 minutes from Mom |
| **Pain points** | Constantly context-switching between spreadsheets for bills, text chains with siblings about who called Mom, and a shoebox of important documents. Worries about Mom falling for phone scams. |
| **Goals** | Single source of truth for Mom's affairs. Reduce late-night worry. Coordinate with siblings without infinite text threads. |
| **Quote** | *"I don't want to take over Mom's life — I just want to know she's okay without calling her three times a day."* |

### 2.2 Aging Parent — "Mom"

| Attribute | Detail |
|-----------|--------|
| **Age** | 72 |
| **Role** | Independent senior, receives support |
| **Tech comfort** | Moderate — uses a smartphone for calls, texts, and Facebook. Avoids complex apps. |
| **Context** | Lives alone in the family home. Mild cognitive decline — occasionally forgets bill due dates or passwords. Deeply values independence. |
| **Pain points** | Feels overwhelmed by financial paperwork. Gets confused by two-factor authentication requests. Worries about being a burden. Fears losing control of her life. |
| **Goals** | Stay in her home as long as possible. Keep her financial and medical affairs private unless she chooses to share. Feel supported, not managed. |
| **Quote** | *"I appreciate Yani's help, but I don't want her in my bank account. Can't there be a middle ground?"* |

### 2.3 Care Professional — "Dr. Patel"

| Attribute | Detail |
|-----------|--------|
| **Age** | 45 |
| **Role** | Primary care physician |
| **Tech comfort** | High — uses EHR systems daily |
| **Context** | Treats Mom for chronic conditions. Needs access to medication lists, appointment history, and emergency contacts. |
| **Pain points** | Receives incomplete medication histories. Can't reach family in emergencies. Paperwork delays slow down care. |
| **Goals** | Quick access to accurate patient information shared by the family. Ability to coordinate with caregivers. |
| **Quote** | *"If families could just share the medication list and emergency contacts before the appointment, we'd save 20 minutes and probably catch a drug interaction."* |

---

## 3. Core User Stories

### 3.1 Adult Child (Yani)

| ID | Story | Priority |
|----|-------|----------|
| US-C01 | As a child caregiver, I want to see all of Mom's upcoming bills in one place so I know what's due and when. | P0 |
| US-C02 | As a child caregiver, I want to get alerts when a bill is overdue so I can help before late fees accrue. | P0 |
| US-C03 | As a child caregiver, I want to securely access Mom's shared passwords and MFA codes (with her permission) so I can help her log in to Medicare or her bank. | P0 |
| US-C04 | As a child caregiver, I want to store and organize important documents (will, POA, insurance cards) so I can find them quickly in an emergency. | P0 |
| US-C05 | As a child caregiver, I want to see Mom's upcoming medical appointments and get reminders so nothing is missed. | P1 |
| US-C06 | As a child caregiver, I want to be notified if Mom receives a suspicious phone call or message so I can help her avoid scams. | P1 |
| US-C07 | As a child caregiver, I want Mom to confirm she took her medication today so I can stop worrying. | P1 |
| US-C08 | As a child caregiver, I want to invite my siblings to the family dashboard so we can share the caregiving load. | P2 |
| US-C09 | As a child caregiver, I want a chronological activity feed so I can see at a glance what's happened recently. | P0 |

### 3.2 Aging Parent (Mom)

| ID | Story | Priority |
|----|-------|----------|
| US-P01 | As a parent, I want to see my bills and mark them as paid with a single tap so I stay on top of my finances without complexity. | P0 |
| US-P02 | As a parent, I want to see exactly who in my family has access to what information so I stay in control. | P0 |
| US-P03 | As a parent, I want to grant or revoke access to specific features (bills, documents, passwords) for each family member with a simple toggle. | P0 |
| US-P04 | As a parent, I want to approve or deny MFA requests from my children so I know when someone is accessing my accounts. | P0 |
| US-P05 | As a parent, I want to confirm I took my medication with one tap so my children don't worry. | P1 |
| US-P06 | As a parent, I want to see my appointments in a simple calendar view so I know what's coming up. | P1 |
| US-P07 | As a parent, I want to share a document (like my insurance card) with a specific family member for a limited time. | P2 |
| US-P08 | As a parent, I want the app to use large text and simple words so I don't feel confused or frustrated. | P0 |

### 3.3 Care Professional (Dr. Patel)

| ID | Story | Priority |
|----|-------|----------|
| US-D01 | As a doctor, I want view-only access to the patient's medication list shared by the family so I have accurate information at appointments. | P2 |
| US-D02 | As a doctor, I want to see the patient's emergency contacts so I know who to call. | P2 |
| US-D03 | As a doctor, I want the family to upload insurance cards before the appointment so check-in is faster. | P3 |

---

## 4. Feature Requirements

### 4.1 Dashboard (Child-Facing)

The dashboard is the command center for the family care coordinator.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| DSH-01 | **Status overview panel.** Green/yellow/red indicators for Bills, Documents, Appointments, and Security. At-a-glance health of each care domain. | P0 |
| DSH-02 | **Alert feed.** Chronological list of events requiring attention: overdue bills, new MFA requests, upcoming appointments, suspicious activity. Each alert is severity-tagged (info, warning, critical) and actionable. | P0 |
| DSH-03 | **Activity feed.** Chronological log of all family activity: bill marked paid, document uploaded, MFA approved, medication confirmed. Provides context and shared awareness. | P0 |
| DSH-04 | **Quick actions.** Prominent shortcuts for common tasks: "Pay Bill," "Add Document," "Share Password," "Send Reminder." Reduces navigation friction. | P1 |
| DSH-05 | **Parent mood check-in.** A daily prompt to the parent ("How are you feeling today?" — good/okay/need help). Result displayed on child dashboard. | P2 |
| DSH-06 | **Multi-member switching.** If a child caregiver supports multiple parents, easily switch between them. | P2 |

### 4.2 Bill Center

Shared bill tracking with due dates, statuses, and family alerts.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| BIL-01 | **Bill list view.** All bills displayed with name, provider, amount, due date, and status (paid, scheduled, due soon, overdue, upcoming). Sorted by urgency. | P0 |
| BIL-02 | **Status filters.** Filter by status: All, Due Soon, Overdue, Paid. Reduces cognitive load for busy caregivers. | P1 |
| BIL-03 | **Mark as paid.** One-click action to mark a bill as paid, with automatic timestamp. | P0 |
| BIL-04 | **Due-date alerts.** Push/web notification when a bill is due within 3 days or becomes overdue. | P1 |
| BIL-05 | **Bill detail view.** Expanded view with provider details, payment history, and linked documents. | P2 |
| BIL-06 | **Plaid integration (Phase 2).** Auto-detect bills from linked bank accounts. Auto-populate due dates and amounts. | Phase 2 |
| BIL-07 | **Stripe bill pay (Phase 2).** Pay bills directly from Kinovia with stored payment methods. | Phase 2 |

### 4.3 Document Vault

Secure document storage, categorization, and family sharing.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| DOC-01 | **Document list view.** All documents displayed with name, category, file type, added date, and access roles. | P0 |
| DOC-02 | **Category filters.** Filter by: Legal, Medical, Financial, Personal. | P1 |
| DOC-03 | **Document upload.** Upload PDFs, images, and documents. Categorize on upload. | P0 |
| DOC-04 | **Access control per document.** Specify which family members (and care professionals) can view each document. | P1 |
| DOC-05 | **Document preview.** In-browser preview of uploaded documents. | P2 |
| DOC-06 | **Expiring access links.** Generate time-limited share links for external parties (doctors, lawyers). | P2 |
| DOC-07 | **Mobile camera upload (Phase 2).** Snap a photo of an insurance card and upload directly. | Phase 2 |

### 4.4 MFA Hub

Shared credential vault with parent-controlled access. Kinovia's most differentiated feature.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| MFA-01 | **MFA request list.** All pending, approved, and denied MFA requests displayed with requester, service name, category, and status. | P0 |
| MFA-02 | **Approve/deny MFA requests.** Child approves or denies incoming MFA requests from the parent. Ability to add a denial reason. | P0 |
| MFA-03 | **Request categorization.** Each MFA request tagged by service category: Medical, Financial, Utilities, Other. | P1 |
| MFA-04 | **Audit log.** Every MFA approval/denial is logged with timestamp and actor. Visible to the parent. | P0 |
| MFA-05 | **Suspicious request flagging.** Automatic flagging of MFA requests from unknown sources (e.g., unrecognized device, unusual time). | P2 |
| MFA-06 | **Password vault.** Store and share account credentials. Parent grants per-credential access to children. | P1 |
| MFA-07 | **Temporary access grants.** "Grant access for 2 hours" — for when parent and child are on a call together. | P2 |

### 4.5 Parent App

The parent-facing experience. Designed for simplicity, accessibility, and dignity.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| PAR-01 | **Task list.** Parent sees a simple list of items requiring action: "Pay Eversource bill — $115.00 due June 28," "Confirm doctor appointment — Dr. Patel tomorrow 10:30 AM." One tap to mark each as done or request help. | P0 |
| PAR-02 | **Permission hub.** Parent sees exactly which family members have access to which features. Grant or revoke access with a toggle. | P0 |
| PAR-03 | **Daily mood check-in.** "How are you feeling today?" — three large emoji buttons (good, okay, need help). Result shared with children. | P2 |
| PAR-04 | **Large text and buttons.** Minimum 16px text, minimum 48px touch targets. WCAG 2.1 AA compliant. | P0 |
| PAR-05 | **Single-task per screen.** One concept per view. No multitasking, no tabs, no navigation trees. | P0 |
| PAR-06 | **Plain language.** No technical jargon. "Your shared passwords" not "MFA Hub." "The family folder" not "Document Vault." | P0 |
| PAR-07 | **Medication confirmation.** Simple yes/no prompt: "Did you take your Lisinopril today?" with large Yes/No buttons. Family sees adherence. | P1 |
| PAR-08 | **Appointment view.** Simple list of upcoming appointments with date, time, and doctor name. | P1 |

### 4.6 Permission System

The backbone of Kinovia's autonomy-first design. The parent is always in control.

| Requirement | Description | Priority |
|-------------|-------------|----------|
| PER-01 | **Permission levels.** Three tiers: Observer (view only), Helper (can mark bills paid, upload docs), Power of Attorney (full access). | P0 |
| PER-02 | **Per-feature granularity.** Parent can grant access to Bills but not Documents, Documents but not Passwords, etc. | P0 |
| PER-03 | **Per-member management.** Each family member has independent permissions. "Show Jenny bills but not passwords. Show Carlos everything." | P0 |
| PER-04 | **Permission request workflow.** Child requests an upgrade (e.g., Observer → Helper). Parent approves or denies. | P0 |
| PER-05 | **Permission history log.** Complete audit trail of all grants, revocations, and requests. Visible to the parent. | P1 |
| PER-06 | **Instant revocation.** Parent can remove any member's access to any feature with one tap. Takes effect immediately. | P0 |
| PER-07 | **Temporary grants (Phase 2).** Time-limited access: "Grant Yani access to bills for 24 hours." | Phase 2 |
| PER-08 | **Care professional role (Phase 3).** Limited read-only role for doctors, care managers, social workers. | Phase 3 |

---

## 5. Non-Functional Requirements

### 5.1 Accessibility

| Requirement | Target | Standard |
|-------------|--------|----------|
| Parent app accessibility | WCAG 2.1 Level AA | Required for MVP |
| Child dashboard accessibility | WCAG 2.1 Level AA | Target for Phase 2 |
| Minimum font size (parent app) | 16px body, 20px headings | Required |
| Minimum touch target | 48×48px | Required |
| Color contrast ratio | ≥ 4.5:1 for normal text, ≥ 3:1 for large text | Required |
| Screen reader support | Semantic HTML, ARIA labels on interactive elements | Required |
| Keyboard navigation | Full keyboard accessibility for all interactive elements | Required |

### 5.2 Security

| Requirement | Description |
|-------------|-------------|
| Encryption at rest | All stored documents, credentials, and PII encrypted at rest (AES-256). |
| Encryption in transit | TLS 1.3 for all client-server communication. |
| Multi-factor authentication | Required for all child accounts. Optional (but encouraged) for parent accounts. |
| MFA for sensitive actions | Re-authentication required for permission changes, credential access, and document sharing. |
| Audit logging | All access events, permission changes, and data modifications logged. Immutable and parent-visible. |
| Data isolation | Strict tenant isolation between families. No cross-family data leakage. |
| Session management | Configurable session timeouts. Automatic logout after inactivity. |

### 5.3 Performance

| Requirement | Target | Measurement |
|-------------|--------|-------------|
| Initial page load | < 2 seconds (LCP) | Lighthouse / Web Vitals |
| Time to interactive | < 3 seconds | Lighthouse |
| API response time (p95) | < 500ms | Server-side monitoring |
| Document upload | < 5 seconds for files under 10MB | Client-side timing |
| Dashboard data refresh | < 1 second for status recalculation | Client-side timing |
| Build size | < 500KB gzipped JS bundle | Vite build output |

### 5.4 Privacy

| Requirement | Description |
|-------------|-------------|
| Parent-controlled sharing | The parent is the data owner. All sharing is opt-in and revocable. |
| Data minimization | Only collect what is needed for caregiving coordination. No behavioral tracking, no ad targeting. |
| No third-party data sharing | Kinovia never sells or shares family data with third parties. |
| Data export | Families can export all their data in a portable format (JSON/PDF) at any time. |
| Account deletion | Full data deletion on account closure. Confirmed within 30 days. |
| HIPAA readiness | Architecture designed for HIPAA compliance (Phase 3). PHI handling documented from day one. |

---

## 6. Success Metrics

Mapped to business plan KPIs:

| Business KPI | Product Metric | How Measured |
|-------------|---------------|--------------|
| Paid family conversions | Free trial → paid conversion rate | Stripe analytics |
| Monthly churn | Cancellation rate per month | Stripe analytics |
| Families with 2+ linked members completing a shared task | Activation rate | In-app analytics |
| Early-warning alerts resolved before becoming crises | Bill paid-late → on-time transition rate | Bill center data |
| NPS / referral rate | Net Promoter Score | In-app NPS survey |

### Activation Milestones

| Milestone | Description | Target |
|-----------|-------------|--------|
| Account created | Family signs up | 100% of signups |
| 2+ members linked | Parent + at least one child connected | 80% within 7 days |
| First bill added | At least one bill tracked in Bill Center | 70% within 14 days |
| First document uploaded | At least one document in Vault | 50% within 14 days |
| First MFA approved | At least one MFA request successfully approved | 40% within 30 days |
| Weekly active | Family uses Kinovia at least once per week | 60% of activated families |

---

## 7. Scope Boundaries

### MVP (Phase 1 — Complete)

**In scope:**
- Child dashboard with status overview, alerts, activity feed, quick actions
- Bill center with list view, status tracking, mark-as-paid
- Document vault with list view, category filters, upload
- MFA hub with request list, approve/deny, audit log
- Parent app with task list, permission hub, large accessible UI
- Permission system with three tiers, per-feature granularity, request workflow
- Landing page with value proposition and feature overview
- Mock data for all features

**Out of scope for MVP:**
- Real authentication (currently simulated)
- Persistent database (in-memory mock data)
- Plaid/Stripe bill pay integration
- Scam detection engine
- Medication reminders
- Calendar sync
- Mobile app (React Native)
- Email integration
- HIPAA compliance
- B2B features
- AI/ML features

### Phase 2 (Q3–Q4 2026)

Real auth, real data, integrations, and automated safety features. See ROADMAP.md for full detail.

### Phase 3 (2027)

B2B distribution, compliance, and scale. See ROADMAP.md for full detail.

### Phase 4 (2028+)

AI, voice, IoT, and international expansion. See ROADMAP.md for full detail.

---

*Last updated: July 2026*
