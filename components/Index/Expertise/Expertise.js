import React, { useEffect, useState } from "react";
import Button from "@components/Common/Button/Button";
import ExpertiseExpand from "./ExpertiseExpand";
import MERNStack from "../../../public/MERNStack.svg";
import JAMStack from "../../../public/JAMStack.svg";
import OpenSource from "../../../public/OpenSource.svg";
import isScreenLargerThan from "utils/screenSize";

export default function Expertise() {
  const [isExpandPressed, setIsExpandPressed] = useState({ expertise: "" });

  useEffect(() => {
    if (isScreenLargerThan(1200)) {
      setIsExpandPressed({ expertise: "MERN" });
    }
  }, []);

  return (
    <>
      <section className="expertise">
        <div className="contentsWrap">
          <h3 className="expertise__heading">Things I Do</h3>
          <div className="expertise__columns">
            <div className="expertise__column">
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
            </div>
            <ExpertiseExpand expertise={isExpandPressed.expertise} />
          </div>
        </div>
      </section>
    </>
  );

  function Card({ expertise, title, Image }) {
    return (
      <div
        className={
          expertise === isExpandPressed.expertise
            ? "expertiseCard expertiseCard--active"
            : "expertiseCard"
        }
        role="button"
        tabIndex="0"
        onClick={(e) => {
          e.currentTarget.classList.add("expertiseCard--active");
          setIsExpandPressed({ expertise });
        }}
        onKeyUp={(e) => {
          if (e.key === "ENTER") {
            setIsExpandPressed({ expertise });
          }
        }}
      >
        <h5 className="expertiseCard__title">{title}</h5>
        <Image className="expertiseCard__image" />
        <Button
          modifier="expertiseCard__expand"
          fill="filled"
          textContent="Related Projects"
        />
      </div>
    );
  }
}
