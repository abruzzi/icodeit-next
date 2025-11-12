import Link from "next/link";
import React from "react";
import type { Post } from "content-collections";
import { Merriweather } from "next/font/google";
import { format, formatDistanceToNow } from "date-fns";

const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });

const PostCard = ({ post }: { post: Post }) => {
  const postDate = new Date(post.date);
  const isRecent = Date.now() - postDate.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
  const dateDisplay = isRecent 
    ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
    : format(postDate, "MMM dd, yyyy");

  return (
    <article key={post._meta.path} className={`my-8 group`}>
      <Link href={post.slug} className={`no-underline`}>
        <h2
          className={`${merriweather.className} my-2 hover:text-brand transition-colors duration-200`}
        >
          {post.title}
        </h2>
      </Link>
      {post.description && (
        <p className={`text-slate-600 dark:text-slate-300 my-2`}>
          {post.description}
        </p>
      )}
      <div className={`text-slate-500 dark:text-slate-500 text-sm`}>
        Juntao Qiu • {dateDisplay}
      </div>
    </article>
  );
};

export { PostCard };
