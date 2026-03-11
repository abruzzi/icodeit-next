import type { ObserverDisplayKind, ObserverDisplaySpec } from "./types";
import { swatch, hex } from "./color";
import { farmMobile, farmIrrigation } from "./farm";

export type { ObserverDisplayKind, ObserverDisplaySpec } from "./types";

export const observerDisplays: Record<ObserverDisplayKind, ObserverDisplaySpec> = {
  swatch,
  hex,
  "farm-mobile": farmMobile,
  "farm-irrigation": farmIrrigation,
};
