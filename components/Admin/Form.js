import React, { useRef } from "react";
import Button from "@components/Common/Button/Button";
import { server } from "utils/getCurrentEnv";

export default function Form({ token, queryType, defaultValues }) {
  const { id, name, description, url, repo, stack, screenshots } =
    defaultValues || {};

  // form refs
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const urlRef = useRef(null);
  const repoRef = useRef(null);
  const stackRef = useRef(null);
  const screenshotsRef = useRef(null);

  const refs = [
    nameRef,
    descriptionRef,
    urlRef,
    repoRef,
    stackRef,
    screenshotsRef,
  ];

  async function projectQueryHandler(e) {
    e.preventDefault();
    const [
      nameValue,
      descriptionValue,
      urlValue,
      repoValue,
      stackValue,
      screenshotsValue,
    ] = refs.map((ref) => ref.current.value);

    let data = {
      name: nameValue,
      description: descriptionValue,
      url: urlValue,
      repo: repoValue,
      stack: stackValue,
      screenshots: screenshotsValue.split(","),
    };

    data = queryType === "update" ? { ...data, id: idRef.current.value } : data;

    console.log(data);

    try {
      const res = await fetch(`${server}/api/projects/create`, {
        method: queryType === "update" ? "PATCH" : "POST",
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

  return (
    <form method="post" onSubmit={(e) => projectQueryHandler(e)}>
      {defaultValues ? (
        <input ref={idRef} type="hidden" name="id" value={id} />
      ) : (
        ""
      )}

      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Project Name"
        ref={nameRef}
        defaultValue={defaultValues ? name : ""}
      />

      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="20"
        ref={descriptionRef}
        defaultValue={defaultValues ? description : ""}
      />

      <label htmlFor="url">URL</label>
      <input
        type="url"
        name="url"
        id="url"
        placeholder="https://live-site-domain.com"
        ref={urlRef}
        defaultValue={defaultValues ? url : ""}
      />

      <label htmlFor="repo">Repository</label>
      <input
        type="url"
        name="repo"
        id="repo"
        ref={repoRef}
        defaultValue={defaultValues ? repo : "https://github.com/rahuldahal/"}
      />

      <label htmlFor="stack">Stack</label>
      <select
        name="stack"
        id="stack"
        ref={stackRef}
        defaultValue={defaultValues ? stack : ""}
      >
        <option value="MERN">MERN</option>
        <option value="JAM">JAM</option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="screenshots">Screenshots</label>
      <input
        type="url"
        name="screenshots"
        id="screenshots"
        placeholder="CDN links, separated by comma(s)"
        ref={screenshotsRef}
        defaultValue={defaultValues ? screenshots.join() : ""}
      />
      <Button
        type="submit"
        fill="filled"
        textContent={queryType === "update" ? "Update" : "Create"}
      />
    </form>
  );
}
