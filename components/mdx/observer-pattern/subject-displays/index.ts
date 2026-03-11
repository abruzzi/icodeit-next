import type { SubjectDisplayKind, SubjectDisplaySpec } from "./types";
import { swatchWithValue } from "./swatch-with-value";
import { textOnly } from "./text-only";

export type { SubjectDisplayKind, SubjectDisplaySpec } from "./types";

export const subjectDisplays: Record<SubjectDisplayKind, SubjectDisplaySpec> = {
  "swatch-with-value": swatchWithValue,
  "text-only": textOnly,
};
