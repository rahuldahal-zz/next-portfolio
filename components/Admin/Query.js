import Button from "@components/Common/Button/Button";
import React, { useEffect, useState } from "react";
import { server } from "utils/getCurrentEnv";
import Form from "./Form";

export default function Query({ token }) {
  const [activeComponent, setActiveComponent] = useState("createProject");
  const [title, setTitle] = useState("Create New Project");
  const [fetchProjects, setFetchProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [defaultValues, setDefaultValues] = useState(null);
  let componentToReturn = null;

  useEffect(() => {
    console.log(fetchProjects);
    if (fetchProjects) {
      console.log("fetching...");
      fetch(`${server}/api/projects`)
        .then((res) => res.json())
        .then((data) => setProjects(data));
    }
  }, [fetchProjects]);

  useEffect(() => {
    switch (activeComponent) {
      case "getProjects":
        setTitle("Projects Completed");
        break;
      case "getMessages":
        setTitle("Messages from Clients");
        break;
      case "updateProject":
        setTitle("Update Project");
        break;
      default:
        setTitle("Create New Project");
    }
  }, [activeComponent]);

  function getNavItemClassFor(item) {
    return item === activeComponent
      ? " admin__navItem  admin__navItem--active"
      : "admin__navItem";
  }

  function Nav() {
    return (
      <nav className="admin__nav">
        <Button
          modifier={getNavItemClassFor("createProject")}
          fill="fill"
          textContent="Create Project"
          onClick={() => setActiveComponent("createProject")}
        />
        <Button
          modifier={getNavItemClassFor("getProjects")}
          fill="fill"
          textContent="Get Projects"
          onClick={() => {
            setFetchProjects(true);
            setActiveComponent("getProjects");
          }}
        />
        <Button
          modifier={getNavItemClassFor("getMessages")}
          fill="fill"
          textContent="Get Messages"
          onClick={() => setActiveComponent("getMessages")}
        />
      </nav>
    );
  }

  function GetProjects() {
    return projects.length === 0 ? (
      <em>Loading projects</em>
    ) : (
      <Projects data={projects} />
    );
  }

  function CreateProject() {
    return (
      <div className="admin__createProject">
        <Form queryType="create" token={token} />
      </div>
    );
  }

  function UpdateProject() {
    return (
      <div className="admin__updateProject">
        <Form queryType="update" defaultValues={defaultValues} token={token} />
      </div>
    );
  }

  switch (activeComponent) {
    case "getProjects":
      componentToReturn = GetProjects();
      break;
    case "updateProject":
      componentToReturn = UpdateProject();
      break;
    default:
      componentToReturn = CreateProject();
  }

  return (
    <>
      <Nav />
      <section className="admin__content">
        <h2>{title}</h2>
        {componentToReturn}
      </section>
    </>
  );

  function setDefaultValueToRefs(project) {
    const { id, data } = project;
    setDefaultValues({ ...data, id });
  }

  function Projects({ data }) {
    const { projects: fetchedProjects } = data;
    return fetchedProjects.map((project) => (
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
}
