import React from "react";

import { notFound } from "next/navigation";

import { allChapters, allTutorials } from "contentlayer/generated";
import { Metadata } from "next";
import { Mdx } from "@/components/supporting/mdx-components";
import { Subscribe } from "@/components/design-system/subscribe";
import { ChapterHeader } from "@/components/chapter/chapter-header";
import { Highlight } from "@/components/chapter/highlight";
import { WhatsNext } from "@/components/chapter/whats-next";
import { Summary } from "@/components/chapter/summary";
import { Outline } from "@/components/tutorial/outline";
import { ChapterBreadcrumbs } from "@/components/chapter/breadcrumbs";

interface ChapterProps {
  params: {
    slugs: string[];
    tslug: string;
    cslug: string;
  };
}

async function getAllChaptersInCurrentTutorial(tutorialId: string) {
  const chapters = allChapters.filter((chapter) => {
    return chapter.tutorialId === tutorialId;
  });

  if (chapters.length === 0) {
    return null;
  }

  return chapters;
}

async function getTutorialFromParams(tutorialId: string) {
  return allTutorials.find((t) => t.tutorialId === tutorialId);
}

async function getChapterFromParams(params: ChapterProps["params"]) {
  const slug = `${params?.tslug}/${params?.cslug}`;
  const chapter = allChapters.find((chapter) => chapter.slugAsParams === slug);

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
    url: cover ?? "/products/courses/maintainable-react-udemy.png",
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

  const others = await getAllChaptersInCurrentTutorial(chapter.tutorialId);
  const tutorial = await getTutorialFromParams(chapter.tutorialId);

  return (
    <>
      <div className={`relative max-w-4xl`}>
        <ChapterBreadcrumbs tutorial={tutorial} chapter={chapter} />
        <Outline chapters={others} />
      </div>

      <article className="relative max-w-4xl py-16 prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
        <ChapterHeader chapter={chapter} />

        <Highlight chapter={chapter} />

        <hr />

        <Mdx code={chapter.body.code} />

        <Summary chapter={chapter} />

        <WhatsNext chapter={chapter} />

        <Subscribe />
      </article>
    </>
  );
}
