import React, { useEffect, useState } from "react";
import marked from "marked";
import isScreenLargerThan from "@utils/screenSize";

const prism = require("prismjs");
require("prismjs/components/");

marked.setOptions({
  gfm: true,
  highlight: function highlight(code, lang) {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    }
    return code;
  },
});

const renderer = {
  heading(text, level) {
    const reducedLevel = level + 2; // h1 will be h3

    return `
              <h${reducedLevel}>
                ${text}
              </h${reducedLevel}>`;
  },
};

marked.use({ renderer });

export default function Article({ article }) {
  const [widerThan1200, setWiderThan1200] = useState(false);

  useEffect(() => {
    if (isScreenLargerThan(1201)) {
      setWiderThan1200(true);
    }
  }, []);

  const { title, contentMarkdown, coverImage, dateAdded, dateUpdated, tags } =
    article;

  function minutesToRead() {
    const words = contentMarkdown.split(" ").length;
    return Math.floor(words / 200) || 1;
  }

  function blogTags() {
    return tags.map((tag, index) => <em key={index}>#{tag.name}</em>);
  }

  return (
    <article className="blog">
      <div className="contentsWrap">
        <img src={coverImage} alt="title" className="blog__cover" />
        <div className="blog__contentContainer">
          {widerThan1200 ? (
            <h2 className="blog__title">{title}</h2>
          ) : (
            <h3 className="blog__title">{title}</h3>
          )}
          <p className="blog__updated">
            <em>{new Date(dateUpdated || dateAdded).toDateString()}</em>
            <em>{`${minutesToRead()} min read`}</em>
          </p>
          <p className="blog__tags">{blogTags()}</p>
          <div
            className="blog__content"
            dangerouslySetInnerHTML={{ __html: marked(contentMarkdown) }}
          />
        </div>
      </div>
    </article>
  );
}
