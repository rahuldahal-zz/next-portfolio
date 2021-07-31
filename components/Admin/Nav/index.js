import React, { useEffect, useState } from "react";
import Button from "@components/Button/Button";
import { server } from "@utils/getCurrentEnv";
import { useRouter } from "next/router";
import {
  CreateProject,
  GetMesssages,
  GetProjects,
  UpdateProject,
} from "./contents";

export default function Nav({ setStateRefs, token }) {
  const TAB = useRouter().query.tab;
  const [activeComponent, setActiveComponent] = useState(
    TAB || "createProject"
  );
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [defaultValues, setDefaultValues] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setTitle, setComponentToRender } = setStateRefs;

  useEffect(() => {
    if (activeComponent === "getProjects") {
      console.log("fetching projects...");
      fetch(`${server}/api/projects?updated`)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setProjects(data.projects);
        });
    }
    if (activeComponent === "getMessages") {
      console.log("fetching messages...");
      fetch(`${server}/api/messenger?updated`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          setMessages(data.messages);
        });
    }
  }, [activeComponent]);

  useEffect(() => {
    if (!isLoading) {
      switch (activeComponent) {
        case "getProjects":
          setTitle("Projects Completed");
          console.log(projects);
          projects.length > 0 &&
            setComponentToRender(
              <GetProjects
                projects={projects}
                setStateRefs={{ setActiveComponent, setDefaultValues }}
              />
            );
          break;
        case "getMessages":
          setTitle("Messages from Clients");
          console.log(messages);
          messages.length > 0 &&
            setComponentToRender(
              <GetMesssages token={token} messages={messages} />
            );
          break;
        case "updateProject":
          setTitle("Update Project");
          setComponentToRender(
            <UpdateProject token={token} defaultValues={defaultValues} />
          );
          break;
        default:
          setTitle("Create New Project");
          setComponentToRender(<CreateProject token={token} />);
      }
    }
  }, [isLoading, messages, projects, activeComponent]);

  function getNavItemClassFor(item) {
    return item === activeComponent
      ? " admin__navItem  admin__navItem--active"
      : "admin__navItem";
  }

  return (
    <nav className="admin__nav">
      <Button
        modifier={getNavItemClassFor("createProject")}
        fill="fill"
        textContent="Create Project"
        onClick={() => {
          setActiveComponent("createProject");
        }}
      />
      <Button
        modifier={getNavItemClassFor("getProjects")}
        fill="fill"
        textContent="Get Projects"
        onClick={() => {
          setIsLoading(true);
          setActiveComponent("getProjects");
        }}
      />
      <Button
        modifier={getNavItemClassFor("getMessages")}
        fill="fill"
        textContent="Get Messages"
        onClick={() => {
          setIsLoading(true);
          setActiveComponent("getMessages");
        }}
      />
    </nav>
  );
}
