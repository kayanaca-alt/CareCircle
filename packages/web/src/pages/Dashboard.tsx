import { useState, useCallback, useEffect } from "react";
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

// ── Alert detail types ─────────────────────────────────────────────

export interface BillAlertDetail {
  type: "bill";
  provider: string;
  amount: string;
  dueDate: string;
  lastPaid: string;
}

export interface MedicareAlertDetail {
  type: "medicare";
  plan: string;
  renewalDeadline: string;
  formsSubmitted: number;
  totalForms: number;
  missingForms: string[];
}

export interface FraudAlertDetail {
  type: "fraud";
  account: string;
  accountNumber: string;
  merchant: string;
  transactionDate: string;
  flaggedReason: string;
}

export interface PrescriptionAlertDetail {
  type: "prescription";
  medication: string;
  prescribedBy: string;
  pharmacy: string;
  lastFilled: string;
  supply: string;
  refillsRemaining: number;
}

export type AlertDetail =
  | BillAlertDetail
  | MedicareAlertDetail
  | FraudAlertDetail
  | PrescriptionAlertDetail;

// ── Mock data ──────────────────────────────────────────────────────

const initialParentStatusItems: ParentStatusItem[] = [
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

const alertDetails: Record<string, AlertDetail> = {
  a1: {
    type: "bill",
    provider: "Aqua Water Co.",
    amount: "$43.00",
    dueDate: "This Friday",
    lastPaid: "June 2",
  },
  a2: {
    type: "medicare",
    plan: "Medicare Part B",
    renewalDeadline: "July 31",
    formsSubmitted: 2,
    totalForms: 4,
    missingForms: [
      "Annual Wellness Visit form",
      "Prescription Drug Coverage attestation",
    ],
  },
  a3: {
    type: "fraud",
    account: "Bank of America — Checking",
    accountNumber: "…4521",
    merchant: "Amazon Marketplace",
    transactionDate: "Yesterday, 3:42 PM",
    flaggedReason: "Unusual amount for this account",
  },
  a4: {
    type: "prescription",
    medication: "Lisinopril 10mg",
    prescribedBy: "Dr. Patel",
    pharmacy: "CVS — 123 Main St",
    lastFilled: "June 15",
    supply: "30-day supply",
    refillsRemaining: 2,
  },
};

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
    label: "Permissions",
    href: "/dashboard/permissions",
    icon: "🛡️",
    description: "Control family access",
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

// ── Alert Detail Modal ─────────────────────────────────────────────

function AlertDetailModal({
  alertId,
  onClose,
  onMarkPaid,
}: {
  alertId: string;
  onClose: () => void;
  onMarkPaid: () => void;
}) {
  const alert = alerts.find((a) => a.id === alertId);
  const detail = alertDetails[alertId];

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!alert || !detail) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`${alert.message} details`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div
          className={`flex items-center justify-between px-5 py-4 ${
            alert.severity === "critical"
              ? "bg-red-50"
              : alert.severity === "warning"
                ? "bg-amber-50"
                : "bg-accent-50"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <AlertIcon type={detail.type} />
            <div>
              <h3 className="text-base font-bold text-earth-900">
                {alert.message}
              </h3>
              <SeverityBadge severity={alert.severity} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-earth-400 transition-colors hover:bg-black/10 hover:text-earth-700"
            aria-label="Close"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body — type-specific */}
        <div className="px-5 py-5">
          {detail.type === "bill" && <BillDetail detail={detail} onMarkPaid={onMarkPaid} />}
          {detail.type === "medicare" && <MedicareDetail detail={detail} />}
          {detail.type === "fraud" && <FraudDetail detail={detail} />}
          {detail.type === "prescription" && (
            <PrescriptionDetail detail={detail} />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Alert type icon ─────────────────────────────────────────────────

function AlertIcon({ type }: { type: AlertDetail["type"] }) {
  switch (type) {
    case "bill":
      return (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-xl">
          🧾
        </span>
      );
    case "medicare":
      return (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-xl">
          📋
        </span>
      );
    case "fraud":
      return (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-xl">
          ⚠️
        </span>
      );
    case "prescription":
      return (
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-100 text-xl">
          💊
        </span>
      );
  }
}

function SeverityBadge({ severity }: { severity: Alert["severity"] }) {
  const label =
    severity === "critical"
      ? "Critical"
      : severity === "warning"
        ? "Needs Attention"
        : "Heads Up";

  const cls =
    severity === "critical"
      ? "bg-red-200 text-red-800"
      : severity === "warning"
        ? "bg-amber-200 text-amber-800"
        : "bg-accent-200 text-accent-800";

  return (
    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${cls}`}>
      {label}
    </span>
  );
}

// ── Bill detail ─────────────────────────────────────────────────────

