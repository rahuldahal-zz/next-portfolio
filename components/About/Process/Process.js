import Button from "@components/Common/Button/Button";
import React from "react";
import Design from "../../../public/svgs/design.svg";
import Development from "../../../public/svgs/development.svg";
import Meetup from "../../../public/svgs/meetup.svg";
import Research from "../../../public/svgs/research.svg";
import Testing from "../../../public/svgs/testing.svg";
import Improvisation from "../../../public/svgs/improvisation.svg";
import { showLoader } from "utils/loader";

export default function Process() {
  return (
    <section className="aboutProcess">
      <div className="contentsWrap">
        <h4>This is the method I follow</h4>
        <div className="aboutProcess__processes">
          <ProcessCard
            textContent="Meet up and Project Discussion"
            Icon={Meetup}
          />
          <ProcessCard
            textContent="Research regarding the Project"
            Icon={Research}
          />
          <ProcessCard textContent="UI and Prototype design" Icon={Design} />
          <ProcessCard textContent="Development Process" Icon={Development} />
          <ProcessCard textContent="Testing and Submission" Icon={Testing} />
          <ProcessCard
            textContent="Follow up and Improvisation "
            Icon={Improvisation}
          />
        </div>
        <Button
          textContent="Contact"
          to="#contact"
          fill="filled"
          modifier="aboutProcess__contact"
        />
      </div>
    </section>
  );

  function ProcessCard({ textContent, Icon }) {
    return (
      <div className="process">
        <Icon className="process__icon" />
        <span className="process__title">{textContent}</span>
      </div>
    );
  }
}
