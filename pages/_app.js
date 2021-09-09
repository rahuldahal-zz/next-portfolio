import { useEffect, useState, React } from "react";
import "normalize.css";
import "@styles/styles.scss";
import "@fortawesome/fontawesome-free/css/all.css";

// This function runs both on the client and the server
function Application({ Component, pageProps }) {
  useEffect(() => {
    const className = localStorage.getItem("theme") === "dark" ? "dark" : "";
    if (className) {
      document.documentElement.classList.add(className);
    }
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
      <Component {...pageProps} />
    </>
  );
}

export default Application;
