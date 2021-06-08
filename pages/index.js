import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import Landing from "@components/Index/Landing/Landing";
import Expertise from "@components/Index/Expertise/Expertise";
import { hideLoader } from "@utils/loader";

export default function Home() {
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <Nav />
      <Landing />
      <Expertise />
    </>
  );
}
