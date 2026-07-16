# Technical Architecture — Kinovia

> Current stack, data models, API design, and future architecture plans.

**Version:** 1.0  
**Last updated:** July 2026

---

## 1. Current Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend framework** | React | 19.2 | UI components and state management |
| **Language** | TypeScript | 5.9 | Type safety across full stack |
| **Build tool** | Vite | 7.3 | Fast dev server and production builds |
| **Routing** | React Router | 7.6 | Client-side SPA routing |
| **Styling** | Tailwind CSS | 4.1 | Utility-first CSS with design tokens |
| **Backend runtime** | Bun | 1.3 | JavaScript/TypeScript server runtime |
| **Package manager** | Bun | 1.3 | Monorepo workspace management |
| **Deployment** | Bun HTTP server | — | Static SPA + API served on port 3000 |

---

## 2. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Single Page Application (SPA)              │  │
│  │  ┌─────────┐ ┌──────────┐ ┌───────┐ ┌─────────────┐  │  │
│  │  │Landing  │ │Dashboard │ │Parent │ │Bill/Doc/MFA │  │  │
│  │  │   /     │ │/dashboard│ │/parent│ │ /dashboard/*│  │  │
│  │  └─────────┘ └──────────┘ └───────┘ └─────────────┘  │  │
│  │                                                        │  │
│  │  React Router 7 — Client-side routing                   │  │
│  │  Tailwind CSS v4 — Styling                              │  │
│  │  useState / useEffect — Local state management          │  │
│  └───────────────────────────────────────────────────────┘  │
│                              │                               │
│                     HTTP REST (JSON)                         │
│                              │                               │
└──────────────────────────────┼───────────────────────────────┘
                               │
┌──────────────────────────────┼───────────────────────────────┐
│                    BUN HTTP SERVER (Port 3000)                │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                   Static File Serving                     │ │
│  │  dist/index.html, dist/assets/*.js, dist/assets/*.css    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                      API Router                          │ │
│  │  ┌──────────┐ ┌────────────┐ ┌──────────┐ ┌──────────┐ │ │
│  │  │  Bills   │ │ Documents  │ │   MFA    │ │Permissions│ │ │
│  │  │ /api/    │ │ /api/      │ │ /api/    │ │ /api/    │ │ │
│  │  │ bills    │ │ documents  │ │ mfa      │ │ permissions│ │
│  │  └──────────┘ └────────────┘ └──────────┘ └──────────┘ │ │
│  │                                                          │ │
│  │  All routes in packages/server/src/index.ts             │ │
│  │  No middleware framework — manual routing via URL parse  │ │
│  └─────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │                  Data Layer (Current)                     │ │
│  │  In-memory TypeScript arrays (no database)               │ │
│  │  Mock data for: bills[], documents[], mfaRequests[],    │ │
│  │  permissionMembers[], permissionRequests[],             │ │
│  │  permissionHistory[]                                     │ │
│  └─────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Action → React State → fetch() to API → Bun Server → 
  Route Handler → In-Memory Data → JSON Response → 
  React State Update → Re-render
```

---

## 3. Frontend Architecture

### 3.1 Component Tree

```
main.tsx
└── <BrowserRouter>
    └── <App>                           (App.tsx)
        ├── <Landing />                 (pages/Landing.tsx)
        │   └── Marketing page: hero, features, CTA
        ├── <Dashboard />               (pages/Dashboard.tsx)
        │   ├── Status overview (green/yellow/red)
        │   ├── Alert feed (info/warning/critical)
        │   ├── Activity feed (chronological log)
        │   └── Quick action buttons (links to sub-pages)
        ├── <BillCenter />              (pages/BillCenter.tsx)
        │   ├── Status filter tabs
        │   ├── Bill list with status badges
        │   └── Mark-as-paid buttons
        ├── <DocumentVault />           (pages/DocumentVault.tsx)
        │   ├── Category filter tabs
        │   ├── Document list with icons
        │   └── Access role indicators
        ├── <MFAHub />                  (pages/MFAHub.tsx)
        │   ├── Status filter (pending/approved/denied)
        │   ├── MFA request cards
        │   └── Approve/Deny action buttons
        ├── <PermissionSystem />        (pages/PermissionSystem.tsx)
        │   ├── Family member list with permission levels
        │   ├── Pending permission requests
        │   └── Permission history log
        └── <ParentApp />               (pages/ParentApp.tsx)
            ├── Task list (bills, appointments, meds)
            ├── Mood check-in prompt
            └── Permission hub (simplified view)
```

### 3.2 Routing Structure

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Landing` | Public landing page with product overview |
| `/dashboard` | `Dashboard` | Child-facing family dashboard |
| `/dashboard/bills` | `BillCenter` | Shared bill tracking |
| `/dashboard/vault` | `DocumentVault` | Document storage and sharing |
| `/dashboard/mfa` | `MFAHub` | MFA request management |
| `/dashboard/permissions` | `PermissionSystem` | Permission management |
| `/parent` | `ParentApp` | Parent-facing simplified app |
| `*` | `Landing` | 404 fallback to landing page |

### 3.3 State Management

**Current approach:** React `useState` + `useEffect` in each page component. No global state library. Data fetched from API on component mount.

**Rationale:** Simple, sufficient for MVP. Each page is relatively self-contained. Moving to a more robust approach in Phase 2.

**Phase 2 plan:** React Context or Zustand for cross-page state (auth status, current family, user role). React Query (TanStack Query) for server state caching and invalidation.

### 3.4 Styling System

Tailwind CSS v4 with custom design tokens for the Kinovia brand:

```css
@theme {
  --color-brand-50: #f0fdf4;   /* Lightest green */
  --color-brand-600: #16a34a;  /* Primary action green */
  --color-brand-800: #166534;  /* Text on brand bg */
  --color-accent-500: #3b82f6; /* Secondary blue */
  --color-warm-50: #faf8f5;    /* Page background */
  --color-earth-700: #44403c;  /* Body text */
  --color-earth-900: #1c1917;  /* Headings */
}
```

Typography: Inter (Google Fonts), with system-ui fallbacks.

---

## 4. Backend Architecture

### 4.1 Server Entry Point

**File:** `packages/server/src/index.ts`  
**Runtime:** Bun HTTP server on port 3001 (dev) or proxied to port 3000 (production)  
**Pattern:** Single `Bun.serve()` call with a `fetch` handler that routes by URL pathname and HTTP method.

### 4.2 Design Decisions

- **No framework.** Manual URL parsing and routing. Chosen for MVP simplicity and low memory footprint.
- **CORS enabled.** `Access-Control-Allow-Origin: *` for development. Will be locked down in Phase 2.
- **In-memory data.** No database. Data lives in TypeScript arrays and resets on server restart.
- **JSON API.** All responses are `Content-Type: application/json`.

### 4.3 Endpoint Catalog

#### Health & Meta

| Method | Path | Description | Auth Required |
|--------|------|-------------|---------------|
| `GET` | `/health` | Health check — returns status, timestamp, version | No |
| `GET` | `/api` | API root info — name, version, docs link | No |

#### Bills

| Method | Path | Description | Query Params | Request Body | Response |
|--------|------|-------------|-------------|-------------|----------|
| `GET` | `/api/bills` | List all bills | `?status=overdue\|paid\|due_soon\|...` | — | `Bill[]` |
| `GET` | `/api/bills/:id` | Get single bill | — | — | `Bill` or `404` |
| `PATCH` | `/api/bills/:id` | Update bill status | — | `{ status: string }` | Updated `Bill` |

#### Documents

| Method | Path | Description | Query Params | Request Body | Response |
|--------|------|-------------|-------------|-------------|----------|
| `GET` | `/api/documents` | List all documents | `?category=legal\|medical\|financial\|personal` | — | `DocumentItem[]` |
| `GET` | `/api/documents/:id` | Get single document | — | — | `DocumentItem` or `404` |

#### MFA Requests

| Method | Path | Description | Query Params | Request Body | Response |
|--------|------|-------------|-------------|-------------|----------|
| `GET` | `/api/mfa/requests` | List MFA requests | `?status=pending\|approved\|denied` | — | `MFARequest[]` |
| `POST` | `/api/mfa/requests/:id/approve` | Approve a pending MFA request | — | — | Updated `MFARequest` |
| `POST` | `/api/mfa/requests/:id/deny` | Deny a pending MFA request | — | `{ reason?: string }` | Updated `MFARequest` |

#### Permissions

| Method | Path | Description | Query Params | Request Body | Response |
|--------|------|-------------|-------------|-------------|----------|
| `GET` | `/api/permissions` | Get full permission state | — | — | `{ members, requests, history }` |
| `POST` | `/api/permissions/request-upgrade` | Request a permission upgrade | — | `{ memberId, toLevel }` | `{ request, member }` or error |

#### Static Assets

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/*` | Serves static files from `dist/` (SPA fallback) |

