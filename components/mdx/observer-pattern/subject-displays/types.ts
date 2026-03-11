import type { ComponentType } from "react";

/** How the subject value is rendered (domain-agnostic). */
export type SubjectDisplayKind = "swatch-with-value" | "text-only";

export type SubjectDisplaySpec = {
  Content: ComponentType<{ value: string }>;
};
