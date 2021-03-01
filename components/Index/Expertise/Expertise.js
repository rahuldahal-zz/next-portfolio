import React, { useEffect, useState } from "react";
import Button from "@components/Common/Button/Button";
import ExpertiseExpand from "./ExpertiseExpand";
import MERNStack from "../../../public/svgs/MERNStack.svg";
import JAMStack from "../../../public/svgs/JAMStack.svg";
import OpenSource from "../../../public/svgs/OpenSource.svg";
import isScreenLargerThan from "utils/screenSize";
import { showLoader } from "utils/loader";

export default function Expertise() {
  const HEADING_CLASS_NAME = "expertise__heading";
  const [heading, setHeading] = useState(
    <h4 className={HEADING_CLASS_NAME}>Things I Do</h4>
  );
  const [isExpertiseFocused, setIsExpertiseFocused] = useState({});

  useEffect(() => {
    if (isScreenLargerThan(1200)) {
      setHeading(<h3 className={HEADING_CLASS_NAME}>Things I Do</h3>);
      setIsExpertiseFocused({ expertise: "MERN" });
    }
  }, []);

  return (
    <>
      <section className="expertise stacked overlay">
        <div className="contentsWrap">
          {heading}
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
                onClick={() => showLoader()}
              />
            </div>
            <ExpertiseExpand
              focused={isExpertiseFocused}
              setIsExpertiseFocused={setIsExpertiseFocused}
            />
          </div>
        </div>
      </section>
    </>
  );

  function handleCardClick(e, expertise) {
    const { currentTarget } = e;
    const { y: fromTop } = currentTarget.getBoundingClientRect();

    currentTarget.classList.add("expertiseCard--active");
    setIsExpertiseFocused({ expertise, fromTop });
  }

  function Card({ expertise, title, Image }) {
    return (
      <div
        className={
          expertise === isExpertiseFocused.expertise
            ? "expertiseCard expertiseCard--active"
            : "expertiseCard"
        }
        role="button"
        tabIndex="0"
        onClick={(e) => handleCardClick(e, expertise)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setIsExpertiseFocused({ expertise });
          }
        }}
      >
        <h5 className="expertiseCard__title">{title}</h5>
        <Image className="expertiseCard__image" />
        <span className="btn expertiseCard__expand">Related Projects</span>
      </div>
    );
  }
}
