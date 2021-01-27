import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import isScreenLargerThan from "../../../utils/screenSize";
import UsabilityIllustration from "../../../public/usability_testing.svg";

export default function Landing() {
  const tagline = (
    <>
      I Improvise <br />
      <span className="landing__highlight">User Experience</span> <br />
      While Developing <br />
      Websites.
    </>
  );
  const [heading, setHeading] = useState(<h4>{tagline}</h4>);

  useEffect(() => {
    if (isScreenLargerThan(481)) {
      setHeading(<h3>{tagline}</h3>);
    }
    if (isScreenLargerThan(641)) {
      setHeading(<h2>{tagline}</h2>);
    }
  }, []);

  return (
    <>
      <section className="landing overlay">
        <div className="contentsWrap">
          <div className="landing__heading">{heading}</div>

          <p className="landing__subheading subheading">
            MERN/JAM stack developer
          </p>

          <div className="landing__cta">
            <Button to="/contact" fill="filled" textContent="Contact" />
            <Button to="/projects" fill="outline" textContent="Projects" />
          </div>

          <UsabilityIllustration className="landing__illustration" />
        </div>
      </section>
    </>
  );
}
