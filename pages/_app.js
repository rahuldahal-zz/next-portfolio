import "extended-normalize.css";
import "@styles/styles.scss";
import MyHead from "../components/MyHead";
import Footer from "../components/Common/Footer/Footer";

function Application({ Component, pageProps }) {
  return (
    <>
      <MyHead />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default Application;
