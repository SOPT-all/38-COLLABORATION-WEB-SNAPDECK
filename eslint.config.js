import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierConfig from "eslin-config-prettier";
import prettierPlugin, { rules } from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node-modules"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      import: importPlugin,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "prettier/prettier": error,

      curly: ["warn", "all"],
      "no-console": "warn",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^react", "^@?\\w"], ["^@/"], ["^\\.\\./"], ["^\\./"], ["^.+\\.css$"]],
        },
      ],
      "simple-import-sort/exports": "error",
    },
  },
]);
