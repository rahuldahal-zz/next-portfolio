import React from "react";
import Head from "next/head";

export default function MyHead({ title, url, image, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#006699" />
      <meta property="og:site_name" content="rahuldahal.com.np" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Rahul Dahal" />
      <meta property="og:image:width" content="500" />
      <meta property="og:image:height" content="500" />
      <meta name="description" content={description} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
        rel="stylesheet"
      />
      <link rel="icon" href="/images/logo.png" />
    </Head>
  );
}
