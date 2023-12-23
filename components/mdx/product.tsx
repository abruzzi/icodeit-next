import React from "react";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

type ProductType = {
  categories: string[];
  link: string;
  title: string;
  cover: string;
  children?: React.ReactNode;
  coverSize?: "small" | "medium";
};

export const Product = ({
  link,
  title,
  cover,
  children,
  coverSize = "small",
}: ProductType) => {
  let content;

  if (typeof children === "string") {
    content = unified()
      .use(remarkParse, { fragment: true })
      .use(remarkRehype)
      .use(rehypeStringify)
      .processSync(children).toString();
  } else {
    content = children;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mx-auto gap-6">
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

        <p className="text-base font-light">{content}</p>
        <a href={link} className={`text-brand no-underline`} target="_blank">
          Learn more...
        </a>
      </div>
    </div>
  );
};
