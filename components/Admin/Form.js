import React, { useRef } from "react";
import Button from "@components/Common/Button/Button";
import { server } from "utils/getCurrentEnv";

export default function Form({ token, queryType, defaultValues }) {
  const {
    id,
    name,
    overview,
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
  const overviewRef = useRef(null);
  const urlRef = useRef(null);
  const repoRef = useRef(null);
  const stackRef = useRef(null);
  const screenshotsRef = useRef(null);
  const logoRef = useRef(null);
  const featuresRef = useRef(null);
  const learningsRef = useRef(null);

  const refs = [
    nameRef,
    overviewRef,
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
        overviewValue,
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
        overview: overviewValue,
        url: urlValue,
        repo: repoValue,
        stack: stackValue,
        screenshots: screenshotsValue.split(","),
        logo: logoValue,
        features: featuresValue.split(","),
        learnings: learningsValue.split(","),
      };
    } else if (queryType === "update") {
      const updatedData = refs.reduce((filtered, ref) => {
        const { name: fieldName, value } = ref.current;
        if (
          fieldName === "screenshots" ||
          fieldName === "features" ||
          fieldName === "learnings"
        ) {
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
      // const res = await fetch(`${server}/api/projects/create`, {
      //   method: queryType === "update" ? "PATCH" : "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${token}`,
      //   },
      //   body: JSON.stringify(data),
      // });
      // const message = await res.json();
      // console.log(message);
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

      <div className="overview">
        <h4>Overview</h4>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Project Name"
          ref={nameRef}
          defaultValue={defaultValues ? name : ""}
        />

        <label htmlFor="overview">Overview</label>
        <textarea
          name="overview"
          id="overview"
          cols="30"
          rows="20"
          ref={overviewRef}
          defaultValue={defaultValues ? overview : ""}
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
      <div className="features">
        <h4>Features</h4>
        <label htmlFor="features">Features</label>
        <input
          type="text"
          name="features"
          id="features"
          ref={featuresRef}
          defaultValue={defaultValues ? features : ""}
        />
      </div>
      <div className="learnings">
        <h4>Learnings</h4>
        <label htmlFor="learnings">Learnings</label>
        <input
          type="text"
          name="learnings"
          id="learnings"
          ref={learningsRef}
          defaultValue={defaultValues ? learnings : ""}
        />
      </div>
      <Button
        type="submit"
        fill="filled"
        textContent={queryType === "update" ? "Update" : "Create"}
      />
    </form>
  );
}
