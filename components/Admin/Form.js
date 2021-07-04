import React, { useRef } from "react";
import Button from "@components/Common/Button/Button";
import { server } from "utils/getCurrentEnv";

export default function Form({ token, queryType, defaultValues }) {
  const {
    id,
    name,
    priority,
    techstack,
    url,
    repo,
    stack,
    screenshots,
    logo,
    features,
    learnings,
  } = defaultValues || {};

  // form refs
  const idRef = useRef(null);
  const nameRef = useRef(null);
  const priorityRef = useRef(null);
  const techstackRef = useRef(null);
  const urlRef = useRef(null);
  const repoRef = useRef(null);
  const stackRef = useRef(null);
  const screenshotsRef = useRef(null);
  const logoRef = useRef(null);
  const featuresRef = useRef(null);
  const learningsRef = useRef(null);

  const refs = [
    nameRef,
    priorityRef,
    techstackRef,
    urlRef,
    repoRef,
    stackRef,
    screenshotsRef,
    logoRef,
    featuresRef,
    learningsRef,
  ];

  async function projectQueryHandler(e) {
    e.preventDefault();
    let data;

    if (queryType === "create") {
      const [
        nameValue,
        priorityValue,
        techstackValue,
        urlValue,
        repoValue,
        stackValue,
        screenshotsValue,
        logoValue,
        featuresValue,
        learningsValue,
      ] = refs.map((ref) => ref.current.value);

      data = {
        name: nameValue,
        priority: priorityValue,
        techstack: techstackValue.trim().replace(/\n\n/, "\n").split("\n"),
        url: urlValue,
        repo: repoValue,
        stack: stackValue,
        screenshots: screenshotsValue.split(","),
        logo: logoValue,
        features: featuresValue.trim().replace(/\n\n/, "\n").split("\n"),
        learnings: learningsValue.trim().replace(/\n\n/, "\n").split("\n"),
      };
    } else if (queryType === "update") {
      const updatedData = refs.reduce((filtered, ref) => {
        const { name: fieldName, value } = ref.current;
        if (
          fieldName === "screenshots" ||
          fieldName === "features" ||
          fieldName === "learnings" ||
          fieldName === "techstack"
        ) {
          if (value !== defaultValues[fieldName].join("\n")) {
            filtered[fieldName] = value.split("\n");
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

    console.log({ data });

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

      <div className="techstack">
        <h4>Tech Stack</h4>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Project Name"
          ref={nameRef}
          defaultValue={defaultValues ? name : ""}
        />
        <label htmlFor="priority">Priority</label>
        <input
          type="number"
          name="priority"
          id="priority"
          ref={priorityRef}
          defaultValue={defaultValues ? priority : "0"}
        />

        <label htmlFor="techstack">Tech Stack</label>
        <textarea
          name="techstack"
          id="techstack"
          cols={30}
          rows={20}
          ref={techstackRef}
          defaultValue={defaultValues ? techstack.join("\n") : ""}
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
      </div>
      <label htmlFor="features">Features</label>
      <textarea
        name="features"
        id="features"
        cols={30}
        rows={20}
        ref={featuresRef}
        defaultValue={defaultValues ? features.join("\n") : ""}
      />
      <label htmlFor="learnings">Learnings</label>
      <textarea
        name="learnings"
        id="learnings"
        cols={30}
        rows={20}
        ref={learningsRef}
        defaultValue={defaultValues ? learnings.join("\n") : ""}
      />
      <Button
        type="submit"
        fill="filled"
        textContent={queryType === "update" ? "Update" : "Create"}
      />
    </form>
  );
}
