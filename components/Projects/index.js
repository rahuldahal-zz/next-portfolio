import React from "react";
import AnimatedParticles from "@components/Particles";
import ProjectsList from "./ProjectsList";

export default function Projects({ works }) {
  return (
    <main className="projects">
      <AnimatedParticles />
      <div className="contentsWrap">
        <ProjectsList works={works} />
      </div>
    </main>
  );
}
