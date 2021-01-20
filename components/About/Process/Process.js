import React from "react";

export default function Process() {
  return (
    <section className="aboutProcess">
      <h4>This is the method I follow</h4>
      <Process
        textContent="Meet up and Project Discussion"
        icon="/OpenSource.svg"
      />
      <Process
        textContent="Research regarding the Project"
        icon="/OpenSource.svg"
      />
      <Process
        textContent="UI and Prototype design of the discussed project"
        icon="/OpenSource.svg"
      />
      <Process textContent="Development Process" icon="/OpenSource.svg" />
      <Process
        textContent="Testing and Submission (beta version)"
        icon="/OpenSource.svg"
      />
      <Process
        textContent="Follow up and Improvisation "
        icon="/OpenSource.svg"
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
