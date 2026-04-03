import React from "react";

const SubTitle = ({ content }: { content: string }) => {
  return (
    <h2 className="font-heading mb-6 mt-10 text-xs font-bold uppercase tracking-[0.18em] text-brand first:mt-0">
      {content}
    </h2>
  );
};

export {SubTitle};