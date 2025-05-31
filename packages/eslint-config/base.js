import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import preferArrow from "eslint-plugin-prefer-arrow";
import unicorn from "eslint-plugin-unicorn";
import promisePlugin from "eslint-plugin-promise";
import security from "eslint-plugin-security";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  unicorn.configs["flat/recommended"],
  promisePlugin.configs["flat/recommended"],
  security.configs.recommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      turbo: turboPlugin,
      "unused-imports": unusedImports,
      "prefer-arrow": preferArrow,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-var-requires": "error",
      "unicorn/prefer-module": "error",
      "import/no-commonjs": "error",
      
      "turbo/no-undeclared-env-vars": "error",
      
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/prefer-readonly": "error",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/prefer-ts-expect-error": "error",
      "@typescript-eslint/no-confusing-void-expression": "error",
      "@typescript-eslint/no-meaningless-void-operator": "error",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/no-useless-empty-export": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",
      "import/order": ["error", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }],
      "import/no-duplicates": "error",
      "import/no-unresolved": "off",
      "import/no-cycle": "error",
      "import/no-self-import": "error",
      
      // "prefer-arrow/prefer-arrow-functions": ["error", {
      //   "disallowPrototype": true,
      //   "singleReturnOnly": false,
      //   "classPropertiesAllowed": false
      // }],
      
      // "no-console": "error",
      // "no-debugger": "error",
      // "no-alert": "error",
      // "no-var": "error",
      // "prefer-const": "error",
      // "no-unused-expressions": "error",
      // "no-implicit-coercion": "error",
      // "no-magic-numbers": ["error", { "ignore": [0, 1, -1] }],
      // "complexity": ["error", 10],
      // "max-depth": ["error", 3],
      // "max-lines-per-function": ["error", 50],
      // "max-params": ["error", 3],
      
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-node-protocol": "off",
    }
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", ".next/**", ".turbo/**"],
  },
];
