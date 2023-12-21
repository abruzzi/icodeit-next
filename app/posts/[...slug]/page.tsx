import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/supporting/mdx-components";
import { Merriweather } from "next/font/google";

import { formatRelative } from "date-fns";
import Image from "next/image";
import React from "react";

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

  return {
    title: post.title,
    description: post.description,
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

const AuthorInfo = () => {
  return (
    <div className={`flex flex-row items-center`}>
      <Avatar />
      <div className={`text-sm ml-2`}>
        <div>Juntao Qiu</div>
        <a className={`text-brand no-underline text-xs`} href="https://twitter.com/JuntaoQiu" target="_blank">
          @JuntaoQiu
        </a>
      </div>
    </div>
  );
};

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl py-6 prose dark:prose-invert text-md sm:text-lg">
      <time dateTime={post.date}>{formatRelative(post.date, new Date())}</time>
      <h1 className={`my-10 ${merriweather.className}`}>{post.title}</h1>
      {post.description && (
        <p className="text-lg font-light italic mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <AuthorInfo />
      <hr className="my-8" />
      <Mdx code={post.body.code} />
    </article>
  );
}
