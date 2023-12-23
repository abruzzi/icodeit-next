import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { InfoBox } from "@/components/mdx/info-box";
import { Product } from "@/components/mdx/product";
import { Challenge } from "@/components/mdx/challenge";

const components = {
  Image,
  InfoBox,
  Product,
  Challenge,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
