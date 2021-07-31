import Link from "@components/Link/Link";
import Picture from "@components/Picture";
import React from "react";

export default function About() {
  const source = {
    webp: "images/thatsme.webp",
    jpg: "images/thatsme.jpg",
    default: "images/thatsme.jpg",
  };

  return (
    <main className="aboutHeader">
      <div className="contentsWrap">
        <div className="aboutHeader__hook">
          <h4>Developing a great User Experience.</h4>
          <p>
            Application development is not just about making the functionalities
            &ldquo;work&rdquo;. But, also about delivering a great user
            experience while interacting with the application.
          </p>
          <h5>What makes the User Experience great ?</h5>
          <p>
            The usability, accessibility, functionality,
            <span> as well as</span>
            the credibility of an application makes it&apos;s interaction
            experience great.
          </p>

          <h5>And that is exactly what I do.</h5>
          <p>
            Throughout the development process, I try to come up with the
            solutions to the problems that an user might face throughout the
            usage of an application.
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
