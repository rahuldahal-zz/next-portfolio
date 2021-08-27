import Link from "@components/Link";
import AnimatedParticles from "@components/Particles";
import Picture from "@components/Picture";
import React from "react";

export default function About() {
  const source = {
    png: "images/thatsme.png",
    default: "images/thatsme.png",
  };

  return (
    <main className="aboutHeader">
      <AnimatedParticles />
      <div className="contentsWrap">
        <div className="aboutHeader__hook">
          <h3>Building Software Applications with JavaScript.</h3>
          <p>
            Application development is not just about making the functionalities
            &ldquo;work&rdquo;. But, also about delivering a great user
            experience while interacting with the application.
          </p>
          <h5>I use JavaScript and its tools to create,</h5>
          <p>
            usable, accessible, functional,
            <span> as well as</span>
            credible applications
          </p>
          <p>
            Throughout the development process, I try to come up with the
            solutions to the problems that an user might face throughout the
            usage of an application. Which in turn, helps the end user to have
            an amazing User Experience.
          </p>
        </div>

        <div className="aboutHeader__details">
          <Picture
            source={source}
            alt="Rahul Dahal Smiling to the camera"
            width="60vw"
            height="60vw"
          />
          <Link
            textContent="Contact"
            to="#contact"
            fill="filled"
            className="aboutHeader__contact"
          />
          <Link
            newTab
            to="https://github.com/rahuldahal"
            textContent="Activity Overview"
            fill="outline"
            className="aboutHeader__activity"
          />
        </div>
      </div>
    </main>
  );
}
