import "extended-normalize.css";
import "@styles/styles.scss";
import Head from "next/head";

function Application({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rahul Dahal | Let's build something amazing</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default Application;
