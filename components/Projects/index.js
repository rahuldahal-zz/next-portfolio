import React from "react";
import AnimatedParticles from "@components/Particles";
import ProjectsList from "./ProjectsList";

export default function Projects({ works }) {
  return (
    <main className="projects">
      <AnimatedParticles />
      <div className="contentsWrap">
        <h2 className="projects__heading">
          Here are some of the OpenSource projects, <br /> I contributed to:
        </h2>
        <ProjectsList works={works} />
      </div>
    </main>
  );
}
