import React from "react";
import Link from "@components/Link";
import AnimatedParticles from "@components/Particles";
import BlogCards from "./BlogCards";

export default function Blogs({ blogDetails, handle }) {
  return (
    <main className="blogCards">
      <AnimatedParticles />
      <div className="contentsWrap">
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
      </div>
    </main>
  );
}
