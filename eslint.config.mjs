import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["public/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser
    }
  },
  {
    files: ["public/js/code.js"],
    rules: {
      "no-unused-vars": ["error", {
        "varsIgnorePattern": "^(doLogin|doLogout|addColor|searchColor|readCookie)$"
      }],
      "eqeqeq": "error",
      "no-var": "error",
      "prefer-const": "error"
    }
  },
  {
    files: ["public/js/md5.js"],
    languageOptions: {
      globals: {
        module: "readonly"
      }
    }
  }
];
