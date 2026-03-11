"use client";

import { FaSun, FaCircleCheck, FaDroplet, FaMinus } from "react-icons/fa6";
import type { ObserverDisplaySpec } from "./types";

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

function FarmMobileContent({ value }: { value?: string }) {
  return (
    <>
      {value && <FarmMobileIcon state={value} />}
      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
        {value ?? "—"}
      </span>
    </>
  );
}

function FarmIrrigationContent({ value }: { value?: string }) {
  return (
    <>
      {value && <FarmIrrigationIcon state={value} />}
      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
        {value ?? "—"}
      </span>
    </>
  );
}

function getFarmMobileWrapperClass(value?: string): string {
  if (!value) return "bg-white dark:bg-slate-950";
  if (value === "Dry") return "bg-amber-50 dark:bg-amber-950/50";
  if (value === "OK") return "bg-emerald-50 dark:bg-emerald-950/50";
  return "bg-sky-50 dark:bg-sky-950/50";
}

export const farmMobile: ObserverDisplaySpec = {
  Content: FarmMobileContent,
  getWrapperClassName: getFarmMobileWrapperClass,
};

export const farmIrrigation: ObserverDisplaySpec = {
  Content: FarmIrrigationContent,
};
