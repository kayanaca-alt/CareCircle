import { useState } from "react";
import { Link } from "react-router-dom";

// ── TypeScript interfaces ──────────────────────────────────────────

export type StatusLevel = "green" | "yellow" | "red";

export interface ParentStatusItem {
  id: string;
  label: string;
  detail: string;
  status: StatusLevel;
}

export interface Alert {
  id: string;
  message: string;
  severity: "info" | "warning" | "critical";
  actionable: boolean;
}

export interface ActivityEvent {
  id: string;
  description: string;
  timestamp: Date;
  relativeTime: string;
}

export interface QuickAction {
  label: string;
  href: string;
  icon: string;
  description: string;
}

// ── Mock data ──────────────────────────────────────────────────────

const parentStatusItems: ParentStatusItem[] = [
  { id: "1", label: "Utilities", detail: "Current", status: "green" },
  { id: "2", label: "Rent/Mortgage", detail: "Paid", status: "green" },
  { id: "3", label: "Credit Card", detail: "Due in 5 Days", status: "yellow" },
  { id: "4", label: "Phone Bill", detail: "Paid", status: "green" },
  { id: "5", label: "Fraud Alerts", detail: "No alerts", status: "green" },
  { id: "6", label: "MRI Appointment", detail: "Next Week", status: "yellow" },
];

const alerts: Alert[] = [
  {
    id: "a1",
    message: "Water bill due Friday",
    severity: "warning",
    actionable: true,
  },
  {
    id: "a2",
    message: "Medicare renewal paperwork incomplete",
    severity: "warning",
    actionable: true,
  },
  {
    id: "a3",
    message: "Unusual $900 transaction detected",
    severity: "critical",
    actionable: true,
  },
  {
    id: "a4",
    message: "Prescription refill needed in 7 days",
    severity: "info",
    actionable: true,
  },
];

const activityFeed: ActivityEvent[] = [
  {
    id: "e1",
    description: "Electric bill paid",
    timestamp: new Date(Date.now() - 86400000),
    relativeTime: "Yesterday",
  },
  {
    id: "e2",
    description: "Appointment confirmed",
    timestamp: new Date(Date.now() - 2 * 86400000),
    relativeTime: "Tuesday",
  },
  {
    id: "e3",
    description: "Added new doctor contact",
    timestamp: new Date(Date.now() - 3 * 86400000),
    relativeTime: "Monday",
  },
];

const quickActions: QuickAction[] = [
  {
    label: "Bill Center",
    href: "/dashboard/bills",
    icon: "📋",
    description: "Track and manage bills",
  },
  {
    label: "Document Vault",
    href: "/dashboard/vault",
    icon: "📁",
    description: "Store important documents",
  },
  {
    label: "MFA Hub",
    href: "/dashboard/mfa",
    icon: "🔐",
    description: "Manage shared access",
  },
  {
    label: "Appointments",
    href: "/appointments",
    icon: "📅",
    description: "Doctor visits & reminders",
  },
];

// ── Helpers ────────────────────────────────────────────────────────

function statusDot(status: StatusLevel): string {
  switch (status) {
    case "green":
      return "bg-green-500";
    case "yellow":
      return "bg-amber-500";
    case "red":
      return "bg-red-500";
  }
}

function statusBg(status: StatusLevel): string {
  switch (status) {
    case "green":
      return "bg-green-50 border-green-200";
    case "yellow":
      return "bg-amber-50 border-amber-200";
    case "red":
      return "bg-red-50 border-red-200";
  }
}

function alertSeverityStyles(severity: Alert["severity"]): {
  border: string;
  bg: string;
  dot: string;
} {
  switch (severity) {
    case "critical":
      return {
        border: "border-red-300",
        bg: "bg-red-50",
        dot: "bg-red-500",
      };
    case "warning":
      return {
        border: "border-amber-300",
        bg: "bg-amber-50",
        dot: "bg-amber-500",
      };
    case "info":
      return {
        border: "border-accent-300",
        bg: "bg-accent-50",
        dot: "bg-accent-500",
      };
  }
}

