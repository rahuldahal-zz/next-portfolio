import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import Landing from "@components/Index/Landing/Landing";
import Expertise from "@components/Index/Expertise/Expertise";
import Footer from "@components/Common/Footer/Footer";
import LoaderOverlay from "@components/Common/LoaderOverlay";
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
      <Footer />
      <LoaderOverlay />
    </>
  );
}
