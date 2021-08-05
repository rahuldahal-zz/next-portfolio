import React, { useEffect, useState } from "react";
import Button from "@components/Button";
import Link from "@components/Link";
import MERNStack from "@svgs/MERNStack.svg";
import JAMStack from "@svgs/JAMStack.svg";
import OpenSource from "@svgs/OpenSource.svg";
import isScreenLargerThan from "@utils/screenSize";

export default function ExpertiseExpand({ focused, setIsExpertiseFocused }) {
  const { expertise, fromTop } = focused;
  console.log(fromTop);
  const [expertiseProjects, setExpertiseProjects] = useState(null);
  const [projects, setProjects] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  function scrollToRef() {
    if (!isScreenLargerThan(1200)) {
      document.documentElement.scrollTop += fromTop;
      setTimeout(() => document.body.classList.add("hideOverflow"), 300);
    } else {
      document.body.classList.add("hideOverflow");
    }
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
      scrollToRef();
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
          document.body.classList.remove("hideOverflow");
        }}
      />
      <div className="expertiseExpand__cover">
        <Image />
      </div>
      <h5 className="expertiseExpand__title">{title}</h5>
      <div className="expertiseExpand__content">
        <p className="expertiseExpand__details">{description}</p>
        <hr />
        <h5>Projects</h5>
        {expertiseProjects && <ExpertiseProjects works={expertiseProjects} />}
      </div>
    </div>
  );

  function ExpertiseProjects({ works }) {
    return (
      <div className="expertiseExpand__projects">
        {works.map((work) => {
          const { id, data } = work;
          const { name, url, repo, logo } = data;
          return (
            <div className="expertiseProject" key={id}>
              <div className="expertiseProject__info">
                <div className="expertiseProject__logo">
                  <img src={logo} width="1.5em" alt="" />
                </div>
                <strong className="expertiseProject__name">{name}</strong>
              </div>
              <div className="expertiseProject__actions">
                <Link
                  to={url}
                  textContent="Visit"
                  newTab
                  className="expertiseProject__url"
                />
                <Link
                  to={repo}
                  textContent="Repo"
                  newTab
                  className="expertiseProject__repo"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
