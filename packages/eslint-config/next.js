import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...baseConfig,
  {
    ...pluginReact.configs.flat.recommended,
    ...pluginReact.configs.flat["jsx-runtime"],
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@next/next/no-unwanted-polyfillio": "error",
      "@next/next/no-before-interactive-script-outside-document": "error",
      "@next/next/inline-script-id": "error",
    },
  },
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { 
      react: { 
        version: "detect" 
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off", 
      "react/no-unescaped-entities": "error",
      "react/no-danger": "error",
      "react/no-danger-with-children": "error",
      "react/no-deprecated": "error",
      "react/no-find-dom-node": "error",
      "react/no-render-return-value": "error",
      "react/no-string-refs": "error",
      "react/no-unsafe": "error",
      "react/no-unused-prop-types": "error",
      "react/no-unused-state": "error",
      // "react/prefer-stateless-function": "error",
      "react/self-closing-comp": "error",
      "react/sort-comp": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-no-bind": "error",
      "react/jsx-no-constructed-context-values": "error",
      "react/jsx-no-leaked-render": "error",
      "react/jsx-no-useless-fragment": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-sort-props": ["error", { "callbacksLast": true, "shorthandFirst": true }],
      
      // "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      
      "no-console": "warn",
    },
  },
];
