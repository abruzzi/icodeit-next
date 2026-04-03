import { notFound } from "next/navigation";
import { Metadata } from "next";
import { allPages } from "content-collections";
import type { Page } from "content-collections";

import { Mdx } from "@/components/supporting/mdx-components";
import { Subscribe } from "@/components/design-system/subscribe";
import React from "react";
import { proseShell } from "@/lib/prose-classes";

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
    <article className={proseShell}>
      <h1 className={`py-6`}>{page.title}</h1>
      {page.description && <p className={`font-light`}>{page.description}</p>}
      <hr />
      {await Mdx({ code: page.body.code })}
      <Subscribe />
    </article>
  );
}
