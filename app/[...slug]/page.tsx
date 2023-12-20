import { notFound } from "next/navigation"
import { Metadata } from "next"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/")
  const page = allPages.find((page) => page.slugAsParams === slug)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
    description: page.description,
  }
}

/**
 * import { Metadata } from 'next';
 *
 * export function generateMetadata({ params: { slug } }: IProps): Metadata {
 *   const post = allPosts.find((post) => post._raw.flattenedPath === slug);
 *
 *   if (!post) {
 *     return {};
 *   }
 *
 *   const { description, title, date } = post;
 *
 *   const ogImage = {
 *     url: `${process.env.HOST}/post/${slug}/og.png`,
 *   };
 *
 *   return {
 *     title,
 *     description,
 *     openGraph: {
 *       type: 'article',
 *       url: `${process.env.HOST}/post/${slug}`,
 *       title,
 *       description,
 *       publishedTime: date,
 *       images: [ogImage],
 *     },
 *     twitter: {
 *       title,
 *       description,
 *       images: ogImage,
 *       card: 'summary_large_image',
 *     },
 *   };
 * }
 */

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default async function PagePage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    notFound()
  }

  return (
    <article className="max-w-4xl py-6 prose dark:prose-invert text-lg">
      <h1 className={`py-6`}>{page.title}</h1>
      {page.description && <p>{page.description}</p>}
      <hr />
      <Mdx code={page.body.code} />
    </article>
  )
}
