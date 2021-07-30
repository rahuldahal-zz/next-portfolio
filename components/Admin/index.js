import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default function Admin() {
  const [token, setToken] = useState(null);

  return (
    <main className="admin">
      {token ? <Dashboard token={token} /> : <Login setToken={setToken} />}
    </main>
  );
}
