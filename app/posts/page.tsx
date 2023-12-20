import {allPosts} from "@/.contentlayer/generated";
import Link from "next/link";

import {Inter, Merriweather} from "next/font/google";
import React from "react";

import {compareDesc} from "date-fns";
import {Subscribe} from "@/components/subscribe";

const merriweather = Merriweather({weight: "400", subsets: ["latin"]});
const inter = Inter({weight: "400", subsets: ["latin"]});

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
      "I Code It is focusing on maintainable React code and masterful use of frontend technologies like Refactoring and Test-Driven Development.",
    url: "https://icodeit.com.au",
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
    url: "https://icodeit.com.au",
    creator: "@JuntaoQiu",
    image: "/juntao.qiu.avatar.png", // Replace with the actual Twitter image URL
  },
  charSet: "UTF-8",
  robots: "index, follow",
  metadataBase: new URL("https://icodeit.com.au"),
};


export default function Posts() {
  return (
    <div className="max-w-4xl py-6 mx-auto prose dark:prose-invert">
      <h1 className={`py-6`}>All Articles</h1>

      <p>
        In this blog, I share insights on software development, focusing on design principles and patterns to address
        complex business challenges. Topics like refactoring, test-driven development, and pair programming are covered,
        emphasizing how they contribute to more maintainable and enjoyable coding practices.
      </p>

      <p>
        Software development is an intellectually stimulating journey. It&apos;s rewarding to overcome challenges and
        achieve
        a deep sense of satisfaction. This blog is where I document these enriching experiences, hoping to inspire and
        engage fellow enthusiasts in the art of coding.
      </p>

      <hr />

      {allPosts
        .sort((a, b) => compareDesc(a.date, b.date))
        .map((post) => (
          <article key={post._id}>
            <Link href={post.slug} className={`no-underline`}>
              <h3 className={`${merriweather.className}`}>{post.title}</h3>
            </Link>
            {post.description && <p className={`text-slate-600 dark:text-slate-300`}>{post.description}</p>}
          </article>
        ))}

      <Subscribe/>
    </div>
  );
}
