import React from "react";
import type { Chapter } from "content-collections";

export function Highlight({ chapter: { highlights } }: { chapter: Chapter }) {
  return (
    <div className={`py-4`}>
      <h2>In this chapter, you will learn</h2>
      {highlights.map((hl, index) => (
        <li key={index}>{hl}</li>
      ))}
    </div>
  );
}
