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
          "Access-Control-Allow-Methods": "GET, PATCH, OPTIONS",
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

    // Fallback
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`CareCircle API server running on http://localhost:${server.port}`);