import React, { useEffect } from "react";

export default function PublishedArticles({ articles }) {
  useEffect(() => {
    console.log(articles);
  }, []);

  return <h3>Articles</h3>;
}
