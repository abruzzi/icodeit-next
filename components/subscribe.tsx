import dynamic from "next/dynamic";
import { Spinner } from "@nextui-org/react";

export const Subscribe = dynamic(() => import("./async-substack"), {
  loading: () => <Spinner />,
});
