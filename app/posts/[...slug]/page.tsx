import { notFound } from "next/navigation";
import { allPosts } from "content-collections";

import { Metadata } from "next";
import { Mdx } from "@/components/supporting/mdx-components";
import { formatRelative } from "date-fns";
import React from "react";
import { Subscribe } from "@/components/design-system/subscribe";
import readingDuration from "reading-duration";
import { SocialMediaSharing } from "@/components/post/social-media-sharing";
import { AuthorInfo } from "@/components/post/author-info";
import { TOC } from "@/components/post/toc";
import { proseShell } from "@/lib/prose-classes";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    return null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const { description, title, date, cover } = post;

  const ogImage = {
    url: cover,
  };

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: `/posts/${params.slug}`,
      title,
      description,
      publishedTime: date,
      images: [ogImage],
    },
    twitter: {
      title,
      description,
      images: ogImage,
      card: "summary_large_image",
    },
    robots: "index, follow",
    metadataBase: new URL("https://icodeit.com.au"),
  };
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }));
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);
  if (!post) {
    notFound();
  }

  const readingTime = readingDuration(post.body.code, {
    wordsPerMinute: 200,
    emoji: false,
  });

  return (
    <div className="relative flex w-full min-w-0 flex-col gap-6 md:flex-row lg:flex-row">
      <article
        className={`max-w-sm flex-shrink overflow-x-auto py-12 md:max-w-3xl lg:max-w-4xl lg:flex-shrink-0 w-full min-w-0 ${proseShell}`}
      >
        <time
          dateTime={post.date}
          className={`text-sm text-slate-700 dark:text-slate-400`}
        >
          {formatRelative(post.date, new Date())}
        </time>
        <h1 className="font-heading my-10 text-3xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-50 sm:text-4xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-lg font-light italic mt-0 text-slate-700 dark:text-slate-200">
            {post.description}
          </p>
        )}

        <AuthorInfo duration={readingTime} />

        <hr className="my-8" />

        {await Mdx({ code: post.body.code })}

        <SocialMediaSharing post={post} />
        <Subscribe />
      </article>
      <TOC post={post} />
    </div>
  );
}
