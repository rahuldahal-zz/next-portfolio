import React from "react";
import NextLink from "next/link";

export default function Link({ to, textContent, isActive, children }) {
  const className = isActive ? "nav__link nav__link--active" : "nav__link";
  return (
    <NextLink href={to}>
      <a className={!children ? className : ""}>
        {textContent ? textContent : children}
      </a>
    </NextLink>
  );
}
