import React from "react";
import Nav from "@components/Common/Nav/Nav";
import Landing from "@components/Index/Landing/Landing";
import Expertise from "@components/Index/Expertise/Expertise";
import { server } from "utils/getCurrentEnv";

export default function Home({ projects }) {
  return (
    <>
      <Nav />
      <Landing />
      <Expertise projects={projects} />
    </>
  );
}
export async function getStaticProps() {
  try {
    const res = await fetch(`${server}/api/projects`);
    const { projects } = await res.json();

    return {
      props: {
        projects,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        projects: null,
      },
    };
  }
}
