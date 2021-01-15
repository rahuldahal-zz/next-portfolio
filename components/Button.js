import React from "react";
import NextLink from "next/link";

export default function Button({ to, fill, textContent, modifier }) {
  const className = modifier
    ? `btn btn--${fill} ${modifier}`
    : `btn btn--${fill}`;

  return to ? (
    <NextLink href={to}>
      <a className={className}>{textContent}</a>
    </NextLink>
  ) : (
    <button className={className}>{textContent}</button>
  );
}
