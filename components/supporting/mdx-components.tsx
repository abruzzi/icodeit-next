import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { InfoBox } from "@/components/mdx/info-box";
import { Product } from "@/components/mdx/product";
import { Challenge } from "@/components/mdx/challenge";
import { Pre } from "@/components/mdx/code/pre";
import { Quiz } from "@/components/mdx/quiz";
import YouTube from "@/components/mdx/youtube";

const components = {
  img: (props: any) => {
    return (
      <figure
        className={`rounded p-2 border border-slate-100 dark:border-slate-700`}
      >
        <Image className={`m-auto`} alt={props.alt} {...props} />
        <figcaption className={`text-center italic`}>{props.alt}</figcaption>
      </figure>
    );
  },
  YouTube,
  InfoBox,
  Product,
  Challenge,
  pre: Pre,
  Quiz,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
