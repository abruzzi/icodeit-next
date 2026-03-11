import type { ComponentType } from "react";

export type ObserverDisplayKind =
  | "swatch"
  | "hex"
  | "farm-mobile"
  | "farm-irrigation";

export type ObserverDisplaySpec = {
  Content: ComponentType<{ value?: string }>;
  getWrapperClassName?: (value?: string) => string;
};
