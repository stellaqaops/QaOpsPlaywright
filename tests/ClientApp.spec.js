import { test, expect } from "@playwright/test";

test("client app", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("user111@yopmail.com");
  await page.locator("#userPassword").fill("Password1@");
  await page.locator('[value="Login"]').click();
  // implement wait mechanism to wait for the page to load and the products to be displayed
  await page.waitForLoadState("networkidle"); //this helps us to wait for data fetching to be completed from the server..
  await page.locator(".card-body b").first().waitFor()// this works when the locator returns a single elemens
    const title = await page.locator(".card-body b").allTextContents();
  console.log(title)
  

  
})