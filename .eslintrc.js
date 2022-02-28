const prettierConfig = require("./prettier.config");

module.exports = {
  parser: "babel-eslint",
  env: {
    node: true,
    es6: true
  },
  plugins: ["prettier", "jest"],
  extends: ["unobtrusive", "unobtrusive/import", "prettier"],
  rules: {
    "prettier/prettier": [2, prettierConfig],
    "import/no-unresolved": 0,
    "import/no-commonjs": 0,
    "import/no-extraneous-dependencies": 0,
    "import/order": "warn",
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "global-require": "warn",
    "no-unused-vars": ["warn", { args: "none", varsIgnorePattern: "^_" }]
  },
  overrides: [
    {
      files: ["test/**/*.js"],
      env: {
        "jest/globals": true
      },
      globals: {
        expectedExports: true
      },
      // Rules for jest tests
      // https://github.com/jest-community/eslint-plugin-jest
      //
      // * Disallow disabled tests
      // * Disallow focused tests
      // * Do not repeat test case names
      // * Do not import "jest"
      // * Prefer toBeNull, toBeUndefined, and toHaveLength instead of toBe(xxx)
      // * Disallow invalid "describe" callbacks"
      // * Disallow malformed expects
      //
      rules: {
        "jest/no-disabled-tests": "error",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/no-jest-import": "error",
        "jest/no-test-return-statement": "error",
        "jest/prefer-to-be-null": "warn",
        "jest/prefer-to-be-undefined": "warn",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-describe": "error",
        "jest/valid-expect": "error"
      }
    }
  ]
};
