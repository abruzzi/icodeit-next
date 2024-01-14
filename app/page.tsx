import React from "react";

import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

import { compareDesc } from "date-fns";
import { SubTitle } from "@/components/design-system/sub-title";
import { PostCard } from "@/components/design-system/post-card";
import { AboutMe } from "@/components/design-system/about-me";
import { Product } from "@/components/mdx/product";
import { Subscribe } from "@/components/design-system/subscribe";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto prose dark:prose-invert text-base">
      <AboutMe />

      <hr />

      <SubTitle content="Books" />

      <Product
        link="https://www.amazon.com/React-Anti-Patterns-maintainable-applications-test-driven/dp/1805123971"
        cover="/products/books/react-anti-patterns-cover.jpg"
        title="React Anti-Patterns"
        learnMoreLink="https://www.icodeit.com.au/react-anti-patterns"
        categories={["new", "intermediate"]}
      >
        <p>
          Take your React development skills to the next level by examining
          common anti-patterns with expert insights and practical solutions, to
          refine your codebases into sophisticated and scalable creations.
          Through this easy-to-follow guide, React Anti-Patterns serves as a
          roadmap to elevating the efficiency and maintainability of your React
          projects.
        </p>
      </Product>

      <Product
        link="https://www.amazon.com/Test-Driven-Development-React-TypeScript-Maintainable/dp/1484296478/"
        cover="/products/books/atdd-2nd.png"
        title="Test-Driven Development with React and TypeScript"
        learnMoreLink="https://www.icodeit.com.au/posts/the-2nd-edition-of-atdd"
        categories={["intermediate"]}
      >
        <p>
          Apply Test-Driven principles to create scalable and maintainable React
          applications. This book covers a wide range of topics, including
          setting up a testing environment and utilizing popular testing
          frameworks like <b>Cypress</b>,<b>Jest</b>, and the React Testing
          Library. It also delves into valuable <b>refactoring</b> techniques,
          as well as enhancing code maintainability and readability.
        </p>
      </Product>

      <hr />

      <SubTitle content="Recent Articles" />

      {allPosts
        .sort((a, b) => compareDesc(a.date, b.date))
        .slice(0, 5)
        .map((post) => (
          <PostCard post={post} key={post._id} />
        ))}

      <Link
        href="/posts"
        className={`no-underline border p-2 rounded border-slate-100 dark:border-slate-700`}
      >
        Read more...
      </Link>

      <Subscribe />
    </div>
  );
}
