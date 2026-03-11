import type { Node, Edge } from "@xyflow/react";
import type { FlowStep } from "../common";

export type ObserverPreset = {
  initialState: string;
  nextState: (current: string) => string;
  makeNodesForStep: (step: FlowStep, state: string) => Node[];
  /** Defaults to common.makeEdgesForStep when omitted */
  makeEdgesForStep?: (step: FlowStep) => Edge[];
  applyNotification: (nodes: Node[], edges: Edge[], state: string) => Node[];
  step3Message: string;
  createNewObserver?: (index: number) => { node: Node; edge: Edge };
};

import * as colorPreset from "./color";
import * as farmPreset from "./farm";

export const color: ObserverPreset = {
  initialState: colorPreset.PALETTE[0],
  nextState: colorPreset.nextColor,
  makeNodesForStep: colorPreset.makeNodesForStep,
  applyNotification: colorPreset.applyNotification,
  step3Message: "Click the Subject to change color. Observer B shows the hex only.",
  createNewObserver: colorPreset.createNewObserver,
};

export const farm: ObserverPreset = {
  initialState: farmPreset.FARM_MOISTURE_STATES[0],
  nextState: farmPreset.nextMoisture,
  makeNodesForStep: farmPreset.makeNodesForStep,
  applyNotification: farmPreset.applyNotification,
  step3Message: "Click the water sensor to change moisture. In Step 4 you can drag an edge to unsubscribe.",
};