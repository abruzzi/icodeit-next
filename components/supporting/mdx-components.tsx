import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { InfoBox } from "@/components/mdx/info-box";
import { Product } from "@/components/mdx/product";

const components = {
  Image,
  InfoBox,
  Product,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return <Component components={components} />;
}
