import Button from "@components/Common/Button/Button";
import React from "react";

export default function Process() {
  return (
    <section className="aboutProcess">
      <h4>This is the method I follow</h4>
      <Process
        textContent="Meet up and Project Discussion"
        icon="/meetup.svg"
      />
      <Process
        textContent="Research regarding the Project"
        icon="/research.svg"
      />
      <Process textContent="UI and Prototype design" icon="/design.svg" />
      <Process textContent="Development Process" icon="/development.svg" />
      <Process
        textContent="Testing and Submission (beta version)"
        icon="/testing.svg"
      />
      <Process
        textContent="Follow up and Improvisation "
        icon="/improvisation.svg"
      />
      <Button
        textContent="Contact"
        to="/contact"
        fill="filled"
        modifier="aboutProcess__contact"
      />
    </section>
  );

  function Process({ textContent, icon }) {
    return (
      <div className="process">
        <img src={icon} alt="UX design process" className="process__icon" />
        <span className="process__title">{textContent}</span>
      </div>
    );
  }
}
