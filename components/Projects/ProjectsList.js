import React from "react";
import Button from "@components/Button";
import Link from "@components/Link";
import ProjectAttributes from "./ProjectAttributes";

export default function ProjectsList({ works }) {
  const sortedWorks = works.sort((a, b) => a.data.priority < b.data.priority);

  return (
    <div className="projects__wrap">
      {sortedWorks.map((work) => {
        const {
          name,
          techstack,
          features,
          learnings,
          url,
          repo,
          stack,
          screenshots,
        } = work.data;
        return (
          <div className="project" key={work.id}>
            <div className="project__info">
              <h2 className="project__name">{name}</h2>
              <span className="project__stack">{stack}</span>
            </div>
            <div className="project__body">
              <div className="project__details">
                <ProjectAttributes
                  attributes={{ name, techstack, features, learnings }}
                />
                <div className="project__actions">
                  <Link
                    fill="filled"
                    textContent="Visit"
                    to={url}
                    newTab
                    className="project__url"
                  />
                  <Link
                    fill="outline"
                    textContent="Github"
                    to={repo}
                    newTab
                    className="project__repo"
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
