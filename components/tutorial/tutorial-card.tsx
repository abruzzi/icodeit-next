import React from "react";
import { Tutorial } from "contentlayer/generated";
import Link from "next/link";
import {format} from "date-fns";
import {Merriweather} from "next/font/google";

const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });

const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => {
  return (
    <article>
      <Link href={tutorial.slug} className={`no-underline`}>
        <h2 className={`${merriweather.className} my-2 hover:text-brand transition-colors duration-2`}>
          {tutorial.title}
        </h2>
      </Link>
      {tutorial.description && (
        <p className={`text-slate-600 dark:text-slate-300`}>
          {tutorial.description}
        </p>
      )}
      <div className={`text-slate-500 dark:text-slate-500`}>Juntao Qiu • {format(tutorial.date, "MM/dd/yyyy")}</div>
    </article>
  );
};


export { TutorialCard };
