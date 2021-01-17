import "extended-normalize.css";
import "@styles/styles.scss";
import MyHead from "../components/MyHead";

function Application({ Component, pageProps }) {
  return (
    <>
      <MyHead />
      <Component {...pageProps} />
    </>
  );
}

export default Application;
