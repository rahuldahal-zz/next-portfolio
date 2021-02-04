import React from "react";

export default function LoaderOverlay({ quote }) {
  const { content, credit } = quote;

  return (
    <div className="loaderOverlay">
      <div className="loaderOverlay__content">
        <blockquote>{content}</blockquote>
        <mark> - {credit}</mark>
      </div>
    </div>
  );
}
