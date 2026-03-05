import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "72ch",
            a: {
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": { textDecoration: "underline" },
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },
            code: {
              fontWeight: "400",
              backgroundColor: "var(--tw-prose-pre-bg)",
              padding: "0.2em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "0.875em",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
