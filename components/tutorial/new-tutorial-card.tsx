import React from "react";
import Image from "next/image";

import type { Tutorial } from "content-collections";
import { Merriweather } from "next/font/google";
import Link from "next/link";

const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });

type TokenType = "beginner" | "intermediate" | "advanced";

const tokenColor = (type: TokenType) => {
  switch (type) {
    case "beginner": {
      return "bg-green-600 text-green-100";
    }
    case "intermediate": {
      return "bg-orange-600 text-orange-100";
    }
    case "advanced": {
      return "bg-brand text-white";
    }
  }
};

const Token = ({ type, content }: { type: TokenType; content: string }) => {
  return (
    <span
      className={`text-xs font-light rounded py-0.5 px-1 uppercase ${tokenColor(type)}`}
    >
      {content}
    </span>
  );
};

const NewTutorialCard = ({ tutorial }: { tutorial: Tutorial }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="flex flex-col rounded-lg bg-white text-slate-800 shadow-lg overflow-hidden h-full dark:bg-slate-800 dark:text-slate-100">
        <Link href={tutorial.slug} className={`no-underline`}>
          <div className="w-full h-40 overflow-hidden">
            <Image
              src={`${tutorial.cover}`}
              width={320}
              height={160}
              alt="Tutorial Cover"
              className="w-full h-full m-0 p-0 object-cover object-center"
            />
          </div>

          <div className="p-4 flex-grow">
            <h3
              className={`${merriweather.className} m-0 text-lg font-semibold text-slate-900 dark:text-slate-50`}
            >
              {tutorial.title}
            </h3>
            <p className="m-0 py-2 text-xs font-light leading-relaxed text-slate-600 dark:text-slate-300">
              {tutorial.description}
            </p>
            <Token
              content={tutorial.level}
              type={tutorial.level as TokenType}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export { NewTutorialCard };
