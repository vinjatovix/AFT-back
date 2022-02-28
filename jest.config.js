module.exports = {
  testEnvironment: "node",
  testRegex: "/test/.*[-.]test\\.js?$",
  modulePathIgnorePatterns: ["<rootDir>/.yarn_cache"],
  setupFiles: [
    // Include additional expectations
    //
    // * expectedExports
    // * expect.toBeAComponent
    // * expect.toBeAFunction
    //
  ],

  snapshotSerializers: [],
  collectCoverage: false,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js"],
  coverageReporters: ["text", "html", "lcov", "clover"],
  testResultsProcessor: "jest-bamboo-reporter",
  watchPathIgnorePatterns: ["<rootDir>/test-report.json"],
  reporters: ["default", "jest-sonar"],
  testRegex: "/test/.*\\.test\\.js$",
  watchPathIgnorePatterns: ["<rootDir>/test-report.json", "<rootDir>/docker/"],
  setupFiles: [...amigaConfig.setupFiles, "<rootDir>/test/fixtures/setup.js"]
};
