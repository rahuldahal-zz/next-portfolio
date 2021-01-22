import React from "react";
import Nav from "@components/Common/Nav/Nav";
import FetchedProjects from "@components/Projects/FetchedProjects";

export default function Projects() {
  return (
    <>
      <Nav current="projects" />
      <FetchedProjects />
    </>
  );
}
