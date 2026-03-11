"use client";

function SwatchDisplay({ value }: { value?: string }) {
  if (!value) return <span className="font-mono text-[11px] text-slate-400">—</span>;
  return (
    <>
      <span
        className="inline-block h-4 w-4 rounded border border-slate-200 dark:border-slate-700"
        style={{ backgroundColor: value }}
      />
      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">{value}</span>
    </>
  );
}

function HexDisplay({ value }: { value?: string }) {
  return (
    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
      {value ?? "—"}
    </span>
  );
}

export const swatch = { Content: SwatchDisplay };
export const hex = { Content: HexDisplay };
