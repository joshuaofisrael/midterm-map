import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#1a2332",
          muted: "#4a5568",
          soft: "#6b7280",
        },
        paper: {
          DEFAULT: "#f6f7f9",
          card: "#ffffff",
          tint: "#eef2f6",
        },
        navy: {
          DEFAULT: "#1e4a73",
          deep: "#143251",
          mid: "#2b5f8f",
          soft: "#d7e4f2",
          wash: "#eef3f8",
        },
        line: {
          DEFAULT: "#d5dde6",
          strong: "#b7c3d0",
        },
        demo: {
          DEFAULT: "#7a5b12",
          wash: "#f7f0d8",
          line: "#e4d39a",
        },
        notice: {
          DEFAULT: "#1e4a73",
          wash: "#e8eef5",
          line: "#c5d4e6",
        },
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-source-serif)", "ui-serif", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 36, 56, 0.06), 0 8px 24px rgba(20, 36, 56, 0.05)",
      },
      maxWidth: {
        site: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
