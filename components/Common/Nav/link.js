import React from "react";
import NextLink from "next/link";
import { showLoader } from "utils/loader";

export default function Link({
  to,
  textContent,
  isActive,
  children,
  setIsHamburgerClicked,
}) {
  const className = isActive ? "nav__link nav__link--active" : "nav__link";
  return (
    <NextLink href={to}>
      <a
        className={!children ? className : ""}
        onClick={() => {
          setIsHamburgerClicked && setIsHamburgerClicked(false);
          showLoader();
        }}
      >
        {textContent ? textContent : children}
      </a>
    </NextLink>
  );
}
