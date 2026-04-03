import Link from "next/link";
import React from "react";
import type { Post } from "content-collections";
import { format, formatDistanceToNow } from "date-fns";
import { HiArrowRight } from "react-icons/hi2";

const PostCard = ({ post }: { post: Post }) => {
  const postDate = new Date(post.date);
  const isRecent = Date.now() - postDate.getTime() < 7 * 24 * 60 * 60 * 1000; // 7 days
  const dateDisplay = isRecent
    ? `${formatDistanceToNow(postDate, { addSuffix: true })}`
    : format(postDate, "MMM dd, yyyy");

  return (
    <article
      key={post._meta.path}
      className="group border-b border-slate-200/80 py-10 last:border-b-0 dark:border-slate-700/80"
    >
      <Link
        href={post.slug}
        className="no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 rounded-sm"
      >
        <h2 className="font-heading my-0 inline-flex max-w-full flex-wrap items-baseline gap-x-2 text-xl font-semibold tracking-tight text-palette-azure transition-colors duration-200 group-hover:text-slate-900 dark:text-sky-300 dark:group-hover:text-white sm:text-2xl">
          <span>{post.title}</span>
          <HiArrowRight
            className="inline-block size-5 shrink-0 translate-y-0.5 text-palette-azure/70 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-900 dark:text-sky-300/70 dark:group-hover:text-white sm:size-6"
            aria-hidden
          />
        </h2>
      </Link>
      {post.description && (
        <p className="mt-3 max-w-3xl text-base font-normal leading-relaxed text-slate-500 dark:text-slate-400">
          {post.description}
        </p>
      )}
      <div className="mt-3 text-sm font-normal text-slate-400 dark:text-slate-500">
        Juntao Qiu • {dateDisplay}
      </div>
    </article>
  );
};

export { PostCard };
