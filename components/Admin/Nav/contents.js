import React from "react";
import CompletedProjects from "../CompletedProjects";
import Form from "../Form";
import Messages from "../Messages";

export function GetProjects({ projects, setStateRefs }) {
  const { setActiveComponent, setDefaultValues } = setStateRefs;
  console.log(projects);
  return projects.length === 0 ? (
    <em>Loading projects</em>
  ) : (
    <CompletedProjects
      setStateRefs={{ setActiveComponent, setDefaultValues }}
      projects={projects}
    />
  );
}

export function GetMesssages({ messages, token }) {
  return messages.length === 0 ? (
    <em>Loading messages</em>
  ) : (
    <Messages data={messages} token={token} />
  );
}

export function CreateProject({ token }) {
  return (
    <div className="admin__createProject">
      <Form queryType="create" token={token} />
    </div>
  );
}

export function UpdateProject({ token, defaultValues }) {
  return (
    <div className="admin__updateProject">
      <Form queryType="update" defaultValues={defaultValues} token={token} />
    </div>
  );
}
