import React from "react";

export default function Picture({
  source,
  alt,
  width,
  height,
  className = "",
}) {
  const { defaultSrc } = source;
  delete source.default;
  const srcs = Object.keys(source);

  return (
    <picture className={className}>
      {srcs.map((src, index) => (
        <source key={index} srcSet={source[src]} type={`image/${src}`} />
      ))}
      <img src={defaultSrc} alt={alt} width={width} height={height} />
    </picture>
  );
}
