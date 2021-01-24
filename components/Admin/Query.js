import Button from "@components/Common/Button/Button";
import React, { useRef } from "react";
import { server } from "utils/getCurrentEnv";

export default function Query({ token }) {
  const name = useRef(null);
  const description = useRef(null);
  const url = useRef(null);
  const repo = useRef(null);
  const stack = useRef(null);
  const screenshots = useRef(null);

  const refs = [name, description, url, repo, stack, screenshots];

  return (
    <div className="admin__projectQuery">
      <form method="post" onSubmit={(e) => projectQueryHandler(e)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Project Name"
          ref={name}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="20"
          ref={description}
        ></textarea>

        <label htmlFor="url">URL</label>
        <input
          type="url"
          name="url"
          id="url"
          placeholder="https://live-site-domain.com"
          ref={url}
        />

        <label htmlFor="repo">Repository</label>
        <input
          type="url"
          name="repo"
          id="repo"
          defaultValue="https://github.com/rahuldahal/"
          ref={repo}
        />

        <label htmlFor="stack">Stack</label>
        <select name="stack" id="stack" ref={stack}>
          <option value="MERN">MERN</option>
          <option value="JAM">JAM</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="screenshotOne">Screenshot One</label>
        <input
          type="url"
          name="screenshots"
          id="screenshotOne"
          placeholder="CDN link"
          ref={screenshots}
        />

        <Button fill="outline" textContent="Add More Screenshots" />
        <Button type="submit" fill="filled" textContent="Query" />
      </form>
    </div>
  );

  async function projectQueryHandler(e) {
    e.preventDefault();
    const [name, description, url, repo, stack, screenshots] = refs.map(
      (ref) => ref.current.value
    );
    const data = { name, description, url, repo, stack, screenshots };

    try {
      const res = await fetch(`${server}/api/projects/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const message = await res.json();
      console.log(message);
    } catch (error) {
      console.log(error);
    }
  }
}
