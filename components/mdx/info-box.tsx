import React from "react";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import type { Options } from "rehype-react";
import * as prod from "react/jsx-runtime";

export const InfoBox = ({ children }: { children?: React.ReactNode }) => {
  let content;

  const options: Options = {
    Fragment: prod.Fragment,
    jsx: prod.jsx,
    jsxs: prod.jsxs,
  };

  if (typeof children === "string") {
    content = unified()
      .use(remarkParse, { fragment: true })
      .use(remarkToRehype)
      .use(rehypeReact, options)
      .processSync(children).result;
  } else {
    content = children;
  }

  return (
    <div className="p-4 border-l-4 border-brand bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 rounded">
      {content}
    </div>
  );
};
