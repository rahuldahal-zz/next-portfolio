import React, { useEffect } from "react";
import Nav from "@components/Nav";
import Projects from "@components/Projects";
import Footer from "@components/Footer";
import LoaderOverlay from "@components/LoaderOverlay";
import { server } from "@utils/getCurrentEnv";
import { hideLoader } from "@utils/loader";
import MyHead from "@components/MyHead";

export default function ProjectsPage({ projects }) {
  useEffect(() => {
    hideLoader();
  }, []);

  const metaTags = {
    title: "Projects | Rahul Dahal",
    url: "https://rahuldahal.com.np/projects",
    description:
      "I have been doing MERN and JAM stack application development since 2018. Here is the list of some of the MERN and JAM stack projects that I have done or, contributed to.",
    image: "https://rahuldahal.com.np/images/logo.png",
  };

  return (
    <>
      <MyHead {...metaTags} />
      <Nav current="projects" />
      <Projects works={projects} />
      <Footer />
      <LoaderOverlay />
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${server}/api/projects`);
  const { projects } = await res.json();

  return {
    props: {
      projects,
    },
  };
}
