import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import Landing from "@components/Landing";
import Footer from "@components/Common/Footer/Footer";
import LoaderOverlay from "@components/Common/LoaderOverlay";
import { hideLoader } from "@utils/loader";
import MyHead from "@components/MyHead";

export default function LandingPage() {
  useEffect(() => {
    hideLoader();
  }, []);

  const metaTags = {
    title:
      "Rahul Dahal | Web Developer with an eye for improvising User Experience",
    url: "https://rahuldahal.com.np",
    description:
      "A Web Developer with an aim to improvise User Experience. My responsibility is to make the user's experience on the app usable, accessible, functional and credible.",
    image: "https://rahuldahal.com.np/images/logo.png",
  };

  return (
    <>
      <MyHead {...metaTags} />
      <Nav />
      <Landing />
      <Footer />
      <LoaderOverlay />
    </>
  );
}
