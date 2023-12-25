"use client";

import { useState } from "react";
import {MdContentCopy, MdDone} from "react-icons/md";

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <button disabled={isCopied} onClick={copy} className={`text-slate-500`}>
      {isCopied ? <MdDone size={20} className={`text-green-500`} /> : <MdContentCopy size={20} />}
    </button>
  );
};
