import { test, expect } from "@playwright/test";
import LoginPage from "./PageObjects/LoginPage";
import DashboardPage from "./PageObjects/DashboardPage";
import PoManager from "./PageObjects/Pomanager";
import { CustomTest }  from "./utils/test-base";
// import { placeHolderTestData } from './utils/placeholderTestData.json'
import placeHolderTestData from "./utils/placeholderTestData.json" with { type: "json" };
const stringData = JSON.stringify(placeHolderTestData);
const dataSet = JSON.parse(stringData);

// this is what the playwright parametirization is for
for (const data of dataSet) {
  test(`first test2 ${data.productName}`, async ({ page }) => {
    const pageObjectManager = new PoManager(page);
    const loginPage = pageObjectManager.loginPage();
    const dashboardPage = pageObjectManager.dashboardPage();
    const productName = data.productName;
    const email = "user111@yopmail.com";

    await loginPage.goto();
    await loginPage.validLogin(data.email, data.password);

    // implement wait mechanism to wait for the page to load and the products to be displayed
    //this helps us to wait for data fetching to be completed from the server..
    const products = await page.locator(".card-body");
    // await page.locator(".card-body b").first().waitFor(); // this works when the locator returns a single elemens
    await dashboardPage.searchProducts(productName);
    await dashboardPage.navigateToCart();

    // const title = await page.locator(".card-body b").allTextContents();
    // console.log(title);
    // const count = await products.count(); // gets the counts of the elements
    // console.log(count);
    // for (let i = 0; i < count; i++) {
    //   if ((await products.nth(i).locator("b").textContent()) === productName) {
    //     console.log("true");
    //     await products.nth(i).locator("text=Add To Cart").click();
    //     console.log('clicked')
    //     break;
    //   }
    // }
    // await page.locator("[routerlink *=cart]").click();
    
    // // i commented this out

    await page.locator("div li").nth(1).waitFor(); // this waits for elements to be displayed on the page., we are using this method because auto-waiting is not been implemeted for isvisible.
    const bool = await page.locator(`h3:has-text("${productName}")`).isVisible(); // this method returns a boolean value.
    // from playwright, auto wating is not been implemented
    await expect(bool).toBeTruthy();
    await page.locator('[type="button"]').last().click();
    await page.locator('[placeholder="Select Country"]').pressSequentially("ind"); // press sequentially is used to type in letters in an input field one after the other., add delay to enable the server provide a response prior to the delay.
    // Handling auto-suggestion dropdowns in playwright.
    const options = page.locator("[class*='ta-results']");
    await options.waitFor();
    const optionCount = await options.locator("button").count();
    for (let i = 0; i < optionCount; i++) {
        const text = await options.locator("button").nth(i).textContent();
        console.log(text)
      if (text.trim() === "India") {
        await options.locator("button").nth(i).click();
        break;
      }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(
      email,
    ); // checking that email is displayed on page
    await page.locator(".action__submit").click();

    // asertions after placing order for a product
    await expect(page.locator(".hero-primary")).toHaveText(
      "Thankyou for the order.",
    );
    const orderId = await page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();
    console.log(orderId);

    // checking my orders
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor(); // because we need to wait for data to be fetched;
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < (await rows.count()); i++) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      console.log(rowOrderId);
      if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator("button").first().click();
        break;
      }
    }

    const orderIdDetails = await page.locator(".col-text").textContent();
    await expect(orderId.includes(orderIdDetails)).toBeTruthy();
  //   // await page.pause()

  //   // jara coat 4
  });
}

  // CustomTest.only("Fixture Test", async ({ page, testDataForOrder }) => {
  //   const pageObjectManager = new PoManager(page);
  //   const loginPage = pageObjectManager.loginPage();
  //   const dashboardPage = pageObjectManager.dashboardPage();
  //   // const productName = data.productName;
  //   const email = "user111@yopmail.com";

  //   await loginPage.goto();
  //   // await page.waitForLoadState('domcontentloaded')
  //   await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);
  //   // await page.locator(" b").first().click()
  // });
