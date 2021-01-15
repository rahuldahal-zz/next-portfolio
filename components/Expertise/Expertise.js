import React from "react";
import Nav from "@components/Nav/Nav";
import Button from "@components/Button";

export default function Expertise() {
  return (
    <section className="expertise">
      <h3 className="expertise__heading">Things I Do</h3>
      <div className="expertise__cards">
        <Card title="MERN Stack Development" />
        <Card
          title="JAM Stack Development"
          image="https://unsplash.it/150/150"
        />
        <Card title="OpenSource Contribution" />
      </div>

      <Button
        modifier="expertise__projects"
        textContent="Things I have done"
        fill="filled"
      />
    </section>
  );
}

function Card({ title, image }) {
  return (
    <div className="expertiseCard">
      <h5 className="expertiseCard__title">{title}</h5>
      <img
        src={image ? image : "https://unsplash.it/200/200"}
        alt="MERN stack logo"
        className="expertiseCard__image"
      />
      <Button
        modifier="expertiseCard__expand"
        fill="filled"
        textContent="Expand"
      />
    </div>
  );
}
