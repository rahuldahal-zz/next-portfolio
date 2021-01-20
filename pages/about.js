import React from "react";
import Nav from "@components/Common/Nav/Nav";
import Header from "@components/About/Header/Header";
import Process from "@components/About/Process/Process";

export default function About() {
  return (
    <>
      <Nav current="about" />
      <Header />
      <Process />
    </>
  );
}
