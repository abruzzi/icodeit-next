import { XIcon } from "react-share";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 w-full bg-slate-950 text-slate-100 pb-14 pt-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 md:grid-cols-[1.35fr_1fr_1fr]">
          <div className="space-y-6">
            <div className="flex gap-4">
              <Image
                src="/juntao.qiu.avatar.webp"
                width={64}
                height={64}
                alt="Juntao Qiu"
                className="size-16 shrink-0 rounded-3xl object-cover ring-1 ring-white/10"
              />
              <div>
                <p className="text-base font-semibold text-slate-50">Juntao Qiu</p>
                <p className="text-sm text-slate-400">Engineer, educator, creator</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-300">
              Helping developers design and build software—by breaking complexity into
              structure and guiding the process with intention.
            </p>
            <a
              href="https://juntao.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-slate-50 ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/14"
            >
              <span>Subscribe</span>
              <HiMail className="h-4 w-4 text-palette-azure cta-icon-breathe" />
            </a>
            <nav className="flex flex-wrap gap-2" aria-label="Social">
              <a
                href="https://twitter.com/JuntaoQiu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-50"
                aria-label="X (Twitter)"
              >
                <XIcon size={20} round />
              </a>
              <a
                href="https://github.com/abruzzi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-50"
                aria-label="GitHub"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/juntaoqiu/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-50"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </nav>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Explore
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ["Home", "/"],
                ["Posts", "/posts"],
                ["Tutorials", "/tutorials"],
                ["Books", "/books"],
                ["Courses", "/courses"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex text-slate-300 no-underline transition-colors hover:text-slate-50"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              Main site
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.icodeit.com.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 no-underline transition-colors hover:text-slate-50"
                >
                  icodeit.com.au
                </a>
              </li>
              <li>
                <a
                  href="https://juntao.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 no-underline transition-colors hover:text-slate-50"
                >
                  Substack
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-xs text-slate-500">
          <p>&copy; {year} I Code It</p>
          <p className="mt-1 text-slate-600">icodeit.com.au</p>
        </div>
      </div>
    </footer>
  );
}
