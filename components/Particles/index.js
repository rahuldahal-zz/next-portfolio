import config from "@utils/particlesConfig";
import isScreenLargerThan from "@utils/screenSize";
import React, { useEffect, useState } from "react";
import Particles from "react-particles-js";

export default function AnimatedParticles() {
  const [, setIsScreenWide] = useState(false);

  useEffect(() => {
    if (isScreenLargerThan("768")) {
      config.particles.number.value = 50;
      setIsScreenWide(true);
    }
  }, []);

  return <Particles params={config} />;
}
