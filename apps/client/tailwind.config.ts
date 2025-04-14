import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Pick<Config, "presets" | "theme"> = {
  presets: [sharedConfig],

  theme: {
    borderRadius: {
      none: "0",
      sm: "0.375rem", // 6px
      md: "0.5rem", // 8px
      lg: "0.75rem", // 12px
      xl: "1rem", // 16px
      "2xl": "1.5rem", // 24px
      "3xl": "2rem", // 32px
      full: "9999px", // 완전한 원형
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    fontSize: {
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
  },
};

export default config;
