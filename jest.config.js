module.exports = {
  testEnvironment: "node",
  testRegex: "/test/.*[-.]test\\.js?$",
  modulePathIgnorePatterns: ["<rootDir>/.yarn_cache"],
  setupFiles: ["<rootDir>/test/fixtures/setup.js"],
  snapshotSerializers: [],
  collectCoverage: false,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js"],
  coverageReporters: ["text", "html", "lcov", "clover"],
  watchPathIgnorePatterns: ["<rootDir>/test-report.json"],
  reporters: ["default"]
};
