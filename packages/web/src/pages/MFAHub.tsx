import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// ── Types ────────────────────────────────────────────────────────────

export type MFAStatus = "pending" | "approved" | "denied";

export interface MFARequest {
  id: string;
  requester: string;
  serviceName: string;
  serviceCategory: "medical" | "financial" | "utilities" | "other";
  relativeTime: string;
  timestamp: Date;
  status: MFAStatus;
  actionBy?: string;
  actionTime?: string;
  denyReason?: string;
}

export interface SharedCredential {
  id: string;
  accountName: string;
  accessHolders: string[];
  accessType: "shared" | "bill_pay" | "view_only";
}

// ── Mock data ────────────────────────────────────────────────────────

const mockMFARequests: MFARequest[] = [
  {
    id: "mfa1",
    requester: "Mom",
    serviceName: "Medicare.gov",
    serviceCategory: "medical",
    relativeTime: "2 min ago",
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
    status: "pending",
  },
  {
    id: "mfa2",
    requester: "Yani",
    serviceName: "Electric bill payment",
    serviceCategory: "utilities",
    relativeTime: "5 min ago",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    status: "pending",
  },
  {
    id: "mfa3",
    requester: "Mom",
    serviceName: "Bank of America",
    serviceCategory: "financial",
    relativeTime: "15 min ago",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
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
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
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
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    status: "denied",
    actionBy: "Yani",
    actionTime: "3 hours ago",
    denyReason: "Unknown sign-in attempt from new device",
  },
  {
    id: "mfa6",
    requester: "Mom",
    serviceName: "Pharmacy refill portal",
    serviceCategory: "medical",
    relativeTime: "Yesterday",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: "approved",
    actionBy: "Yani",
    actionTime: "Yesterday",
  },
];

const mockCredentials: SharedCredential[] = [
  {
    id: "sc1",
    accountName: "Medicare.gov",
    accessHolders: ["Mom", "Yani"],
    accessType: "shared",
  },
  {
    id: "sc2",
    accountName: "Bank of America",
    accessHolders: ["Mom", "Yani"],
    accessType: "shared",
  },
  {
    id: "sc3",
    accountName: "Eversource",
    accessHolders: ["Yani"],
    accessType: "bill_pay",
  },
  {
    id: "sc4",
    accountName: "Health Insurance Portal",
    accessHolders: ["Mom", "Yani"],
    accessType: "shared",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────

function serviceIcon(cat: MFARequest["serviceCategory"]): string {
  const icons: Record<MFARequest["serviceCategory"], string> = {
    medical: "🏥",
    financial: "💳",
    utilities: "⚡",
    other: "🔐",
  };
  return icons[cat];
}

function statusBadge(status: MFAStatus): { label: string; classes: string } {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        classes: "bg-amber-100 text-amber-800 border-amber-200",
      };
    case "approved":
      return {
        label: "Approved",
        classes: "bg-green-100 text-green-800 border-green-200",
      };
    case "denied":
      return {
        label: "Denied",
        classes: "bg-red-100 text-red-800 border-red-200",
      };
  }
}

function accessTypeLabel(type: SharedCredential["accessType"]): string {
  switch (type) {
    case "shared":
      return "Shared access";
    case "bill_pay":
      return "Bill pay access";
    case "view_only":
      return "View only";
  }
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// ── Pending Request Card ─────────────────────────────────────────────

function PendingRequestCard({
  request,
  onApprove,
  onCall,
  onDeny,
  feedback,
}: {
  request: MFARequest;
  onApprove: (id: string) => void;
  onCall: (id: string) => void;
  onDeny: (id: string) => void;
  feedback: Record<string, string>;
}) {
  const fb = feedback[request.id];

  if (fb === "approved" || fb === "denied") {
    return null; // moved to history
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-100/60 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Service icon */}
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-2xl">
          {serviceIcon(request.serviceCategory)}
        </span>

        {/* Request info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-earth-900">
              {request.requester}
            </p>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                statusBadge("pending").classes
              }`}
            >
              {statusBadge("pending").label}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-earth-600">
            Trying to access{" "}
            <span className="font-medium text-earth-800">
              {request.serviceName}
            </span>
          </p>
          <p className="mt-0.5 text-xs text-earth-400">{request.relativeTime}</p>
        </div>
      </div>

      {/* Feedback state */}
      {fb === "calling" && (
        <div className="rounded-lg bg-accent-50 px-4 py-2.5 text-sm text-accent-700">
          📞 Calling...
        </div>
      )}
      {fb === "left_message" && (
        <div className="rounded-lg bg-warm-50 px-4 py-2.5 text-sm text-warm-700">
          📞 Left message for {request.requester}
        </div>
      )}

      {/* Action buttons */}
      {!fb && (
        <div className="flex items-center gap-2 border-t border-brand-100/40 pt-3">
          <button
            onClick={() => onApprove(request.id)}
            className="flex-1 rounded-lg bg-green-600 px-2 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-green-700 active:scale-[0.97] sm:flex-initial sm:px-4"
          >
            ✅ Approve
          </button>
          <button
            onClick={() => onCall(request.id)}
            className="flex-1 rounded-lg bg-white px-2 py-2 text-xs font-semibold text-earth-600 shadow-sm ring-1 ring-brand-100/60 transition-all hover:bg-brand-50 hover:text-brand-700 active:scale-[0.97] sm:flex-initial sm:px-4"
          >
            📞 Call
          </button>
          <button
            onClick={() => onDeny(request.id)}
            className="flex-1 rounded-lg bg-white px-2 py-2 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-200 transition-all hover:bg-red-50 active:scale-[0.97] sm:flex-initial sm:px-4"
          >
            ❌ Deny
          </button>
        </div>
      )}
    </div>
  );
}