function BillDetail({
  detail,
  onMarkPaid,
}: {
  detail: BillAlertDetail;
  onMarkPaid: () => void;
}) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminderDate, setReminderDate] = useState("");
  const [reminderConfirmed, setReminderConfirmed] = useState<string | null>(
    null
  );

  const handleRemindMeLater = useCallback(() => {
    setShowDatePicker(true);
    setReminderConfirmed(null);
  }, []);

  const handleDateConfirm = useCallback(() => {
    if (!reminderDate) return;
    const formatted = new Date(
      reminderDate + "T00:00:00"
    ).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setReminderConfirmed(formatted);
    setShowDatePicker(false);
  }, [reminderDate]);

  const handleCancelDatePicker = useCallback(() => {
    setShowDatePicker(false);
    setReminderDate("");
  }, []);

  return (
    <div className="space-y-4">
      {/* Mini bill summary card */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
          Bill Summary
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-sm font-medium text-earth-700">
            {detail.provider}
          </p>
          <p className="text-2xl font-bold text-earth-900">{detail.amount}</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-amber-200 pt-3">
          <div>
            <p className="text-[11px] text-earth-400">Due Date</p>
            <p className="text-sm font-semibold text-earth-800">
              {detail.dueDate}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-earth-400">Last Paid</p>
            <p className="text-sm font-semibold text-earth-800">
              {detail.lastPaid}
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation message */}
      {reminderConfirmed && (
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          <span>✅</span>
          <span>Reminder set for {reminderConfirmed}</span>
        </div>
      )}

      {/* Date picker */}
      {showDatePicker && (
        <div className="rounded-xl border border-brand-200 bg-brand-50/50 px-4 py-3.5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Pick a reminder date
          </p>
          <input
            type="date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="mb-3 w-full rounded-lg border border-brand-200 px-3 py-2.5 text-sm text-earth-800 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <div className="flex gap-2">
            <button
              onClick={handleDateConfirm}
              disabled={!reminderDate}
              className="flex-1 rounded-lg bg-brand-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Confirm
            </button>
            <button
              onClick={handleCancelDatePicker}
              className="flex-1 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm font-semibold text-earth-600 transition-all hover:bg-warm-50 active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      {!showDatePicker && (
        <div className="flex gap-3">
          <button
            onClick={onMarkPaid}
            className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 active:scale-[0.98]"
          >
            Mark as Paid
          </button>
          <button
            onClick={handleRemindMeLater}
            className="flex-1 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50 active:scale-[0.98]"
          >
            Remind Me Later
          </button>
        </div>
      )}
    </div>
  );
}

// ── Medicare detail ─────────────────────────────────────────────────

