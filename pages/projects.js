import React from "react";
import Nav from "@components/Common/Nav/Nav";
import Works from "@components/Projects/Works";
import { server } from "../utils/getCurrentEnv";

export default function Projects({ projects }) {
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
