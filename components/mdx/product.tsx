import React from "react";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { ArrowRightIcon } from "@heroui/shared-icons";
import Image from "next/image";

type ProductType = {
  categories: string[];
  link: string;
  title: string;
  cover: string;
  learnMoreLink?: string;
  children?: React.ReactNode;
  coverSize?: "small" | "medium";
};

export const Product = ({
  link,
  title,
  cover,
  learnMoreLink,
  children,
  coverSize = "small",
  categories,
}: ProductType) => {
  let content;

  if (typeof children === "string") {
    content = unified()
      .use(remarkParse, { fragment: true })
      .use(remarkRehype)
      .use(rehypeStringify)
      .processSync(children)
      .toString();
  } else {
    content = children;
  }

  return (
    <div className="group mx-auto my-8 flex w-full flex-col items-center gap-6 rounded-2xl border border-slate-200/90 bg-white/80 p-4 shadow-sm transition-[border-color,box-shadow] sm:w-auto sm:p-6 dark:border-slate-600/50 dark:bg-slate-800/60 dark:hover:border-slate-500/60 dark:hover:shadow-md md:flex-row hover:border-slate-300/90 hover:shadow-md">
      <div className="flex-shrink-0 transition-shadow duration-300">
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
          <Image
            className={`${
              coverSize === "small" ? "w-44" : "w-96"
            }  max-w-none object-cover rounded shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
            width={coverSize === "small" ? 176 : 384}
            height={coverSize === "small" ? 267 : 212}
            src={cover}
            alt={title}
          />
        </a>
      </div>

      <div className="flex-1">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block no-underline"
        >
          <h3 className="font-heading m-0 flex items-center gap-x-2 text-xl font-semibold leading-tight text-slate-900 transition-colors duration-200 hover:text-brand dark:text-slate-100 dark:hover:text-brand">
            {title}
          </h3>
        </a>

        <div className="my-3 text-slate-600 dark:text-slate-300 [&_a]:text-brand [&_a]:no-underline hover:[&_a]:underline">
          {content}
        </div>

        <div className={`flex flex-col md:flex-row items-center gap-3`}>
          <div className={`flex flex-wrap gap-2`}>
            {(categories ?? []).map((cat) => (
              <span
                key={cat}
                className={`${
                  cat === "new"
                    ? "border-green-800 dark:border-green-300 bg-green-50 dark:bg-green-950/30"
                    : "border-slate-100 dark:border-slate-700"
                } text-slate-600 dark:text-slate-300  rounded-full border py-1 px-2 text-xs font-light`}
              >
                {cat}
              </span>
            ))}
          </div>

          <a
            href={learnMoreLink ? learnMoreLink : link}
            className="group/learn ml-auto inline-flex items-center gap-1.5 rounded-full border border-slate-200/90 bg-white/90 px-4 py-2 text-sm font-semibold text-brand no-underline ring-1 ring-slate-200/60 transition-colors duration-200 hover:bg-slate-50 hover:text-brand dark:border-slate-600/80 dark:bg-slate-900/60 dark:text-slate-50 dark:ring-slate-600/50 dark:hover:bg-slate-800/80 dark:hover:text-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
            <ArrowRightIcon className="h-4 w-4 shrink-0 text-palette-azure transition-transform duration-200 group-hover/learn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
