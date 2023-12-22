"use client";

import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import React from "react";
import type { Post } from "contentlayer/generated";

const SocialMediaSharing = ({ post }: { post: Post }) => {
  return (
    <div className={`flex flex-row gap-2`}>
      <LinkedinShareButton
        title={post.title}
        summary={post.description}
        url={`https://icodeit.com.au${post.slug}`}
      >
        <LinkedinIcon size={20} round />
      </LinkedinShareButton>

      <TwitterShareButton
        url={`https://icodeit.com.au${post.slug}`}
        title={post.title}
      >
        <XIcon size={20} round />
      </TwitterShareButton>
    </div>
  );
};

export { SocialMediaSharing };
