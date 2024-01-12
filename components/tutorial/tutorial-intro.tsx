import React from "react";
import { Mdx } from "@/components/supporting/mdx-components";
import {Tutorial} from "contentlayer/generated";

const TutorialIntro = ({ tutorial }: { tutorial: Tutorial }) => {
  return <Mdx code={tutorial.body.code} />;
};

export { TutorialIntro };
