"use client";

import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import type { Chapter, Tutorial } from "content-collections";

function ChapterBreadcrumbs({
  tutorial,
  chapter,
}: {
  tutorial?: Tutorial;
  chapter: Chapter;
}) {
  return (
    <Breadcrumbs>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/tutorials">Tutorials</BreadcrumbItem>
      <BreadcrumbItem href={`/tutorials/${tutorial?.tutorialId}`}>
        {tutorial?.title}
      </BreadcrumbItem>
      <BreadcrumbItem href="#">{chapter.title}</BreadcrumbItem>
    </Breadcrumbs>
  );
}

export { ChapterBreadcrumbs };