### 4.4 Error Response Format

All errors return JSON with an `error` field:

```json
{
  "error": "Bill not found"
}
```

Standard HTTP status codes used: `200`, `201`, `400`, `404`.

---

## 5. Data Models

### 5.1 Bill

```typescript
interface Bill {
  id: string;                    // Unique identifier ("b1", "b2", ...)
  name: string;                  // Display name ("Electric", "Water")
  provider: string;              // Service provider ("Eversource", "Verizon")
  amount: number;                // Dollar amount (115.00)
  dueDate: string;               // ISO date string ("2026-06-28")
  status: "paid"                 // Payment status
    | "scheduled" 
    | "due_soon" 
    | "overdue" 
    | "upcoming";
  paidDate: string | null;       // ISO date when paid, null if not
}
```

### 5.2 DocumentItem

```typescript
interface DocumentItem {
  id: string;                    // Unique identifier ("d1", "d2", ...)
  name: string;                  // Display name ("Power of Attorney")
  category: "legal"              // Document category
    | "medical" 
    | "financial" 
    | "personal";
  addedDate: string;             // ISO date of upload ("2026-03-15")
  fileType: "pdf"                // File format
    | "image" 
    | "doc" 
    | "spreadsheet";
  accessRoles: string[];         // Names of family members with access
}
```

