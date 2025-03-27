import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      fontWeights: {
        Semibold: 600, // title, body1, 2
        regular: 400, // body3, label
      },
      fontSize: {
        titleLarge: "3rem",
        titleMedium: "2.25rem",
        titleSmall: "1.5rem",
        body1: "1.125rem",
        body: "1rem",
        label: "0.875rem",
      },
      lineHeight: {
        high: "3.6rem",
        medium: "1.8rem",
        small: "1.05rem",
      },
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
  plugins: [],
};
export default config;
