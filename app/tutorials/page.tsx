import { allTutorials } from "@/.contentlayer/generated";

import React from "react";

import { compareDesc } from "date-fns";
import { Subscribe } from "@/components/design-system/subscribe";
import { TutorialCard } from "@/components/tutorial/tutorial-card";
import { NewTutorialCard } from "@/components/tutorial/new-tutorial-card";

export const metadata = {
  title: "I Code It - Elevate Your Web Development Skills",
  description:
    "Dive into our rich library of web development tutorials at I Code It. Covering everything from the basics to advanced techniques, our step-by-step guides are tailored for developers of all levels. Sharpen your skills and confidently take on diverse projects with practical, real-world knowledge.",
  keywords:
    "Web Development Tutorials, React Best Practices, Test-Driven Development, Advanced Frontend Techniques, Software Engineering Skills, Effective Coding, React Tutorials, Developer Skill Enhancement",
  author: "Juntao Qiu",
  canonical: "https://icodeit.com.au",
  openGraph: {
    title: "I Code It - Web Development Mastery",
    description:
      "Embark on a journey to mastering web development with I Code It. From fundamental concepts to cutting-edge techniques, our tutorials provide actionable insights for developers eager to excel in their craft.",
    url: "https://icodeit.com.au/tutorials",
    // @ts-ignore
    type: "website",
    image: "/products/courses/maintainable-react-udemy.png", // Replace with the actual image URL
  },
  twitter: {
    // @ts-ignore
    card: "summary_large_image",
    title: "Juntao Qiu - Guiding Developers to Excellence",
    description:
      "Join Juntao Qiu at I Code It and transform your coding skills. Explore our extensive tutorials for practical, efficient, and maintainable software development.",
    url: "https://icodeit.com.au/posts",
    creator: "@JuntaoQiu",
    image: "/products/courses/maintainable-react-udemy.png", // Replace with the actual Twitter image URL
  },
  charSet: "UTF-8",
  robots: "index, follow",
  metadataBase: new URL("https://icodeit.com.au"),
};

export default function Tutorials() {
  return (
    <div className="max-w-4xl mx-auto prose dark:prose-invert font-normal dark:font-light text-slate-800 dark:text-slate-300">
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

      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-2">
          {allTutorials
            .sort((a, b) => compareDesc(a.date, b.date))
            .map((tutorial) => (
              <NewTutorialCard tutorial={tutorial} key={tutorial._id} />
            ))}
        </div>
      </div>

      <Subscribe />
    </div>
  );
}
