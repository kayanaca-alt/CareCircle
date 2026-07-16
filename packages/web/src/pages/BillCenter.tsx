import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

// ── Types ────────────────────────────────────────────────────────────

export interface Bill {
  id: string;
  name: string;
  provider: string;
  amount: number;
  dueDate: string;
  status: "paid" | "scheduled" | "due_soon" | "overdue" | "upcoming";
  paidDate: string | null;
}

type FilterTab = "all" | "upcoming" | "paid" | "overdue";

// ── Status helpers ───────────────────────────────────────────────────

function statusLabel(status: Bill["status"]): string {
  const labels: Record<Bill["status"], string> = {
    paid: "Paid",
    scheduled: "Scheduled",
    due_soon: "Due Soon",
    overdue: "Overdue",
    upcoming: "Upcoming",
  };
  return labels[status];
}

function statusBadgeClasses(status: Bill["status"]): string {
  const map: Record<Bill["status"], string> = {
    paid: "bg-green-100 text-green-800 border-green-200",
    scheduled: "bg-accent-100 text-accent-800 border-accent-200",
    due_soon: "bg-amber-100 text-amber-800 border-amber-200",
    overdue: "bg-red-100 text-red-800 border-red-200",
    upcoming: "bg-warm-100 text-warm-800 border-warm-200",
  };
  return map[status];
}

function statusIcon(status: Bill["status"]): string {
  const icons: Record<Bill["status"], string> = {
    paid: "✅",
    scheduled: "🔵",
    due_soon: "🟡",
    overdue: "🔴",
    upcoming: "📄",
  };
  return icons[status];
}

function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Mock data ────────────────────────────────────────────────────────

const mockBills: Bill[] = [
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

// ── Summary Bar ──────────────────────────────────────────────────────

function SummaryBar({ bills: billList }: { bills: Bill[] }) {
  const totalUpcoming = useMemo(
    () =>
      billList
        .filter((b) => b.status !== "paid")
        .reduce((sum, b) => sum + b.amount, 0),
    [billList],
  );

  const paidThisMonth = useMemo(
    () =>
      billList
        .filter((b) => b.status === "paid")
        .reduce((sum, b) => sum + b.amount, 0),
    [billList],
  );

  const atRiskCount = useMemo(
    () => billList.filter((b) => b.status === "overdue" || b.status === "due_soon").length,
    [billList],
  );

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-brand-100/60 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-earth-400">
          Total Upcoming
        </p>
        <p className="mt-1.5 text-2xl font-bold text-earth-900">
          {formatCurrency(totalUpcoming)}
        </p>
      </div>
      <div className="rounded-xl border border-brand-100/60 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-earth-400">
          Paid This Month
        </p>
        <p className="mt-1.5 text-2xl font-bold text-brand-700">
          {formatCurrency(paidThisMonth)}
        </p>
      </div>
      <div className="rounded-xl border border-brand-100/60 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-wide text-earth-400">
          Overdue / At Risk
        </p>
        <p
          className={`mt-1.5 text-2xl font-bold ${
            atRiskCount > 0 ? "text-red-600" : "text-brand-700"
          }`}
        >
          {atRiskCount}
        </p>
      </div>
    </div>
  );
}

// ── Filter Tabs ──────────────────────────────────────────────────────

function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
  counts: Record<FilterTab, number>;
}) {
  const tabs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "upcoming", label: "Upcoming" },
    { key: "paid", label: "Paid" },
    { key: "overdue", label: "Overdue" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            active === tab.key
              ? "bg-brand-500 text-white shadow-sm"
              : "bg-white text-earth-600 ring-1 ring-brand-100/60 hover:bg-brand-50 hover:text-brand-700"
          }`}
        >
          {tab.label}
          <span
            className={`ml-1 rounded-full px-1.5 py-0.5 text-xs ${
              active === tab.key
                ? "bg-white/20 text-white"
                : "bg-brand-50 text-brand-600"
            }`}
          >
            {counts[tab.key]}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Bill Row ─────────────────────────────────────────────────────────

function BillRow({
  bill,
  onMarkPaid,
}: {
  bill: Bill;
  onMarkPaid: (id: string) => void;
}) {
  const isActionable =
    bill.status === "due_soon" || bill.status === "overdue" || bill.status === "scheduled" || bill.status === "upcoming";

  const dueDate = new Date(bill.dueDate + "T00:00:00");
  const formattedDate = dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-100/60 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-4">
        {/* Status indicator */}
        <span className="hidden text-lg sm:block">{statusIcon(bill.status)}</span>

        {/* Bill info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-earth-900">
            {bill.name}
            <span className="font-normal text-earth-400"> — {bill.provider}</span>
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-earth-500">
            <span>Due {formattedDate}</span>
            {bill.paidDate && (
              <span className="text-green-600">Paid {bill.paidDate}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:flex-shrink-0">
        {/* Amount */}
        <span className="text-base font-bold text-earth-900">
          {formatCurrency(bill.amount)}
        </span>

        {/* Status badge */}
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusBadgeClasses(bill.status)}`}
        >
          {statusLabel(bill.status)}
        </span>

        {/* Action button */}
        {isActionable && (
          <button
            onClick={() => onMarkPaid(bill.id)}
            className="rounded-lg bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-brand-600 active:scale-[0.97]"
          >
            {bill.status === "overdue" || bill.status === "due_soon"
              ? "Pay Now"
              : "Mark Paid"}
          </button>
        )}
        {bill.status === "paid" && (
          <span className="rounded-lg bg-green-50 px-3.5 py-1.5 text-xs font-semibold text-green-700">
            Paid ✓
          </span>
        )}
      </div>
    </div>
  );
}

