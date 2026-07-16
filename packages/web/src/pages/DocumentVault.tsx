import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// ── Types ────────────────────────────────────────────────────────────

export type DocumentCategory = "legal" | "medical" | "financial" | "personal";
export type FileType = "pdf" | "image" | "doc" | "spreadsheet";

export interface DocumentItem {
  id: string;
  name: string;
  category: DocumentCategory;
  addedDate: string;
  fileType: FileType;
  accessRoles: string[];
}

// ── Mock data ────────────────────────────────────────────────────────

const mockDocuments: DocumentItem[] = [
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

// ── Helpers ──────────────────────────────────────────────────────────

function categoryLabel(cat: DocumentCategory): string {
  const labels: Record<DocumentCategory, string> = {
    legal: "Legal",
    medical: "Medical",
    financial: "Financial",
    personal: "Personal",
  };
  return labels[cat];
}

function categoryBadgeClasses(cat: DocumentCategory): string {
  const map: Record<DocumentCategory, string> = {
    legal: "bg-purple-100 text-purple-800 border-purple-200",
    medical: "bg-accent-100 text-accent-800 border-accent-200",
    financial: "bg-green-100 text-green-800 border-green-200",
    personal: "bg-warm-100 text-warm-800 border-warm-200",
  };
  return map[cat];
}

function fileTypeIcon(ft: FileType): string {
  const icons: Record<FileType, string> = {
    pdf: "📄",
    image: "🖼️",
    doc: "📝",
    spreadsheet: "📊",
  };
  return icons[ft];
}

function fileTypeLabel(ft: FileType): string {
  const labels: Record<FileType, string> = {
    pdf: "PDF",
    image: "Image",
    doc: "Document",
    spreadsheet: "Sheet",
  };
  return labels[ft];
}

function roleInitial(role: string): string {
  if (role === "Mom") return "M";
  if (role === "Yani") return "Y";
  if (role === "Doctor") return "D";
  return role.charAt(0).toUpperCase();
}

function roleColor(role: string): string {
  if (role === "Mom") return "bg-brand-500 text-white";
  if (role === "Yani") return "bg-accent-500 text-white";
  if (role === "Doctor") return "bg-warm-500 text-white";
  return "bg-earth-400 text-white";
}

// ── Document Card ────────────────────────────────────────────────────

function DocumentCard({ doc }: { doc: DocumentItem }) {
  const isRestricted = doc.accessRoles.length === 1 && doc.accessRoles[0] === "Mom";
  const addedDate = new Date(doc.addedDate + "T00:00:00");
  const formattedDate = addedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-brand-100/60 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-4">
        {/* File type icon */}
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xl">
          {fileTypeIcon(doc.fileType)}
        </span>

        {/* Document info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-earth-900">
              {doc.name}
            </p>
            {isRestricted && (
              <span className="flex-shrink-0 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600" title="Restricted access">
                🔒
              </span>
            )}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-earth-500">
            {/* Category badge */}
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${categoryBadgeClasses(doc.category)}`}
            >
              {categoryLabel(doc.category)}
            </span>
            <span>·</span>
            <span>{fileTypeLabel(doc.fileType)}</span>
            <span>·</span>
            <span>Added {formattedDate}</span>
          </div>

          {/* Access roles */}
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-wide text-earth-400">
              Access:
            </span>
            <div className="flex -space-x-1">
              {doc.accessRoles.map((role) => (
                <span
                  key={role}
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ring-2 ring-white ${roleColor(role)}`}
                  title={role}
                >
                  {roleInitial(role)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 sm:flex-shrink-0">
        <button className="rounded-lg bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-brand-600 active:scale-[0.97]">
          View
        </button>
        <button className="rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-earth-600 shadow-sm ring-1 ring-brand-100/60 transition-all hover:bg-brand-50 hover:text-brand-700 active:scale-[0.97]">
          Download
        </button>
      </div>
    </div>
  );
}

// ── Category Section ─────────────────────────────────────────────────

