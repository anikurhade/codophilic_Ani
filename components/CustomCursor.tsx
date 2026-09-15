"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useSpring(useMotionValue(-20), { stiffness: 500, damping: 28 });
  const y = useSpring(useMotionValue(-20), { stiffness: 500, damping: 28 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const handleOver = (event: MouseEvent) => setHovering(Boolean((event.target as Element).closest("a, button")));
    const handleOut = (event: MouseEvent) => setHovering(Boolean((event.relatedTarget as Element | null)?.closest("a, button")));
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [x, y]);

  if (!enabled) return null;
  return <motion.span className="custom-cursor" aria-hidden="true" style={{ x, y, scale: hovering ? 2.5 : 1 }} />;
}
