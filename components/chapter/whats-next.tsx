import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import React from "react";
import type { Chapter, Tutorial } from "content-collections";
import { Product } from "@/components/mdx/product";

type ProductType = {
  title: string;
  cover: string;
  link: string;
  description: string;
};

const RelatedBook = ({ title, cover, link, description }: ProductType) => {
  return (
    <>
      <hr />
      <Product link={link} cover={cover} title={title} categories={[]}>
        <p>{description}</p>
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
        className={`no-underline w-full md:w-52 inline-block mt-2 bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-800 px-4 py-2 rounded-lg saturate-50 hover:saturate-100 hover:shadow-lg transition-all duration-200`}
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
  tutorial,
}: {
  chapter: Chapter;
  tutorial: Tutorial;
}) {
  if (!next) {
    return (
      <RelatedBook
        title={tutorial.relatedProductTitle}
        cover={tutorial.relatedProductCover}
        link={tutorial.relatedProductLink}
        description={tutorial.relatedProductDescription}
      />
    );
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
