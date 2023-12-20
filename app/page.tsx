import {allPosts} from "@/.contentlayer/generated";
import Link from "next/link";

import {Inter, Merriweather} from "next/font/google";
import React from "react";
import Image from 'next/image';

const merriweather = Merriweather({weight: "400", subsets: ["latin"]});
const inter = Inter({weight: "400", subsets: ["latin"]});
import {compareDesc} from "date-fns";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto prose dark:prose-invert">
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
          coding skills through clear, practical guidance.<a
          href="https://juntao.substack.com/"
          target="_blank"
        >Subscribe</a>{" "}
          to receive in-depth insights and practical tutorials, and get
          immediate access to my latest videos and book previews.
        </div>
      </div>

      <h2
        className={`text-xl text-brand mb-4 uppercase ${inter.className} tracking-widest color-brand font-bold `}>Recent
        Articles</h2>

      {allPosts.sort((a, b) => compareDesc(a.date, b.date)).map((post) => (
        <article key={post._id}>
          <Link href={post.slug} className={`no-underline`}>
            <h3 className={`${merriweather.className}`}>{post.title}</h3>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  );
}
