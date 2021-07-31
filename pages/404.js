import React from "react";
import Link from "@components/Link/Link";

export default function Custom404() {
  return (
    <main className="custom404">
      <h1>
        Error{" "}
        <Link
          to="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404"
          textContent="404"
        />
      </h1>
      <p>The page you are requesting for is not found!</p>
      <Link to="/" textContent="Go Back Home" fill="filled" />
    </main>
  );
}
