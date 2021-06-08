import React from "react";
import NextLink from "next/link";

export default function Link({
  to,
  textContent,
  fill,
  newTab = false,
  className: additionalClassNames,
  onClick,
  title,
  children,
}) {
  function getClassName() {
    const names = ["link", additionalClassNames];
    if (newTab) {
      names.push("link--external");
    }
    if (fill === "outline") {
      names.push("link--outline");
    } else if (fill === "filled") {
      names.push("link--filled");
    }

    return names.join(" ");
  }

  if (newTab) {
    return (
      <a
        href={to}
        className={getClassName()}
        target="_blank"
        rel="noreferrer"
        title={title}
      >
        {textContent || children}
      </a>
    );
  }

  return (
    <NextLink href={to}>
      <a href={to} className={getClassName()} onClick={onClick}>
        {textContent || children}
      </a>
    </NextLink>
  );
}
