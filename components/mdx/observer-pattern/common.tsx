"use client";

import {
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import { FaSun, FaCircleCheck, FaDroplet, FaMinus } from "react-icons/fa6";

export type SubjectNodeData = {
  label: string;
  colorHex?: string;
  valueText?: string;
};

export type ObserverMode = "swatch" | "hex";

export type ObserverDisplayKind = "farm-mobile" | "farm-irrigation";

export type ObserverNodeData = {
  label: string;
  mode: ObserverMode;
  latestHex?: string;
  /** When set, observer shows a farm icon instead of swatch/hex */
  displayKind?: ObserverDisplayKind;
};

export type FlowStep = 1 | 2 | 3 | 4;

export const PALETTE = ["#22c55e", "#3b82f6", "#a855f7", "#f97316", "#ef4444"] as const;

export const FARM_MOISTURE_STATES = ["Dry", "OK", "Wet"] as const;
export type FarmMoistureState = (typeof FARM_MOISTURE_STATES)[number];

export function nextFarmMoisture(current: string): FarmMoistureState {
  const idx = FARM_MOISTURE_STATES.indexOf(current as FarmMoistureState);
  const nextIdx = idx === -1 ? 0 : (idx + 1) % FARM_MOISTURE_STATES.length;
  return FARM_MOISTURE_STATES[nextIdx];
}

export function SubjectNode({ data }: NodeProps<Node<SubjectNodeData>>) {
  const showValueText = data.valueText != null;
  return (
    <div className="relative rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden bg-white dark:bg-slate-950">
      <div className="px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200 border-b border-slate-200 dark:border-slate-700">
        Subject: {data.label}
      </div>
      <div className="px-3 py-2">
        <div className="flex items-center gap-2">
          {showValueText ? (
            <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">
              {data.valueText}
            </span>
          ) : (
            <>
              <span
                className="inline-block h-4 w-4 rounded border border-slate-200 dark:border-slate-700"
                style={{ backgroundColor: data.colorHex }}
              />
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                {data.colorHex}
              </span>
            </>
          )}
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

const iconWrapperClass =
  "inline-flex items-center justify-center w-4 h-4 shrink-0 leading-[0] [&>svg]:block [&>svg]:translate-y-[0.5px]";

function FarmMobileIcon({ state }: { state: string }) {
  const iconClass = "w-3.5 h-3.5 text-slate-600 dark:text-slate-400";
  if (state === "Dry")
    return (
      <span className={iconWrapperClass} title="Dry">
        <FaSun className={iconClass} />
      </span>
    );
  if (state === "OK")
    return (
      <span className={iconWrapperClass} title="OK">
        <FaCircleCheck className={iconClass} />
      </span>
    );
  if (state === "Wet")
    return (
      <span className={iconWrapperClass} title="Wet">
        <FaDroplet className={iconClass} />
      </span>
    );
  return <span className="text-[11px] text-slate-400">—</span>;
}

function FarmIrrigationIcon({ state }: { state: string }) {
  const iconClass = "w-3.5 h-3.5 shrink-0";
  if (state === "Dry")
    return (
      <span className={iconWrapperClass} title="Water">
        <FaDroplet className={`${iconClass} text-sky-500`} />
      </span>
    );
  return (
    <span className={iconWrapperClass} title="No action">
      <FaMinus className={`${iconClass} text-slate-300 dark:text-slate-500`} />
    </span>
  );
}

export function ObserverNode({ data }: NodeProps<Node<ObserverNodeData>>) {
  const hex = data.latestHex ?? "—";
  const isFarmMobile = data.displayKind === "farm-mobile";
  const isFarmIrrigation = data.displayKind === "farm-irrigation";

  const swatch =
    !isFarmMobile &&
    !isFarmIrrigation &&
    data.mode === "swatch" &&
    data.latestHex ? (
      <span
        className="inline-block h-4 w-4 rounded border border-slate-200 dark:border-slate-700"
        style={{ backgroundColor: data.latestHex }}
      />
    ) : null;

  const farmIcon =
    isFarmMobile && data.latestHex ? (
      <FarmMobileIcon state={data.latestHex} />
    ) : isFarmIrrigation && data.latestHex ? (
      <FarmIrrigationIcon state={data.latestHex} />
    ) : null;

  const showHex = !isFarmMobile && !isFarmIrrigation;
  const showFarmLabel = isFarmMobile || isFarmIrrigation;

  const mobileBgByState =
    isFarmMobile && data.latestHex
      ? data.latestHex === "Dry"
        ? "bg-amber-50 dark:bg-amber-950/50"
        : data.latestHex === "OK"
          ? "bg-emerald-50 dark:bg-emerald-950/50"
          : "bg-sky-50 dark:bg-sky-950/50"
      : "";

  const nodeBg = mobileBgByState || "bg-white dark:bg-slate-950";

  return (
    <div className={`relative rounded-md border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden ${nodeBg}`}>
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
          {farmIcon}
          {swatch}
          {(showHex || (showFarmLabel && data.latestHex)) && (
            <span className="font-mono text-[11px] leading-none text-slate-500 dark:text-slate-400">
              {showFarmLabel ? data.latestHex : hex}
            </span>
          )}
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

export function makeNodesForStepFarm(step: FlowStep, moisture: string): Node[] {
  const nodes: Node[] = [
    {
      id: "subject",
      type: "subject",
      position: { x: 80, y: 120 },
      data: { label: "Water sensor", valueText: moisture } satisfies SubjectNodeData,
    },
  ];

  if (step >= 2) {
    nodes.push({
      id: "observer-a",
      type: "observer",
      position: { x: 360, y: 70 },
      data: {
        label: "Mobile",
        mode: "hex",
        latestHex: undefined,
        displayKind: "farm-mobile",
      } satisfies ObserverNodeData,
    });
  }

  if (step >= 3) {
    nodes.push({
      id: "observer-b",
      type: "observer",
      position: { x: 360, y: 180 },
      data: {
        label: "Irrigation",
        mode: "hex",
        latestHex: undefined,
        displayKind: "farm-irrigation",
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

export function applyNotificationFarm(
  nodes: Node[],
  edges: Edge[],
  moisture: string
): Node[] {
  const connected = observersConnectedToSubject(edges);
  return nodes.map((n) => {
    if (n.id === "subject") {
      return {
        ...n,
        data: { ...(n.data as SubjectNodeData), valueText: moisture },
      };
    }

    if (n.type === "observer") {
      if (!connected.has(n.id)) {
        return n;
      }
      return {
        ...n,
        data: { ...(n.data as ObserverNodeData), latestHex: moisture },
      };
    }

    return n;
  });
}
