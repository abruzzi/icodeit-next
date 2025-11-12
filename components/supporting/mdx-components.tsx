import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { rehypePrettyCodeOptions } from "@/lib/rehype-pretty-code";
import { visit } from "unist-util-visit";
import { InfoBox } from "@/components/mdx/info-box";
import { Product } from "@/components/mdx/product";
import { Challenge } from "@/components/mdx/challenge";
import { Pre } from "@/components/mdx/code/pre";
import { Quiz } from "@/components/mdx/quiz";
import YouTube from "@/components/mdx/youtube";

const components = {
  img: (props: any) => {
    // If width/height are provided, use Next.js Image component
    if (props.width && props.height) {
      return (
        <span className="block my-4">
          <figure
            className={`rounded p-2 border border-slate-100 dark:border-slate-700`}
          >
            <Image className={`m-auto`} alt={props.alt || ""} {...props} />
            {props.alt && (
              <figcaption className={`text-center italic`}>{props.alt}</figcaption>
            )}
          </figure>
        </span>
      );
    }
    // Otherwise, use regular img tag for images without dimensions
    return (
      <span className="block my-4">
        <figure
          className={`rounded p-2 border border-slate-100 dark:border-slate-700`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={`m-auto max-w-full h-auto`} alt={props.alt || ""} {...props} />
          {props.alt && (
            <figcaption className={`text-center italic`}>{props.alt}</figcaption>
          )}
        </figure>
      </span>
    );
  },
  // Override paragraph component to unwrap images
  p: (props: any) => {
    // Check if this paragraph only contains an image
    if (props.children && typeof props.children === 'object' && props.children.type === 'img') {
      return <>{props.children}</>;
    }
    // Check if this paragraph contains an image as a child
    if (props.children && Array.isArray(props.children)) {
      const hasImage = props.children.some((child: any) => 
        child && typeof child === 'object' && (child.type === 'img' || child.props?.src)
      );
      if (hasImage) {
        return <div className="my-4">{props.children}</div>;
      }
    }
    return <p className="my-4">{props.children}</p>;
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

export async function Mdx({ code }: MdxProps) {
  // Rehype plugin to unwrap images from paragraphs
  const unwrapImagesFromParagraphs = () => {
    return (tree: any) => {
      visit(tree, { type: "element", tagName: "p" }, (node: any, index: number | undefined, parent: any) => {
        if (!parent || index === undefined) return;
        
        // Check if paragraph contains only an image
        const hasOnlyImage = node.children.length === 1 && 
          node.children[0].type === "element" && 
          node.children[0].tagName === "img";
        
        if (hasOnlyImage) {
          // Replace paragraph with the image directly
          parent.children[index] = node.children[0];
        }
      });
    };
  };

  // Plugin to add raw code to pre elements for copy button
  const addRawCodeToPre = () => {
    return (tree: any) => {
      visit(tree, { type: "element", tagName: "pre" }, (node: any) => {
        const [codeEl] = node.children;
        if (codeEl?.tagName !== "code") return;
        node.raw = codeEl.children?.[0]?.value || "";
      });
    };
  };

  // Plugin to pass raw code to pre elements inside figures
  const passRawToPreInFigure = () => {
    return (tree: any) => {
      visit(tree, { type: "element", tagName: "figure" }, (node: any) => {
        if (!("data-rehype-pretty-code-figure" in node.properties)) {
          return;
        }
        for (const child of node.children) {
          if (child.tagName === "pre") {
            child.properties["raw"] = node.raw;
          }
        }
      });
    };
  };

  const content = await MDXRemote({ 
    source: code, 
    components,
    options: {
      mdxOptions: {
        rehypePlugins: [
          addRawCodeToPre,
          rehypeSlug,
          [rehypePrettyCode, rehypePrettyCodeOptions],
          passRawToPreInFigure,
          unwrapImagesFromParagraphs,
        ],
      },
    },
  });
  return content;
}
