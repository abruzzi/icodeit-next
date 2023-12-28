import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import React from "react";
import { Chapter } from "contentlayer/generated";
import { Product } from "@/components/mdx/product";

const RelatedBook = () => {
  return (
    <>
      <hr />
      <Product
        link="https://leanpub.com/3webdesignsin3weeks"
        cover="/products/books/3-designs-in-3-weeks.png"
        title="3 Web Designs in 3 Weeks: Bringing Your Web Design To Life"
        categories={[]}
      >
        <p>
          I wrote the book eight years ago and found some of the content were
          outdated, and recently I decided to rewrite it with the modern (also
          the most compatible) techniques. Just like the first edition, it has
          all the interactive ways of teaching and the real-world-based design
          reproducing, but with the latest front-end knowledge.
        </p>
      </Product>
    </>
  );
};

const LinkButton = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className={`text-center mt-6 font-normal`}>
      <Link
        className={`no-underline w-full md:w-48 inline-block mt-2 bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-800 px-4 py-2 rounded-lg saturate-50 hover:saturate-100 hover:shadow-lg transition-all duration-200`}
        href={href}
      >
        <div className={`flex flex-row items-center gap-2`}>
          <span>{label}</span>
          {icon}
        </div>
      </Link>
    </div>
  );
};

export function WhatsNext({
  chapter: { leading, next, order, slug },
}: {
  chapter: Chapter;
}) {
  if (!next) {
    return <RelatedBook />;
  }

  return (
    <div
      className={`max-w-lg m-auto my-8 md:my-16 border p-8 border-slate-700 dark:border-slate-600 rounded`}
    >
      <p className="text-base font-light m-0 text-slate-700 dark:text-slate-400">
        {leading}
      </p>

      {next && (
        <LinkButton
          href={`${slug.split("/").slice(0, -1).join("/")}/${next}`}
          label={`Start chapter ${order + 1}`}
          icon={<MdKeyboardArrowRight size={32} className={`ml-auto`} />}
        />
      )}
    </div>
  );
}
