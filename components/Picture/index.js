import React, { useRef, useEffect } from "react";

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

  const pictureRef = useRef(null);

  useEffect(() => {
    pictureRef.current.style.width = width;
    pictureRef.current.style.height = height;
  }, []);

  return (
    <picture ref={pictureRef} className={className}>
      {srcs.map((src, index) => (
        <source key={index} srcSet={source[src]} type={`image/${src}`} />
      ))}
      <img src={defaultSrc} alt={alt} width={width} height={height} />
    </picture>
  );
}
