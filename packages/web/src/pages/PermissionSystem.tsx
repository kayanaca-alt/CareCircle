import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// ── Types ────────────────────────────────────────────────────────────

export type PermissionLevel = "observer" | "helper" | "poa";

export type FamilyRole = "parent" | "child";

export interface FamilyMember {
  id: string;
  name: string;
  role: FamilyRole;
  relationship: string;
  permissionLevel: PermissionLevel;
  activeSince: string;
  avatarUrl?: string;
}

export interface PermissionRequest {
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

export interface HistoryEntry {
  id: string;
  description: string;
  timestamp: string;
  relativeTime: string;
  type: "grant" | "request" | "upgrade" | "downgrade" | "revoke";
}

// ── Mock data ────────────────────────────────────────────────────────

const mockMembers: FamilyMember[] = [
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

const mockRequests: PermissionRequest[] = [
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

const mockHistory: HistoryEntry[] = [
  {
    id: "h1",
    description: "Yani requested Helper access",
    timestamp: "2026-07-14T10:30:00Z",
    relativeTime: "Jul 14, 2026",
    type: "request",
  },
  {
    id: "h2",
    description: "Mom granted Yani Observer access",
    timestamp: "2026-01-15T09:00:00Z",
    relativeTime: "Jan 15, 2026",
    type: "grant",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

function permissionLevelLabel(level: PermissionLevel): string {
  switch (level) {
    case "observer":
      return "Observer";
    case "helper":
      return "Helper";
    case "poa":
      return "Power of Attorney";
  }
}

function roleLabel(role: FamilyRole): string {
  switch (role) {
    case "parent":
      return "Account Owner";
    case "child":
      return "Family Member";
  }
}

function avatarInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

function avatarColor(name: string): string {
  if (name === "Mom") return "bg-brand-500 text-white";
  if (name === "Yani") return "bg-accent-500 text-white";
  return "bg-earth-400 text-white";
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
            const isActive = link.href === "/dashboard/permissions";
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

// ── Tier Card ────────────────────────────────────────────────────────

interface TierCardProps {
  level: PermissionLevel;
  isCurrentLevel: boolean;
  onRequestUpgrade?: () => void;
  requestStatus?: PermissionRequest | null;
}

const tierConfig: Record<
  PermissionLevel,
  {
    title: string;
    number: string;
    colorScheme: {
      border: string;
      bg: string;
      badgeBg: string;
      badgeText: string;
      headerBg: string;
      headerText: string;
      dot: string;
    };
    canItems: string[];
    cannotItems: string[];
    requirement: string;
    requirementIcon: string;
  }
> = {
  observer: {
    title: "Observer",
    number: "1",
    colorScheme: {
      border: "border-green-200",
      bg: "bg-green-50/50",
      badgeBg: "bg-green-100",
      badgeText: "text-green-700",
      headerBg: "bg-green-100",
      headerText: "text-green-800",
      dot: "bg-green-500",
    },
    canItems: ["See due dates", "Receive alerts", "View account balances"],
    cannotItems: ["Move money", "Change settings"],
    requirement: "Default level — active automatically",
    requirementIcon: "🟢",
  },
  helper: {
    title: "Helper",
    number: "2",
    colorScheme: {
      border: "border-amber-200",
      bg: "bg-amber-50/50",
      badgeBg: "bg-amber-100",
      badgeText: "text-amber-700",
      headerBg: "bg-amber-100",
      headerText: "text-amber-800",
      dot: "bg-amber-500",
    },
    canItems: [
      "Pay approved bills",
      "Schedule appointments",
      "Manage subscriptions",
    ],
    cannotItems: [],
    requirement: "Requires parent approval",
    requirementIcon: "🟡",
  },
  poa: {
    title: "Power of Attorney",
    number: "3",
    colorScheme: {
      border: "border-red-200",
      bg: "bg-red-50/50",
      badgeBg: "bg-red-100",
      badgeText: "text-red-700",
      headerBg: "bg-red-100",
      headerText: "text-red-800",
      dot: "bg-red-500",
    },
    canItems: [
      "Act independently",
      "Receive all alerts",
      "Manage finances",
    ],
    cannotItems: [],
    requirement: "Requires legal documentation",
    requirementIcon: "🔴",
  },
};

function TierCard({
  level,
  isCurrentLevel,
  onRequestUpgrade,
  requestStatus,
}: TierCardProps) {
  const config = tierConfig[level];
  const cs = config.colorScheme;
  const isPending = requestStatus?.status === "pending";
  const isApproved = requestStatus?.status === "approved";

  function renderBadge() {
    if (isCurrentLevel && level === "observer") {
      return (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${cs.badgeBg} ${cs.badgeText}`}
        >
          Default — active now
        </span>
      );
    }
    if (isCurrentLevel && level === "helper") {
      return (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${cs.badgeBg} ${cs.badgeText}`}
        >
          Active
        </span>
      );
    }
    if (isCurrentLevel && level === "poa") {
      return (
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${cs.badgeBg} ${cs.badgeText}`}
        >
          Active
        </span>
      );
    }
    if (isPending) {
      return (
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Pending approval...
        </span>
      );
    }
    if (level === "helper" && !isCurrentLevel) {
      return (
        <button
          onClick={onRequestUpgrade}
          className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white shadow-sm transition-all hover:bg-amber-600 active:scale-[0.97]"
        >
          Request upgrade →
        </button>
      );
    }
    if (level === "poa" && !isCurrentLevel) {
      return (
        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
          Requires legal documentation
        </span>
      );
    }
    return null;
  }

  function renderRequirement() {
    if (isPending) {
      return (
        <p className="mt-3 text-xs text-amber-600">
          ⏳ Approval required from Mom
        </p>
      );
    }
    if (level === "poa" && !isCurrentLevel) {
      return (
        <div className="mt-3">
          <p className="text-xs text-red-600">
            🔴 Requires legal documentation
          </p>
          <p className="mt-1 text-[11px] text-earth-400">
            Upload Power of Attorney or guardianship papers to unlock
          </p>
        </div>
      );
    }
    if (level === "observer") {
      return (
        <p className="mt-3 text-xs text-green-600">
          {config.requirementIcon} {config.requirement}
        </p>
      );
    }
    if (!isCurrentLevel && level === "helper") {
      return (
        <p className="mt-3 text-xs text-amber-600">
          {config.requirementIcon} {config.requirement}
        </p>
      );
    }
    return null;
  }

  return (
    <div
      className={`rounded-xl border-2 ${cs.border} ${cs.bg} overflow-hidden transition-shadow hover:shadow-md ${
        isCurrentLevel ? "ring-2 ring-offset-1 " + cs.border : ""
      }`}
    >
      {/* Card header */}
      <div className={`px-5 py-4 ${cs.headerBg}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                isCurrentLevel ? "bg-white text-earth-800 shadow-sm" : "bg-white/70 text-earth-700"
              }`}
            >
              {config.number}
            </span>
            <h3 className={`text-base font-bold ${cs.headerText}`}>
              {config.title}
            </h3>
          </div>
          {renderBadge()}
        </div>
      </div>

      {/* Card body */}
      <div className="px-5 py-4 space-y-4">
        {/* Can do */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-earth-500 mb-2">
            Can
          </p>
          <ul className="space-y-1.5">
            {config.canItems.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-earth-700">
                <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${cs.dot}`} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Cannot */}
        {config.cannotItems.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-earth-500 mb-2">
              Cannot
            </p>
            <ul className="space-y-1.5">
              {config.cannotItems.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-earth-400">
                  <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-earth-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Requirement / status */}
        {renderRequirement()}
      </div>
    </div>
  );
}

// ── Family Member Row ────────────────────────────────────────────────

function MemberRow({
  member,
  currentLevel,
}: {
  member: FamilyMember;
  currentLevel: PermissionLevel;
}) {
  const levelColors: Record<PermissionLevel, string> = {
    observer: "bg-green-100 text-green-800 border-green-200",
    helper: "bg-amber-100 text-amber-800 border-amber-200",
    poa: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-brand-100/60 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      {/* Avatar */}
      <span
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${avatarColor(member.name)}`}
      >
        {avatarInitial(member.name)}
      </span>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-earth-900">
          {member.name}{" "}
          <span className="font-normal text-earth-400">
            ({member.relationship})
          </span>
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-earth-500">
          <span>Role: {roleLabel(member.role)}</span>
          <span>·</span>
          <span>Active since: {formatDate(member.activeSince)}</span>
        </div>
      </div>

      {/* Permission level badge */}
      <span
        className={`flex-shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${
          levelColors[member.permissionLevel]
        }`}
      >
        {permissionLevelLabel(member.permissionLevel)}
      </span>

      {/* Edit button */}
      {member.role === "child" && (
        <button className="flex-shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-earth-600 shadow-sm ring-1 ring-brand-100/60 transition-all hover:bg-brand-50 hover:text-brand-700 active:scale-[0.97]">
          Edit
        </button>
      )}
      {member.role === "parent" && (
        <span className="flex-shrink-0 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-600">
          Full access
        </span>
      )}
    </div>
  );
}

// ── History Entry ────────────────────────────────────────────────────

function HistoryEntryRow({ entry }: { entry: HistoryEntry }) {
  const typeColors: Record<HistoryEntry["type"], string> = {
    grant: "bg-green-50 text-green-700 border-green-200",
    request: "bg-amber-50 text-amber-700 border-amber-200",
    upgrade: "bg-accent-50 text-accent-700 border-accent-200",
    downgrade: "bg-red-50 text-red-700 border-red-200",
    revoke: "bg-red-50 text-red-700 border-red-200",
  };

  const typeLabels: Record<HistoryEntry["type"], string> = {
    grant: "Granted",
    request: "Pending",
    upgrade: "Upgraded",
    downgrade: "Downgraded",
    revoke: "Revoked",
  };

  const isPending = entry.type === "request";

  return (
    <div className="flex items-start gap-4 px-5 py-3.5">
      {/* Timeline dot */}
      <div className="flex flex-col items-center pt-0.5">
        <span
          className={`h-3 w-3 flex-shrink-0 rounded-full ${
            isPending
              ? "border-2 border-amber-400 bg-amber-100"
              : "bg-brand-400"
          }`}
        />
        <span className="mt-0.5 h-full w-px bg-brand-100/60" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-1">
        <p className="text-sm text-earth-700">{entry.description}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xs text-earth-400">{entry.relativeTime}</span>
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${typeColors[entry.type]}`}
          >
            {typeLabels[entry.type]}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────

export default function PermissionSystem() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [members, setMembers] = useState<FamilyMember[]>(mockMembers);
  const [requests, setRequests] = useState<PermissionRequest[]>(mockRequests);
  const [history, setHistory] = useState<HistoryEntry[]>(mockHistory);

  // Yani is the current viewer
  const currentMemberId = "yani";
  const currentMember = members.find((m) => m.id === currentMemberId)!;
  const currentLevel = currentMember.permissionLevel;

  // Find pending request for current member (if any)
  const pendingRequest = requests.find(
    (r) => r.memberId === currentMemberId && r.status === "pending",
  );

  function handleRequestUpgrade(toLevel: PermissionLevel) {
    // Create a new pending request
    const newRequest: PermissionRequest = {
      id: `pr${Date.now()}`,
      memberId: currentMemberId,
      memberName: currentMember.name,
      fromLevel: currentLevel,
      toLevel,
      status: "pending",
      requestedDate: new Date().toISOString().split("T")[0],
      relativeTime: "just now",
    };
    setRequests((prev) => [...prev, newRequest]);

    // Add to history
    const historyEntry: HistoryEntry = {
      id: `h${Date.now()}`,
      description: `${currentMember.name} requested ${permissionLevelLabel(toLevel)} access`,
      timestamp: new Date().toISOString(),
      relativeTime: "Just now",
      type: "request",
    };
    setHistory((prev) => [historyEntry, ...prev]);
  }

  function handleCancelRequest(requestId: string) {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: "cancelled" as const } : r,
      ),
    );

    const req = requests.find((r) => r.id === requestId);
    if (req) {
      const historyEntry: HistoryEntry = {
        id: `h${Date.now()}`,
        description: `${req.memberName} cancelled ${permissionLevelLabel(req.toLevel)} upgrade request`,
        timestamp: new Date().toISOString(),
        relativeTime: "Just now",
        type: "revoke",
      };
      setHistory((prev) => [historyEntry, ...prev]);
    }
  }

  function handleResendRequest(requestId: string) {
    const req = requests.find((r) => r.id === requestId);
    if (req) {
      const historyEntry: HistoryEntry = {
        id: `h${Date.now()}`,
        description: `${req.memberName} resent ${permissionLevelLabel(req.toLevel)} upgrade request`,
        timestamp: new Date().toISOString(),
        relativeTime: "Just now",
        type: "request",
      };
      setHistory((prev) => [historyEntry, ...prev]);
    }
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
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        <main className="flex-1 space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* Page header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-brand-950">
                Permissions
              </h1>
              <p className="mt-1 text-sm text-earth-500">
                Control who has access to what. Parents keep autonomy — you
                gain visibility.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-earth-600 shadow-sm ring-1 ring-brand-100/60 transition-all hover:bg-brand-50 hover:text-brand-700"
            >
              ← Back to Dashboard
            </Link>
          </div>

          {/* Trust model banner */}
          <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
            🛡️ <span className="font-medium">Trust model:</span> Nothing happens
            without parent-chosen permissions. Your access level determines
            what you can see and do.
          </div>

          {/* ── Section: Permission Tiers ─────────────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-brand-950">
              Permission Tiers
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Level 1: Observer */}
              <TierCard
                level="observer"
                isCurrentLevel={currentLevel === "observer"}
              />

              {/* Level 2: Helper */}
              <TierCard
                level="helper"
                isCurrentLevel={currentLevel === "helper"}
                onRequestUpgrade={() => handleRequestUpgrade("helper")}
                requestStatus={
                  pendingRequest?.toLevel === "helper"
                    ? pendingRequest
                    : null
                }
              />

              {/* Level 3: Power of Attorney */}
              <TierCard
                level="poa"
                isCurrentLevel={currentLevel === "poa"}
                onRequestUpgrade={() => handleRequestUpgrade("poa")}
                requestStatus={
                  pendingRequest?.toLevel === "poa"
                    ? pendingRequest
                    : null
                }
              />
            </div>
          </section>

          {/* ── Section: Current Family Members ───────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-brand-950">
              Current Family Members
            </h2>
            <div className="space-y-3">
              {members.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  currentLevel={currentLevel}
                />
              ))}
            </div>
          </section>

          {/* ── Section: Pending Requests ─────────────────────────── */}
          {requests.filter((r) => r.status === "pending").length > 0 && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-brand-950">
                  Pending Requests
                </h2>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                  {requests.filter((r) => r.status === "pending").length}{" "}
                  pending
                </span>
              </div>
              <div className="space-y-3">
                {requests
                  .filter((r) => r.status === "pending")
                  .map((req) => (
                    <div
                      key={req.id}
                      className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-lg">
                          ⏳
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-earth-800">
                            {req.memberName} requested{" "}
                            {permissionLevelLabel(req.toLevel)} access
                          </p>
                          <p className="text-xs text-amber-700">
                            Waiting for Mom&apos;s approval —{" "}
                            {req.relativeTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:flex-shrink-0">
                        <button
                          onClick={() => handleResendRequest(req.id)}
                          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-amber-700 shadow-sm ring-1 ring-amber-200 transition-all hover:bg-amber-100 active:scale-[0.97]"
                        >
                          Resend request
                        </button>
                        <button
                          onClick={() => handleCancelRequest(req.id)}
                          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm ring-1 ring-red-200 transition-all hover:bg-red-50 active:scale-[0.97]"
                        >
                          Cancel request
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          )}

          {/* ── Section: Permission Change History ────────────────── */}
          <section>
            <h2 className="mb-4 text-lg font-bold text-brand-950">
              Permission Change History
            </h2>
            <div className="rounded-xl border border-brand-100/60 bg-white py-2">
              {history.map((entry, i) => (
                <div
                  key={entry.id}
                  className={
                    i < history.length - 1
                      ? "border-b border-brand-100/40"
                      : ""
                  }
                >
                  <HistoryEntryRow entry={entry} />
                </div>
              ))}
              {history.length === 0 && (
                <div className="px-5 py-6 text-center text-sm text-earth-400">
                  No permission changes yet.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
