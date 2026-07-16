import { Link } from "react-router-dom";

const features = [
  {
    icon: "📋",
    title: "Bill Monitoring",
    description:
      "Track due dates, get alerts before bills are late, and help parents stay on top of finances without taking over.",
  },
  {
    icon: "🔐",
    title: "Shared MFA & Password Access",
    description:
      "Securely share access when needed — parents grant permissions on their terms, with full visibility.",
  },
  {
    icon: "📁",
    title: "Document Vault",
    description:
      "Store important documents — wills, insurance, medical records — in one organized, accessible place.",
  },
  {
    icon: "🛡️",
    title: "Scam Detection",
    description:
      "Get alerted to suspicious calls, emails, or messages. Early warnings before a small scam becomes a crisis.",
  },
  {
    icon: "💊",
    title: "Medication & Appointment Tracking",
    description:
      "Keep track of prescriptions, refills, and doctor visits with gentle reminders for everyone.",
  },
];

const steps = [
  {
    number: "1",
    title: "Parent stays in control",
    description:
      "Mom or Dad sets up their account and chooses what to share. Permissions are granular — nothing happens without their consent. They stay independent, you stay informed.",
  },
  {
    number: "2",
    title: "Child gets visibility",
    description:
      "You receive a clear dashboard with alerts and updates. See upcoming bills, expired passwords, and missed appointments at a glance — no more digging through spreadsheets.",
  },
  {
    number: "3",
    title: "Family stays coordinated",
    description:
      "Before a late fee hits or a prescription runs out, Kinovia alerts the right person. Small issues are caught early — before they become crises.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-dvh">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-brand-100/60 bg-warm-50/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-sm font-bold text-white">
              K
            </span>
            <span className="text-lg font-bold text-brand-800">Kinovia</span>
          </div>
          <div className="hidden items-center gap-8 sm:flex">
            <a href="#features" className="text-sm font-medium text-earth-600 hover:text-brand-600">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-earth-600 hover:text-brand-600">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium text-earth-600 hover:text-brand-600">
              Pricing
            </a>
          </div>
          <Link
            to="/dashboard"
            className="rounded-full border border-brand-300 bg-white px-5 py-2 text-sm font-semibold text-brand-700 shadow-sm transition-all hover:bg-brand-50 hover:shadow-md active:scale-[0.98]"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-brand-100/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-accent-50/50 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-medium text-brand-700">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            Coming soon — join the waitlist
          </div>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-brand-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Helping families navigate aging together
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-earth-600 sm:text-xl">
            A co-pilot for adult children helping aging parents stay independent.
            Bill monitoring, shared access, document storage, scam detection, and
            medication reminders — all in one family dashboard.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-brand-600 hover:shadow-xl active:scale-[0.98]"
            >
              Join the waitlist
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border border-earth-300 bg-white px-8 py-3.5 text-base font-semibold text-earth-700 transition-all hover:bg-earth-50 active:scale-[0.98]"
            >
              See all features
            </a>
          </div>
        </div>
      </section>

      {/* Trusted by / social proof strip */}
      <div className="border-y border-brand-100/60 bg-brand-50/50 py-8">
        <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-earth-400">
          Designed for families navigating care
        </p>
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-earth-500">
          <span className="flex items-center gap-1.5">
            <span className="text-brand-400">✓</span> Parent-controlled permissions
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand-400">✓</span> Real-time alerts
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand-400">✓</span> Family coordination
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-brand-400">✓</span> Secure & private
          </span>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-950 sm:text-4xl">
              Everything you need to care from afar
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-earth-600">
              One dashboard for the things that matter most. Parents keep
              autonomy; you gain peace of mind.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-brand-100/60 bg-white p-6 shadow-sm transition-all hover:border-brand-200 hover:shadow-md"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-2xl">
                  {feature.icon}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-brand-800">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-earth-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-brand-950 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              How it works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-brand-200">
              Simple setup, clear roles, and everything runs on consent.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="relative text-center">
                {Number(step.number) < steps.length && (
                  <div className="absolute top-8 left-[calc(50%+3rem)] hidden h-0.5 w-[calc(100%-6rem)] bg-brand-700 md:block" />
                )}
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-2xl font-bold text-white ring-4 ring-brand-800">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-brand-200">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-brand-950 sm:text-4xl">
              Simple, family-friendly pricing
            </h2>
            <p className="mx-auto max-w-xl text-lg text-earth-600">
              One price covers your whole family. No per-person fees, no hidden
              charges.
            </p>
          </div>

          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border-2 border-brand-200 bg-white p-8 shadow-lg sm:p-10">
              <div className="mb-2 inline-block rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                Early Access
              </div>
              <div className="mb-2 mt-4">
                <span className="text-4xl font-bold text-brand-950">$10–20</span>
                <span className="text-lg text-earth-500">/month</span>
              </div>
              <p className="mb-6 text-sm text-earth-500">
                Per family, during our early access period.
              </p>
              <ul className="mb-8 space-y-3 text-sm">
                {[
                  "Unlimited family members",
                  "All features included",
                  "Parent-controlled permissions",
                  "Real-time alerts & notifications",
                  "Priority email support",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-earth-700">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#waitlist"
                className="block w-full rounded-full bg-brand-500 px-6 py-3 text-center font-semibold text-white shadow-md transition-all hover:bg-brand-600 hover:shadow-lg active:scale-[0.98]"
              >
                Join the waitlist
              </a>
              <p className="mt-4 text-center text-xs text-earth-400">
                Full launch pricing: $15–30/month per family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist CTA Section */}
      <section id="waitlist" className="bg-brand-500 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Be the first to know
          </h2>
          <p className="mb-8 text-lg text-brand-100">
            Join our waitlist for early access and help shape the product. We
            won't spam you — just one update when we're ready.
          </p>
          <form
            className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-brand-400 bg-white/95 px-5 py-3 text-sm text-earth-900 placeholder-earth-400 outline-none ring-brand-300 focus:ring-2"
              required
            />
            <button
              type="submit"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand-600 shadow-sm transition-all hover:bg-brand-50 hover:shadow-md active:scale-[0.98]"
            >
              Get early access
            </button>
          </form>
          <p className="mt-4 text-xs text-brand-200">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-100/60 bg-brand-950 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-xs font-bold text-white">
              K
            </span>
            <span className="text-sm font-semibold text-white">Kinovia</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-brand-300">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-white">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-white">
              Pricing
            </a>
          </div>
          <p className="text-xs text-brand-400">
            &copy; {new Date().getFullYear()} Kinovia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
