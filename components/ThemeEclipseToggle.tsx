"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export default function ThemeEclipseToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  if (!resolvedTheme) return <span className="eclipse-toggle" aria-hidden="true" />;
  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      type="button"
      className="eclipse-toggle"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.9 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <motion.circle
          cx="20"
          cy="20"
          r="8"
          animate={{ fill: isDark ? "#fbbf24" : "#ea580c", scale: isDark ? 1 : 1.12 }}
          transition={{ duration: 0.35 }}
        />
        <motion.g
          animate={{ rotate: isDark ? 45 : 0, opacity: isDark ? 0 : 1, scale: isDark ? 0.6 : 1 }}
          transition={{ duration: 0.35 }}
          style={{ transformOrigin: "20px 20px" }}
          stroke="#ea580c"
          strokeWidth="2"
          strokeLinecap="round"
        >
          {[0, 45, 90, 135].map((angle) => <line key={angle} x1="20" y1="3" x2="20" y2="7" transform={`rotate(${angle} 20 20)`} />)}
          {[0, 45, 90, 135].map((angle) => <line key={`opposite-${angle}`} x1="20" y1="33" x2="20" y2="37" transform={`rotate(${angle} 20 20)`} />)}
        </motion.g>
        <motion.circle
          cx="23"
          cy="17"
          r="8"
          fill="var(--bg)"
          animate={{ opacity: isDark ? 1 : 0, x: isDark ? 3 : 0, y: isDark ? -2 : 0 }}
          transition={{ duration: 0.35 }}
        />
      </svg>
    </motion.button>
  );
}
