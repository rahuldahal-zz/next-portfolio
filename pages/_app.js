import "extended-normalize.css";
import "@styles/styles.scss";
import MyHead from "../components/MyHead";
import Footer from "../components/Common/Footer/Footer";
import { useEffect } from "react";

function Application({ Component, pageProps }) {
  // useEffect(() => {
  //   const className = localStorage.getItem("theme") === "dark" ? "dark" : "";
  //   document.documentElement.classList.add(className);
  // }, []);

  return (
    <>
      <MyHead />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default Application;
