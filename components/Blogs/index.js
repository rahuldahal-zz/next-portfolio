import React from "react";
import Link from "@components/Link";
import AnimatedParticles from "@components/Particles";
import BlogCards from "./BlogCards";

export default function Blogs({ blogDetails, handle }) {
  return (
    <main className="blogCards">
      <AnimatedParticles />
      <div className="contentsWrap">
        <BlogCards cardDetails={blogDetails} />
      </div>
    </main>
  );
}
