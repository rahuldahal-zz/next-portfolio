import React from "react";
import NextLink from "next/link";
import { showLoader } from "utils/loader";

export default function Link({
  to,
  textContent,
  isActive,
  children,
  setIsHamburgerClicked,
  target,
}) {
  const className = isActive ? "nav__link nav__link--active" : "nav__link";

  function handleLinkClick() {
    if (target !== "blank" && to !== "/") {
      setIsHamburgerClicked && setIsHamburgerClicked(false);
      showLoader();
    }
  }

  return (
    <NextLink href={to}>
      <a
        className={!children ? className : ""}
        onClick={() => handleLinkClick()}
        target={target}
      >
        {textContent || children}
      </a>
    </NextLink>
  );
}
