import { Merriweather } from "next/font/google";
import React from "react";
import { Chapter } from "contentlayer/generated";

const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });

export function ChapterHeader({ chapter }: { chapter: Chapter }) {
  return (
    <div className={`flex flex-col justify-center items-center`}>
      <div>
        <div className={`flex flex-row gap-4 item-center`}>
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-500 text-4xl font-bold`}
          >
            {chapter.order}
          </div>
          <div>
            <span>Chapter {chapter.order}</span>
            <h1 className={`m-0 p-0 ${merriweather.className}`}>
              {chapter.title}
            </h1>
          </div>
        </div>

        {chapter.description && (
          <div
            className={`mt-8 md:mt-10 border p-4 border-slate-700 dark:border-slate-600 rounded`}
          >
            <p className="text-base font-light m-0 text-slate-700 dark:text-slate-400">
              {chapter.description}
            </p>
          </div>
        )}
      </div>

      <div aria-hidden="true"
           className={`w-[1px] m-auto h-20 md:h-40 bg-gradient-to-b from-transparent via-brand to-transparent`}
      ></div>
    </div>
  );
}
