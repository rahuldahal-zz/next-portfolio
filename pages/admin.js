import React, { useEffect, useRef, useState } from "react";
import Query from "@components/Admin/Query";
import { hideLoader } from "@utils/loader";

export default function Admin() {
  const [Token, setToken] = useState(null);
  const password = useRef(null);

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <main className="admin">{Token ? <Query token={Token} /> : <Login />}</main>
  );

  function Login() {
    return (
      <>
        <form
          action="/api/admin"
          method="POST"
          className="admin__login"
          onSubmit={(e) => formSubmitHandler(e)}
        >
          <label htmlFor="password">Password</label>
          <input
            ref={password}
            type="password"
            name="password"
            id="password"
            placeholder="#.password$$"
          />
          <button type="submit">Login</button>
        </form>
      </>
    );
  }

  async function formSubmitHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({ password: password.current.value }),
      });
      if (res.status === 202) {
        const { token } = await res.json();
        console.log(token);
        setToken(token);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
