import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    clearMocks: true,
    roots: ["<rootDir>/src"],
    setupFiles: ["<rootDir>/jest.setup.ts"],
    setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
    testMatch: ["**/*.test.ts"],
}

export default config;