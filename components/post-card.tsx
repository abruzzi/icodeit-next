import Link from "next/link";
import React from "react";
import { Post } from "contentlayer/generated";
import { Merriweather } from "next/font/google";
import { format } from "date-fns";

const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });

const PostCard = ({ post }: { post: Post }) => {
  return (
    <article key={post._id} className={`my-8`}>
      <Link href={post.slug} className={`no-underline`}>
        <h2
          className={`${merriweather.className} my-2 hover:text-brand transition-colors duration-2`}
        >
          {post.title}
        </h2>
      </Link>
      {post.description && (
        <p className={`text-slate-600 dark:text-slate-300`}>
          {post.description}
        </p>
      )}
      <div className={`text-slate-500 dark:text-slate-500`}>Juntao Qiu • {format(post.date, "MM/dd/yyyy")}</div>
    </article>
  );
};

export { PostCard };
