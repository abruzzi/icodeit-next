"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React from "react";
import { Chapter } from "contentlayer/generated";
import Link from "next/link";
import { TbSquareRoundedNumber1 } from "react-icons/tb";
import { CiCircleList } from "react-icons/ci";

export function Outline({ chapters }: { chapters: Chapter[] }) {
  return (
    <aside className={`absolute top-20 -left-40`}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly>
            <CiCircleList size={32} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Other chapters of the tutorial">
          {chapters
            .sort((a, b) => a.order - b.order)
            .map((other: Chapter) => (
              <DropdownItem
                startContent={<TbSquareRoundedNumber1 />}
                key={other._id}
              >
                <Link href={other.slug} className={`no-underline`}>
                  {other.title}
                </Link>
              </DropdownItem>
            ))}
        </DropdownMenu>
      </Dropdown>
    </aside>
  );
}
