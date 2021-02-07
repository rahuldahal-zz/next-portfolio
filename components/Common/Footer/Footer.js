import React from "react";
import ContactForm from "./ContactForm";

export default function Footer() {
  return (
    <>
      <footer className="footer stacked" id="contact">
        <div className="contentsWrap">
          <h3 className="footer__title">
            Let's team up and create something amazing.
          </h3>
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
      <h5>Also, connect with me on:</h5>
      <a href="https://github.com/rahuldahal" title="Github Profile">
        /rahuldahal
      </a>
      <a href="https://twitter.com/raahuldaahal" title="Twitter Profile">
        /raahuldaahaal
      </a>
      <a
        href="https://facebook.com/mynameisrahuldahal"
        title="Facebook Profile"
      >
        /raahuldaahaal
      </a>
    </div>
  );
}
