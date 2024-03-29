import React, { useState } from "react";
import Nav from "./Nav";
import { CreateProject } from "./Nav/contents";

export default function Dashboard({ token }) {
  const [componentToRender, setComponentToRender] = useState(
    <CreateProject token={token} />
  );
  const [title, setTitle] = useState("Create New Project");

  return (
    <>
      <Nav
        setStateRefs={{
          setTitle,
          setComponentToRender,
        }}
        token={token}
      />
      <section className="admin__content">
        <h2>{title}</h2>
        {componentToRender}
      </section>
    </>
  );
}
