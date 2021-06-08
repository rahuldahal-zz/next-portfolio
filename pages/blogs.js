import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import PublishedArticles from "@components/Blogs/PublishedArticles";
import Footer from "@components/Common/Footer/Footer";
import LoaderOverlay from "@components/Common/LoaderOverlay";
import { server } from "@utils/getCurrentEnv";
import { hideLoader } from "@utils/loader";

export default function Projects({ articles }) {
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <Nav current="blogs" />
      <PublishedArticles articles={articles} />
      <Footer />
      <LoaderOverlay />
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch("", {
      headers: { "api-key": "" },
    });
    console.log(res.status);
    const articles = await res.json();
    return {
      props: {
        articles,
      },
    };
  } catch (e) {
    console.log(e);
  }
  return {
    props: {
      articles: [],
    },
  };
}
