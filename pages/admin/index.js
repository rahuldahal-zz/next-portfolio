import React, { useRef, useState } from "react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const password = useRef(null);
  const errorMessage = useRef(null);

  return isAuthenticated ? <h1>Hey Admin</h1> : <Login />;

  function Login() {
    return (
      <>
        <form
          action="/api/admin"
          method="POST"
          className="admin__form"
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
        <p ref={errorMessage} className="admin__errorMessage"></p>
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
        setIsAuthenticated(true);
      } else {
        errorMessage.current.textContent = "Incorrect Password.";
      }
    } catch (error) {
      console.log(error);
    }
  }
}
