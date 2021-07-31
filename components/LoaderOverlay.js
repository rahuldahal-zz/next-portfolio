import React from "react";

export default function LoaderOverlay() {
  const quotes = [
    {
      content: "People ignore design that ignores people.",
      credit: "Frank Chimero",
    },
    {
      content: "Look at usual things with unusual eyes.",
      credit: "Vico Magistretti",
    },
    {
      content: "Good design is about process, not product.",
      credit: "Jared Sinclair",
    },
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { content, credit } = quotes[randomIndex];

  return (
    <div className="loaderOverlay">
      <div className="loaderOverlay__content">
        <blockquote>{content}</blockquote>
        <mark> - {credit}</mark>
      </div>
    </div>
  );
}
