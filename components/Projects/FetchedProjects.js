import Button from "@components/Common/Button/Button";
import React, { useEffect, useState } from "react";

export default function FetchedProjects() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setHasLoaded(true);
    setProjects(data.projects);
  }, []);

  return (
    <main className="projects">
      {hasLoaded ? (
        <Projects projects={projects} />
      ) : (
        <h5>Fetching Projects...</h5>
      )}
    </main>
  );

  function Projects({ projects }) {
    return (
      <div className="projects__wrap">
        {projects.map((project) => {
          const {
            name,
            icon,
            description,
            url,
            repo,
            stack,
            screenshots,
          } = project;
          return (
            <div className="project" key={name.trim().split(" ").join("")}>
              <h4 className="project__name">{name}</h4>
              <div className="project__body">
                <div className="project__description">
                  <p className="description">
                    <span>{name}</span> is a {description}
                  </p>
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

                <div className="project__screenshots">
                  <button className="project__previousShot">Previous</button>
                  <button className="project__nextShot">Next</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
