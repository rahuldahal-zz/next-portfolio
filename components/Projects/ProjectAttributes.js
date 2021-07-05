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

export default function ProjectAttributes({ attributes }) {
  const [activeWork, setActiveWork] = useState({ work: "", tab: "techstack" });

  function getTabClassName(tabName, workName) {
    const { work, tab } = activeWork;
    if (tabName === tab && workName === work) {
      return "project__attributesTab project__attributesTab--active";
    }
    if (workName !== work && tabName === "techstack") {
      return "project__attributesTab project__attributesTab--active";
    }
    return "project__attributesTab";
  }

  function AttributesTabs({ work }) {
    const tabs = ["Techstack", "Features", "Learnings"];
    return (
      <div className="project__attributesTabs">
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
    <div className="project__attributes">
      <div className="project__attributesContent">
        <Content data={attributes[activeWork.tab]} />
      </div>
      <AttributesTabs work={attributes.name} />
    </div>
  );
}
