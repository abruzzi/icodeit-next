import rehypeReact, {Options} from "rehype-react";
import * as prod from "react/jsx-runtime";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";

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
  categories,
  children,
  coverSize = "small",
}: ProductType) => {
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
    <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto mx-auto gap-6">
      <div className="flex-shrink-0">
        <img
          className={`${coverSize === 'small' ? "w-44" : "w-96"}  max-w-none object-cover rounded`}
          width={coverSize === 'small' ? 176 : 384}
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
