module.exports = {
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "<rootDir>/test-environment.ts",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
