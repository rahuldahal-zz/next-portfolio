import React, { useRef } from "react";
import Button from "@components/Common/Button/Button";
import { server } from "utils/getCurrentEnv";

export default function Form({ token, queryType, defaultValues }) {
  const { id, name, description, url, repo, stack, screenshots, logo } =
    defaultValues || {};

  // form refs
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const urlRef = useRef(null);
  const repoRef = useRef(null);
  const stackRef = useRef(null);
  const screenshotsRef = useRef(null);
  const logoRef = useRef(null);

  const refs = [
    nameRef,
    descriptionRef,
    urlRef,
    repoRef,
    stackRef,
    screenshotsRef,
    logoRef,
  ];

  async function projectQueryHandler(e) {
    e.preventDefault();
    let data;

    if (queryType === "create") {
      const [
        nameValue,
        descriptionValue,
        urlValue,
        repoValue,
        stackValue,
        screenshotsValue,
        logoValue,
      ] = refs.map((ref) => ref.current.value);

      data = {
        name: nameValue,
        description: descriptionValue,
        url: urlValue,
        repo: repoValue,
        stack: stackValue,
        screenshots: screenshotsValue.split(","),
        logo: logoValue,
      };
    } else if (queryType === "update") {
      const updatedData = refs.reduce((filtered, ref) => {
        const { name: fieldName, value } = ref.current;
        if (fieldName === "screenshots") {
          if (value !== defaultValues[fieldName].join("")) {
            filtered[fieldName] = value.split(",");
          }
        } else if (value !== defaultValues[fieldName]) {
          filtered[fieldName] = value;
        }
        return filtered;
      }, {});
      data = { ...updatedData, id: idRef.current.value };
    } else {
      return;
    }

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
        <option value="FOSS">FOSS</option>
      </select>

      <label htmlFor="screenshots">Screenshots</label>
      <input
        type="text"
        name="screenshots"
        id="screenshots"
        placeholder="CDN links, separated by comma(s)"
        ref={screenshotsRef}
        defaultValue={defaultValues ? screenshots.join("") : ""}
      />

      <label htmlFor="logo">Logo</label>
      <input
        type="url"
        name="logo"
        id="logo"
        placeholder="Project Logo"
        ref={logoRef}
        defaultValue={defaultValues ? logo : ""}
      />
      <Button
        type="submit"
        fill="filled"
        textContent={queryType === "update" ? "Update" : "Create"}
      />
    </form>
  );
}
