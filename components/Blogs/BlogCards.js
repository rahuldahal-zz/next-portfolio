import React from "react";
import Link from "@components/Link";
import { showLoader } from "@utils/loader";

export default function BlogCards({ cardDetails }) {
  function getLink(slug) {
    return `/blogs/${slug}`;
  }

  return (
    <section className="blogCards__content">
      {cardDetails.map((article, index) => {
        const { title, brief, dateAdded, coverImage, slug } = article;
        return (
          <div className="blogCard" key={index}>
            <img src={coverImage} alt={title} className="blogCard__cover" />
            <div className="blogCard__content">
              <h4 className="blogCard__title">
                <Link
                  to={getLink(slug)}
                  textContent={title}
                  onClick={() => showLoader()}
                />
              </h4>
              <p className="blogCard__tags">
                <em>#javascript</em>
              </p>
              <p className="blogCard__dateAdded">
                {new Date(dateAdded).toLocaleString()}
              </p>
              <p className="blogCard__brief">{brief}</p>
              <Link
                to={getLink(slug)}
                textContent="Read more"
                fill="filled"
                className="blogCard__link"
                onClick={() => showLoader()}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}
