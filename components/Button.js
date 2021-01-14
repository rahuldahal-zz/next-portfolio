import React from "react";
import NextLink from "next/link";

export default function Button({ to, fill, textContent, icon, modifier }) {
  const className = modifier
    ? `btn btn--${fill} ${modifier}`
    : `btn btn--${fill}`;

  return to ? (
    <NextLink href={to}>
      <a data-icon={icon} className={className}>
        {textContent}
      </a>
    </NextLink>
  ) : (
    <button data-icon={icon} className={className}>
      {textContent}
    </button>
  );
}
