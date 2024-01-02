import React from "react";

import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react";

export const Subscribe = dynamic(() => import("./async-sub-stack"), {
  loading: () => <Spinner />,
  ssr: false,
});
