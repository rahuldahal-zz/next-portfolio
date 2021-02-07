import React, { useEffect, useState } from "react";
import Button from "@components/Common/Button/Button";
import MERNStack from "../../../public/MERNStack.svg";
import JAMStack from "../../../public/JAMStack.svg";
import OpenSource from "../../../public/OpenSource.svg";

export default function ExpertiseExpand({ expertise, setIsExpertiseFocused }) {
  const [expertiseProjects, setExpertiseProjects] = useState(null);
  const [projects, setProjects] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [initial, setInitial] = useState(true);

  let title;
  let description;
  let Image;

  switch (expertise) {
    case "JAM":
      title = "JAM Stack Development";
      description =
        "JavaScript API and Markup, i.e. JAM is a stack of technologies if used together efficiently, will create fast, powerful, and pre-rendered websites.";
      Image = JAMStack;
      break;

    case "FOSS":
      title = "OpenSource Contribution";
      description =
        "Contributing to Free and Open Source Software, i.e. FOSS encourages innovation through collaboration with fellow developers around the globe.";
      Image = OpenSource;
      break;

    default:
      title = "MERN Stack Development";
      description =
        "MongoDB Express React and NodeJS, i.e. MERN is a stack of technologies to build full-stack web applications.";
      Image = MERNStack;
      break;
  }

  function toggleBodyScroll() {
    document.body.classList.toggle("hideOverflow");
  }

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/projects");
      const { projects: all } = await res.json();
      setProjects(all);
    })();
  }, []);

  useEffect(() => {
    if (projects && expertise) {
      const works = projects.filter(
        (project) => project.data.stack === expertise
      );
      setExpertiseProjects(works);
      setIsExpanded(true);
      toggleBodyScroll();
    }
  }, [expertise, projects]);

  return (
    <div
      className={
        isExpanded
          ? "expertiseExpand expertiseExpand--active"
          : "expertiseExpand"
      }
    >
      <Button
        fill="filled"
        textContent="back"
        modifier="expertiseExpand__btn"
        onClick={() => {
          setIsExpanded(false);
          setIsExpertiseFocused({ expertise: null });
          toggleBodyScroll();
        }}
      />
      <div className="expertiseExpand__cover">
        <Image />
      </div>
      <h5 className="expertiseExpand__title">{title}</h5>
      <div className="expertiseExpand__content">
        <p className="expertiseExpand__details">{description}</p>
        <hr />
        <h6>Projects</h6>
        {expertiseProjects && <ExpertiseProjects works={expertiseProjects} />}
      </div>
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
                <small>Visit</small>
              </a>
              <a href={repo} className="expertiseProject__repo">
                <small>Repo</small>
              </a>
            </div>
          );
        })}
      </div>
    );
  }
}
