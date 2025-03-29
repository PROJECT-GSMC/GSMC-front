import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@repo/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontWeight: {
        semibold: "600",
        regular: "400",
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
      },
    },
  },
  plugins: [],
};

export default config;
