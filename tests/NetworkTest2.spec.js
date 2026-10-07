import { test, expect } from "@playwright/test";
const fakeResponse = "";

test("Security test request intercept", async ({ page }) => {
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "user111@yopmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password1@");
    await page.locator('[value="Login"]').click();
    // implement wait mechanism to wait for the page to load and the products to be displayed
    await page.waitForLoadState("networkidle"); //this helps us to wait for data fetching to be completed from the server..
    await page.locator(".card-body b").first().waitFor(); // this works when the locator returns a single elemens
    
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
  // here we are intercepting a get request, we change the initial id to something else so when someone calls on the id then it changes the id to something else.
  // Intercepting a response and replaceing it on the browser with a mocked response is different from interceptig the
    // the continue method is used to intercept the request calls
    // here is how to intercept your request calls with continue method
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) => {
      return route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=1a9c2934e7cd69710fc19708",
      });
    },
  );

  await page.locator('button:has-text("View")').first().click();
  await expect(page.locator("p").last()).toHaveText('You are not authorize to view this order')
});
