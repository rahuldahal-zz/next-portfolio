import React, { useRef } from "react";

export default function Login({ setToken }) {
  const password = useRef(null);

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
          placeholder="make sure you are not an intruder"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
}
