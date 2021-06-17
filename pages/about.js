import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import Header from "@components/About/Header/Header";
import Footer from "@components/Common/Footer/Footer";
import LoaderOverlay from "@components/Common/LoaderOverlay";
import { hideLoader } from "@utils/loader";

export default function About() {
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <Nav current="about" />
      <Header />
      <Footer />
      <LoaderOverlay />
    </>
  );
}
