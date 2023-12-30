import React from "react";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import {ArrowRightIcon} from "@nextui-org/shared-icons";

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
    <div className="flex flex-col md:flex-row items-center w-full sm:w-auto mx-auto gap-6 my-4">
      <div className="flex-shrink-0">
        <img
          className={`${
            coverSize === "small" ? "w-44" : "w-96"
          }  max-w-none object-cover rounded`}
          width={coverSize === "small" ? 176 : 384}
          src={cover}
          alt={title}
        />
      </div>

      <div>
        <a
          href={link}
          target="_blank"
          className="mt-2 inline-block no-underline"
        >
          <h3 className="m-0 flex items-center gap-x-2 text-xl font-semibold leading-tight hover:text-brand transition-colors duration-200">
            {title}
          </h3>
        </a>

        {content}

        <div className={`flex flex-col md:flex-row items-center`}>
          <div className={`hidden md:flex`}>
            {categories.map((cat) => (
              <span
                key={cat}
                className={`${cat === 'coming soon' ? 'border-green-800 dark:border-green-300' : 'border-slate-100 dark:border-slate-700'} text-slate-600 dark:text-slate-300  rounded-full border py-1 px-2 text-xs font-light mr-2`}
              >
                {cat}
              </span>
            ))}
          </div>

          <a
            href={learnMoreLink ? learnMoreLink : link}
            className={`no-underline rounded border py-1 px-2 border-slate-200 dark:border-slate-600 ml-auto hover:text-brand hover:border-brand transition-colors duration-200`}
            target="_blank"
          >
            <div className={`flex flex-row items-center gap-1`}>
              Learn more <ArrowRightIcon />
            </div>

          </a>
        </div>
      </div>
    </div>
  );
};
