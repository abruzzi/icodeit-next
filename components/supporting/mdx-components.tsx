import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { InfoBox } from "@/components/mdx/info-box";
import { Product } from "@/components/mdx/product";
import { Challenge } from "@/components/mdx/challenge";
import { Pre } from "@/components/code/pre";

const components = {
  img: (props: any) => {
    return (
      <figure>
        <Image {...props} />
        <figcaption className={`text-center italic`}>{props.alt}</figcaption>
      </figure>
    );
  },
  InfoBox,
  Product,
  Challenge,
  pre: Pre,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
