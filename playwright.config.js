// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests", // this is the test directory
  timeout: 50 * 1000, // by default, playwright waits for 30 seconds for element to be executed but we can now overide that configuration. once overide, it would be applicable to all the individual tests test globally
  // assertion timeouts
  expect: {
    timeout: 40 * 1000, // by defaults , it is 5 seconds , but
  },
  workers: 2,
  // headless:"true",
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: true,
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    screenshot: "on",
    // trace: "on",
    trace: "on",
    // headless: true,
  },
});
