// ── Types ────────────────────────────────────────────────────────────

interface Bill {
  id: string;
  name: string;
  provider: string;
  amount: number;
  dueDate: string;
  status: "paid" | "scheduled" | "due_soon" | "overdue" | "upcoming";
  paidDate: string | null;
}

interface DocumentItem {
  id: string;
  name: string;
  category: "legal" | "medical" | "financial" | "personal";
  addedDate: string;
  fileType: "pdf" | "image" | "doc" | "spreadsheet";
  accessRoles: string[];
}

interface MFARequest {
  id: string;
  requester: string;
  serviceName: string;
  serviceCategory: "medical" | "financial" | "utilities" | "other";
  relativeTime: string;
  timestamp: string;
  status: "pending" | "approved" | "denied";
  actionBy?: string;
  actionTime?: string;
  denyReason?: string;
}

type PermissionLevel = "observer" | "helper" | "poa";

interface PermissionMember {
  id: string;
  name: string;
  role: "parent" | "child";
  relationship: string;
  permissionLevel: PermissionLevel;
  activeSince: string;
}

interface PermissionRequest {
  id: string;
  memberId: string;
  memberName: string;
  fromLevel: PermissionLevel;
  toLevel: PermissionLevel;
  status: "pending" | "approved" | "denied" | "cancelled";
  requestedDate: string;
  resolvedDate?: string;
  relativeTime: string;
}

interface PermissionHistoryEntry {
  id: string;
  description: string;
  timestamp: string;
  relativeTime: string;
  type: "grant" | "request" | "upgrade" | "downgrade" | "revoke";
}

// ── Mock data ────────────────────────────────────────────────────────

const bills: Bill[] = [
  {
    id: "b1",
    name: "Electric",
    provider: "Eversource",
    amount: 115.0,
    dueDate: "2026-06-28",
    status: "due_soon",
    paidDate: null,
  },
  {
    id: "b2",
    name: "Water",
    provider: "City Water Dept",
    amount: 43.0,
    dueDate: "2026-07-02",
    status: "scheduled",
    paidDate: null,
  },
  {
    id: "b3",
    name: "Phone",
    provider: "Verizon",
    amount: 89.0,
    dueDate: "2026-07-05",
    status: "paid",
    paidDate: "2026-06-30",
  },
  {
    id: "b4",
    name: "Mortgage",
    provider: "Chase Home Lending",
    amount: 1450.0,
    dueDate: "2026-07-01",
    status: "scheduled",
    paidDate: null,
  },
  {
    id: "b5",
    name: "Credit Card",
    provider: "Visa — Chase",
    amount: 320.0,
    dueDate: "2026-06-25",
    status: "overdue",
    paidDate: null,
  },
  {
    id: "b6",
    name: "Internet",
    provider: "Xfinity",
    amount: 75.0,
    dueDate: "2026-07-10",
    status: "upcoming",
    paidDate: null,
  },
];

const documents: DocumentItem[] = [
  {
    id: "d1",
    name: "Power of Attorney",
    category: "legal",
    addedDate: "2026-03-15",
    fileType: "pdf",
    accessRoles: ["Mom", "Yani"],
  },
  {
    id: "d2",
    name: "Last Will & Testament",
    category: "legal",
    addedDate: "2026-01-22",
    fileType: "pdf",
    accessRoles: ["Mom", "Yani"],
  },
  {
    id: "d3",
    name: "Medicare Card",
    category: "medical",
    addedDate: "2026-06-01",
    fileType: "image",
    accessRoles: ["Mom", "Yani", "Doctor"],
  },
  {
    id: "d4",
    name: "Health Insurance Card",
    category: "medical",
    addedDate: "2026-06-01",
    fileType: "image",
    accessRoles: ["Mom", "Yani"],
  },
  {
    id: "d5",
    name: "2025 Tax Return",
    category: "financial",
    addedDate: "2026-04-10",
    fileType: "pdf",
    accessRoles: ["Mom", "Yani"],
  },
  {
    id: "d6",
    name: "Home Deed",
    category: "financial",
    addedDate: "2025-11-03",
    fileType: "pdf",
    accessRoles: ["Mom", "Yani"],
  },
  {
    id: "d7",
    name: "Emergency Contacts",
    category: "personal",
    addedDate: "2026-05-18",
    fileType: "doc",
    accessRoles: ["Mom", "Yani"],
  },
  {
    id: "d8",
    name: "Password List",
    category: "personal",
    addedDate: "2026-02-10",
    fileType: "doc",
    accessRoles: ["Mom"],
  },
];

