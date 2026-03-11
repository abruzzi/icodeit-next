"use client";

import { FlowDiagram } from "./flow-diagram";

export function ObserverStep2(props: { title?: string }) {
  return <FlowDiagram step={2} {...props} />;
}
