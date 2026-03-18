"use client";

import { useCallback, useState } from "react";
import { Barlow } from "next/font/google";
import { HiXMark } from "react-icons/hi2";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

type Status = "Dry" | "OK" | "Wet";
type ObserverBehavior = "log-all" | "log-when-dry" | "log-when-ok" | "log-when-wet";

interface ObserverConfig {
  id: string;
  name: string;
  behavior: ObserverBehavior;
}

interface LogEntry {
  id: string;
  message: string;
  indent?: boolean;
}

const BEHAVIOR_LABELS: Record<ObserverBehavior, string> = {
  "log-all": "Log every update",
  "log-when-dry": "Log when Dry",
  "log-when-ok": "Log when OK",
  "log-when-wet": "Log when Wet",
};

function getObserverOutput(observer: ObserverConfig, status: Status): string | null {
  switch (observer.behavior) {
    case "log-all":
      return `${observer.name}: moisture is ${status}`;
    case "log-when-dry":
      return status === "Dry" ? `${observer.name}: turning water on` : null;
    case "log-when-ok":
      return status === "OK" ? `${observer.name}: soil is healthy` : null;
    case "log-when-wet":
      return status === "Wet" ? `${observer.name}: soil is saturated` : null;
  }
}

const DEFAULT_OBSERVERS: ObserverConfig[] = [
  { id: "1", name: "Mobile", behavior: "log-all" },
  { id: "2", name: "Irrigation", behavior: "log-when-dry" },
];

let observerIdCounter = 3;

export function ObserverCodePlayground({
  title = "Try it — add observers, change status, see the output",
}: {
  title?: string;
}) {
  const [status, setStatus] = useState<Status | null>(null);
  const [observers, setObservers] = useState<ObserverConfig[]>(DEFAULT_OBSERVERS);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [showCode, setShowCode] = useState(false);

  const notifyObservers = useCallback((newStatus: Status, currentObservers: ObserverConfig[]) => {
    setLog((prev) => {
      const entries: LogEntry[] = [
        ...prev,
        { id: crypto.randomUUID(), message: `sensor.status = '${newStatus}'` },
      ];
      currentObservers.forEach((obs) => {
        const output = getObserverOutput(obs, newStatus);
        if (output) {
          entries.push({ id: crypto.randomUUID(), message: output, indent: true });
        }
      });
      return entries;
    });
  }, []);

  const handleStatusChange = useCallback(
    (newStatus: Status) => {
      setStatus(newStatus);
      notifyObservers(newStatus, observers);
    },
    [notifyObservers, observers]
  );

  const addObserver = useCallback(() => {
    const id = String(observerIdCounter++);
    setObservers((prev) => [
      ...prev,
      { id, name: `Observer ${id}`, behavior: "log-all" },
    ]);
  }, []);

  const removeObserver = useCallback((id: string) => {
    setObservers((prev) => prev.filter((o) => o.id !== id));
  }, []);

  const updateObserver = useCallback(
    (id: string, updates: Partial<ObserverConfig>) => {
      setObservers((prev) =>
        prev.map((o) => (o.id === id ? { ...o, ...updates } : o))
      );
    },
    []
  );

  const clearLog = useCallback(() => {
    setLog([]);
    setStatus(null);
  }, []);

  const generateCode = useCallback(() => {
    const observerBlocks = observers
      .map(
        (o, i) => {
          const varName = `observer${i + 1}`;
          const body =
            o.behavior === "log-all"
              ? `console.log('${o.name}: moisture is', status);`
              : o.behavior === "log-when-dry"
              ? `if (status === 'Dry') console.log('${o.name}: turning water on');`
              : o.behavior === "log-when-ok"
              ? `if (status === 'OK') console.log('${o.name}: soil is healthy');`
              : `if (status === 'Wet') console.log('${o.name}: soil is saturated');`;
          return `const ${varName}: Observer = {\n  notify(status) {\n    ${body}\n  },\n};`;
        }
      )
      .join("\n\n");

    const subscribeCalls = observers
      .map((_, i) => `sensor.subscribe(observer${i + 1});`)
      .join("\n");

    return `const sensor = new WaterSensor();

${observerBlocks}

${subscribeCalls}

sensor.status = 'Dry';  // Try changing to 'OK' or 'Wet'`;
  }, [observers]);

  return (
    <figure
      className={`my-6 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-900/50 ${barlow.className}`}
    >
      {title && (
        <figcaption className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
          {title}
        </figcaption>
      )}
      <div className="p-4 space-y-4">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Sensor status
          </span>
          <div className="flex gap-1">
            {(["Dry", "OK", "Wet"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleStatusChange(s)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  status === s
                    ? "bg-emerald-600 text-white"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={addObserver}
            className="ml-2 inline-flex items-center rounded border border-slate-300 dark:border-slate-600 px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            + Add observer
          </button>
          <button
            type="button"
            onClick={clearLog}
            className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Clear log
          </button>
        </div>

        {/* Observers list */}
        <div className="space-y-2">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
            Observers ({observers.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {observers.map((obs) => (
              <div
                key={obs.id}
                className="flex items-center gap-2 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 px-2 py-1.5"
              >
                <input
                  type="text"
                  value={obs.name}
                  onChange={(e) =>
                    updateObserver(obs.id, { name: e.target.value || "Observer" })
                  }
                  className="w-24 bg-transparent text-sm font-medium text-slate-800 dark:text-slate-200 border-none focus:ring-0 focus:outline-none"
                />
                <select
                  value={obs.behavior}
                  onChange={(e) =>
                    updateObserver(obs.id, {
                      behavior: e.target.value as ObserverBehavior,
                    })
                  }
                  className="text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded px-1.5 py-0.5 text-slate-600 dark:text-slate-400"
                >
                  {Object.entries(BEHAVIOR_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => removeObserver(obs.id)}
                  className="p-0.5 text-slate-400 hover:text-red-500 transition-colors"
                  aria-label="Remove observer"
                >
                  <HiXMark className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Output log */}
        <div className="space-y-1">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide block">
            Output
          </span>
          <div className="rounded bg-slate-900 dark:bg-slate-950 text-slate-100 font-mono text-xs p-3 min-h-[80px] max-h-40 overflow-y-auto">
            {log.length === 0 ? (
              <span className="text-slate-500">
                Click Dry, OK, or Wet to see observers get notified
              </span>
            ) : (
              log.map((entry) => (
                <div
                  key={entry.id}
                  className={entry.indent ? "pl-4 text-emerald-300" : "text-sky-300"}
                >
                  {entry.indent ? "→ " : "> "}
                  {entry.message}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Generated code toggle */}
        <div>
          <button
            type="button"
            onClick={() => setShowCode((s) => !s)}
            className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          >
            {showCode ? "Hide" : "Show"} generated code
          </button>
          {showCode && (
            <pre className="mt-2 rounded bg-slate-900 dark:bg-slate-950 text-slate-100 font-mono text-xs p-3 overflow-x-auto">
              <code>{generateCode()}</code>
            </pre>
          )}
        </div>
      </div>
    </figure>
  );
}