const mfaRequests: MFARequest[] = [
  {
    id: "mfa1",
    requester: "Mom",
    serviceName: "Medicare.gov",
    serviceCategory: "medical",
    relativeTime: "2 min ago",
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: "pending",
  },
  {
    id: "mfa2",
    requester: "Yani",
    serviceName: "Electric bill payment",
    serviceCategory: "utilities",
    relativeTime: "5 min ago",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: "pending",
  },
  {
    id: "mfa3",
    requester: "Mom",
    serviceName: "Bank of America",
    serviceCategory: "financial",
    relativeTime: "15 min ago",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: "approved",
    actionBy: "Yani",
    actionTime: "15 min ago",
  },
  {
    id: "mfa4",
    requester: "Mom",
    serviceName: "Health Insurance Portal",
    serviceCategory: "medical",
    relativeTime: "1 hour ago",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    status: "approved",
    actionBy: "Yani",
    actionTime: "1 hour ago",
  },
  {
    id: "mfa5",
    requester: "Unknown",
    serviceName: "Bank of America",
    serviceCategory: "financial",
    relativeTime: "3 hours ago",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: "denied",
    actionBy: "Yani",
    actionTime: "3 hours ago",
    denyReason: "Unknown sign-in attempt from new device",
  },
];

const permissionMembers: PermissionMember[] = [
  {
    id: "mom",
    name: "Mom",
    role: "parent",
    relationship: "Parent",
    permissionLevel: "poa",
    activeSince: "2025-06-01",
  },
  {
    id: "yani",
    name: "Yani",
    role: "child",
    relationship: "Daughter",
    permissionLevel: "observer",
    activeSince: "2026-01-15",
  },
];

const permissionRequests: PermissionRequest[] = [
  {
    id: "pr1",
    memberId: "yani",
    memberName: "Yani",
    fromLevel: "observer",
    toLevel: "helper",
    status: "pending",
    requestedDate: "2026-07-14",
    relativeTime: "2 days ago",
  },
];

