import Button from "@components/Common/Button/Button";
import React from "react";
import Design from "../../../public/design.svg";
import Development from "../../../public/development.svg";
import Meetup from "../../../public/meetup.svg";
import Research from "../../../public/research.svg";
import Testing from "../../../public/testing.svg";
import Improvisation from "../../../public/improvisation.svg";

export default function Process() {
  return (
    <section className="aboutProcess">
      <h4>This is the method I follow</h4>
      <Process textContent="Meet up and Project Discussion" Icon={Meetup} />
      <Process textContent="Research regarding the Project" Icon={Research} />
      <Process textContent="UI and Prototype design" Icon={Design} />
      <Process textContent="Development Process" Icon={Development} />
      <Process
        textContent="Testing and Submission (beta version)"
        Icon={Testing}
      />
      <Process
        textContent="Follow up and Improvisation "
        Icon={Improvisation}
      />
      <Button
        textContent="Contact"
        to="/contact"
        fill="filled"
        modifier="aboutProcess__contact"
      />
    </section>
  );

  function Process({ textContent, Icon }) {
    return (
      <div className="process">
        <Icon className="process__icon" />
        <span className="process__title">{textContent}</span>
      </div>
    );
  }
}
