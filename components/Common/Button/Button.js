import React from "react";

export default function Button({
  fill,
  textContent,
  modifier,
  onClick = () => {},
}) {
  const className = modifier
    ? `btn btn--${fill} ${modifier}`
    : `btn btn--${fill}`;

  return (
    <button type="button" className={className} onClick={onClick}>
      {textContent}
    </button>
  );
}
