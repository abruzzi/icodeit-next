import React from "react";
import { Mdx } from "@/components/supporting/mdx-components";
import type { Tutorial } from "content-collections";

const TutorialIntro = async ({ tutorial }: { tutorial: Tutorial }) => {
  return await Mdx({ code: tutorial.body.code });
};

export { TutorialIntro };