### 5.3 MFARequest

```typescript
interface MFARequest {
  id: string;                    // Unique identifier ("mfa1", "mfa2", ...)
  requester: string;             // Who is requesting MFA access
  serviceName: string;           // Service being accessed ("Medicare.gov")
  serviceCategory: "medical"     // Category for filtering
    | "financial" 
    | "utilities" 
    | "other";
  relativeTime: string;          // Human-readable time ("2 min ago")
  timestamp: string;             // ISO datetime of request
  status: "pending"              // Current status
    | "approved" 
    | "denied";
  actionBy?: string;             // Who acted on the request
  actionTime?: string;           // When action was taken
  denyReason?: string;           // Reason if denied
}
```

### 5.4 PermissionMember

```typescript
type PermissionLevel = "observer" | "helper" | "poa";

interface PermissionMember {
  id: string;                    // Unique identifier ("mom", "yani")
  name: string;                  // Display name
  role: "parent" | "child";      // Family role
  relationship: string;          // Human-readable ("Daughter", "Parent")
  permissionLevel: PermissionLevel;  // Current permission tier
  activeSince: string;           // ISO date when permissions were first granted
}
```

**Permission Levels:**
- `observer` — View-only access to shared items
- `helper` — Can mark bills paid, upload documents, approve MFA requests
- `poa` — Full access (Power of Attorney equivalent)

### 5.5 PermissionRequest

```typescript
interface PermissionRequest {
  id: string;                    // Unique identifier
  memberId: string;              // Link to PermissionMember
  memberName: string;            // Display name for convenience
  fromLevel: PermissionLevel;    // Current permission level
  toLevel: PermissionLevel;      // Requested permission level
  status: "pending"              // Request status
    | "approved" 
    | "denied" 
    | "cancelled";
  requestedDate: string;         // ISO date of request
  resolvedDate?: string;         // ISO date when resolved
  relativeTime: string;          // Human-readable time
}
```

### 5.6 PermissionHistoryEntry

```typescript
interface PermissionHistoryEntry {
  id: string;                    // Unique identifier
  description: string;           // Human-readable event description
  timestamp: string;             // ISO datetime
  relativeTime: string;          // Human-readable time
  type: "grant"                  // Event type
    | "request"
    | "upgrade"
    | "downgrade"
    | "revoke";
}
```

---

## 6. Current Infrastructure

### 6.1 Deployment Architecture

