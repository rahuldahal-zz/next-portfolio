import React from "react";
import Link from "@components/Link";
import AnimatedParticles from "@components/Particles";
import BlogCards from "./BlogCards";

export default function Blogs({ blogDetails, handle }) {
  return (
    <main className="blogCards">
      <AnimatedParticles />
      <div className="contentsWrap">
        <h1 className="blogCards__heading">
          I post articles on{" "}
          <Link
            to={`https://${handle}.hashnode.dev`}
            textContent="Hashnode"
            className="blogCards__handle"
            newTab
          />
        </h1>
        <BlogCards cardDetails={blogDetails} />
      </div>
    </main>
  );
}
