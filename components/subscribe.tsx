import React from "react";
import {Inter} from "next/font/google";

const inter = Inter({weight: "400", subsets: ["latin"]});

export const Subscribe = () => {
  return (<>
    <h2
      className={`text-xl text-brand mb-4 uppercase ${inter.className} tracking-widest color-brand font-bold`}
    >
      Subscribe
    </h2>

    <iframe src="https://juntao.substack.com/embed" width="100%" height="150"
            style={{border: "1px solid transparent", backgroundColor: "#F5F5F5"}}></iframe>
  </>)
}