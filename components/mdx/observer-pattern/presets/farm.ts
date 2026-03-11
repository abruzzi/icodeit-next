import type { Node, Edge } from "@xyflow/react";
import {
  applyNotificationGeneric,
  type FlowStep,
  type SubjectNodeData,
  type ObserverNodeData,
} from "../common";

export const FARM_MOISTURE_STATES = ["Dry", "OK", "Wet"] as const;
export type FarmMoistureState = (typeof FARM_MOISTURE_STATES)[number];

export function nextMoisture(current: string): FarmMoistureState {
  const idx = FARM_MOISTURE_STATES.indexOf(current as FarmMoistureState);
  const nextIdx = idx === -1 ? 0 : (idx + 1) % FARM_MOISTURE_STATES.length;
  return FARM_MOISTURE_STATES[nextIdx];
}

export function makeNodesForStep(step: FlowStep, moisture: string): Node[] {
  const nodes: Node[] = [
    {
      id: "subject",
      type: "subject",
      position: { x: 80, y: 120 },
      data: {
        label: "Water sensor",
        value: moisture,
        subjectDisplayKind: "text-only",
      } satisfies SubjectNodeData,
    },
  ];

  if (step >= 2) {
    nodes.push({
      id: "observer-a",
      type: "observer",
      position: { x: 360, y: 70 },
      data: {
        label: "Mobile",
        value: undefined,
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
        value: undefined,
        displayKind: "farm-irrigation",
      } satisfies ObserverNodeData,
    });
  }

  return nodes;
}

export function applyNotification(
  nodes: Node[],
  edges: Edge[],
  moisture: string
): Node[] {
  return applyNotificationGeneric(
    nodes,
    edges,
    moisture,
    (data) => ({ ...data, value: moisture, subjectDisplayKind: "text-only" }),
    (data, state) => ({ ...data, value: state })
  );
}
