import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@repo/shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        titleLarge: [" 3rem", { lineHeight: "3.6rem", fontWeight: "600" }],
        titleMedium: ["2.25rem", { lineHeight: "2.7rem", fontWeight: "600" }],
        titleSmall: ["1.5rem", { lineHeight: "1.8rem", fontWeight: "600" }],
        body1: ["1.125rem", { lineHeight: "1.35rem", fontWeight: "600" }],
        body2: ["1rem", { lineHeight: "1.2rem", fontWeight: "600" }],
        body3: ["1rem", { lineHeight: "1.2rem", fontWeight: "400" }],
        body4: ["0.875rem", { lineHeight: "1.05rem", fontWeight: "600" }],
        body5: ["0.875rem", { lineHeight: "1.05rem", fontWeight: "400" }],
        label: [" 1.125rem", { fontWeight: "600" }],
        title4s: ["2rem", { lineHeight: "3rem", fontWeight: "600" }],
        h1e: ["2.75rem", { lineHeight: "4.125rem", fontWeight: "800" }],
        h2e: ["2.5rem", { lineHeight: "3.75rem", fontWeight: "800" }],
        h3e: ["2.25rem", { lineHeight: "3.375rem", fontWeight: "800" }],
        h4e: ["2rem", { lineHeight: "3rem", fontWeight: "800" }],
        h4s: ["2rem", { lineHeight: "3rem", fontWeight: "600" }],
        body1e: ["1.5rem", { lineHeight: "2.25rem", fontWeight: "800" }],
        body1s: ["1.5rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        body2e: ["1.25rem", { lineHeight: "1.5rem", fontWeight: "800" }],
        body2s: ["1.25rem", { lineHeight: "1.5rem", fontWeight: "600" }],
        body3e: ["1rem", { lineHeight: "1.5rem", fontWeight: "800" }],
        body3s: ["1rem", { lineHeight: "1.5rem", fontWeight: "600" }],
      },
      colors: {
        tropicalblue: {
          50: "#EFF5FF",
          100: "#DFEAFE",
          200: "#BFD5FE",
          300: "#9EC1FD",
          400: "#7EACFD",
          500: "#5E97FC",
          600: "#4B79CA",
          700: "#385B97",
          800: "#263C65",
          900: "#131E32",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      borderRadius: {
        none: "0",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "1000px",
      },
    },
  },
  plugins: [],
};

export default config;
