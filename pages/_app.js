import { useEffect, useState, React } from "react";
import "extended-normalize.css";
import "@styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import LoaderOverlay from "@components/Common/LoaderOverlay";
import MyHead from "../components/MyHead";
import Footer from "../components/Common/Footer/Footer";

function Application({ Component, pageProps }) {
  const [theme, setTheme] = useState(null);

  const quotes = [
    {
      content: "People ignore design that ignores people.",
      credit: "Frank Chimero",
    },
    {
      content: "Look at usual things with unusual eyes.",
      credit: "Vico Magistretti",
    },
    {
      content: "Good design is about process, not product.",
      credit: "Jared Sinclair",
    },
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);

  useEffect(() => {
    const className = localStorage.getItem("theme") === "dark" ? "dark" : "";
    if (className) {
      document.documentElement.classList.add(className);
    }
    setTheme(true);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then((registration) => {
          console.log("service worker registration successful", registration);
        })
        .catch((err) => {
          console.warn("service worker registration failed", err.message);
        });
    }
  }, []);

  return (
    <>
      <MyHead />
      <Component {...pageProps} />
      <Footer />
      <LoaderOverlay quote={quotes[randomIndex]} />
    </>
  );
}

export default Application;
