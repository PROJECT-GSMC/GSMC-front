import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "content" | "presets" | "theme"> = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        tropicalblue: {
          50: "#EFF5FF",
          400: "#5E97FC",
        },
        main: {
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
        error: {
          100: "#F9DADB",
          200: "#F2B5B7",
          300: "#EC8F92",
          400: "#E56A6E",
          500: "#DF454A",
          600: "#B2373B",
          700: "#86292C",
          800: "#591C1E",
          900: "#2D0E0F",
        },
        gray: {
          100: "#E6E6E7",
          200: "#CDCDCF",
          300: "#B4B5B7",
          400: "#9B9C9F",
          500: "#828387",
          600: "#68696C",
          700: "#4E4F51",
          800: "#343436",
          900: "#1A1A1B",
        },
      },
    },
  },
};

export default config;
