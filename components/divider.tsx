import React from "react";

const Divider = () => {
  return (
    <div
      aria-hidden="true"
      className={`w-[1px] m-auto h-20 md:h-40 bg-gradient-to-b from-transparent via-brand to-transparent`}
    ></div>
  );
};

export { Divider };
