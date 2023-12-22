import React from "react";

import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

import { compareDesc } from "date-fns";
import { Subscribe } from "@/components/subscribe";
import { SubTitle } from "@/components/sub-title";
import { PostCard } from "@/components/post-card";
import { AboutMe } from "@/components/about-me";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto prose dark:prose-invert text-base">
      <AboutMe />

      <hr/>

      <SubTitle content="Recent Articles" />

      {allPosts
        .sort((a, b) => compareDesc(a.date, b.date))
        .slice(0, 5)
        .map((post) => (
          <PostCard post={post} key={post._id} />
        ))}

      <Link href="/posts">Read more...</Link>

      <Subscribe />
    </div>
  );
}
