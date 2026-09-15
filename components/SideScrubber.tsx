"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function SideScrubber() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const depth = useTransform(scrollYProgress, (value) => `SYS.ALT // ${Math.round(value * 2400)}`);

  return (
    <aside className="side-scrubber" aria-label="Page depth telemetry">
      <div className="side-scrubber-track">
        <motion.span className="side-scrubber-dot" style={{ top }} />
        <motion.span className="side-scrubber-label mono">{depth}</motion.span>
      </div>
    </aside>
  );
}
