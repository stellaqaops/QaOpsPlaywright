// import { chromium } from "playwright";
import PoManager from "../../tests/PageObjects/Pomanager.js";
import { Before,  After,AfterStep, BeforeStep,Status } from "@cucumber/cucumber";
import { chromium } from "playwright";
Before(async function () {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.pageObjectManager = new PoManager(this.page);
});

After(function () {
  // Assuming this.driver is a selenium webdriver
  console.log("after");
});

// BeforeStep({ tags: "@foo" }, function () {
//   // This hook will be executed before all steps in a scenario with tag @foo
// });

AfterStep( async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.png" });
  }
});