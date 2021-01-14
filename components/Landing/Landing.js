import React from "react";
import Button from "../Button";

export default function Landing() {
  return (
    <>
      <header className="landing">
        <div className="landing__heading">
          <h4>
            I Improvise <br />
            <span className="landing__highlight">User Experience</span> <br />
            While Developing <br />
            Websites.
          </h4>
        </div>

        <p className="landing__subheading">MERN/JAM stack developer</p>

        <div className="landing__cta">
          <Button to="/contact" fill="filled" textContent="Contact" />
          <Button to="/projects" fill="outline" textContent="Projects" />
        </div>
      </header>
    </>
  );
}
