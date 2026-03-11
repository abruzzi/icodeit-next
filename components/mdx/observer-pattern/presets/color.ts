import type { Node, Edge } from "@xyflow/react";
import {
  applyNotificationGeneric,
  type FlowStep,
  type SubjectNodeData,
  type ObserverNodeData,
} from "../common";

export const PALETTE = ["#22c55e", "#3b82f6", "#a855f7", "#f97316", "#ef4444"] as const;

export function nextColor(current: string): string {
  const idx = PALETTE.indexOf(current as (typeof PALETTE)[number]);
  const nextIdx = idx === -1 ? 0 : (idx + 1) % PALETTE.length;
  return PALETTE[nextIdx];
}

export function makeNodesForStep(step: FlowStep, colorHex: string): Node[] {
  const nodes: Node[] = [
    {
      id: "subject",
      type: "subject",
      position: { x: 80, y: 120 },
      data: {
        label: "Color",
        value: colorHex,
        subjectDisplayKind: "swatch-with-value",
      } satisfies SubjectNodeData,
    },
  ];

  if (step >= 2) {
    nodes.push({
      id: "observer-a",
      type: "observer",
      position: { x: 360, y: 70 },
      data: {
        label: "A",
        displayKind: "swatch",
        value: undefined,
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
        displayKind: "hex",
        value: undefined,
      } satisfies ObserverNodeData,
    });
  }

  return nodes;
}

export function applyNotification(
  nodes: Node[],
  edges: Edge[],
  colorHex: string
): Node[] {
  return applyNotificationGeneric(
    nodes,
    edges,
    colorHex,
    (data) => ({ ...data, value: colorHex, subjectDisplayKind: "swatch-with-value" }),
    (data, state) => ({ ...data, value: state })
  );
}

export function createNewObserver(index: number): { node: Node; edge: Edge } {
  const label = String.fromCharCode("A".charCodeAt(0) + (index - 2));
  const id = `observer-${label.toLowerCase()}`;
  return {
    node: {
      id,
      type: "observer",
      position: { x: 360, y: 70 + (index - 1) * 90 },
      data: { label, displayKind: "hex" as const, value: undefined } satisfies ObserverNodeData,
    },
    edge: {
      id: `s-${id}`,
      source: "subject",
      target: id,
      label: "notify",
      type: "default",
      reconnectable: true,
    },
  };
}
