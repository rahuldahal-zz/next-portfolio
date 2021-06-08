import React from "react";
import NextLink from "next/link";
import { showLoader } from "utils/loader";

export default function NavLink({ to, textContent, isActive, children }) {
  const className = isActive ? "nav__link nav__link--active" : "nav__link";

  return (
    <NextLink href={to}>
      <a
        href={to}
        className={!children ? className : ""}
        onClick={() => showLoader()}
      >
        {textContent || children}
      </a>
    </NextLink>
  );
}