```
┌──────────────────────────────────────────┐
│            kinovia.ctonew.app             │
│               (Port 3000)                 │
│                                           │
│  ┌────────────────────────────────────┐  │
│  │         publish.sh script           │  │
│  │  1. bun install                     │  │
│  │  2. Starts Bun HTTP server          │  │
│  │  3. Serves static files from dist/  │  │
│  │  4. Routes /api/* to API handlers   │  │
│  └────────────────────────────────────┘  │
│                                           │
│  /home/team/shared/site/                  │
│  ├── dist/              (built SPA files) │
│  ├── package.json       (site config)     │
│  └── publish.sh         (deploy script)   │
└──────────────────────────────────────────┘
```

### 6.2 Build & Publish Pipeline

```
CareCircle repo (packages/web)
    │
    ├── bun run build        # Vite produces dist/
    │   ├── dist/index.html
    │   ├── dist/assets/index-{hash}.js   (~319 KB, ~91 KB gzipped)
    │   └── dist/assets/index-{hash}.css  (~42 KB, ~8 KB gzipped)
    │
    └── cp -r dist/* → /home/team/shared/site/dist/
        │
        └── bun run publish   # Starts Bun server on port 3000
            └── Site live at https://kinovia.ctonew.app
```

### 6.3 Dev Workflow

```bash
# Backend dev server (port 3001)
bun run dev:server

# Frontend dev server (port 5173, with HMR)
bun run dev:web

# Build both packages
bun run build

# Publish to live site
cd /home/team/shared/site && bun run publish
```

---

## 7. Future Architecture (Phase 2+)

### 7.1 Authentication & Authorization

| Component | Phase 1 (Current) | Phase 2 (Target) |
|-----------|------------------|-----------------|
| **Identity provider** | None (mock user) | Auth0 or Clerk |
| **Auth methods** | None | Email/password, SSO, Magic links |
| **Session management** | None | JWT tokens with refresh |
| **Role-based access** | Mocked in API | JWT claims + middleware |
| **MFA** | None | Required for child accounts |

**Onboarding flows:**
1. **Child-first flow:** Adult child signs up → creates family → invites parent via email/SMS → parent accepts with simplified flow
2. **Parent-first flow:** Parent signs up (simplified) → adds children → children accept invitation

### 7.2 Database

| Component | Phase 1 (Current) | Phase 2 (Target) |
|-----------|------------------|-----------------|
| **Database** | In-memory arrays | PostgreSQL (Supabase or Turso) |
| **ORM** | None | Drizzle ORM or Prisma |
| **Migrations** | None | Versioned migration files |
| **Backups** | None | Daily automated backups |
| **Multi-region** | N/A | Read replicas for latency |

**Proposed schema (Phase 2):**

```
families
  ├── id, name, created_at

users
  ├── id, family_id, email, name, role (parent|child|professional)
  ├── auth_provider_id, auth_provider (auth0|clerk)

bills
  ├── id, family_id, name, provider, amount_cents
  ├── due_date, status, paid_date, paid_by_user_id

documents
  ├── id, family_id, name, category, file_type
  ├── storage_key (S3), uploaded_by_user_id, created_at

document_permissions
  ├── document_id, user_id, can_view, can_delete

mfa_requests
  ├── id, family_id, requester_user_id, service_name
  ├── service_category, status, action_by_user_id, action_at

permissions
  ├── user_id, target_user_id, feature (bills|documents|passwords|...)
  ├── level (observer|helper|poa), granted_by_user_id, granted_at

permission_history
  ├── id, family_id, description, event_type
  ├── actor_user_id, target_user_id, created_at

appointments
  ├── id, family_id, title, doctor_name, location
  ├── datetime, notes, created_by_user_id

medications
  ├── id, family_id, name, dosage, frequency
  ├── next_dose_at, last_confirmed_at, confirmed_by_user_id

activity_log
  ├── id, family_id, description, event_type, actor_user_id, created_at
```

### 7.3 File Storage

| Component | Phase 1 (Current) | Phase 2 (Target) |
|-----------|------------------|-----------------|
| **Document storage** | None (metadata only) | AWS S3 or Cloudflare R2 |
| **Upload handling** | Not implemented | Presigned URLs or direct upload |
| **Access control** | None | Signed URLs with expiration |
| **Encryption** | N/A | Server-side encryption (AES-256) |

### 7.4 Integrations

