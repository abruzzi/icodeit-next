"use client";

import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";
import React from "react";
import type { Post } from "content-collections";
import { FaLinkedin } from "react-icons/fa6";

const SocialMediaSharing = ({ post }: { post: Post }) => {
  return (
    <div className={`flex flex-row gap-2`}>
      <LinkedinShareButton
        title={post.title}
        summary={post.description}
        url={`https://icodeit.com.au${post.slug}`}
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin size={20} />
      </LinkedinShareButton>

      <TwitterShareButton
        url={`https://icodeit.com.au${post.slug}`}
        title={post.title}
        aria-label="Share on Twitter(X)"
      >
        <XIcon size={20} round />
      </TwitterShareButton>
    </div>
  );
};

export { SocialMediaSharing };
