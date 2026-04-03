import React from "react";
import Image from "next/image";
import { HiMail } from "react-icons/hi";

const AboutMe = () => {
  return (
    <div className="flex flex-col gap-8 py-8 text-left sm:flex-row sm:items-end sm:gap-10 md:py-12">
      <div className="min-w-0 flex-1 text-base leading-relaxed">
        <p className="mb-4 text-lg text-slate-600 dark:text-slate-400">
          Welcome, I am Juntao — Engineer, Educator, Creator.
        </p>

        <h1 className="font-heading mb-6 text-3xl font-extrabold tracking-tighter text-slate-900 dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Helping developers design and build software
        </h1>

        <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          By breaking complexity into structure and guiding the building process with
          intention — even when AI is involved.
        </p>

        <a
          href="https://juntao.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white/90 px-6 py-3 text-base font-semibold text-brand shadow-sm ring-1 ring-slate-200/90 transition-all hover:bg-white hover:shadow-md dark:bg-slate-800/90 dark:text-slate-50 dark:ring-slate-600/50 dark:hover:bg-slate-800 md:w-auto"
        >
          <HiMail className="h-4 w-4 text-palette-azure cta-icon-breathe" />
          <span>Subscribe</span>
        </a>
      </div>
      <div className="mx-auto w-28 shrink-0 sm:mx-0 md:w-36">
        <Image
          src="/juntao.qiu.avatar.webp"
          width={144}
          height={144}
          alt="Juntao Qiu"
          priority
          className="m-0 rounded-3xl object-cover shadow-lg ring-1 ring-slate-200/80 dark:ring-slate-700/80"
        />
      </div>
    </div>
  );
};

export { AboutMe };
