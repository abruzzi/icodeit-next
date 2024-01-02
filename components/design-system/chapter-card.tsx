import { Chapter } from "contentlayer/generated";
import Link from "next/link";
import React from "react";

export function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <article>
      <Link href={chapter.slug} className={`no-underline`}>
        <h2 className={`my-2 hover:text-brand transition-colors duration-2`}>
          {chapter.title}
        </h2>
      </Link>

      {chapter.description && (
        <p className={`text-slate-600 dark:text-slate-300`}>
          {chapter.description}
        </p>
      )}
    </article>
  );
}

