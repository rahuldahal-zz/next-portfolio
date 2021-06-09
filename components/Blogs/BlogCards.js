import React from "react";
import Link from "@components/Common/Link/Link";

export default function BlogCards({ cardDetails }) {
  function getLink(slug) {
    return `/blogs/${slug}`;
  }

  return (
    <section className="blogs__content">
      {cardDetails.map((article) => {
        const { _id, title, brief, dateAdded, coverImage, slug, tags } =
          article;
        return (
          <Link to={getLink(slug)} className="blogCard" key={_id}>
            <img src={coverImage} alt={title} className="blogCard__cover" />
            <div className="blogCard__content">
              <h4 className="blogCard__title">{title}</h4>
              <p className="blogCard__tags">
                <em>#javascript</em>
              </p>
              <p className="blogCard__dateAdded">
                {new Date(dateAdded).toLocaleString()}
              </p>
              <p className="blogCard__brief">{brief}</p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
