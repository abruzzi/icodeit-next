import Link from "next/link";
import { GrNext, GrPrevious } from "react-icons/gr";
import React from "react";
import { Chapter } from "contentlayer/generated";

const Navigation = ({ chapter }: { chapter: Chapter }) => {
  return (
    <div className={`flex flex-row items-center justify-center`}>
      {chapter.prev && (
        <Link
          className={`mr-auto hover:text-brand transition-colors duration-200`}
          href={`${chapter.slug.split("/").slice(0, -1).join("/")}/${
            chapter.prev
          }`}
        >
          <GrPrevious size={32} />
        </Link>
      )}

      {chapter.next && (
        <Link
          className={`ml-auto hover:text-brand transition-colors duration-200`}
          href={`${chapter.slug.split("/").slice(0, -1).join("/")}/${
            chapter.next
          }`}
        >
          <GrNext size={32} />
        </Link>
      )}
    </div>
  );
};

export { Navigation };