// ── Bill Center Page ─────────────────────────────────────────────────

export default function BillCenter() {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredBills = useMemo(() => {
    if (activeTab === "all") return bills;
    if (activeTab === "upcoming")
      return bills.filter(
        (b) => b.status === "scheduled" || b.status === "due_soon" || b.status === "upcoming",
      );
    if (activeTab === "overdue")
      return bills.filter((b) => b.status === "overdue" || b.status === "due_soon");
    return bills.filter((b) => b.status === "paid");
  }, [bills, activeTab]);

  const tabCounts = useMemo(() => {
    const all = bills.length;
    const upcoming = bills.filter(
      (b) => b.status === "scheduled" || b.status === "due_soon" || b.status === "upcoming",
    ).length;
    const paid = bills.filter((b) => b.status === "paid").length;
    const overdue = bills.filter(
      (b) => b.status === "overdue" || b.status === "due_soon",
    ).length;
    return { all, upcoming, paid, overdue } as Record<FilterTab, number>;
  }, [bills]);

  function handleMarkPaid(id: string) {
    setBills((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: "paid" as const, paidDate: new Date().toISOString().split("T")[0] }
          : b,
      ),
    );
  }

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: "🏠" },
    { label: "Bill Center", href: "/dashboard/bills", icon: "📋" },
    { label: "Document Vault", href: "/dashboard/vault", icon: "📁" },
    { label: "MFA Hub", href: "/dashboard/mfa", icon: "🔐" },
    { label: "Permissions", href: "/dashboard/permissions", icon: "🛡️" },
    { label: "Appointments", href: "/appointments", icon: "📅" },
  ];

  return (
    <div className="flex min-h-dvh bg-warm-50">
      {/* Sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-dvh w-64 flex-col border-r border-brand-100/60 bg-white transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-brand-100/60 px-6 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            C
          </span>
          <span className="text-lg font-bold text-brand-800">CareCircle</span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navLinks.map((link) => {
            const isActive = link.href === "/dashboard/bills";
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-earth-600 hover:bg-warm-50 hover:text-brand-700"
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-brand-100/60 px-6 py-4">
          <Link to="/" className="text-xs text-earth-400 hover:text-brand-600 transition-colors">
            ← Back to home
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-brand-100/60 bg-warm-50/90 px-4 py-3 backdrop-blur-md lg:hidden">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-xs font-bold text-white">
              C
            </span>
            <span className="font-semibold text-brand-800">CareCircle</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-earth-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </header>

        <main className="flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand-950">Bill Center</h1>
              <p className="mt-1 text-sm text-earth-500">
                Track and manage all family bills in one place
              </p>
            </div>
            <Link
              to="/dashboard"
              className="rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-earth-600 shadow-sm ring-1 ring-brand-100/60 transition-all hover:bg-brand-50 hover:text-brand-700"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Summary */}
          <SummaryBar bills={bills} />

          {/* Filter tabs */}
          <FilterTabs active={activeTab} onChange={setActiveTab} counts={tabCounts} />

          {/* Bill list */}
          <div className="space-y-3">
            {filteredBills.length === 0 ? (
              <div className="rounded-xl border border-brand-100/60 bg-white p-8 text-center">
                <p className="text-sm text-earth-400">No bills match this filter.</p>
              </div>
            ) : (
              filteredBills.map((bill) => (
                <BillRow key={bill.id} bill={bill} onMarkPaid={handleMarkPaid} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}