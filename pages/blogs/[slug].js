import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import Article from "@components/Blogs/Article";
import Footer from "@components/Common/Footer/Footer";
import LoaderOverlay from "@components/Common/LoaderOverlay";
import { hideLoader } from "@utils/loader";
import MyHead from "@components/MyHead";

export default function ArticleSlug({ article }) {
  useEffect(() => {
    hideLoader();
  }, []);

  const { title, coverImage, slug, brief } = article;

  const metaTags = {
    title,
    url: `https://rahuldahal.com.np/blogs/${slug}`,
    description: brief,
    image: coverImage,
  };

  return (
    <>
      <MyHead {...metaTags} />
      <Nav current="blogs" />
      <Article article={article} />
      <Footer />
      <LoaderOverlay />
    </>
  );
}

export async function getStaticProps({ params }) {
  const query = `
    {
        post(slug:"${params.slug}", hostname: "rdaahal.hashnode.dev"){
          _id
          cuid
          title
          slug
          type
          dateUpdated
          dateAdded
          isFeatured
          contentMarkdown
          brief
          coverImage
          tags{
            name
            logo
          }
        }
      }
    `;

  try {
    const res = await fetch("https://api.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
    });
    const { data } = await res.json();
    return {
      props: {
        article: data.post,
      },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: {},
  };
}

export async function getStaticPaths() {
  const query = `
    {
      user(username:"rahuldahal"){
        blogHandle
        publication{
          posts{
            title
            _id
            dateAdded
            brief
            tags{
              name
            }
            coverImage
            slug
          }
        }
      }
    }
    `;
  let slugs = [];

  try {
    const res = await fetch("https://api.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {},
      }),
    });
    const { data } = await res.json();
    slugs = data.user.publication.posts.map((post) => ({
      params: { slug: post.slug },
    }));
  } catch (e) {
    console.log(e);
  }
  return {
    paths: slugs,
    fallback: false,
  };
}
