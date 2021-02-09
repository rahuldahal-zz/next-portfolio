import React from "react";
import Head from "next/head";

export default function MyHead() {
  return (
    <Head>
      <title>
        Rahul Dahal | Web Developer with an eye for improvising User Experience
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#006699" />
      <meta property="og:site_name" content="rahuldahal.com.np" />
      <meta
        property="og:title"
        content="Rahul Dahal | Web Developer with an eye for improvising User Experience"
      />
      <meta property="og:url" content="https://rahuldahal.com.np" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="A Web Developer with an aim to improvise User Experience. My responsibility is to make the user's experience on the app usable, accessible, functional and credible."
      />
      <meta
        property="og:image"
        content="https://rahuldahal.com.np/images/logo.png"
      />
      <meta property="og:site_name" content="Rahul Dahal" />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta
        name="description"
        content="A Web Developer with an aim to improvise User Experience. My responsibility is to make the user's experience on the app usable, accessible, functional and credible."
      />

      <link rel="icon" href="/images/logo.png" />
    </Head>
  );
}
