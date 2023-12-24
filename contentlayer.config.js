import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypePrettyCode from "rehype-pretty-code";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeToc from "@jsdevtools/rehype-toc";

import GithubSlugger from "github-slugger";

import { rehypePrettyCodeOptions } from "./lib/rehype-pretty-code";
import { rehypeTOCSettings } from "./lib/rehype-toc-options";

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
    prev: {
      type: "string",
    },
    next: {
      type: "string",
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page, Tutorial, Chapter],
  mdx: {
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, rehypePrettyCodeOptions]],
  },
});
