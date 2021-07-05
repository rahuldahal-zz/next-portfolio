import React from "react";
import ProjectsList from "./ProjectsList";

export default function Works({ works }) {
  return (
    <main className="projects">
      <div className="contentsWrap">
        <ProjectsList works={works} />
      </div>
    </main>
  );
}