// ── History Row ──────────────────────────────────────────────────────

function HistoryRow({ request }: { request: MFARequest }) {
  const badge = statusBadge(request.status);
  const icon = request.status === "approved" ? "✅" : "❌";

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-brand-100/60 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-lg">
          {serviceIcon(request.serviceCategory)}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-earth-900">
            {request.requester} · {request.serviceName}
          </p>
          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-earth-500">
            <span>
              {icon} {badge.label}
            </span>
            {request.actionBy && <span>by {request.actionBy}</span>}
            {request.denyReason && (
              <span className="text-red-600">— {request.denyReason}</span>
            )}
            <span>·</span>
            <span>{request.relativeTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared Credential Card ───────────────────────────────────────────

function CredentialCard({ cred }: { cred: SharedCredential }) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-100/60 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xl">
          🔑
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-earth-900">
            {cred.accountName}
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-earth-500">
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-medium text-brand-700">
              {accessTypeLabel(cred.accessType)}
            </span>
            <span>·</span>
            <span>
              {cred.accessHolders.length === 1
                ? cred.accessHolders[0]
                : cred.accessHolders.join(", ")}
            </span>
          </div>
        </div>
      </div>
      <button className="self-start rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-earth-600 shadow-sm ring-1 ring-brand-100/60 transition-all hover:bg-brand-50 hover:text-brand-700 active:scale-[0.97] sm:self-center">
        View
      </button>
    </div>
  );
}

// ── Tabs ─────────────────────────────────────────────────────────────

type Tab = "pending" | "credentials" | "history";

function TabsBar({
  active,
  onChange,
}: {
  active: Tab;
  onChange: (t: Tab) => void;
}) {
  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "pending", label: "Pending Requests", icon: "⏳" },
    { key: "credentials", label: "Shared Credentials", icon: "🔑" },
    { key: "history", label: "Request History", icon: "📋" },
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
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ── Sidebar ──────────────────────────────────────────────────────────

function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: "🏠" },
    { label: "Bill Center", href: "/dashboard/bills", icon: "📋" },
    { label: "Document Vault", href: "/dashboard/vault", icon: "📁" },
    { label: "MFA Hub", href: "/dashboard/mfa", icon: "🔐" },
    { label: "Permissions", href: "/dashboard/permissions", icon: "🛡️" },
    { label: "Appointments", href: "/appointments", icon: "📅" },
  ];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-dvh w-64 flex-col border-r border-brand-100/60 bg-white transition-transform duration-300 lg:static lg:z-0 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
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
            const isActive = link.href === "/dashboard/mfa";
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
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
    </>
  );
}

// ── Main Page ────────────────────────────────────────────────────────

