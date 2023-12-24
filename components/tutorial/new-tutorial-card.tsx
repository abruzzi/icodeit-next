import React from "react";
import Image from "next/image";

import { Tutorial } from "contentlayer/generated";
import { Merriweather } from "next/font/google";
import Link from "next/link";

const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });

type TokenType = "beginner" | "intermediate" | "advanced";

const tokenColor = (type: TokenType) => {
  switch (type) {
    case "beginner": {
      return "green";
    }
    case "intermediate": {
      return "orange";
    }
    case "advanced": {
      return "brand";
    }
  }
};

const Token = ({ type, content }: { type: TokenType; content: string }) => {
  return (
    <span
      className={`text-xs font-light rounded  py-0.5 px-1 uppercase bg-${tokenColor(
        type
      )}-600 text-${tokenColor(type)}-100`}
    >
      {content}
    </span>
  );
};

const NewTutorialCard = ({ tutorial }: { tutorial: Tutorial }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-2 mb-4">
      <div className="flex flex-col bg-white text-slate-800 dark:bg-slate-700 dark:text-slate-100 rounded-lg shadow-lg overflow-hidden h-full">
        <Link href={tutorial.slug} className={`no-underline`}>
          <div className="w-full h-40 overflow-hidden">
            <Image
              src={"/products/courses/maintainable-react-udemy.png"}
              width={320}
              height={160}
              alt="Tutorial Cover"
              className="w-full h-full m-0 p-0 object-cover object-center"
            />
          </div>

          <div className="p-2 flex-grow">
            <h3
              className={`${merriweather.className} font-semibold text-lg m-0`}
            >
              {tutorial.title}
            </h3>
            <p className={`text-xs font-light py-2 m-0`}>
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
