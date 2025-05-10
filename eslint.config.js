import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import typescript from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Base configurations
  js.configs.recommended,
  ...typescript.configs.recommended,
  {
    // React configurations
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"], // Required for React 17+
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        project: ["./tsconfig.json"],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Keep existing rule overrides
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-curly-brace-presence": "warn",
      "react/display-name": "warn",
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    // React Hooks configuration
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
  },
  {
    // JSX-A11Y configuration
    plugins: {
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      ...jsxA11yPlugin.configs.recommended.rules,
    },
  },
  {
    // Ignores - preserving current ignores and adding new ones
    ignores: ["vendor", "node_modules", "public", "bootstrap/ssr", "tailwind.config.js", "dist"],
  },
  {
    files: [["*.config.ts"], ["*.config.js"]],
    languageOptions: {
      parser: undefined, // Use default JS parser instead of TypeScript
      parserOptions: {
        project: null, // Disable TypeScript project checking for this file
      },
    },
  },
  prettier, // Turn off all rules that might conflict with Prettier
];
