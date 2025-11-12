import React from "react";

import { allPosts } from "content-collections";

import { compareDesc } from "date-fns";
import { Subscribe } from "@/components/design-system/subscribe";
import { PostCard } from "@/components/design-system/post-card";

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

export default function Posts() {
  return (
    <div className="max-w-4xl mx-auto prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
      <h1 className={`py-6`}>All Articles</h1>

      <p className={`font-light`}>
        In this blog, I share insights on software development, focusing on
        design principles and patterns to address complex business challenges.
        Topics like refactoring, test-driven development, and pair programming
        are covered, emphasizing how they contribute to more maintainable and
        enjoyable coding practices.
      </p>

      <p className={`font-light`}>
        Software development is an intellectually stimulating journey. It&apos;s
        rewarding to overcome challenges and achieve a deep sense of
        satisfaction. This blog is where I document these enriching experiences,
        hoping to inspire and engage fellow enthusiasts in the art of coding.
      </p>

      <hr />

      {allPosts
        .filter(a => !a.external)
        .sort((a, b) => compareDesc(a.date, b.date))
        .map((post) => (
          <PostCard post={post} key={post._meta.path} />
        ))}

      <Subscribe />
    </div>
  );
}
