import React from "react";
import Button from "@components/Common/Button/Button";
import ProjectDescription from "./ProjectDescription";

export default function Works({ works }) {
  return (
    <main className="projects">
      <div className="contentsWrap">
        <Projects works={works} />
      </div>
    </main>
  );

  function Projects({ works }) {
    return (
      <div className="projects__wrap">
        {works.map((work) => {
          const {
            name,
            icon,
            overview,
            features,
            learnings,
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
                  <ProjectDescription
                    description={{ name, overview, features, learnings }}
                  />
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
