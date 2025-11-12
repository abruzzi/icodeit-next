import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@heroui/react";

const inter = Inter({ weight: "800", subsets: ["latin"] });

const AboutMe = () => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 py-16 text-lg leading-normal text-left sm:space-y-0 sm:space-x-4">
      <div className={`flex-1 text-base`}>
        <p>Welcome, I am Juntao — Engineer, Educator, Creator.</p>

        <h1
          className={`text-slate-900 text-3xl md:text-6xl tracking-normal dark:text-white ${inter.className}`}
        >
          I help developers write better code through clear, practical guidance.
        </h1>

        <p>
          I share in-depth insights and practical tutorials in books, courses
          and videos.
        </p>

        <a
          href="https://juntao.substack.com/"
          target="_blank"
          className={`w-full md:w-40 text-center no-underline inline-block mt-2 text-lg uppercase tracking-wide border-none px-6 py-2 rounded-full transition-all duration-200 ease-in-out  bg-gradient-to-br from-brand to-indigo-400 hover:bg-gradient-to-bl hover:shadow-lg border-brand`}
        >
          Subscribe
        </a>
      </div>
      <div className={`w-32 h-32 md:block lg:block xl:block sm:hidden`}>
        <Image
          src="/juntao.qiu.avatar.png"
          width={128}
          height={128}
          alt="Juntao Qiu Avatar"
          className="m-0 rounded-full"
        />
      </div>
    </div>
  );
};

export { AboutMe };
