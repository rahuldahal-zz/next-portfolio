import Button from "@components/Common/Button/Button";
import React, { useEffect, useState } from "react";
import { server } from "utils/getCurrentEnv";
import Form from "./Form";

export default function Query({ token }) {
  // state
  const [queryType, setQueryType] = useState("create");
  const [fetchProjects, setFetchProjects] = useState(false);
  const [projects, setProjects] = useState([]);
  const [defaultValues, setDefaultValues] = useState(null);

  useEffect(async () => {
    if (fetchProjects) {
      const res = await fetch(`${server}/api/projects`);
      const data = await res.json();
      setProjects(data);
      setQueryType("get");
    }
  }, [fetchProjects]);

  return (
    <div className="admin__projectQuery">
      {queryType === "get" ? (
        <Projects data={projects} />
      ) : (
        <>
          <Button
            fill="fill"
            textContent="Get Projects"
            onClick={() => setFetchProjects(true)}
          />
          <Form
            queryType={queryType}
            defaultValues={defaultValues}
            token={token}
          />
        </>
      )}
    </div>
  );

  function setDefaultValueToRefs(project) {
    const { id, data } = project;
    setDefaultValues({ ...data, id });
    setQueryType("update");
  }

  function Projects({ data }) {
    const { projects: fetchedProjects } = data;
    return fetchedProjects.map((project) => (
      <div className="admin__project" key={project.id}>
        <h6>{project.data.name}</h6>
        <Button
          fill="filled"
          textContent="Update"
          onClick={() => setDefaultValueToRefs(project)}
        />
      </div>
    ));
  }
}
