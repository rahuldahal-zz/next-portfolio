import React from "react";

export default function Button({
  type = "button",
  fill,
  textContent,
  modifier,
  onClick = () => {},
}) {
  const className = modifier
    ? `btn btn--${fill} ${modifier}`
    : `btn btn--${fill}`;

  return (
    <button type={type} className={className} onClick={onClick}>
      {textContent}
    </button>
  );
}
