import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import Works from "@components/Projects/Works";
import { server } from "../utils/getCurrentEnv";
import { hideLoader } from "utils/loader";

export default function Projects({ projects }) {
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <Nav current="projects" />
      <Works works={projects} />
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
