import Button from "@components/Common/Button/Button";
import React, { useEffect, useRef, useState } from "react";
import { server } from "utils/getCurrentEnv";

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

  // form refs
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const urlRef = useRef(null);
  const repoRef = useRef(null);
  const stackRef = useRef(null);
  const screenshotsRef = useRef(null);

  const refs = [
    nameRef,
    descriptionRef,
    urlRef,
    repoRef,
    stackRef,
    screenshotsRef,
  ];

  return (
    <div className="admin__projectQuery">
      {queryType === "get" ? <Projects data={projects} /> : <Form />}
    </div>
  );
  // TODO: Abstract this component to a separate module
  function Form() {
    const { id, name, description, url, repo, stack, screenshots } =
      defaultValues || {};
    return (
      <>
        {queryType === "create" ? (
          <Button
            fill="fill"
            textContent="Get Projects"
            onClick={() => setFetchProjects(true)}
          />
        ) : (
          ""
        )}
        <form method="post" onSubmit={(e) => projectQueryHandler(e)}>
          {defaultValues ? (
            <input ref={idRef} type="hidden" name="id" value={id} />
          ) : (
            ""
          )}

          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Project Name"
            ref={nameRef}
            defaultValue={defaultValues ? name : ""}
          />

          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="20"
            ref={descriptionRef}
            defaultValue={defaultValues ? description : ""}
          ></textarea>

          <label htmlFor="url">URL</label>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="https://live-site-domain.com"
            ref={urlRef}
            defaultValue={defaultValues ? url : ""}
          />

          <label htmlFor="repo">Repository</label>
          <input
            type="url"
            name="repo"
            id="repo"
            ref={repoRef}
            defaultValue={
              defaultValues ? repo : "https://github.com/rahuldahal/"
            }
          />

          <label htmlFor="stack">Stack</label>
          <select
            name="stack"
            id="stack"
            ref={stackRef}
            defaultValue={defaultValues ? stack : ""}
          >
            <option value="MERN">MERN</option>
            <option value="JAM">JAM</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="screenshotOne">Screenshot One</label>
          <input
            type="url"
            name="screenshots"
            id="screenshotOne"
            placeholder="CDN link"
            ref={screenshotsRef}
          />

          <Button fill="fill" textContent="Add More Screenshots" />
          <Button
            type="submit"
            fill="filled"
            textContent={queryType === "update" ? "Update" : "Create"}
          />
        </form>
        ;
      </>
    );
  }

  function Projects({ data }) {
    const { projects } = data;
    return projects.map((project) => {
      return (
        <div className="admin__project" key={project.id}>
          <h6>{project.data.name}</h6>
          <Button
            fill="filled"
            textContent="Update"
            onClick={() => setDefaultValueToRefs(project)}
          />
        </div>
      );
    });
  }

  function setDefaultValueToRefs(project) {
    const { id, data } = project;
    setDefaultValues({ ...data, id });
    setQueryType("update");
  }

  async function projectQueryHandler(e) {
    e.preventDefault();
    const [name, description, url, repo, stack, screenshots] = refs.map(
      (ref) => ref.current.value
    );
    let data = { name, description, url, repo, stack, screenshots };

    data = queryType === "update" ? { ...data, id: idRef.current.value } : data;

    console.log(data);

    try {
      const res = await fetch(`${server}/api/projects/create`, {
        method: queryType === "update" ? "PATCH" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const message = await res.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  }
}
