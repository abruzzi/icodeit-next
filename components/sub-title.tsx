import React from "react";
import {Inter} from "next/font/google";

const inter = Inter({weight: "400", subsets: ["latin"]});

const SubTitle = ({content}: { content: string }) => {
  return (<h2
    className={`text-xl text-brand mb-4 uppercase ${inter.className} tracking-widest color-brand font-bold`}
  >
    {content}
  </h2>)
}

export {SubTitle};