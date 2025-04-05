import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@repo/ui/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@repo/ui/**/*.{js,ts,jsx,tsx}",
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
        label: [" 1.125rem", { fontWeight: "600" }],
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
        mobile: { max: "640px" },
      },
    },
  },
  plugins: [],
};

export default config;