function MedicareDetail({ detail }: { detail: MedicareAlertDetail }) {
  const pct = Math.round((detail.formsSubmitted / detail.totalForms) * 100);

  return (
    <div className="space-y-4">
      {/* Plan info */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-3.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          Plan
        </p>
        <p className="mt-1 text-base font-bold text-earth-900">{detail.plan}</p>
        <p className="mt-0.5 text-sm text-earth-600">
          Renewal deadline:{" "}
          <span className="font-semibold text-earth-800">
            {detail.renewalDeadline}
          </span>
        </p>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-earth-500">Forms submitted</span>
            <span className="font-semibold text-earth-700">
              {detail.formsSubmitted} of {detail.totalForms}
            </span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-blue-200">
            <div
              className="h-full rounded-full bg-blue-500 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Missing forms */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-earth-500">
          Missing Forms
        </p>
        <ul className="space-y-2">
          {detail.missingForms.map((form) => (
            <li
              key={form}
              className="flex items-center gap-2.5 rounded-lg border border-red-200 bg-red-50/50 px-3 py-2.5 text-sm text-earth-800"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs">
                ❗
              </span>
              {form}
            </li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 active:scale-[0.98]">
          View Forms
        </button>
        <button className="flex-1 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50 active:scale-[0.98]">
          Set Reminder
        </button>
      </div>
    </div>
  );
}

// ── Fraud detail ────────────────────────────────────────────────────

function FraudDetail({ detail }: { detail: FraudAlertDetail }) {
  return (
    <div className="space-y-4">
      {/* Transaction card */}
      <div className="rounded-xl border border-red-200 bg-red-50/60 px-4 py-3.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-red-700">
          Flagged Transaction
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-red-700">$900.00</span>
          <span className="text-xs text-red-600">⚠ {detail.flaggedReason}</span>
        </div>
        <div className="mt-3 space-y-2 border-t border-red-200 pt-3">
          <Row label="Account" value={`${detail.account} (${detail.accountNumber})`} />
          <Row label="Merchant" value={detail.merchant} />
          <Row label="Date" value={detail.transactionDate} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-700 active:scale-[0.98]">
          ✓ This was me
        </button>
        <button className="w-full rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 transition-all hover:bg-red-50 active:scale-[0.98]">
          🚨 Report Fraud
        </button>
        <button className="w-full rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50 active:scale-[0.98]">
          📞 Call Mom
        </button>
      </div>
    </div>
  );
}

// ── Prescription detail ─────────────────────────────────────────────

function PrescriptionDetail({
  detail,
}: {
  detail: PrescriptionAlertDetail;
}) {
  return (
    <div className="space-y-4">
      {/* Medication card */}
      <div className="rounded-xl border border-accent-200 bg-accent-50/60 px-4 py-3.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent-700">
          Medication
        </p>
        <p className="mt-1 text-base font-bold text-earth-900">
          {detail.medication}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-y-2.5 border-t border-accent-200 pt-3">
          <div>
            <p className="text-[11px] text-earth-400">Prescribed by</p>
            <p className="text-sm font-semibold text-earth-800">
              {detail.prescribedBy}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-earth-400">Pharmacy</p>
            <p className="text-sm font-semibold text-earth-800">
              {detail.pharmacy}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-earth-400">Last Filled</p>
            <p className="text-sm font-semibold text-earth-800">
              {detail.lastFilled} ({detail.supply})
            </p>
          </div>
          <div>
            <p className="text-[11px] text-earth-400">Refills Left</p>
            <p className="text-sm font-semibold text-earth-800">
              {detail.refillsRemaining}
            </p>
          </div>
        </div>
      </div>

      {/* Refill warning */}
      <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <span>⏰</span>
        <span>
          Only 7 days left — request a refill soon to avoid running out.
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 active:scale-[0.98]">
          Request Refill
        </button>
        <button className="flex-1 rounded-lg border border-brand-200 bg-white px-4 py-2.5 text-sm font-semibold text-brand-700 transition-all hover:bg-brand-50 active:scale-[0.98]">
          Set Reminder
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between text-sm">
      <span className="text-earth-500">{label}</span>
      <span className="font-medium text-earth-800">{value}</span>
    </div>
  );
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
  { label: "Permissions", href: "/dashboard/permissions", icon: "🛡️" },
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
            K
          </span>
          <span className="text-lg font-bold text-brand-800">Kinovia</span>
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
          K
        </span>
        <span className="font-semibold text-brand-800">Kinovia</span>
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

function ParentStatusOverview({
  items,
  flashId,
}: {
  items: ParentStatusItem[];
  flashId: string | null;
}) {
  return (
    <section>
      <h2 className="mb-4 text-lg font-bold text-brand-950">
        Parent Status Overview
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const isFlashing = flashId === item.id;
          return (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-500 hover:shadow-sm ${
                isFlashing
                  ? "ring-2 ring-green-400 ring-offset-2 scale-[1.02]"
                  : ""
              } ${statusBg(item.status)}`}
            >
              <span
                className={`h-3 w-3 flex-shrink-0 rounded-full transition-colors duration-500 ${statusDot(item.status)}`}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-earth-800">
                  {item.label}
                </p>
                <p className="truncate text-xs text-earth-500">
                  {item.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── Section: Alerts Panel ──────────────────────────────────────────

function AlertsPanel({
  onMarkBillPaid,
}: {
  onMarkBillPaid: () => void;
}) {
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const openDetail = useCallback((id: string) => {
    setSelectedAlertId(id);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedAlertId(null);
  }, []);

  const handleMarkPaid = useCallback(() => {
    onMarkBillPaid();
    setSelectedAlertId(null);
  }, [onMarkBillPaid]);

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
                <button
                  onClick={() => openDetail(alert.id)}
                  className="flex-shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm ring-1 ring-brand-200 transition-all hover:bg-brand-50 hover:shadow active:scale-[0.97]"
                >
                  Review
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Alert detail modal */}
      {selectedAlertId && (
        <AlertDetailModal
          alertId={selectedAlertId}
          onClose={closeDetail}
          onMarkPaid={handleMarkPaid}
        />
      )}
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
  const [parentStatusItems, setParentStatusItems] = useState<ParentStatusItem[]>(
    initialParentStatusItems
  );
  const [statusFlashId, setStatusFlashId] = useState<string | null>(null);

  const handleMarkBillPaid = useCallback(() => {
    setParentStatusItems((prev) =>
      prev.map((item) =>
        item.id === "1"
          ? { ...item, status: "green" as StatusLevel, detail: "Paid" }
          : item
      )
    );
    setStatusFlashId("1");
    setTimeout(() => setStatusFlashId(null), 1500);
  }, []);

  return (
    <div className="flex min-h-dvh bg-warm-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col">
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <ParentStatusOverview items={parentStatusItems} flashId={statusFlashId} />
          <AlertsPanel onMarkBillPaid={handleMarkBillPaid} />
          <ActivityFeed />
          <QuickActions />
        </main>
      </div>
    </div>
  );
}
