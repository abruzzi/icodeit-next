import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/supporting/mdx-components";
import { Merriweather } from "next/font/google";

import { formatRelative } from "date-fns";
import Image from "next/image";
import React from "react";
import { Subscribe } from "@/components/subscribe";
import readingDuration from "reading-duration";

interface PostProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = allPosts.find((post) => post.slugAsParams === slug);

  if (!post) {
    null;
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

const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });

const Avatar = () => {
  return (
    <div className="w-12 h-12">
      <Image
        src="/juntao.qiu.avatar.png"
        width={48}
        height={48}
        alt="Juntao Qiu Avatar"
        className="m-0 rounded-full"
      />
    </div>
  );
};

const AuthorInfo = ({ duration }: { duration: string }) => {
  return (
    <div className={`flex flex-row items-center`}>
      <Avatar />
      <div className={`text-sm ml-2`}>
        <div>Juntao Qiu</div>
        <a
          className={`text-brand no-underline text-xs`}
          href="https://twitter.com/JuntaoQiu"
          target="_blank"
        >
          @JuntaoQiu
        </a>
      </div>

      <div className={`ml-auto text-sm text-slate-700 dark:text-slate-400`}>
        {duration}
      </div>
    </div>
  );
};

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
    <article className="max-w-4xl py-6 prose dark:prose-invert text-md sm:text-lg">
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

      <Subscribe />
    </article>
  );
}
