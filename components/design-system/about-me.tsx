import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@heroui/react";
import { HiMail } from "react-icons/hi";

const inter = Inter({ weight: "800", subsets: ["latin"] });

const AboutMe = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 py-16 text-lg leading-normal text-left sm:space-y-0 sm:space-x-4">
      <div className={`flex-1 text-base`}>
        <p className="text-slate-600 dark:text-slate-400 mb-2">Welcome, I am Juntao — Engineer, Educator, Creator.</p>

        <h1
          className={`text-slate-900 text-3xl md:text-6xl tracking-normal dark:text-white mb-4 ${inter.className}`}
        >
          I help developers write better code through clear, practical guidance.
        </h1>

        <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
          I share in-depth insights and practical tutorials in books, courses
          and videos.
        </p>

        <a
          href="https://juntao.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative w-full md:w-auto inline-flex items-center justify-center gap-2 mt-2 text-base font-semibold tracking-wide px-6 py-3 rounded-full bg-gradient-to-br from-brand to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transform transition-[transform,box-shadow] duration-300 ease-in-out overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-br from-purple-600 to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 ease-in-out"></span>
          <span className="relative z-10 flex items-center gap-2">
            <HiMail className="w-4 h-4" />
            <span>Subscribe</span>
          </span>
        </a>
      </div>
      <div className={`w-24 h-24 md:w-32 md:h-32 flex-shrink-0`}>
        <Image
          src="/juntao.qiu.avatar.png"
          width={128}
          height={128}
          alt="Juntao Qiu Avatar"
          className="m-0 rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export { AboutMe };
