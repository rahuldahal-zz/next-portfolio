import React, { useEffect } from "react";
import Head from "next/head";
import Nav from "@components/Nav";
import About from "@components/About";
import Footer from "@components/Footer";
import LoaderOverlay from "@components/LoaderOverlay";
import { hideLoader } from "@utils/loader";
import MyHead from "@components/MyHead";

export default function AboutPage() {
  useEffect(() => {
    hideLoader();
  }, []);

  const metaTags = {
    title: "About | Rahul Dahal",
    url: "https://rahuldahal.com.np/about",
    description:
      "A Web Developer with an aim to improvise User Experience. My responsibility is to make the user's experience on the app usable, accessible, functional and credible while developing MERN and JAM stack apps.",
    image: "https://rahuldahal.com.np/images/thatsme.png",
  };

  return (
    <>
      <MyHead {...metaTags} />
      <Nav current="about" />
      <About />
      <Footer />
      <LoaderOverlay />
    </>
  );
}
