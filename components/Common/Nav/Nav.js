import React, { useEffect, useState } from "react";
import Link from "./link";
import Logo from "../../../public/logo.svg";
import Toggle from "../../../public/toggle.svg";
import Button from "../Button/Button";

export default function Nav({ current }) {
  const [isScreenNarrow, setIsScreenNarrow] = useState(true);
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);

  useEffect(() => {
    setIsScreenNarrow(matchMedia("(max-width: 768px)").matches);
  }, []);

  return (
    <nav className="nav">
      <div className="nav__wrap">
        <Link to="/">
          <Logo className="nav__logo" />
        </Link>

        <div className="nav__togglers">
          <Toggle
            className="nav__themeToggler"
            onClick={() => document.documentElement.classList.toggle("dark")}
          />

          {isScreenNarrow ? (
            <span
              role="button"
              tabIndex="0"
              className={
                isHamburgerClicked
                  ? "nav__hamburger nav__hamburger--active"
                  : "nav__hamburger"
              }
              onClick={() => hamBurgerClickHandler()}
            ></span>
          ) : (
            ""
          )}
        </div>
        <div
          className={
            isHamburgerClicked ? "nav__links nav__links--active" : "nav__links"
          }
        >
          <Link
            to="/about"
            textContent="About"
            isActive={current === "about" ? true : false}
          />
          <Link
            to="/projects"
            textContent="Projects"
            isActive={current === "projects" ? true : false}
          />
          <Link
            to="/resume"
            textContent="Resume"
            isActive={current === "resume" ? true : false}
          />
          <Link
            to="/blogs"
            textContent="Blogs"
            isActive={current === "blogs" ? true : false}
          />
        </div>
      </div>
    </nav>
  );

  function hamBurgerClickHandler() {
    isHamburgerClicked
      ? setIsHamburgerClicked(false)
      : setIsHamburgerClicked(true);
  }
}
