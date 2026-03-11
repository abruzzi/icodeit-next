"use client";

import {
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";

export type SubjectNodeData = {
  label: string;
  colorHex: string;
};

export type ObserverMode = "swatch" | "hex";

export type ObserverNodeData = {
  label: string;
  mode: ObserverMode;
  latestHex?: string;
};

export type FlowStep = 1 | 2 | 3 | 4;

export const PALETTE = ["#22c55e", "#3b82f6", "#a855f7", "#f97316", "#ef4444"] as const;

export function SubjectNode({ data }: NodeProps<Node<SubjectNodeData>>) {
  return (
    <div className="relative rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-950">
      <div className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 border-b border-slate-200 dark:border-slate-700">
        Subject: {data.label}
      </div>
      <div className="px-3 py-2">
        <div className="mt-2 flex items-center gap-2">
          <span
            className="inline-block h-4 w-4 rounded border border-slate-200 dark:border-slate-700"
            style={{ backgroundColor: data.colorHex }}
          />
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            {data.colorHex}
          </span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-emerald-400 !border-none !shadow-[0_0_0_4px_rgba(16,185,129,0.25)]"
      />
    </div>
  );
}

export function ObserverNode({ data }: NodeProps<Node<ObserverNodeData>>) {
  const hex = data.latestHex ?? "—";
  const swatch =
    data.mode === "swatch" && data.latestHex ? (
      <span
        className="inline-block h-4 w-4 rounded border border-slate-200 dark:border-slate-700"
        style={{ backgroundColor: data.latestHex }}
      />
    ) : null;

  return (
    <div className="relative rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-950">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-sky-400 !border-none !shadow-[0_0_0_4px_rgba(56,189,248,0.25)]"
      />

      <div className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200 border-b border-slate-200 dark:border-slate-700">
        Observer: {data.label}
      </div>
      <div className="px-3 py-2">
        <div className="mt-2 flex items-center gap-2">
          {swatch}
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            {hex}
          </span>
        </div>
      </div>
    </div>
  );
}

export function makeNodesForStep(step: FlowStep, colorHex: string): Node[] {
  const nodes: Node[] = [
    {
      id: "subject",
      type: "subject",
      position: { x: 80, y: 120 },
      data: { label: "Color", colorHex } satisfies SubjectNodeData,
    },
  ];

  if (step >= 2) {
    nodes.push({
      id: "observer-a",
      type: "observer",
      position: { x: 360, y: 70 },
      data: {
        label: "A",
        mode: "swatch",
        latestHex: undefined,
      } satisfies ObserverNodeData,
    });
  }

  if (step >= 3) {
    nodes.push({
      id: "observer-b",
      type: "observer",
      position: { x: 360, y: 180 },
      data: {
        label: "B",
        mode: "hex",
        latestHex: undefined,
      } satisfies ObserverNodeData,
    });
  }

  return nodes;
}

export function makeEdgesForStep(step: FlowStep): Edge[] {
  const edges: Edge[] = [];

  if (step >= 2) {
    edges.push({
      id: "s-a",
      source: "subject",
      target: "observer-a",
      label: "notify",
      type: "default",
      reconnectable: true,
    });
  }

  if (step >= 3) {
    edges.push({
      id: "s-b",
      source: "subject",
      target: "observer-b",
      label: "notify",
      type: "default",
      reconnectable: true,
    });
  }

  return edges;
}

export function nextColorHex(current: string) {
  const idx = PALETTE.indexOf(current as (typeof PALETTE)[number]);
  const nextIdx = idx === -1 ? 0 : (idx + 1) % PALETTE.length;
  return PALETTE[nextIdx];
}

function observersConnectedToSubject(edges: Edge[]) {
  return new Set(
    edges
      .filter((e) => e.source === "subject")
      .map((e) => e.target)
      .filter(Boolean) as string[]
  );
}

export function applyNotification(
  nodes: Node[],
  edges: Edge[],
  subjectHex: string
): Node[] {
  const connected = observersConnectedToSubject(edges);
  return nodes.map((n) => {
    if (n.id === "subject") {
      return {
        ...n,
        data: { ...(n.data as SubjectNodeData), colorHex: subjectHex },
      };
    }

    if (n.type === "observer") {
      if (!connected.has(n.id)) {
        return n;
      }
      return {
        ...n,
        data: { ...(n.data as ObserverNodeData), latestHex: subjectHex },
      };
    }

    return n;
  });
}
