import React from "react";

import { notFound } from "next/navigation";

import { allChapters } from "contentlayer/generated";
import { Metadata } from "next";
import { Mdx } from "@/components/supporting/mdx-components";
import { Subscribe } from "@/components/subscribe";
import { ChapterHeader } from "@/components/chapter/chapter-header";
import { Highlight } from "@/components/chapter/highlight";
import { WhatsNext } from "@/components/chapter/whats-next";
import { Summary } from "@/components/chapter/summary";

interface ChapterProps {
  params: {
    slugs: string[];
    tslug: string;
    cslug: string;
  };
}

async function getChapterFromParams(params: ChapterProps["params"]) {
  const slug = `${params?.tslug}/${params?.cslug}`;
  const chapter = allChapters.find((post) => post.slugAsParams === slug);

  if (!chapter) {
    return null;
  }

  return chapter;
}

export async function generateMetadata({
  params,
}: ChapterProps): Promise<Metadata> {
  const chapter = await getChapterFromParams(params);

  if (!chapter) {
    return {};
  }

  const { description, title, date, cover } = chapter;

  const ogImage = {
    url: cover ?? '/products/courses/maintainable-react-udemy.png',
  };

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: `/posts/${params?.tslug}/${params?.cslug}`,
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

export async function generateStaticParams(): Promise<
  ChapterProps["params"][]
> {
  return allChapters.map((chapter) => {
    let slugs = chapter.slugAsParams.split("/");
    return {
      slugs: slugs,
      tslug: slugs[0],
      cslug: slugs[1],
    };
  });
}

export default async function Chapter({ params }: ChapterProps) {
  const chapter = await getChapterFromParams(params);

  if (!chapter) {
    notFound();
  }

  return (
    <article className="relative max-w-4xl py-16 prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
      <ChapterHeader chapter={chapter} />

      <Highlight chapter={chapter} />

      <hr />

      <Mdx code={chapter.body.code} />

      <Summary chapter={chapter} />

      <WhatsNext chapter={chapter} />

      <Subscribe />
    </article>
  );
}