// ── Sidebar ────────────────────────────────────────────────────────

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: "🏠" },
  { label: "Bill Center", href: "/dashboard/bills", icon: "📋" },
  { label: "Document Vault", href: "/dashboard/vault", icon: "📁" },
  { label: "MFA Hub", href: "/dashboard/mfa", icon: "🔐" },
  { label: "Appointments", href: "/appointments", icon: "📅" },
];

function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 flex h-dvh w-64 flex-col border-r border-brand-100/60 bg-white transition-transform duration-300
          lg:static lg:z-0 lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar header */}
        <div className="flex items-center gap-2 border-b border-brand-100/60 px-6 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
            C
          </span>
          <span className="text-lg font-bold text-brand-800">CareCircle</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navLinks.map((link) => {
            const isActive = link.href === "/dashboard";
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                  ${
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-earth-600 hover:bg-warm-50 hover:text-brand-700"
                  }
                `}
              >
                <span className="text-lg">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="border-t border-brand-100/60 px-6 py-4">
          <Link
            to="/"
            className="text-xs text-earth-400 hover:text-brand-600 transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </aside>
    </>
  );
}

// ── Mobile header ──────────────────────────────────────────────────

function MobileHeader({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-brand-100/60 bg-warm-50/90 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-xs font-bold text-white">
          C
        </span>
        <span className="font-semibold text-brand-800">CareCircle</span>
      </div>
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-earth-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
        aria-label="Open menu"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}

// ── Section: Parent Status Overview ────────────────────────────────

function ParentStatusOverview() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-brand-950">
        Parent Status Overview
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {parentStatusItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-shadow hover:shadow-sm ${statusBg(item.status)}`}
          >
            <span className={`h-3 w-3 flex-shrink-0 rounded-full ${statusDot(item.status)}`} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-earth-800">{item.label}</p>
              <p className="truncate text-xs text-earth-500">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section: Alerts Panel ──────────────────────────────────────────

function AlertsPanel() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-950">Alerts</h2>
        <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
          {alerts.length} active
        </span>
      </div>
      <div className="space-y-3">
        {alerts.map((alert) => {
          const styles = alertSeverityStyles(alert.severity);
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${styles.border} ${styles.bg} transition-shadow hover:shadow-sm`}
            >
              <span className={`mt-0.5 h-2.5 w-2.5 flex-shrink-0 rounded-full ${styles.dot}`} />
              <p className="flex-1 text-sm font-medium text-earth-800">
                {alert.message}
              </p>
              {alert.actionable && (
                <button className="flex-shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-200 transition-all hover:bg-brand-50 hover:shadow active:scale-[0.97]">
                  Review
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Section: Activity Feed ─────────────────────────────────────────

function ActivityFeed() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-brand-950">Recent Activity</h2>
      <div className="rounded-xl border border-brand-100/60 bg-white">
        {activityFeed.map((event, i) => (
          <div
            key={event.id}
            className={`flex items-center gap-4 px-5 py-3.5 ${
              i < activityFeed.length - 1 ? "border-b border-brand-100/40" : ""
            }`}
          >
            <span className="flex-shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600">
              {event.relativeTime}
            </span>
            <p className="text-sm text-earth-700">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Section: Quick Actions ─────────────────────────────────────────

function QuickActions() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-brand-950">Quick Actions</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            to={action.href}
            className="group flex flex-col items-center gap-2 rounded-xl border border-brand-100/60 bg-white p-5 text-center shadow-sm transition-all hover:border-brand-200 hover:shadow-md active:scale-[0.98]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl transition-colors group-hover:bg-brand-100">
              {action.icon}
            </span>
            <span className="text-sm font-semibold text-brand-800">{action.label}</span>
            <span className="text-xs text-earth-400">{action.description}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-warm-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <ParentStatusOverview />
          <AlertsPanel />
          <ActivityFeed />
          <QuickActions />
        </main>
      </div>
    </div>
  );
}
