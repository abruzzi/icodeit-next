import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <div className="w-12 h-12">
      <Image
        src="/juntao.qiu.avatar.png"
        width={48}
        height={48}
        alt="Juntao Qiu Avatar"
        className="m-0 rounded-full"
      />
    </div>
  );
};

export const AuthorInfo = ({duration}: { duration: string }) => {
  return (
    <div className={`flex flex-row items-center`}>
      <Avatar/>
      <div className={`text-sm ml-2`}>
        <div>Juntao Qiu</div>
        <a
          className={`text-brand no-underline text-xs`}
          href="https://twitter.com/JuntaoQiu"
          target="_blank"
        >
          @JuntaoQiu
        </a>
      </div>

      <div className={`ml-auto text-sm text-slate-700 dark:text-slate-400`}>
        {duration}
      </div>
    </div>
  );
};