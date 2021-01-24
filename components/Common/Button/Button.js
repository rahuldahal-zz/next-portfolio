import React from "react";
import NextLink from "next/link";

export default function Button({
  to,
  fill,
  textContent,
  modifier,
  type = "button",
  onClick,
}) {
  const className = modifier
    ? `btn btn--${fill} ${modifier}`
    : `btn btn--${fill}`;

  return to ? (
    <NextLink href={to}>
      <a className={className}>{textContent}</a>
    </NextLink>
  ) : (
    <button type={type} className={className} onClick={onClick}>
      {textContent}
    </button>
  );
}
