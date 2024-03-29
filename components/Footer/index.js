import React from "react";
import ContactForm from "./ContactForm";
import Link from "../Link";

export default function Footer() {
  return (
    <>
      <footer className="footer stacked" id="contact">
        <div className="contentsWrap">
          <h2 className="footer__title">
            Let's team up and create something amazing.
          </h2>
          <div className="footer__columns">
            <ContactForm />
            <SocialLinks />
          </div>
          <p className="footer__copyright">
            Copyright &copy; Rahul Dahal | {new Date().getFullYear().toString()}
          </p>
        </div>
      </footer>
    </>
  );
}

function SocialLinks() {
  return (
    <div className="footer__socialLinks">
      <h3>Also, connect with me on:</h3>
      <Link
        to="https://github.com/rahuldahal"
        textContent="/rahuldahal"
        newTab
        title="Github Profile"
      />
      <Link
        to="https://twitter.com/raahuldaahal"
        textContent="/raahuldaahaal"
        newTab
        title="Twitter Profile"
      />
      <Link
        to="https://facebook.com/mynameisrahuldahal"
        textContent="/raahuldaahaal"
        newTab
        title="Facebook Profile"
      />
    </div>
  );
}
