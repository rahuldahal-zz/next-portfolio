import React, { useEffect, useState } from "react";
import Toggle from "@svgs/toggle.svg";
import Logo from "@svgs/logo.svg";
import Link from "../Link/Link";
import NavLink from "./NavLink";

export default function Nav({ current }) {
  const [isScreenNarrow, setIsScreenNarrow] = useState(true);
  const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);

  useEffect(() => {
    setIsScreenNarrow(matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document
        .querySelector(".nav__themeToggler")
        .classList.add("nav__themeToggler--dark");
    }
  }, [current]);

  return (
    <nav className="nav">
      <div className="nav__wrap contentsWrap">
        <NavLink to="/">
          <Logo className="nav__logo" />
        </NavLink>

        <div className="nav__togglers">
          <div
            className="nav__theme"
            role="button"
            tabIndex="0"
            onClick={() => themeToggleHandler()}
            onKeyUp={(e) => themeToggleHandler(e)}
          >
            <Toggle className="nav__themeToggler" title="Dark Mode Toggler" />
            <small>Dark Mode</small>
          </div>

          {isScreenNarrow ? (
            <div
              role="button"
              tabIndex="0"
              className="nav__hamburger"
              onClick={() => hamBurgerClickHandler()}
              onKeyUp={(e) => hamBurgerClickHandler(e)}
            >
              <span
                className={
                  isHamburgerClicked
                    ? "nav__hamburgerToggler nav__hamburgerToggler--active"
                    : "nav__hamburgerToggler"
                }
              />
              <small>Menu</small>
            </div>
          ) : (
            ""
          )}
          <div
            className={
              isHamburgerClicked
                ? "nav__links nav__links--active"
                : "nav__links"
            }
          >
            <NavLink
              to="/about"
              textContent="About"
              isActive={current === "about"}
              setIsHamburgerClicked={setIsHamburgerClicked}
            />
            <NavLink
              to="/projects"
              textContent="Projects"
              isActive={current === "projects"}
              setIsHamburgerClicked={setIsHamburgerClicked}
            />
            <Link
              to="https://drive.google.com/file/d/1-yD66LzfZsAe6DDLNwypng3cyPOn_vLE/view?usp=sharing"
              textContent="Resume"
              className="nav__link"
              newTab
              setIsHamburgerClicked={setIsHamburgerClicked}
            />
            <NavLink
              to="/blogs"
              textContent="Blogs"
              isActive={current === "blogs"}
              setIsHamburgerClicked={setIsHamburgerClicked}
            />
          </div>
        </div>
      </div>
    </nav>
  );

  function hamBurgerClickHandler(e) {
    if (e) {
      switch (e.key) {
        case "Enter":
          setIsHamburgerClicked(true);
          break;
        case "Escape":
          setIsHamburgerClicked(false);
          break;
      }
    } else {
      isHamburgerClicked
        ? setIsHamburgerClicked(false)
        : setIsHamburgerClicked(true);
    }
  }

  function themeToggleHandler(e) {
    const theme = localStorage.getItem("theme");
    if ((e && e.key === "Enter") || !e) {
      theme
        ? localStorage.removeItem("theme")
        : localStorage.setItem("theme", "dark");
      document
        .querySelector(".nav__themeToggler")
        .classList.toggle("nav__themeToggler--dark");
      document.documentElement.classList.toggle("dark");
    }
  }
}