const permissionHistory: PermissionHistoryEntry[] = [
  {
    id: "ph1",
    description: "Yani requested Helper access",
    timestamp: "2026-07-14T10:30:00Z",
    relativeTime: "Jul 14, 2026",
    type: "request",
  },
  {
    id: "ph2",
    description: "Mom granted Yani Observer access",
    timestamp: "2026-01-15T09:00:00Z",
    relativeTime: "Jan 15, 2026",
    type: "grant",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function parseBody(req: Request): Promise<Record<string, unknown>> {
  return req.json().catch(() => ({}));
}

// ── Server ───────────────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || "3001");

const server = Bun.serve({
  port: PORT,
  hostname: "0.0.0.0",
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;

    // CORS preflight
    if (method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Health check
    if (method === "GET" && url.pathname === "/health") {
      return jsonResponse({
        status: "ok",
        timestamp: new Date().toISOString(),
        version: "0.1.0",
      });
    }

    // API root
    if (method === "GET" && url.pathname === "/api") {
      return jsonResponse({
        name: "CareCircle API",
        version: "0.1.0",
        docs: "/api/health",
      });
    }

    // ── Bill routes ──────────────────────────────────────────────

    // GET /api/bills — list all bills
    if (method === "GET" && url.pathname === "/api/bills") {
      const statusFilter = url.searchParams.get("status");
      if (statusFilter) {
        const filtered = bills.filter((b) => b.status === statusFilter);
        return jsonResponse(filtered);
      }
      return jsonResponse(bills);
    }

    // GET /api/bills/:id — single bill
    const billIdMatch = url.pathname.match(/^\/api\/bills\/(.+)$/);
    if (method === "GET" && billIdMatch) {
      const bill = bills.find((b) => b.id === billIdMatch[1]);
      if (!bill) {
        return jsonResponse({ error: "Bill not found" }, 404);
      }
      return jsonResponse(bill);
    }

    // PATCH /api/bills/:id — update bill status
    if (method === "PATCH" && billIdMatch) {
      const bill = bills.find((b) => b.id === billIdMatch[1]);
      if (!bill) {
        return jsonResponse({ error: "Bill not found" }, 404);
      }
      const body = await parseBody(req);
      if (body.status && typeof body.status === "string") {
        bill.status = body.status as Bill["status"];
        if (body.status === "paid") {
          bill.paidDate = new Date().toISOString().split("T")[0];
        }
      }
      return jsonResponse(bill);
    }

    // ── Document routes ──────────────────────────────────────────

    // GET /api/documents — list all documents (optional ?category= filter)
    if (method === "GET" && url.pathname === "/api/documents") {
      const categoryFilter = url.searchParams.get("category");
      if (categoryFilter) {
        const filtered = documents.filter((d) => d.category === categoryFilter);
        return jsonResponse(filtered);
      }
      return jsonResponse(documents);
    }

    // GET /api/documents/:id — single document
    const docIdMatch = url.pathname.match(/^\/api\/documents\/(.+)$/);
    if (method === "GET" && docIdMatch) {
      const doc = documents.find((d) => d.id === docIdMatch[1]);
      if (!doc) {
        return jsonResponse({ error: "Document not found" }, 404);
      }
      return jsonResponse(doc);
    }

    // ── MFA routes ───────────────────────────────────────────────

    // GET /api/mfa/requests — list all MFA requests (optional ?status= filter)
    if (method === "GET" && url.pathname === "/api/mfa/requests") {
      const statusFilter = url.searchParams.get("status");
      if (statusFilter) {
        const filtered = mfaRequests.filter((r) => r.status === statusFilter);
        return jsonResponse(filtered);
      }
      return jsonResponse(mfaRequests);
    }

    // POST /api/mfa/requests/:id/approve — approve a request
    const mfaApproveMatch = url.pathname.match(/^\/api\/mfa\/requests\/(.+)\/approve$/);
    if (method === "POST" && mfaApproveMatch) {
      const req = mfaRequests.find((r) => r.id === mfaApproveMatch[1]);
      if (!req) {
        return jsonResponse({ error: "MFA request not found" }, 404);
      }
      if (req.status !== "pending") {
        return jsonResponse({ error: "Request is not pending" }, 400);
      }
      req.status = "approved";
      req.actionBy = "Yani";
      req.actionTime = "Just now";
      return jsonResponse(req);
    }

    // POST /api/mfa/requests/:id/deny — deny a request
    const mfaDenyMatch = url.pathname.match(/^\/api\/mfa\/requests\/(.+)\/deny$/);
    if (method === "POST" && mfaDenyMatch) {
      const req = mfaRequests.find((r) => r.id === mfaDenyMatch[1]);
      if (!req) {
        return jsonResponse({ error: "MFA request not found" }, 404);
      }
      if (req.status !== "pending") {
        return jsonResponse({ error: "Request is not pending" }, 400);
      }
      const body = await parseBody(req);
      req.status = "denied";
      req.actionBy = "Yani";
      req.actionTime = "Just now";
      if (body.reason && typeof body.reason === "string") {
        req.denyReason = body.reason;
      }
      return jsonResponse(req);
    }

    // ── Permission routes ─────────────────────────────────────────

    // GET /api/permissions — family members + their permission levels
    if (method === "GET" && url.pathname === "/api/permissions") {
      return jsonResponse({
        members: permissionMembers,
        requests: permissionRequests.filter((r) => r.status === "pending"),
        history: permissionHistory,
      });
    }

    // POST /api/permissions/request-upgrade — request a permission upgrade
    if (method === "POST" && url.pathname === "/api/permissions/request-upgrade") {
      const body = await parseBody(req);
      const memberId = body.memberId as string;
      const toLevel = body.toLevel as string;

      if (!memberId || !toLevel) {
        return jsonResponse({ error: "memberId and toLevel are required" }, 400);
      }

      const member = permissionMembers.find((m) => m.id === memberId);
      if (!member) {
        return jsonResponse({ error: "Member not found" }, 404);
      }

      const validLevels = ["helper", "poa"];
      if (!validLevels.includes(toLevel)) {
        return jsonResponse({ error: "Invalid permission level" }, 400);
      }

      const newRequest: PermissionRequest = {
        id: `pr${Date.now()}`,
        memberId,
        memberName: member.name,
        fromLevel: member.permissionLevel,
        toLevel: toLevel as PermissionLevel,
        status: "pending",
        requestedDate: new Date().toISOString().split("T")[0],
        relativeTime: "just now",
      };

      permissionRequests.push(newRequest);

      const historyEntry: PermissionHistoryEntry = {
        id: `ph${Date.now()}`,
        description: `${member.name} requested ${toLevel === "helper" ? "Helper" : "Power of Attorney"} access`,
        timestamp: new Date().toISOString(),
        relativeTime: "Just now",
        type: "request",
      };
      permissionHistory.unshift(historyEntry);

      return jsonResponse({ request: newRequest, member }, 201);
    }

    // Fallback
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`CareCircle API server running on http://localhost:${server.port}`);
