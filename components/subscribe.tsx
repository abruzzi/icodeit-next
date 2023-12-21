import React from "react";
import {SubTitle} from "@/components/sub-title";

export const Subscribe = () => {
  return (<>
    <hr/>
    <SubTitle content="Subscribe"/>
    <iframe src="https://juntao.substack.com/embed" width="100%" height="150"
            style={{border: "1px solid transparent", backgroundColor: "#F5F5F5"}}></iframe>
  </>)
}