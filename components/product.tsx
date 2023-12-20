import Image from "next/image";

type ProductType = {
  categories: string[];
  link: string;
  title: string;
  cover: string;
  description: string;
};

export const Product =
  ({
     link,
     title,
     cover,
     categories,
     description,
   }: ProductType) => {
    return (
      <div
        className="flex flex-col sm:flex-row items-center w-full sm:w-auto px-4 mx-auto rounded-xl space-x-4">
        <div className="flex-shrink-0">
          <Image
            className="w-44 max-w-none object-cover rounded"
            width={176}
            src={cover}
            alt={title}
          />
        </div>
        <div className="ml-6">
          <a
            href={link}
            target="_blank"
            className="mt-2 inline-block no-underline"
          >
            <h3
              className="flex items-center gap-x-2 text-xl font-semibold leading-tight hover:text-brand transition-colors duration-200">
              {categories.map((cat: string) => (
                <span
                  key={cat}
                  className="inline-block px-2 py-1 text-xs font-semibold uppercase rounded bg-slate-700 text-white mr-1"
                >
                {cat}
              </span>
              ))}
              {title}
            </h3>
          </a>

          <p className="text-base font-light">{description}</p>
        </div>
      </div>
    );
  };
