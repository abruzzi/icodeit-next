"use client";

import {
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import { subjectDisplays, type SubjectDisplayKind } from "./subject-displays";
import { observerDisplays, type ObserverDisplayKind } from "./observer-displays";

// ——— Shared types (structure only, no domain language) ———

export type SubjectNodeData = {
  label: string;
  value: string;
  subjectDisplayKind: SubjectDisplayKind;
};

export type ObserverNodeData = {
  label: string;
  value?: string;
  displayKind: ObserverDisplayKind;
};

export type FlowStep = 1 | 2 | 3 | 4;

export type { SubjectDisplayKind, ObserverDisplayKind };

// ——— Shared structure: edges and connectivity ———

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

export function observersConnectedToSubject(edges: Edge[]): Set<string> {
  return new Set(
    edges
      .filter((e) => e.source === "subject")
      .map((e) => e.target)
      .filter(Boolean) as string[]
  );
}

// ——— Generic notification: presets supply updaters ———

export function applyNotificationGeneric(
  nodes: Node[],
  edges: Edge[],
  state: string,
  updateSubjectData: (data: SubjectNodeData, state: string) => SubjectNodeData,
  updateObserverData: (data: ObserverNodeData, state: string) => ObserverNodeData
): Node[] {
  const connected = observersConnectedToSubject(edges);
  return nodes.map((n) => {
    if (n.id === "subject") {
      return {
        ...n,
        data: updateSubjectData(n.data as SubjectNodeData, state),
      };
    }
    if (n.type === "observer") {
      if (!connected.has(n.id)) return n;
      return {
        ...n,
        data: updateObserverData(n.data as ObserverNodeData, state),
      };
    }
    return n;
  });
}

// ——— Node shells: delegate to display registries ———

export function SubjectNode({ data }: NodeProps<Node<SubjectNodeData>>) {
  const spec = subjectDisplays[data.subjectDisplayKind] ?? subjectDisplays["text-only"];
  return (
    <div className="relative rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-950">
      <div className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 border-b border-slate-200 dark:border-slate-700">
        Subject: {data.label}
      </div>
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          <spec.Content value={data.value} />
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
  const spec = observerDisplays[data.displayKind] ?? observerDisplays.hex;
  const wrapperClass =
    spec.getWrapperClassName?.(data.value) ?? "bg-white dark:bg-slate-950";

  return (
    <div
      className={`relative rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden ${wrapperClass}`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-sky-400 !border-none !shadow-[0_0_0_4px_rgba(56,189,248,0.25)]"
      />
      <div className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-sky-50/80 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 border-b border-slate-200 dark:border-slate-700">
        Observer: {data.label}
      </div>
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          <spec.Content value={data.value} />
        </div>
      </div>
    </div>
  );
}