| Integration | Purpose | Phase | API |
|-------------|---------|-------|-----|
| **Plaid** | Bank account linking, bill detection | Phase 2 | Plaid Link + Transactions API |
| **Stripe** | Payment processing, subscriptions | Phase 2 | Stripe Connect + Billing |
| **Twilio Lookup** | Phone number scam detection | Phase 2 | Lookup API |
| **Google Calendar** | Two-way calendar sync | Phase 2 | Google Calendar API |
| **Apple Calendar** | Two-way calendar sync | Phase 2 | CalDAV |
| **SendGrid / Resend** | Transactional emails | Phase 2 | Email API |

### 7.5 CI/CD Pipeline (Phase 2 Target)

```
GitHub (main branch)
    │
    ├── Push → GitHub Actions
    │   ├── Lint & Type-check
    │   ├── Unit tests (Vitest)
    │   ├── Build (Vite + Bun)
    │   └── Deploy to staging
    │       ├── E2E tests (Playwright)
    │       └── Manual approval gate
    │           └── Deploy to production
    │
    └── PR → Preview deployment
        └── Auto-comment with preview URL
```

---

## 8. Security Considerations

### 8.1 Data Isolation

Each family's data must be strictly isolated — no cross-family data leakage. This is enforced through:

- **Database level:** Every query filtered by `family_id`. Row-Level Security (RLS) in PostgreSQL.
- **API level:** Middleware validates JWT claims include the correct `family_id` before any data access.
- **Storage level:** S3/R2 objects stored under `/{family_id}/{document_id}` prefix. Access via signed URLs only.

### 8.2 Permission Enforcement

Permission checks happen at multiple layers:

1. **Frontend:** UI hides actions the user can't perform (convenience, not security).
2. **API middleware:** Every request validates the user's permission level for the target resource.
3. **Database RLS:** Final backstop — even if middleware is bypassed, database policies prevent unauthorized reads/writes.

### 8.3 PII Handling

| Data Type | Classification | Storage | Access Control |
|-----------|---------------|---------|----------------|
| Names, relationships | PII | Database, encrypted at rest | Family-scoped |
| Email addresses | PII | Auth provider + database | User-scoped |
| Financial data (bill amounts) | Sensitive PII | Database, encrypted | Permission-gated |
| Documents (will, POA, insurance) | Highly sensitive | S3/R2, AES-256 encrypted | Per-document access control |
| MFA codes | Transient | Never stored; relayed only | In-memory during active session |
| Passwords | Highly sensitive | Encrypted vault (Zero-knowledge architecture planned) | Parent-granted access |

### 8.4 Threat Model

| Threat | Mitigation |
|--------|------------|
| Unauthorized family member accessing data | Granular permissions, audit logging, parent-controlled revocation |
| Cross-family data leakage | Family ID scoping, RLS, API middleware |
| Credential theft | MFA required for all child accounts, session timeouts |
| Man-in-the-middle | TLS 1.3, HSTS |
| Insider access to PII | Access logging, principle of least privilege, encrypted at rest |
| Document exfiltration | Signed URLs with expiration, access audit trail |

---

## 9. Performance Considerations

### 9.1 Current Bundle Size

| Asset | Uncompressed | Gzipped |
|-------|-------------|---------|
| JavaScript | ~319 KB | ~91 KB |
| CSS | ~42 KB | ~8 KB |
| HTML | ~1 KB | ~0.5 KB |
| **Total** | **~362 KB** | **~99.5 KB** |

Well within the <500 KB gzipped target. Room for growth as features are added.

### 9.2 Phase 2 Optimizations

- **Code splitting:** React Router lazy loading for dashboard sub-pages (`/dashboard/bills`, `/dashboard/vault`, etc.)
- **API response caching:** TanStack Query client-side cache with stale-while-revalidate
- **Image optimization:** Responsive images for document thumbnails, lazy loading
- **Edge caching:** CDN for static assets, edge functions for API responses where appropriate

### 9.3 Scalability Targets

| Metric | Phase 1 | Phase 2 | Phase 3 |
|--------|---------|---------|---------|
| Concurrent families | 50 | 1,000 | 10,000+ |
| API requests/min | <100 | <1,000 | <10,000 |
| Document storage | N/A | 100 GB | 1 TB+ |
| Database size | N/A | 10 GB | 100 GB+ |

---

*Last updated: July 2026*
