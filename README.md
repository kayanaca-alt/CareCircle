# CareCircle

**Helping families navigate aging together.**

A co-pilot for adult children helping aging parents stay independent — combining bill monitoring, shared MFA/password access, document storage, scam detection, medication reminders, and appointment tracking into one family dashboard.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vite + React 19 + TypeScript |
| Routing | React Router 7 |
| Styling | Tailwind CSS v4 |
| Backend | Bun + TypeScript |
| Package manager | Bun workspaces |

---

## Quick Start

```bash
# 1. Clone and install
git clone https://github.com/kayanaca-alt/CareCircle.git
cd CareCircle
bun install

# 2. Start the backend (port 3001)
bun run dev:server

# 3. Start the frontend (in another terminal, port 5173 by default)
bun run dev:web
```

### Build both packages

```bash
bun run build
```

---

## Project Structure

```
/
├── packages/
│   ├── web/              # Vite + React frontend
│   │   ├── src/
│   │   │   ├── pages/    # Page components (Landing, future dashboards)
│   │   │   ├── styles/   # Tailwind CSS with CareCircle theme
│   │   │   ├── App.tsx   # Router setup
│   │   │   └── main.tsx  # Entry point
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   └── server/           # Bun HTTP API server
│       ├── src/
│       │   └── index.ts  # Health check + API root
│       ├── tsconfig.json
│       └── package.json
├── package.json          # Workspace root
└── README.md
```

---

## API Endpoints (Server)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check (status, timestamp, version) |
| GET | `/api` | API root info |

---

## Design

CareCircle uses a warm, earthy palette:

- **Brand green** (`brand-*`): Primary actions, branding
- **Accent blue** (`accent-*`): Secondary highlights
- **Warm tan** (`warm-*`): Backgrounds
- **Earth neutral** (`earth-*`): Text and subtle UI

Typography: Inter (Google Fonts), with system fallbacks.
