import config from "@utils/particlesConfig";
import isScreenLargerThan from "@utils/screenSize";
import React, { useEffect, useState } from "react";
import Particles from "react-particles-js";

export default function AnimatedParticles() {
  const [loadParticles, setLoadParticles] = useState(false);

  useEffect(() => {
    if (isScreenLargerThan("768")) {
      config.particles.number.value = 50;
    }
    setTimeout(() => setLoadParticles(true), 1000);
  }, []);

  return loadParticles ? <Particles params={config} /> : null;
}
