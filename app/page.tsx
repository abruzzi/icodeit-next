import {allPosts} from "@/.contentlayer/generated";
import Link from "next/link";

import {Inter, Merriweather} from "next/font/google";
import React from "react";
import Image from "next/image";

import {compareDesc} from "date-fns";
import {Subscribe} from "@/components/subscribe";
import {SubTitle} from "@/components/sub-title";

const merriweather = Merriweather({weight: "400", subsets: ["latin"]});
const inter = Inter({weight: "400", subsets: ["latin"]});

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto prose dark:prose-invert text-lg">
      <div
        className="flex flex-col items-center text-center space-y-4 py-12 text-lg leading-normal sm:flex-row sm:text-left sm:items-center sm:space-y-0 sm:space-x-4">
        <div className="w-32 h-32">
          <Image
            src="/juntao.qiu.avatar.png"
            width={128}
            height={128}
            alt="Juntao Qiu Avatar"
            className="m-0 rounded-full"
          />
        </div>
        <div className={`flex-1 text-2xl ${inter.className}`}>
          Welcome, I am Juntao — Engineer, Educator, Creator. I elevate your
          coding skills through clear, practical guidance.
          <a href="https://juntao.substack.com/" target="_blank" className={`text-brand`}>
            Subscribe
          </a>{" "}
          to receive in-depth insights and practical tutorials, and get
          immediate access to my latest videos and book previews.
        </div>
      </div>

      <SubTitle content="Recent Articles" />

      {allPosts
        .slice(0, 5)
        .sort((a, b) => compareDesc(a.date, b.date))
        .map((post) => (
          <article key={post._id}>
            <Link href={post.slug} className={`no-underline`}>
              <h2 className={`${merriweather.className} hover:text-brand transition-colors duration-2`}>{post.title}</h2>
            </Link>
            {post.description && <p className={`text-slate-600 dark:text-slate-300`}>{post.description}</p>}
          </article>
        ))}

      <Link href="/posts">Read more...</Link>

      <Subscribe/>
    </div>
  );
}
