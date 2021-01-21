import React from "react";
import UXAnalysis from "../../../public/ux_analysis.svg";

export default function Header() {
  return (
    <main className="aboutHeader overlay">
      <div className="aboutHeader__content">
        <h4>What does good User Experience Design mean ?</h4>
        <h6>Let me set a scenario here,</h6>
        <p>
          You have created a website/app for your new business; with a "cool"
          layout, powerful animations and overall a decent User Interface.
        </p>
        <p>
          The product looks good (at least the designer makes you believe). You
          are happy now and then decide to finally publish it.
        </p>
        <p>But, maybe an important step is missing there.</p>
        <p>
          <strong>That's Research & Testing!</strong>
        </p>
        <h6>Testing for,</h6>

        <mark>Usability</mark>
        <mark>Accessibility</mark>
        <mark>Functionality</mark>
        <span>, as well as</span>
        <mark>Credibility.</mark>

        <h6>And that is exactly what I do.</h6>
      </div>

      <UXAnalysis className="aboutHeader__illustration" />
    </main>
  );
}
