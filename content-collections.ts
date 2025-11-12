import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import GithubSlugger from "github-slugger";
import { rehypePrettyCodeOptions } from "./lib/rehype-pretty-code";
import { visit } from "unist-util-visit";

// Helper function to compute headings
function computeHeadings(content: string) {
  const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
  const slugger = new GithubSlugger();

  return Array.from(content.matchAll(regXHeader)).map(({ groups }) => {
    const flag = groups?.flag;
    const content = groups?.content;
    return {
      level:
        flag?.length === 1 ? "one" : flag?.length === 2 ? "two" : "three",
      text: content,
      slug: content ? slugger.slug(content) : undefined,
    };
  });
}

// Note: Image size plugin removed due to ESM compatibility issues with image-size package
// Images will still work, but automatic width/height detection is disabled

const pages = defineCollection({
  name: "Page",
  directory: "content/pages",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string().optional(),
    cover: z.string(),
    coverSize: z.string().optional(),
    content: z.string(),
  }),
  transform: (doc) => {
    const slugAsParams = doc._meta.path.replace(/\.mdx$/, "");
    const slug = `/${slugAsParams}`;
    const headings = computeHeadings(doc.content);

    return {
      ...doc,
      slug,
      slugAsParams,
      headings,
      body: {
        code: doc.content,
      },
    };
  },
});

const posts = defineCollection({
  name: "Post",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string().optional(),
    cover: z.string(),
    external: z.boolean().default(false),
    content: z.string(),
  }),
  transform: (doc) => {
    const slugAsParams = doc._meta.path.replace(/\.mdx$/, "");
    const slug = `/posts/${slugAsParams}`;
    const headings = computeHeadings(doc.content);

    return {
      ...doc,
      slug,
      slugAsParams,
      headings,
      body: {
        code: doc.content,
      },
    };
  },
});

const tutorials = defineCollection({
  name: "Tutorial",
  directory: "content/tutorials",
  include: "**/index.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tutorialId: z.string(),
    cover: z.string().optional(),
    date: z.string(),
    level: z.string(),
    relatedProductTitle: z.string(),
    relatedProductLink: z.string(),
    relatedProductDescription: z.string(),
    relatedProductCover: z.string(),
    content: z.string(),
  }),
  transform: (doc) => {
    const slugAsParams = doc._meta.path.replace(/\/index\.mdx$/, "");
    const slug = `/tutorials/${slugAsParams}`;
    const headings = computeHeadings(doc.content);

    return {
      ...doc,
      slug,
      slugAsParams,
      headings,
      body: {
        code: doc.content,
      },
    };
  },
});

const chapters = defineCollection({
  name: "Chapter",
  directory: "content/tutorials",
  include: "**/*.mdx",
  exclude: "**/index.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    highlights: z.array(z.string()),
    leading: z.string(),
    summary: z.string(),
    date: z.string(),
    order: z.number(),
    tutorialId: z.string(),
    category: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    prev: z.string().optional(),
    next: z.string().optional(),
    content: z.string(),
  }),
  transform: (doc) => {
    const slugAsParams = doc._meta.path.replace(/\.mdx$/, "");
    const slug = `/tutorials/${slugAsParams}`;
    const headings = computeHeadings(doc.content);

    return {
      ...doc,
      slug,
      slugAsParams,
      headings,
      body: {
        code: doc.content,
      },
    };
  },
});

export default defineConfig({
  collections: [pages, posts, tutorials, chapters],
  mdx: {
    rehypePlugins: [
      () => (tree: any) => {
        visit(tree, { type: "element", tagName: "pre" }, (node: any) => {
          const [codeEl] = node.children;

          if (codeEl.tagName !== "code") return;

          node.raw = codeEl.children?.[0].value;
        });
      },
      rehypeSlug,
      [rehypePrettyCode, rehypePrettyCodeOptions],
      () => (tree: any) => {
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
      },
      () => (tree: any) => {
        visit(
          tree,
          { type: "element", tagName: "img" },
          (node: any, index: number | undefined, parent: any) => {
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

