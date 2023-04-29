import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFilesAfterEnv: ["jest-extended/all"],
  // setupFilesAfterEnv: ["<rootDir>/src/test/jest.matchers.ts"],
  globalSetup: "<rootDir>/src/__test__/globalSetup.ts",
  globalTeardown: "<rootDir>/src/__test__/globalTeardown.ts",
};

export default config;
