import React from "react";
import marked from "marked";
import "./prism";

marked.setOptions({
  gfm: true,
});

const renderer = {
  heading(text, level) {
    let className = "";
    switch (level) {
      case 1:
        className = "heading note__title";
        break;
      case 2:
        className = "note__subTitle";
        break;
    }

    const reducedLevel = level + 2; // h1 will be h3

    return `
              <h${reducedLevel} class="${className}">
                ${text}
              </h${reducedLevel}>`;
  },
};

marked.use({ renderer });

export default function Article({ article }) {
  const {
    _id,
    title,
    type,
    contentMarkdown,
    coverImage,
    cuid,
    dateAdded,
    dateUpdated,
    isFeatured,
    tags,
  } = article;

  function blogTags() {
    return tags.map((tag, index) => <em key={index}>#{tag.name}</em>);
  }

  return (
    <article className="blog">
      <img src={coverImage} alt="title" className="blog__cover" />
      <div className="blog__contentContainer">
        <h2 className="blog__title">{title}</h2>
        <p className="blog__updated">
          <em>Last Updated: {new Date(dateUpdated).toDateString()}</em>
        </p>
        <p className="blog__tags">{blogTags()}</p>
        <div
          className="blog__content"
          dangerouslySetInnerHTML={{ __html: marked(contentMarkdown) }}
        />
      </div>
    </article>
  );
}
