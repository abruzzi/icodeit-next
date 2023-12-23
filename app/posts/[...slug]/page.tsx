import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/supporting/mdx-components";
import { Merriweather } from "next/font/google";

import { formatRelative } from "date-fns";
import React from "react";
import { Subscribe } from "@/components/subscribe";
import readingDuration from "reading-duration";
import { SocialMediaSharing } from "@/components/social-media-sharing";
import { AuthorInfo } from "@/components/author-info";
import { TOC } from "@/components/toc";

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

const merriweather = Merriweather({
  weight: "400",
  subsets: ["latin"],
});

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
    <>
      <article className="max-w-sm md:max-w-3xl lg:max-w-4xl py-16 prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
        <time
          dateTime={post.date}
          className={`text-sm text-slate-700 dark:text-slate-400`}
        >
          {formatRelative(post.date, new Date())}
        </time>
        <h1 className={`my-10 ${merriweather.className}`}>{post.title}</h1>
        {post.description && (
          <p className="text-lg font-light italic mt-0 text-slate-700 dark:text-slate-200">
            {post.description}
          </p>
        )}

        <AuthorInfo duration={readingTime} />

        <hr className="my-8" />

        <Mdx code={post.body.code} />

        <SocialMediaSharing post={post} />
        <Subscribe />
      </article>
      <TOC post={post} />
    </>
  );
}
