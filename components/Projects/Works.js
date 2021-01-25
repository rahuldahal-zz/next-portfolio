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
          } = work.data;
          return (
            <div className="project" key={name.trim().split(" ").join("")}>
              <h4 className="project__name">{name}</h4>
              <div className="project__body">
                <div className="project__description">
                  <p
                    className="description"
                    dangerouslySetInnerHTML={{
                      __html: `${name} is ${description}`,
                    }}
                  />
                  <span className="project__stack">{stack}</span>
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
                  <img
                    className="project__screenshot"
                    src="https://unsplash.it/300/200"
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
