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
        success: "#3870F9",
        error: "#DF454A",
        primary: "#5E97FC",
        secondary: "#DFEAFE",
        third: "#385B97",
        forth: "#263C65",
        scoreBackground: "#F3F3F3",
        gray: {
          100: "#E6E6E7",
          200: "#CDCDCF",
          300: "#DBDCDE",
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
