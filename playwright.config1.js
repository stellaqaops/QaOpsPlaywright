// @ts-check
import { defineConfig, devices } from "@playwright/test";
// import { permission } from "node:process";

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
  // assertion ti,eouts
  retries: 1, // this means that failed tests will  be retried one more timechr
  // workers:1,
  projects: [
    {
      name: "chromium",
      use: {
        browserName: "chromium",
        headless: true,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: "on",
        // trace: "on",
        trace: "on",
        // viewport:{width:720, height:720} // running on several view ports
        // ...devices['Pixel 10'] ,// running test on mobile
        permission: ['geolocation'], // google would always allow  location permission with this
        // ignoreHTTPSErrors:true
        // video:'retain-on-failure'
      },
    },
    {
      name: "firfox",
      use: {
        browserName: "firefox",
        headless: true,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: "on",
        // trace: "on",
        trace: "on",
      },
    },
  ],
  expect: {
    timeout: 40 * 1000, // by defaults , it is 5 seconds , but
  },
  // workers: 2,
  reporter: "html",
  // use: {
  //   browserName: "chromium",
  //   headless: true,
  //   actionTimeout: 10 * 1000,
  //   navigationTimeout: 30 * 1000,
  //   screenshot: "on",
  //   // trace: "on",
  //   trace: "on",
  // },
});
