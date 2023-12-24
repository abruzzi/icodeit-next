"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { Chapter } from "contentlayer/generated";
import Link from "next/link";

import { CiCircleList } from "react-icons/ci";

export function Outline({ chapters }: { chapters: Chapter[] | null }) {
  if(!chapters || chapters.length === 0) {
    return null;
  }

  return (
    <aside className={`hide md:block absolute top-24 -left-20`}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <CiCircleList size={32} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Other chapters of the tutorial">
          <DropdownSection title="Chapters outline">
            {chapters
              .sort((a, b) => a.order - b.order)
              .map((other: Chapter) => (
                <DropdownItem
                  startContent={
                    <span
                      className={`flex items-center justify-center rounded-full w-4 h-4 text-xs font-light bg-slate-800 text-slate-100`}
                    >
                      {other.order}
                    </span>
                  }
                  description={other.title}
                  key={other._id}
                >
                  <Link href={other.slug} className={`no-underline text-sm`}>
                    <div>{`Chapter ${other.order}`}</div>
                  </Link>
                </DropdownItem>
              ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </aside>
  );
}
