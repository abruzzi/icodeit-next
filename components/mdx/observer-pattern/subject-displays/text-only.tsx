"use client";

function TextOnlyContent({ value }: { value: string }) {
  return (
    <span className="font-medium text-slate-700 dark:text-slate-300 text-[11px]">
      {value}
    </span>
  );
}

export const textOnly = { Content: TextOnlyContent };
