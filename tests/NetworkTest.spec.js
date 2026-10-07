import { test, request, expect } from "@playwright/test";
import ApiUtils from "./utils/Apiutils";
const loginPayload = {
  userEmail: "user111@yopmail.com",
  userPassword: "Password1@",
};
const fakePayloadOrders = { data: [], message: "No Orders" };
const orderPayload = {
  orders: [
    {
      country: "Cuba",
      productOrderedId: "6960eac0c941646b7a8b3e68",
    },
  ],
};
let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new ApiUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test.afterEach(() => {});

test("Web API", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  const products = page.locator(".card-body");
  const productName = "ZARA COAT 3";
  const email = "user111@yopmail.com";
  await page.goto("https://rahulshettyacademy.com/client/");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a8dae8221054ba465f1f648",
    async (route) => {
      //We call an endoiint
      //Get a response
      //We then intercept that response and then send our own response to the browser, server will give me an actual response, but playwright can help me to simulate a better response
      const response = await page.request.fetch(route.request()); // this makes a get api call from the intercepted request
      let body = JSON.stringify(fakePayloadOrders); // converts javascript object to json
      route.fulfill({
        response,
        body,
      }); // this is wehere we send  the response to the browser to render on the ui,
      // we fake a fake response instead, we are overiding the original response with a fake one
    },
  );

  // await page.locator("#userEmail").fill(email);
  // await page.locator("#userPassword").fill("Password1@");
  // implement wait mechanism to wait for the page to load and the products to be displayed
  await page.waitForLoadState("networkidle"); //this helps us to wait for data fetching to be completed from the server..
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a8dae8221054ba465f1f648",
  );
  // await page.locator("tbody").waitFor(); // because we need to wait for data to be fetched;
  // const rows = await page.locator("tbody tr");
  const test = await page.locator(".mt-4").textContent();
  console.log(test);
});

// Check that the order created is displayed in history page
