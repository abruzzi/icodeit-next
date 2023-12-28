import { allChapters, allTutorials } from "@/.contentlayer/generated";

import React from "react";

import { Subscribe } from "@/components/subscribe";
import { ChapterCard } from "@/components/chapter-card";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface TutorialProps {
  params: {
    tslug: string;
  };
}

async function getTutorialFromParams(params: TutorialProps["params"]) {
  const slug = `${params?.tslug}`;

  const tutorial = allTutorials.find(
    (tutorial) => tutorial.slugAsParams === slug
  );

  if (!tutorial) {
    return null;
  }

  return tutorial;
}

async function getChaptersFromParams(params: TutorialProps["params"]) {
  const slug = `${params?.tslug}`;
  const chapters = allChapters.filter(
    (chapter) => chapter.slugAsParams.split("/")[0] === slug
  );

  if (!chapters) {
    return null;
  }

  return chapters;
}

export async function generateStaticParams(): Promise<
  TutorialProps["params"][]
> {
  return allChapters.map((chapter) => {
    let slugs = chapter.slugAsParams.split("/");
    return {
      tslug: slugs[0],
    };
  });
}

export async function generateMetadata({
  params,
}: TutorialProps): Promise<Metadata> {
  const tutorial = await getTutorialFromParams(params);

  if (!tutorial) {
    return {};
  }

  const { description, title, date, cover } = tutorial;

  const ogImage = {
    url: cover ?? "/products/courses/maintainable-react-udemy.png",
  };

  return {
    title,
    description,
    openGraph: {
      type: "article",
      url: `/tutorials/${params?.tslug}`,
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

export default async function Tutorial({ params }: TutorialProps) {
  const chapters = await getChaptersFromParams(params);

  if (!chapters) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
      <h1 className={`py-6`}>Chapters</h1>

      <hr />

      {chapters
        .sort((a, b) => a.order - b.order)
        .map((chapter) => (
          <ChapterCard key={chapter._id} chapter={chapter} />
        ))}

      <Subscribe />
    </div>
  );
}
