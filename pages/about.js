import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import Header from "@components/About/Header/Header";
import Process from "@components/About/Process/Process";
import { hideLoader } from "utils/loader";

export default function About() {
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <Nav current="about" />
      <Header />
      <Process />
    </>
  );
}
