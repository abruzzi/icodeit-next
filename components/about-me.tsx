import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ weight: "400", subsets: ["latin"] });

const AboutMe = () => {
  return (
    <div className="flex flex-col items-center text-center space-y-4 py-12 text-lg leading-normal sm:flex-row sm:text-left sm:items-center sm:space-y-0 sm:space-x-4">
      <div className="w-32 h-32">
        <Image
          src="/juntao.qiu.avatar.png"
          width={128}
          height={128}
          alt="Juntao Qiu Avatar"
          className="m-0 rounded-full"
        />
      </div>
      <div className={`flex-1 text-2xl ${inter.className}`}>
        Welcome, I am Juntao — Engineer, Educator, Creator. I elevate your
        coding skills through clear, practical guidance.
        <a
          href="https://juntao.substack.com/"
          target="_blank"
          className={`text-brand`}
        >
          Subscribe
        </a>{" "}
        to receive in-depth insights and practical tutorials, and get immediate
        access to my latest videos and book previews.
      </div>
    </div>
  );
};

export { AboutMe };
