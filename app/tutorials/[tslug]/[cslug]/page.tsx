import { notFound } from "next/navigation";
import { allChapters } from "contentlayer/generated";

import { Metadata } from "next";
import { Mdx } from "@/components/supporting/mdx-components";
import React from "react";
import { Subscribe } from "@/components/subscribe";
import readingDuration from "reading-duration";
import { Navigation } from "@/components/navigation";
import { ChapterHeader } from "@/components/chapter-header";
import { SlBadge } from "react-icons/sl";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { FaAngleRight, FaBookOpen } from "react-icons/fa6";
import Link from "next/link";
import { GrNext } from "react-icons/gr";
import { MdKeyboardArrowRight } from "react-icons/md";

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

  const readingTime = readingDuration(chapter.body.code, {
    wordsPerMinute: 200,
    emoji: false,
  });

  return (
    <article className="relative max-w-4xl py-16 prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
      <ChapterHeader chapter={chapter} />

      <div className={`py-4`}>
        <h2>In this chapter, you will learn</h2>
        {chapter.highlights.map((hl, index) => (
          <li key={index}>{hl}</li>
        ))}
      </div>

      <hr />

      <Mdx code={chapter.body.code} />

      <div className={`flex flex-col items-center my-12`}>
        <div
          aria-hidden="true"
          className={`w-[1px] m-auto h-20 md:h-40 bg-gradient-to-t from-transparent via-brand to-transparent`}
        ></div>
        <div
          className={`w-28 h-28 rounded-full flex items-center justify-center bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-500 text-4xl font-bold`}
        >
          {chapter.order === 1 ? (
            <FaBookOpen size={60} />
          ) : (
            <span>{chapter.order}</span>
          )}
        </div>

        <div className={`text-center`}>
          <h2 className={`text-3xl`}>
            {chapter.order === 1
              ? "Ready to get started?"
              : `You have Completed Chapter ${chapter.order}`}
          </h2>
          <p>{chapter.summary}</p>
        </div>
      </div>

      <div
        className={`max-w-lg m-auto my-8 md:my-16 border p-8 border-slate-700 dark:border-slate-600 rounded`}
      >
        <p className="text-base font-light m-0 text-slate-700 dark:text-slate-400">
          {chapter.leading}
        </p>

        {chapter.next && (
          <div className={`text-center mt-6 font-normal`}>
            <Link
              className={`no-underline w-full md:w-48 inline-block mt-2 bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-800 px-4 py-2 rounded-lg saturate-50 hover:saturate-100 hover:shadow-lg transition-all duration-200`}
              href={`${chapter.slug.split("/").slice(0, -1).join("/")}/${
                chapter.next
              }`}
            >
              <div className={`flex flex-row items-center gap-2`}>
                <span>Start chapter {chapter.order + 1}</span>
                <MdKeyboardArrowRight size={32} className={`ml-auto`} />
              </div>
            </Link>
          </div>
        )}
      </div>

      <Subscribe />
    </article>
  );
}
