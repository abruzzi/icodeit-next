import { notFound } from "next/navigation";
import { allChapters } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/supporting/mdx-components";
import { Merriweather } from "next/font/google";

import { formatRelative } from "date-fns";
import Image from "next/image";
import React from "react";
import { Subscribe } from "@/components/subscribe";
import readingDuration from "reading-duration";
import { SocialMediaSharing } from "@/components/social-media-sharing";
import Link from "next/link";
import {GrNext, GrPrevious} from "react-icons/gr";
import {Navigation} from "@/components/navigation";

interface ChapterProps {
  params: {
    tslug: string;
    cslug: string;
  };
}

async function getChapterFromParams(params: ChapterProps["params"]) {
  const slug = `${params?.tslug}/${params?.cslug}`;
  const chapter = allChapters.find((post) => post.slugAsParams === slug);

  if (!chapter) {
    null;
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
    url: cover,
  };

  return {
    title,
    description,
    // openGraph: {
    //   type: "article",
    //   url: `/posts/${params.slug}`,
    //   title,
    //   description,
    //   publishedTime: date,
    //   images: [ogImage],
    // },
    // twitter: {
    //   title,
    //   description,
    //   images: ogImage,
    //   card: "summary_large_image",
    // },
    // robots: "index, follow",
    // metadataBase: new URL("https://icodeit.com.au"),
  };
}

export async function generateStaticParams(): Promise<
  ChapterProps["params"][]
> {
  return allChapters.map((chapter) => {
    let slugs = chapter.slugAsParams.split("/");
    return {
      tslug: slugs[0],
      cslug: slugs[1],
    };
  });
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

export default async function Chapter({ params }: ChapterProps) {
  const chapter = await getChapterFromParams(params);

  if (!chapter) {
    notFound();
  }

  const readingTime = readingDuration(chapter.body.code, {
    wordsPerMinute: 200,
    emoji: false,
  });

  return (
    <article className="relative max-w-4xl py-16 prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
      <time
        dateTime={chapter.date}
        className={`text-sm text-slate-700 dark:text-slate-400`}
      >
        {formatRelative(chapter.date, new Date())}
      </time>
      <h1 className={`my-10 ${merriweather.className}`}>{chapter.title}</h1>
      {chapter.description && (
        <p className="text-lg font-light italic mt-0 text-slate-700 dark:text-slate-200">
          {chapter.description}
        </p>
      )}

      <AuthorInfo duration={readingTime} />

      <hr className="my-8" />

      <Navigation chapter={chapter} />

      <Mdx code={chapter.body.code} />

      <Navigation chapter={chapter} />

      <Subscribe />
    </article>
  );
}
