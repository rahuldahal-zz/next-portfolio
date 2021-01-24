import "extended-normalize.css";
import "@styles/styles.scss";
import MyHead from "../components/MyHead";
import Footer from "../components/Common/Footer/Footer";
import { useEffect, useState } from "react";

function Application({ Component, pageProps }) {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const className = localStorage.getItem("theme") === "dark" ? "dark" : "";
    if (className) {
      document.documentElement.classList.add(className);
    }
    setTheme(true);
  }, []);

  return (
    <>
      <MyHead />
      {theme ? <Component {...pageProps} /> : ""}
      <Footer />
    </>
  );
}

export default Application;
