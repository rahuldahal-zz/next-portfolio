import React, { useState } from "react";
import Button from "@components/Button";
import ExpertiseExpand from "./ExpertiseExpand";

export default function Expertise() {
  const [isExpandPressed, setIsExpandPressed] = useState({});

  return (
    <>
      <section className="expertise">
        <h3 className="expertise__heading">Things I Do</h3>
        <div className="expertise__cards">
          <Card
            expertise="MERN"
            title="MERN Stack Development"
            image="/MERNStack.svg"
          />
          <Card
            expertise="JAM"
            title="JAM Stack Development"
            image="/JAMStack.svg"
          />
          <Card
            expertise="FOSS"
            title="OpenSource Contribution"
            image="/OpenSource.svg"
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
      />
    </>
  );

  function Card({ expertise, title, image }) {
    return (
      <div className="expertiseCard">
        <h5 className="expertiseCard__title">{title}</h5>
        <hr />
        <img
          src={image ? image : "https://unsplash.it/200/200"}
          alt="MERN stack logo"
          className="expertiseCard__image"
        />
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
