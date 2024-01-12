import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";

import rehypeSlug from "rehype-slug";

import GithubSlugger from "github-slugger";

import { rehypePrettyCodeOptions } from "./lib/rehype-pretty-code";
import { visit } from "unist-util-visit";

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
  headings: {
    type: "json",
    resolve: async (doc) => {
      const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
      const slugger = new GithubSlugger();

      return Array.from(doc.body.raw.matchAll(regXHeader)).map(({ groups }) => {
        const flag = groups?.flag;
        const content = groups?.content;
        return {
          level:
            flag?.length === 1 ? "one" : flag?.length === 2 ? "two" : "three",
          text: content,
          slug: content ? slugger.slug(content) : undefined,
        };
      });
    },
  },
};

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
    },
    cover: {
      type: "string",
      required: true,
    },
    coverSize: {
      type: "string",
    },
  },
  computedFields,
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    category: {
      type: "string",
    },
    cover: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

const Tutorial = defineDocumentType(() => ({
  name: "Tutorial",
  filePathPattern: `tutorials/**/index.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    tutorialId: { type: "string", required: true },
    cover: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    level: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}));

export const Chapter = defineDocumentType(() => ({
  name: "Chapter",
  filePathPattern: `tutorials/**/!(index).mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    highlights: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    leading: {
      type: "string",
      required: true,
    },
    summary: {
      type: "string",
      required: true,
    },
    date: {
      type: "date",
      required: true,
    },
    order: {
      type: "number",
      required: true,
    },
    tutorialId: { type: "string", required: true },
    category: {
      type: "string",
    },
    cover: {
      type: "string",
    },
    draft: {
      type: "boolean",
      default: false,
    },
    prev: {
      type: "string",
    },
    next: {
      type: "string",
    },
  },
  computedFields,
}));

import getImageSize from "image-size";

const rehypeImageSize = (options) => {
  return (tree) => {
    // This matches all images that use the markdown standard format ![label](path).
    visit(tree, { type: "element", tagName: "img" }, (node) => {
      if (node.properties.width || node.properties.height) {
        return;
      }

      const imagePath = `${options.base}/${node.properties.src}`;
      const imageSize = getImageSize(imagePath);

      if (options.resize) {
        const max = options.max;
        const aspectRatio = imageSize.width / imageSize.height;

        let newWidth = imageSize.width;
        let newHeight = imageSize.height;

        if (newWidth > max || newHeight > max) {
          if (aspectRatio >= 1) {
            newWidth = max;
            newHeight = Math.round(newWidth / aspectRatio);
          } else {
            newHeight = max;
            newWidth = Math.round(newHeight * aspectRatio);
          }
        }

        node.properties.width = newWidth;
        node.properties.height = newHeight;
      } else {
        node.properties.width = imageSize.width;
        node.properties.height = imageSize.height;
      }
    });
  };
};

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Tutorial, Chapter],
  mdx: {
    rehypePlugins: [
      () => (tree) => {
        visit(tree, { type: "element", tagName: "pre" }, (node) => {
          const [codeEl] = node.children;

          if (codeEl.tagName !== "code") return;

          node.raw = codeEl.children?.[0].value;
        });
      },
      [
        rehypeImageSize,
        { base: `${process.cwd()}/public`, resize: true, max: 860 },
      ],
      rehypeSlug,
      [rehypePrettyCode, rehypePrettyCodeOptions],
      () => (tree) => {
        visit(tree, { type: "element", tagName: "figure" }, (node) => {
          if (!("data-rehype-pretty-code-figure" in node.properties)) {
            return;
          }

          for (const child of node.children) {
            if (child.tagName === "pre") {
              child.properties["raw"] = node.raw;
            }
          }
        });
      },
      () => (tree) => {
        visit(
          tree,
          { type: "element", tagName: "img" },
          (node, index, parent) => {
            if (parent?.type === "element" && parent.tagName === "p") {
              parent.type = "element";
              parent.tagName = "div";
            }
          }
        );
      },
    ],
  },
});
