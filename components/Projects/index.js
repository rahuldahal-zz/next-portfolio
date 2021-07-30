import React from "react";
import ProjectsList from "./ProjectsList";

export default function Projects({ works }) {
  return (
    <main className="projects">
      <div className="contentsWrap">
        <ProjectsList works={works} />
      </div>
    </main>
  );
}
