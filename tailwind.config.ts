import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#09090b",
        slate: "#18181b",
        sunset: "#f97316",
        gold: "#fbbf24",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.06em",
      },
      boxShadow: {
        sunset: "0 0 32px rgba(249, 115, 22, 0.24)",
      },
    },
  },
  plugins: [],
};

export default config;
