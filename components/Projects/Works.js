import Button from "@components/Common/Button/Button";
import React from "react";

export default function Works({ works }) {
  return (
    <main className="projects">
      <Projects works={works} />
    </main>
  );

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
          } = work;
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
