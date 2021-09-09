import React, { useEffect, useState } from "react";
import Link from "@components/Link";
import isScreenLargerThan from "@utils/screenSize";
import UsabilityIllustration from "@svgs/usability_testing.svg";
import { showLoader } from "@utils/loader";
import Picture from "@components/Picture";
import AnimatedParticles from "@components/Particles";

export default function Hero() {
  const source = {
    png: "images/thatsme.png",
    default: "images/thatsme.png",
  };

  const [illustration, setIllustration] = useState("small");

  useEffect(() => {
    if (isScreenLargerThan(1201)) {
      setIllustration("large");
    }
  }, []);

  return (
    <>
      <section className="hero overlay">
        <AnimatedParticles />

        <div className="contentsWrap">
          <div className="headingAndCTA">
            <h1 className="hero__heading">
              I Write <span className="hero__highlight">JavaScript</span> <br />
              To Build <br /> Software Applications.
            </h1>

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
            <Picture
              className="hero__image"
              source={source}
              alt="Rahul Dahal Smiling to the camera"
              width="500px"
              height="500px"
            />
          ) : (
            <UsabilityIllustration className="hero__illustration" />
          )}
        </div>
      </section>
    </>
  );
}
