import React, { useEffect } from "react";
import Admin from "@components/Admin";
import LoaderOverlay from "@components/LoaderOverlay";
import { hideLoader } from "@utils/loader";

export default function AdminPage() {
  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <>
      <Admin />
      <LoaderOverlay />
    </>
  );
}
