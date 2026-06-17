import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "gemini-pulse": "geminiPulse 1.8s infinite ease-in-out",
      },
      keyframes: {
        geminiPulse: {
          "0%, 100%": { transform: "scale(0.7)", opacity: "0.2" },
          "50%":       { transform: "scale(1.4)", opacity: "1"   },
        },
      },
    },
  },
  plugins: [],
};

export default config;