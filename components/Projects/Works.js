import Button from "@components/Common/Button/Button";
import React, { useState } from "react";

export default function Works({ works }) {
  const [activeWork, setActiveWork] = useState({ work: "", tab: "overview" });

  return (
    <main className="projects">
      <div className="contentsWrap">
        <Projects works={works} />
      </div>
    </main>
  );

  function Content({ data }) {
    return (
      <p
        dangerouslySetInnerHTML={{
          __html: `${data}`,
        }}
      />
    );
  }

  function getAppropriateProjectContent(
    workName,
    { overview, features, learnings }
  ) {
    const { work, tab } = activeWork;

    if (!work || work !== workName) {
      return <Content data={overview} />;
    }
    if (tab === "features") {
      return <Content data={features} />;
    }
    if (tab === "learnings") {
      return <Content data={learnings} />;
    }
    return <Content data={overview} />;
  }

  function getTabClassName(tabName, workName) {
    const { work, tab } = activeWork;
    if (tabName === tab && workName === work) {
      return "project__descriptionTab project__descriptionTab--active";
    }
    if (workName !== work && tabName === "overview") {
      return "project__descriptionTab project__descriptionTab--active";
    }
    return "project__descriptionTab";
  }

  function DescriptionTabs({ work }) {
    const tabs = ["Overview", "Features", "Learnings"];
    return (
      <div className="project__descriptionTabs">
        {tabs.map((tab) => (
          <button
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

  function Projects({ works }) {
    return (
      <div className="projects__wrap">
        {works.map((work) => {
          const {
            name,
            icon,
            description,
            url,
            repo,
            stack,
            screenshots,
          } = work.data;
          return (
            <div className="project" key={name.trim().split(" ").join("")}>
              <div className="project__info">
                <h4 className="project__name">{name}</h4>
                <span className="project__stack">{stack}</span>
              </div>
              <div className="project__body">
                <div className="project__details">
                  <div className="project__description">
                    <div className="project__descriptionContent">
                      {getAppropriateProjectContent(name, {
                        overview: description,
                        features: "Features Placeholder",
                        learnings: "Learnings Placeholder",
                      })}
                    </div>
                    <DescriptionTabs work={name} />
                  </div>
                  <div className="project__actions">
                    <Button
                      fill="filled"
                      textContent="Visit"
                      to={url}
                      modifier="project__url"
                    />
                    <Button
                      fill="outline"
                      textContent="Github"
                      to={repo}
                      modifier="project__repo"
                    />
                  </div>
                </div>

                <div className="project__screenshots">
                  <img
                    className="project__screenshot"
                    src={
                      screenshots.length
                        ? screenshots[0]
                        : "https://unsplash.it/300/200"
                    }
                    alt=""
                    width="300px"
                    height="200px"
                  />
                  <Button
                    textContent="Previous"
                    fill="filled"
                    modifier="project__previousShot"
                  />
                  <Button
                    textContent="Next"
                    fill="filled"
                    modifier="project__nextShot"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
