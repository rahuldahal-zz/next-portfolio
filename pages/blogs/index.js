import React, { useEffect } from "react";
import Nav from "@components/Common/Nav/Nav";
import PublishedBlogs from "@components/Blogs/PublishedBlogs";
import Footer from "@components/Common/Footer/Footer";
import LoaderOverlay from "@components/Common/LoaderOverlay";
import { hideLoader } from "@utils/loader";

export default function Projects({ blogDetails, handle }) {
  useEffect(() => {
    hideLoader();
  }, []);

  // if(!blogDetails){

  // }

  return (
    <>
      <Nav current="blogs" />
      <PublishedBlogs blogDetails={blogDetails} handle={handle} />
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
