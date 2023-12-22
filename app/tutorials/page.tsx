import { allTutorials } from "@/.contentlayer/generated";

import React from "react";

import { compareDesc } from "date-fns";
import { Subscribe } from "@/components/subscribe";
import Link from "next/link";
import { TutorialCard } from "@/components/tutorial-card";

export const metadata = {
  title: "I Code It",
  description:
    "I Code It is focusing on maintainable React code and masterful use of frontend technologies like Refactoring and Test-Driven Development.",
  keywords:
    "Software Engineering, Developer growth, Maintainable React, React, Test-Driven Development, Frontend development, coding best practices, software design patterns, I Code It",
  author: "Juntao Qiu",
  canonical: "https://icodeit.com.au",
  openGraph: {
    title: "I Code It",
    description:
      "In this blog, I share insights on software development, focusing on design principles and patterns to address\n" +
      "        complex business challenges. Topics like refactoring, test-driven development, and pair programming are covered,\n" +
      "        emphasizing how they contribute to more maintainable and enjoyable coding practices.",
    url: "https://icodeit.com.au/posts",
    // @ts-ignore
    type: "website",
    image: "/juntao.qiu.avatar.png", // Replace with the actual image URL
  },
  twitter: {
    // @ts-ignore
    card: "summary_large_image",
    title:
      "Juntao Qiu - I help developers write better code. Developer, Author, Creator.",
    description:
      "Discover ways to grow as a developer with Juntao Qiu. Learn about writing maintainable, efficient code at I Code It.",
    url: "https://icodeit.com.au/posts",
    creator: "@JuntaoQiu",
    image: "/juntao.qiu.avatar.png", // Replace with the actual Twitter image URL
  },
  charSet: "UTF-8",
  robots: "index, follow",
  metadataBase: new URL("https://icodeit.com.au"),
};

export default function Tutorials() {
  return (
    <div className="max-w-4xl py-16 mx-auto prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
      <h1 className={`py-6`}>All Tutorials</h1>

      <p className={`font-light`}>
        In certain scenarios, a detailed, step-by-step guide is essential for
        implementing projects, whether big or small, from scratch. These
        comprehensive tutorials, which I have developed, cover various aspects
        of Web Development. Ranging from basic fundamentals to advanced topics,
        these tutorials are designed to be beneficial as you actively follow and
        apply them.
      </p>

      <hr />

      {allTutorials
        .sort((a, b) => compareDesc(a.date, b.date))
        .map((tutorial) => (
          <TutorialCard tutorial={tutorial} key={tutorial._id} />
        ))}

      <Subscribe />
    </div>
  );
}
