"use client";

import { FlowDiagram } from "./flow-diagram";

export function ObserverStep1(props: { title?: string }) {
  return <FlowDiagram step={1} {...props} />;
}