function CategorySection({
  category,
  documents,
  expanded,
  onToggle,
}: {
  category: DocumentCategory;
  documents: DocumentItem[];
  expanded: boolean;
  onToggle: () => void;
}) {
  const catIcons: Record<DocumentCategory, string> = {
    legal: "⚖️",
    medical: "🏥",
    financial: "💰",
    personal: "📋",
  };
  const catDescriptions: Record<DocumentCategory, string> = {
    legal: "Power of Attorney, Wills, Trusts",
    medical: "Medicare cards, Insurance cards, Advance directives",
    financial: "Tax returns, Bank statements, Deeds",
    personal: "Passwords, Homeownership docs, IDs",
  };

  return (
    <section>
      {/* Category header — clickable to expand/collapse */}
      <button
        onClick={onToggle}
        className="mb-3 flex w-full items-center gap-3 rounded-xl border border-brand-100/60 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md"
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xl">
          {catIcons[category]}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-brand-950">
            {categoryLabel(category)}
          </h3>
          <p className="mt-0.5 text-xs text-earth-400">
            {catDescriptions[category]} · {documents.length} document{documents.length !== 1 ? "s" : ""}
          </p>
        </div>
        <span
          className={`flex-shrink-0 text-earth-400 transition-transform duration-200 ${
            expanded ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
      </button>

      {/* Document cards */}
      {expanded && (
        <div className="ml-2 space-y-3 border-l-2 border-brand-100 pl-4">
          {documents.length === 0 ? (
            <p className="py-3 text-sm text-earth-400">No documents in this category.</p>
          ) : (
            documents.map((doc) => <DocumentCard key={doc.id} doc={doc} />)
          )}
        </div>
      )}
    </section>
  );
}

// ── Search / Filter ──────────────────────────────────────────────────

function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-earth-400 text-sm">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search documents by name or category..."
        className="w-full rounded-xl border border-brand-100/60 bg-white py-2.5 pl-10 pr-4 text-sm text-earth-800 placeholder-earth-400 shadow-sm transition-all focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
      />
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
            const isActive = link.href === "/dashboard/vault";
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

export default function DocumentVault() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<
    Record<DocumentCategory, boolean>
  >({
    legal: true,
    medical: true,
    financial: true,
    personal: true,
  });

  // Filter by search
  const filteredDocuments = useMemo(() => {
    if (!search.trim()) return mockDocuments;
    const q = search.toLowerCase();
    return mockDocuments.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        categoryLabel(d.category).toLowerCase().includes(q) ||
        d.accessRoles.some((r) => r.toLowerCase().includes(q)),
    );
  }, [search]);

  // Group by category
  const categorized = useMemo(() => {
    const groups: Record<DocumentCategory, DocumentItem[]> = {
      legal: [],
      medical: [],
      financial: [],
      personal: [],
    };
    for (const doc of filteredDocuments) {
      groups[doc.category].push(doc);
    }
    return groups;
  }, [filteredDocuments]);

  const categories: DocumentCategory[] = [
    "legal",
    "medical",
    "financial",
    "personal",
  ];

  function toggleCategory(cat: DocumentCategory) {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
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
              <h1 className="text-2xl font-bold text-brand-950">Document Vault</h1>
              <p className="mt-1 text-sm text-earth-500">
                Store, organize, and share important family documents
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="rounded-lg bg-white px-3.5 py-2 text-sm font-medium text-earth-600 shadow-sm ring-1 ring-brand-100/60 transition-all hover:bg-brand-50 hover:text-brand-700"
              >
                ← Back to Dashboard
              </Link>
              <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 active:scale-[0.97]">
                + Upload Document
              </button>
            </div>
          </div>

          {/* Upload note */}
          <div className="rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
            💡 <span className="font-medium">Coming soon:</span> Upload documents directly
            from your device. For now, these are placeholder records showing the vault
            structure.
          </div>

          {/* Search */}
          <SearchBar value={search} onChange={setSearch} />

          {/* Stats row */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat}
                className="rounded-xl border border-brand-100/60 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-earth-400">
                  {categoryLabel(cat)}
                </p>
                <p className="mt-1 text-xl font-bold text-brand-700">
                  {categorized[cat].length}
                </p>
                <p className="text-xs text-earth-400">documents</p>
              </div>
            ))}
          </div>

          {/* Category sections */}
          <div className="space-y-4">
            {categories.map((cat) => (
              <CategorySection
                key={cat}
                category={cat}
                documents={categorized[cat]}
                expanded={expandedCategories[cat]}
                onToggle={() => toggleCategory(cat)}
              />
            ))}
          </div>

          {/* Empty search state */}
          {filteredDocuments.length === 0 && (
            <div className="rounded-xl border border-brand-100/60 bg-white p-10 text-center">
              <p className="text-4xl">🔍</p>
              <p className="mt-3 text-sm font-medium text-earth-600">
                No documents matching "{search}"
              </p>
              <p className="mt-1 text-xs text-earth-400">
                Try a different search term
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
