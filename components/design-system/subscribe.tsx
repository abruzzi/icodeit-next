"use client";

import React, { useState } from "react";

import dynamic from "next/dynamic";

import { InView } from "react-intersection-observer";

export const Component = dynamic(() => import("./async-sub-stack"), {
  loading: () => <div>Loading...</div>,
});

export const Subscribe = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <InView onChange={(inView, entry) => setIsVisible(inView)}>
      {({ inView, ref, entry }) => (
        <div ref={ref}>{isVisible && <Component />}</div>
      )}
    </InView>
  );
};
