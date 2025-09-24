import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: "#AA95C6",
        charcoal: "#1E1F29",
        "off-white": "#E9ECEB",
        violet: "#9286B5",
        mint: "#84D594",
        magenta: "#DFA4D8",
        error: "#FF6B6B",
        warning: "#FFD93D",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
