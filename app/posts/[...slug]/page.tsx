import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";
import { Merriweather } from "next/font/google";

import { formatRelative } from "date-fns";

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

export default async function PostPage({ params }: PostProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl py-6 prose dark:prose-invert text-lg">
      <h1 className={`my-10 ${merriweather.className}`}>{post.title}</h1>
      {post.description && (
        <p className="text-xl italic mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <time dateTime={post.date}>{formatRelative(post.date, new Date())}</time>
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  );
}
