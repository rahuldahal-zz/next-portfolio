import Button from "@components/Common/Button/Button";
import React, { useEffect, useState } from "react";
import { server } from "utils/getCurrentEnv";
import Form from "./Form";

export default function Query({ token }) {
  const [activeComponent, setActiveComponent] = useState("createProject");
  const [title, setTitle] = useState("Create New Project");
  const [fetchProjects, setFetchProjects] = useState(false);
  const [fetchMessages, setFetchMessages] = useState(false);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
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
    console.log(fetchMessages);
    if (fetchMessages) {
      console.log("fetching messages...");
      fetch(`${server}/api/messenger`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setMessages(data));
    }
  }, [fetchMessages]);

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
          onClick={() => {
            setFetchMessages(true);
            setActiveComponent("getMessages");
          }}
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

  function GetMesssages() {
    return messages.length === 0 ? (
      <em>Loading messages</em>
    ) : (
      <Messages data={messages} />
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
    case "getMessages":
      componentToReturn = GetMesssages();
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

  async function deleteMessageHandler(id) {
    const res = await fetch("/api/messenger", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    });
    console.log(res.status);
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

  function Messages({ data }) {
    const { messages: fetchedMessages } = data;
    return (
      <div className="admin__messages">
        {fetchedMessages.map((fetchedMessage) => {
          const { name, email, message } = fetchedMessage.data;
          return (
            <div className="message" key={fetchedMessage.id}>
              <h5 className="message__name">{name}</h5>
              <p className="message__content">{message}</p>
              <div className="message__actions">
                <Button
                  fill="outline"
                  textContent="Send E-mail"
                  to={`mailto:${email}`}
                />
                <Button
                  fill="filled"
                  textContent="Delete"
                  onClick={() => deleteMessageHandler(fetchedMessage.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
