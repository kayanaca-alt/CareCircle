import { useState } from "react";

// ── Types ──────────────────────────────────────────────
export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: "bill" | "appointment" | "prescription";
}

interface TaskState {
  status: "pending" | "done" | "help";
  message: string | null;
}

type Mood = "good" | "okay" | "help" | null;

// ── Mock Data ──────────────────────────────────────────
const CAREGIVER_NAME = "Yani";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Pay Eversource bill",
    description: "$115.00 — Due June 28",
    dueDate: "June 28",
    category: "bill",
  },
  {
    id: "2",
    title: "Confirm doctor appointment",
    description: "Dr. Patel — Tomorrow 10:30 AM",
    dueDate: "Tomorrow",
    category: "appointment",
  },
  {
    id: "3",
    title: "Refill prescription",
    description: "Lisinopril — Ready for pickup",
    dueDate: "Today",
    category: "prescription",
  },
];

// ── Helpers ────────────────────────────────────────────
function categoryEmoji(cat: Task["category"]): string {
  switch (cat) {
    case "bill":
      return "💳";
    case "appointment":
      return "🏥";
    case "prescription":
      return "💊";
  }
}

// ── Sub-components ─────────────────────────────────────

/** Big friendly greeting + mood check-in */
function DailyCheckIn({
  mood,
  onMood,
}: {
  mood: Mood;
  onMood: (m: Mood) => void;
}) {
  if (mood) {
    return (
      <div className="rounded-3xl bg-brand-100/70 p-6 text-center">
        <p className="text-2xl font-semibold text-brand-800">Thanks for checking in 💚</p>
        <p className="mt-1 text-xl text-brand-600">
          {mood === "good" && "We're so glad to hear that!"}
          {mood === "okay" && "We're here if you need anything."}
          {mood === "help" && "Your care circle has been notified."}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-warm-100 p-6 text-center">
      <h2 className="text-2xl font-bold text-earth-800">
        How are you feeling today?
      </h2>
      <div className="mt-5 flex justify-center gap-4">
        <button
          onClick={() => onMood("good")}
          className="flex min-h-[72px] min-w-[72px] flex-col items-center justify-center rounded-2xl bg-white text-4xl shadow-sm ring-1 ring-brand-200 transition-all hover:bg-brand-50 hover:shadow-md active:scale-95"
          aria-label="Good"
        >
          😊
          <span className="mt-1 text-lg font-medium text-brand-700">Good</span>
        </button>
        <button
          onClick={() => onMood("okay")}
          className="flex min-h-[72px] min-w-[72px] flex-col items-center justify-center rounded-2xl bg-white text-4xl shadow-sm ring-1 ring-warm-300 transition-all hover:bg-warm-50 hover:shadow-md active:scale-95"
          aria-label="Okay"
        >
          😐
          <span className="mt-1 text-lg font-medium text-warm-700">Okay</span>
        </button>
        <button
          onClick={() => onMood("help")}
          className="flex min-h-[72px] min-w-[72px] flex-col items-center justify-center rounded-2xl bg-white text-4xl shadow-sm ring-1 ring-accent-200 transition-all hover:bg-accent-50 hover:shadow-md active:scale-95"
          aria-label="Need help"
        >
          😟
          <span className="mt-1 text-lg font-medium text-accent-700">
            Need Help
          </span>
        </button>
      </div>
    </div>
  );
}

/** A single task card */
function TaskCard({
  task,
  state,
  onDone,
  onHelp,
}: {
  task: Task;
  state: TaskState;
  onDone: () => void;
  onHelp: () => void;
}) {
  const isCompleted = state.status === "done";
  const needsHelp = state.status === "help";

  if (state.message) {
    return (
      <div
        className={`rounded-2xl p-5 text-center ${
          isCompleted
            ? "bg-brand-50 ring-1 ring-brand-200"
            : "bg-warm-50 ring-1 ring-warm-200"
        }`}
      >
        <p className="text-2xl font-semibold text-brand-700">
          {isCompleted ? "Great job! ✓" : state.message}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ${
        isCompleted
          ? "ring-brand-200 bg-brand-50/50"
          : needsHelp
            ? "ring-warm-300 bg-warm-50/50"
            : "ring-earth-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-warm-100 text-2xl">
          {categoryEmoji(task.category)}
        </span>
        <div className="min-w-0 flex-1">
          <h3
            className={`text-xl font-bold ${isCompleted ? "text-brand-600 line-through" : "text-earth-900"}`}
          >
            {task.title}
          </h3>
          <p className="mt-1 text-lg text-earth-500">{task.description}</p>
          <p className="mt-1 text-base font-medium text-warm-600">
            Due {task.dueDate}
          </p>
        </div>
      </div>

      {!isCompleted && !needsHelp && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={onDone}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 py-4 text-xl font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md active:scale-[0.97]"
          >
            <span className="text-2xl">✅</span> Done
          </button>
          <button
            onClick={onHelp}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-warm-400 py-4 text-xl font-semibold text-white shadow-sm transition-all hover:bg-warm-500 hover:shadow-md active:scale-[0.97]"
          >
            <span className="text-2xl">❓</span> Need Help
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────
export default function ParentApp() {
  const [mood, setMood] = useState<Mood>(null);
  const [taskStates, setTaskStates] = useState<Record<string, TaskState>>({});

  // Count remaining tasks for the header badge
  const pendingTasks = mockTasks.filter(
    (t) => !taskStates[t.id] || taskStates[t.id].status === "pending",
  ).length;

  function handleDone(taskId: string) {
    setTaskStates((prev) => ({
      ...prev,
      [taskId]: { status: "done", message: "Great job! ✓" },
    }));
    // Auto-dismiss the message after a few seconds
    setTimeout(() => {
      setTaskStates((prev) => {
        const cur = prev[taskId];
        if (cur && cur.status === "done" && cur.message) {
          return { ...prev, [taskId]: { status: "done", message: null } };
        }
        return prev;
      });
    }, 3000);
  }

  function handleHelp(taskId: string) {
    setTaskStates((prev) => ({
      ...prev,
      [taskId]: {
        status: "help",
        message: `We'll let ${CAREGIVER_NAME} know you need help with this. ✓`,
      },
    }));
    // Auto-dismiss the message after a few seconds
    setTimeout(() => {
      setTaskStates((prev) => {
        const cur = prev[taskId];
        if (cur && cur.status === "help" && cur.message) {
          return { ...prev, [taskId]: { status: "help", message: null } };
        }
        return prev;
      });
    }, 4000);
  }

  return (
    <div className="mx-auto min-h-dvh max-w-lg px-4 py-6">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-brand-900">
          My Tasks
          {pendingTasks > 0 && (
            <span className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-xl font-bold text-white">
              {pendingTasks}
            </span>
          )}
        </h1>
        <span className="text-sm font-medium text-earth-400">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </span>
      </header>

      {/* Daily Check-In */}
      <div className="mb-6">
        <DailyCheckIn mood={mood} onMood={setMood} />
      </div>

      {/* Today's Tasks */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-earth-800">
          {pendingTasks === 0 ? "All caught up! 🎉" : "Today's Tasks"}
        </h2>

        {pendingTasks === 0 && mood && (
          <p className="mb-6 text-xl text-earth-500">
            You're all set. We'll check in again tomorrow.
          </p>
        )}

        <div className="space-y-4">
          {mockTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              state={taskStates[task.id] || { status: "pending", message: null }}
              onDone={() => handleDone(task.id)}
              onHelp={() => handleHelp(task.id)}
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pb-8 text-center">
        <a
          href="#settings"
          className="inline-flex items-center gap-2 text-lg font-medium text-earth-400 transition-colors hover:text-earth-600"
          onClick={(e) => e.preventDefault()}
        >
          <span className="text-xl">⚙️</span> Settings
        </a>
        <p className="mt-4 text-base text-earth-300">
          Kinovia — here to help, not to hover 💚
        </p>
      </footer>
    </div>
  );
}
