import { expect } from "@playwright/test";
import { customTest } from "../tests/utils/fixtures";

customTest(
  "fixture demo ",
  async ({ authenticatedPage, createOrders, testDataForOrder }) => {
    // a reusable fixture :   is the reusable code for setup and tear down across test.
    // it can be reused by matching  parametr name
    // here the authenticated page is my fixture and i can actually use them on my test
    // playwright ensures that two fixtures are executed before going into
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(
      authenticatedPage.getByText(createOrders.orderId),
    ).toBeVisible();
      console.log(testDataForOrder.productName)
     
  },
);
