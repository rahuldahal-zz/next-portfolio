import React, { useEffect } from "react";
import Nav from "@components/Nav";
import Blogs from "@components/Blogs";
import Footer from "@components/Footer";
import LoaderOverlay from "@components/LoaderOverlay";
import { hideLoader } from "@utils/loader";
import MyHead from "@components/MyHead";

export default function BlogsPage({ blogDetails, handle }) {
  useEffect(() => {
    hideLoader();
  }, []);

  const metaTags = {
    title: "Blogs | Rahul Dahal",
    url: "https://rahuldahal.com.np/blogs",
    description:
      "Learn, Share and Grow. I occasionally post articles mostly related to the JavaScript programming language, its features and quirks",
    image: "https://rahuldahal.com.np/images/logo.png",
  };

  return (
    <>
      <MyHead {...metaTags} />
      <Nav current="blogs" />
      <Blogs blogDetails={blogDetails} handle={handle} />
      <Footer />
      <LoaderOverlay />
    </>
  );
}

export async function getStaticProps(context) {
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
        handle: data.user.blogHandle,
        blogDetails: data.user.publication.posts,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {},
    };
  }
}
