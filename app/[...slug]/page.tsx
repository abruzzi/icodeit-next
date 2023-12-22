import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allPages, Page } from "contentlayer/generated";

import { Mdx } from "@/components/supporting/mdx-components";
import { Subscribe } from "@/components/subscribe";
import React from "react";

interface PageProps {
  params: {
    slug: string[];
  };
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/");
  const page: Page | undefined = allPages.find(
    (page) => page.slugAsParams === slug
  );

  if (!page) {
    return null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPageFromParams(params);

  if (!post) {
    return {};
  }

  const { description, title, cover } = post;

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

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }));
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  return (
    <article className="max-w-sm md:max-w-3xl lg:max-w-4xl py-16 mx-auto prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
      <h1 className={`py-6`}>{page.title}</h1>
      {page.description && <p className={`font-light`}>{page.description}</p>}
      <hr />
      <Mdx code={page.body.code} />
      <Subscribe />
    </article>
  );
}
