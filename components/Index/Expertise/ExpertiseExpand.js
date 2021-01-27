import React, { useEffect, useState } from "react";
import Button from "@components/Common/Button/Button";
import CodingIllustration from "../../../public/guyCoding.svg";

export default function ExpertiseExpand({ expertise, setIsExpandPressed }) {
  const [expertiseProjects, setExpertiseProjects] = useState(null);

  let title;
  let description;
  let image;

  switch (expertise) {
    case "MERN":
      title = "MERN Stack Development";
      description =
        "MongoDB Express React and NodeJS, i.e. MERN is a stack of technologies to build full-stack web applications.";
      image = "/MERNStack.svg";
      break;

    case "JAM":
      title = "JAM Stack Development";
      description =
        "JavaScript API and Markup, i.e. JAM is a stack of technologies if used together efficiently, will create fast, powerful, and pre-rendered websites.";
      image = "/JAMStack.svg";
      break;

    case "FOSS":
      title = "OpenSource Contribution";
      description =
        "Contributing to Free and Open Source Software, i.e. FOSS encourages innovation through collaboration with fellow developers around the globe.";
      image = "/OpenSource.svg";
      break;
  }

  useEffect(() => {
    (async function () {
      if (expertise) {
        const res = await fetch("/api/projects");
        const { projects } = await res.json();
        const works = projects.filter(
          (project) => project.data.stack === expertise
        );
        setExpertiseProjects(works);
      }
    })();
  }, [expertise]);

  return (
    <div
      className={
        expertise
          ? "expertiseExpand overlay expertiseExpand--active"
          : "expertiseExpand overlay"
      }
    >
      <Button
        fill="filled"
        textContent="back"
        modifier="expertiseExpand__btn"
        onClick={(e) => {
          e.currentTarget.parentElement.classList.remove(
            "expertiseExpand--active"
          );
          setIsExpandPressed(false);
        }}
      />
      <div className="expertiseExpand__cover">
        <img width="200px" src={image ? image : ""} alt="" />
      </div>
      <h5 className="expertiseExpand__title">{title}</h5>
      <div className="expertiseExpand__content">
        <p className="expertiseExpand__details">
          {description ? description : ""}
        </p>
        <hr />
        <h6>Projects</h6>
        {expertiseProjects && <ExpertiseProjects works={expertiseProjects} />}
      </div>
      <CodingIllustration className="expertiseExpand__illustration" />
    </div>
  );

  function ExpertiseProjects({ works }) {
    return (
      <div className="expertiseExpand__projects">
        {works.map((work) => {
          const { id, data } = work;
          const { name, url, repo } = data;
          return (
            <div className="expertiseProject" key={id}>
              <img
                src="/OpenSource.svg"
                width="24px"
                alt=""
                className="expertiseProject__logo"
              />
              <strong className="expertiseProject__name">{name}</strong>
              <a href={url} className="expertiseProject__url">
                Visit
              </a>
              <a href={repo} className="expertiseProject__repo">
                Repo
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
