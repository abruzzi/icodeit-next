import React from "react";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export const InfoBox = ({ children }: { children?: React.ReactNode }) => {
  let content;

  if (typeof children === "string") {
    content = unified()
      .use(remarkParse, { fragment: true })
      .use(remarkToRehype)
      .use(rehypeStringify)
      .processSync(children)
      .toString();
  } else {
    content = children;
  }

  return (
    <div className="p-4 border-l-4 border-brand bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 rounded">
      {content}
    </div>
  );
};
