import React from "react";
import Button from "@components/Common/Button/Button";

export default function CompletedProjects({
  setStateRefs,
  projects: completedProjects,
}) {
  const { setActiveComponent, setDefaultValues } = setStateRefs;

  function setDefaultValueToRefs(project) {
    const { id, data } = project;
    setDefaultValues({ ...data, id });
  }

  return completedProjects.projects.map((project) => (
    <div className="admin__project" key={project.id}>
      <h6>{project.data.name}</h6>
      <Button
        fill="filled"
        textContent="Update"
        onClick={() => {
          setActiveComponent("updateProject");
          setDefaultValueToRefs(project);
        }}
      />
    </div>
  ));
}
