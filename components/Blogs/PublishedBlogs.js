import React from "react";
import Link from "@components/Common/Link/Link";
import BlogCards from "./BlogCards";

export default function PublishedBlogs({ blogDetails, handle }) {
  return (
    <main className="blogCards">
      <h2 className="blogCards__heading">
        My articles posted on{" "}
        <Link
          to={`https://${handle}.hashnode.dev`}
          textContent="Hashnode"
          className="blogCards__handle"
          newTab
        />
      </h2>
      <BlogCards cardDetails={blogDetails} />
    </main>
  );
}
