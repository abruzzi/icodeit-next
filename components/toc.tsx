import {Post} from "contentlayer/generated";
import React from "react";

type HeadingType = {
  level: string;
  text: string;
  slug: string;
};

export const TOC = ({post}: { post: Post }) => {
  return (
    <nav className={`order-last hidden shrink-0 md:block lg:block py-32 sticky`}>
      <h3 className={`text-brand uppercase tracking-wide`}>On this page</h3>
      <div>
        {post.headings.map((heading: HeadingType) => {
          return (
            <div key={`#${heading.slug}`}
                 className={`py-0.5 text-xs font-light text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-300 transition-colors duration-200`}>
              <a
                className="data-[level=two]:pl-4 data-[level=three]:pl-8"
                data-level={heading.level}
                href={`${post.slug}#${heading.slug}`}
              >
                {heading.text}
              </a>
            </div>
          );
        })}
      </div>
    </nav>
  );
};