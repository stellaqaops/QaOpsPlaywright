import { test as base, request } from "@playwright/test";
import ApiUtils from "./Apiutils";
const loginPayload = {
  userEmail: "user111@yopmail.com",
  userPassword: "Password1@",
};
const orderPayload = {
  orders: [
    {
      country: "Cuba",
      productOrderedId: "6960eac0c941646b7a8b3e68",
    },
  ],
};

export const customTest = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // const newContext = await browser.newContext();
    // const page = await newContext.newPage();
    const email = "user111@yopmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password1@");
    await page.locator('[value="Login"]').click();
    await page.waitForLoadState("networkidle");
    await use(page);
  },
  createOrders: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
      await use(response);
      await apiContext.dispose()// this is a tear down method
    },
    testDataForOrder: {
      productName:'addidas'
    }
    
});
