import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "800", subsets: ["latin"] });

const AboutMe = () => {
  return (
    <div className="flex flex-col items-center space-y-4 py-16 text-lg leading-normal sm:flex-row sm:text-left sm:items-center sm:space-y-0 sm:space-x-4">
      <div className={`flex-1 text-base`}>
        <p>Welcome, I am Juntao — Engineer, Educator, Creator.</p>

        <h1 className={`text-slate-900 text-6xl tracking-normal dark:text-white ${inter.className}`}>
          I help people write better code through clear, practical guidance.
        </h1>

        <p>
          I share in-depth insights and practical tutorials in books, courses and videos.
        </p>

        <a
          href="https://juntao.substack.com/"
          target="_blank"
          className={`inline-block mt-2 text-lg uppercase tracking-wide border-2 px-6 py-2 rounded-full bg-gradient-to-br from-brand to-indigo-400 text-transparent bg-clip-text hover:from-purple-500 hover:to-pink-500 saturate-80 hover:saturate-100 hover:shadow-lg transition-all duration-200 border-brand`}
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
