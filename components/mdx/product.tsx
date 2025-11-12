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
    <div className="flex flex-col md:flex-row items-center w-full sm:w-auto mx-auto gap-6 my-8 group">
      <div className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
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
          <h3 className="m-0 flex items-center gap-x-2 text-xl font-semibold leading-tight hover:text-brand transition-colors duration-200">
            {title}
          </h3>
        </a>

        <div className="my-3">{content}</div>

        <div className={`flex flex-col md:flex-row items-center gap-3`}>
          <div className={`flex flex-wrap gap-2`}>
            {categories.map((cat) => (
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
            className={`no-underline rounded border py-1.5 px-3 border-slate-200 dark:border-slate-600 ml-auto hover:text-brand hover:border-brand transition-all duration-200 hover:scale-105 transform flex flex-row items-center gap-1`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
