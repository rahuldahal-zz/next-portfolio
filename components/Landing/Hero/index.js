import React, { useEffect, useState } from "react";
import Link from "@components/Link/Link";
import isScreenLargerThan from "@utils/screenSize";
import UsabilityIllustration from "@svgs/usability_testing.svg";
import UsabilityIllustrationDesktop from "@svgs/usability_testing_desktop.svg";
import { showLoader } from "@utils/loader";

export default function Hero() {
  const tagline = (
    <>
      I Improvise <br />
      <span className="hero__highlight">User Experience</span> <br />
      While Developing <br />
      Websites.
    </>
  );
  const [heading, setHeading] = useState(
    <h4 className="hero__heading">{tagline}</h4>
  );
  const [illustration, setIllustration] = useState("small");

  useEffect(() => {
    if (isScreenLargerThan(481)) {
      setHeading(<h3 className="hero__heading">{tagline}</h3>);
    }
    if (isScreenLargerThan(1400)) {
      setHeading(<h2 className="hero__heading">{tagline}</h2>);
    }
    if (isScreenLargerThan(1201)) {
      setIllustration("large");
    }
  }, []);

  return (
    <>
      <section className="hero overlay">
        <div className="contentsWrap">
          <div className="headingAndCTA">
            {heading}

            <p className="hero__subheading subheading">
              MERN/JAM stack developer
            </p>

            <div className="hero__cta">
              <Link
                to="/#contact"
                fill="filled"
                textContent="Contact"
                className="contactBtn"
              />
              <Link
                to="/projects"
                fill="outline"
                textContent="Projects"
                className="projectsBtn"
                onClick={() => showLoader()}
              />
            </div>
          </div>

          {illustration === "large" ? (
            <UsabilityIllustrationDesktop className="hero__illustration" />
          ) : (
            <UsabilityIllustration className="hero__illustration" />
          )}
        </div>
      </section>
    </>
  );
}
