import React, { useState } from "react";
import Button from "@components/Common/Button/Button";
import ExpertiseExpand from "./ExpertiseExpand";
import MERNStack from "../../../public/MERNStack.svg";
import JAMStack from "../../../public/JAMStack.svg";
import OpenSource from "../../../public/OpenSource.svg";
import { server } from "utils/getCurrentEnv";

export default function Expertise({ projects }) {
  const [isExpandPressed, setIsExpandPressed] = useState({});

  return (
    <>
      <section className="expertise">
        <h3 className="expertise__heading">Things I Do</h3>
        <div className="expertise__cards">
          <Card
            expertise="MERN"
            title="MERN Stack Development"
            Image={MERNStack}
          />
          <Card
            expertise="JAM"
            title="JAM Stack Development"
            Image={JAMStack}
          />
          <Card
            expertise="FOSS"
            title="OpenSource Contribution"
            Image={OpenSource}
          />
        </div>

        <p className="subheading">
          While using these technologies, I make sure a great{" "}
          <strong>User Experience</strong> is achieved. Every time.
        </p>

        <Button
          to="/projects"
          modifier="expertise__projects"
          textContent="Things I have done"
          fill="filled"
        />
      </section>
      <ExpertiseExpand
        expertise={isExpandPressed.expertise}
        setIsExpandPressed={setIsExpandPressed}
        projects={projects}
      />
    </>
  );

  function Card({ expertise, title, Image }) {
    return (
      <div className="expertiseCard">
        <h5 className="expertiseCard__title">{title}</h5>
        <Image className="expertiseCard__image" />
        <Button
          modifier="expertiseCard__expand"
          fill="filled"
          textContent="Expand"
          onClick={() => {
            setIsExpandPressed({ expertise: expertise });
          }}
        />
      </div>
    );
  }
}
