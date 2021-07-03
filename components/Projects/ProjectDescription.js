import React, { useState } from "react";

function Content({ data }) {
  return (
    <ul className="projectList">
      {data.map((elem, index) => (
        <li key={index}> {elem}</li>
      ))}
    </ul>
  );
}

export default function ProjectDescription({ description }) {
  const { name, techstack, features, learnings } = description;
  const [activeWork, setActiveWork] = useState({ work: "", tab: "techstack" });

  function getAppropriateProjectContent(
    workName,
    { techstack, features, learnings }
  ) {
    const { work, tab } = activeWork;

    if (!work || work !== workName) {
      return <Content data={techstack} name={workName} />;
    }
    if (tab === "features") {
      return <Content data={features} />;
    }
    if (tab === "learnings") {
      return <Content data={learnings} />;
    }
    return <Content data={techstack} name={workName} />;
  }

  function getTabClassName(tabName, workName) {
    const { work, tab } = activeWork;
    if (tabName === tab && workName === work) {
      return "project__descriptionTab project__descriptionTab--active";
    }
    if (workName !== work && tabName === "techstack") {
      return "project__descriptionTab project__descriptionTab--active";
    }
    return "project__descriptionTab";
  }

  function DescriptionTabs({ work }) {
    const tabs = ["techstack", "Features", "Learnings"];
    return (
      <div className="project__descriptionTabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            type="button"
            className={getTabClassName(tab.toLowerCase(), work)}
            onClick={() => setActiveWork({ work, tab: tab.toLowerCase() })}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  return (
    <div className="project__description">
      <div className="project__descriptionContent">
        {getAppropriateProjectContent(name, {
          techstack,
          features,
          learnings,
        })}
      </div>
      <DescriptionTabs work={name} />
    </div>
  );
}
