import React from "react";
import { HiMail } from "react-icons/hi";

export const Subscribe = () => {
  return (
    <section
      className="not-prose my-12 rounded-lg border border-slate-200/90 bg-gradient-to-br from-slate-50 to-slate-100/80 p-6 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800/80"
      aria-labelledby="subscribe-heading"
    >
      <h2
        id="subscribe-heading"
        className="font-heading text-lg font-semibold text-slate-900 dark:text-slate-50"
      >
        Subscribe
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Get new posts and tutorials in your inbox via the newsletter.
      </p>
      <a
        href="https://juntao.substack.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-brand/50 transition-all hover:bg-brand/90 hover:shadow-md dark:bg-white/90 dark:text-brand dark:ring-slate-200/70 dark:hover:bg-white"
      >
        <HiMail className="h-4 w-4 text-white/90 dark:text-brand cta-icon-breathe" />
        <span>Subscribe</span>
      </a>
    </section>
  );
};