export default function MFAHub() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("pending");
  const [requests, setRequests] = useState<MFARequest[]>(mockMFARequests);
  const [feedback, setFeedback] = useState<Record<string, string>>({});

  const pendingCount = useMemo(
    () =>
      requests.filter(
        (r) => r.status === "pending" && !feedback[r.id]
      ).length,
    [requests, feedback],
  );

  const pendingRequests = useMemo(
    () => requests.filter((r) => r.status === "pending"),
    [requests],
  );

  const historyRequests = useMemo(
    () =>
      requests
        .filter((r) => r.status !== "pending")
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    [requests],
  );

  // Also include requests that were just approved/denied via feedback
  const recentlyResolved = useMemo(() => {
    return requests
      .filter((r) => r.status === "pending" && feedback[r.id])
      .map((r) => ({
        ...r,
        status: feedback[r.id] === "approved" ? ("approved" as const) : ("denied" as const),
        actionBy: "Yani",
        actionTime: "Just now",
        denyReason:
          feedback[r.id] === "denied" ? "Denied by caregiver" : undefined,
      }));
  }, [requests, feedback]);

  function handleApprove(id: string) {
    setFeedback((prev) => ({ ...prev, [id]: "approved" }));
    // Move to approved after brief delay
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                status: "approved" as const,
                actionBy: "Yani",
                actionTime: "Just now",
              }
            : r,
        ),
      );
      setFeedback((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 1500);
  }

  function handleCall(id: string) {
    setFeedback((prev) => ({ ...prev, [id]: "calling" }));
    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, [id]: "left_message" }));
    }, 2000);
  }

  function handleDeny(id: string) {
    const reason = window.prompt("Reason for denying? (optional)");
    setFeedback((prev) => ({ ...prev, [id]: "denied" }));
    setTimeout(() => {
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                status: "denied" as const,
                actionBy: "Yani",
                actionTime: "Just now",
                denyReason: reason || undefined,
              }
            : r,
        ),
      );
      setFeedback((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 1500);
  }

  return (
    <div className="flex min-h-dvh bg-warm-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand-950">MFA Hub</h1>
              <p className="mt-1 text-sm text-earth-500">
                Approve access requests, manage shared credentials, and review history
              </p>
            </div>
            <Link
              to="/dashboard"
              className="rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-earth-600 shadow-sm ring-1 ring-brand-100/60 transition-all hover:bg-brand-50 hover:text-brand-700"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Pending alert banner */}
          {pendingCount > 0 && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              ⏳{" "}
              <span className="font-semibold">
                {pendingCount} pending request{pendingCount !== 1 ? "s" : ""}
              </span>{" "}
              waiting for your approval. No more reading six-digit codes over the phone!
            </div>
          )}

          {/* Tabs */}
          <TabsBar active={activeTab} onChange={setActiveTab} />

          {/* Pending Requests Tab */}
          {activeTab === "pending" && (
            <div className="space-y-4">
              {pendingRequests.length === 0 &&
                Object.keys(feedback).length === 0 && (
                  <div className="rounded-xl border border-brand-100/60 bg-white p-10 text-center">
                    <p className="text-4xl">🎉</p>
                    <p className="mt-3 text-sm font-medium text-earth-600">
                      No pending MFA requests
                    </p>
                    <p className="mt-1 text-xs text-earth-400">
                      All caught up! New requests will appear here.
                    </p>
                  </div>
                )}
              {pendingRequests.map((req) => (
                <PendingRequestCard
                  key={req.id}
                  request={req}
                  onApprove={handleApprove}
                  onCall={handleCall}
                  onDeny={handleDeny}
                  feedback={feedback}
                />
              ))}
              {/* Recently resolved (before timeout clears them) */}
              {recentlyResolved.map((req) => (
                <div
                  key={req.id}
                  className="flex flex-col gap-3 rounded-xl border border-brand-100/60 bg-white p-4 shadow-sm opacity-60"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                      {serviceIcon(req.serviceCategory)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-earth-900">
                        {req.requester} · {req.serviceName}
                      </p>
                      <p className="mt-0.5 text-sm text-green-600">
                        {req.status === "approved"
                          ? "✅ Access approved ✓"
                          : `❌ Access denied${req.denyReason ? ` — ${req.denyReason}` : ""}`}
                      </p>
                      <p className="mt-0.5 text-xs text-earth-400">Moving to history...</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Shared Credentials Tab */}
          {activeTab === "credentials" && (
            <div className="space-y-3">
              {mockCredentials.map((cred) => (
                <CredentialCard key={cred.id} cred={cred} />
              ))}
            </div>
          )}

          {/* Request History Tab */}
          {activeTab === "history" && (
            <div className="space-y-3">
              {historyRequests.length === 0 ? (
                <div className="rounded-xl border border-brand-100/60 bg-white p-10 text-center">
                  <p className="text-sm text-earth-400">No history yet.</p>
                </div>
              ) : (
                historyRequests.map((req) => (
                  <HistoryRow key={req.id} request={req} />
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
