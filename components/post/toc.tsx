"use client";

import type { Post } from "content-collections";
import React, { useEffect, useMemo, useRef, useState } from "react";

type HeadingType = {
  level: string;
  text: string;
  slug: string;
};

const headingsFilter = (h: { text?: string; slug?: string }): h is HeadingType =>
  h.text !== undefined && h.slug !== undefined;

const ACTIVE_TOP_OFFSET = 120;
const EXPAND_DELAY_MS = 500;
const COLLAPSE_DELAY_MS = 220;

export const TOC = ({ post }: { post: Post }) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const expandTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const headings = useMemo(
    () => post.headings.filter(headingsFilter),
    [post.headings]
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const updateActive = () => {
      let current: string | null = null;
      for (const h of headings) {
        const el = document.getElementById(h.slug);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= ACTIVE_TOP_OFFSET) current = h.slug;
      }
      setActiveSlug(current ?? headings[0].slug);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [headings]);

  const clearExpandTimeout = () => {
    if (expandTimeoutRef.current) {
      clearTimeout(expandTimeoutRef.current);
      expandTimeoutRef.current = null;
    }
  };
  const clearCollapseTimeout = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current);
      collapseTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCollapseTimeout();
    expandTimeoutRef.current = setTimeout(() => setIsExpanded(true), EXPAND_DELAY_MS);
  };
  const handleMouseLeave = () => {
    clearExpandTimeout();
    collapseTimeoutRef.current = setTimeout(() => setIsExpanded(false), COLLAPSE_DELAY_MS);
  };

  useEffect(() => {
    return () => {
      clearExpandTimeout();
      clearCollapseTimeout();
    };
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      className="order-last hidden shrink-0 md:block lg:block py-32 sticky top-24 self-start ml-10 lg:ml-14"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="On this page"
    >
      <div className="flex items-stretch overflow-hidden transition-all duration-200 ease-out">
        {/* Rail: horizontal line indicators (visible when collapsed and when expanded) */}
        <div className="flex flex-col justify-center py-3 pl-0.5 shrink-0">
          {headings.map((heading) => {
            const isActive = activeSlug === heading.slug;
            return (
              <a
                key={heading.slug}
                href={`${post.slug}#${heading.slug}`}
                className="flex items-center gap-2 group/rail py-1"
                title={heading.text}
              >
                <span
                  className={`
                    h-1 shrink-0 rounded-full transition-all duration-200
                    ${isExpanded ? "w-2.5" : "w-4"}
                    ${isActive
                      ? "bg-brand w-5 opacity-100"
                      : "bg-slate-300 dark:bg-slate-600 opacity-70 group-hover/rail:opacity-100"}
                  `}
                />
              </a>
            );
          })}
        </div>

        {/* Full labels: visible only when expanded */}
        <div
          className={`
            min-w-[10rem] max-w-[12rem]
            transition-opacity duration-200
            ${isExpanded ? "opacity-100 pl-3 pr-3 py-3" : "opacity-0 pl-0 pr-0 py-0 pointer-events-none"}
          `}
        >
          <h3 className="text-brand uppercase tracking-wide text-xs font-semibold mb-2">
            On this page
          </h3>
          <div className="flex flex-col gap-0.5">
            {headings.map((heading) => {
              const isActive = activeSlug === heading.slug;
              return (
                <a
                  key={heading.slug}
                  href={`${post.slug}#${heading.slug}`}
                  className={`
                    text-xs font-light py-0.5 -mx-1 px-1 rounded
                    border-l-2 pl-2.5
                    transition-colors duration-200
                    ${heading.level === "two" ? "pl-3" : heading.level === "three" ? "pl-5" : ""}
                    ${isActive
                      ? "border-brand text-slate-900 dark:text-slate-100"
                      : "border-transparent text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-300"}
                  `}
                  data-level={heading.level}
                >
                  {heading.text}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
