import { Given, When, Then } from "@cucumber/cucumber";
import PoManager from "../../tests/PageObjects/Pomanager.js";
import { test,expect } from "@playwright/test";

Given(
  "a login to Ecommerce application with some {string} and {string}", {timeout: 100*1000},
  async function (username, password) {
    
    // this.pageObjectManager = new PoManager(this.page);
    const loginPage = this.pageObjectManager.loginPage();
    // const dashboardPage = pageObjectManager.dashboardPage();
    // const productName = data.productName;
    this.email = "user111@yopmail.com";

    await loginPage.goto();
    await loginPage.validLogin(username, password);
  },
);

When("I add {string} to cart", async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const dashboardPage = this.pageObjectManager.dashboardPage();
    await dashboardPage.searchProducts(productName);
    await dashboardPage.navigateToCart();
});
Then("verify that {string} is displayed in the Cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  await this.page.locator("div li").nth(1).waitFor(); // this waits for elements to be displayed on the page., we are using this method because auto-waiting is not been implemeted for isvisible.
      const bool = await this.page.locator(`h3:has-text("${productName}")`).isVisible(); // this method returns a boolean value.
      // from playwright, auto wating is not been implemented
      await expect(bool).toBeTruthy();
      await this.page.locator('[type="button"]').last().click();
      await this.page.locator('[placeholder="Select Country"]').pressSequentially("ind"); // press sequentially is used to type in letters in an input field one after the other., add delay to enable the server provide a response prior to the delay.
      // Handling auto-suggestion dropdowns in playwright.
      const options = this.page.locator("[class*='ta-results']");
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
  
      await expect(this.page.locator(".user__name [type='text']").first()).toHaveText(
        this.email,
      ); // checking that email is displayed on page
      await this.page.locator(".action__submit").click();
  
      // asertions after placing order for a product
      await expect(this.page.locator(".hero-primary")).toHaveText(
        "Thankyou for the order.",
      );
       this.orderId = await this.page
        .locator(".em-spacer-1 .ng-star-inserted")
        .textContent();
      // console.log(orderId);
});
When("enter value details and place order", async function () {
  await this.page.locator("button[routerlink*='myorders']").click();
  await this.page.locator("tbody").waitFor(); // because we need to wait for data to be fetched;
  const rows = await this.page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    console.log(rowOrderId);
    if (this.orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
});
Then("verify order is displayed on the OrderHistory", async function () {
  // Write code here that turns the phrase above into concrete actions
  const orderIdDetails = await this.page.locator(".col-text").textContent();
      await expect(this.orderId.includes(orderIdDetails)).toBeTruthy();
});
 Given(
   "a login to Ecommerce2 application with some {string} and {string}",{timeout:10*1000},
   async function (username, password) {
     await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      await this.page.locator("[name='username']").fill(username);
      await this.page.locator("[name='password']").fill(password);
      await this.page.locator("#signInBtn").click();
   },
 );

Then("Verify that error Message is displayed", async function () {
  //  // default playwright wait `
   console.log(await this.page.locator("[style*='block']").textContent());
   await expect(this.page.locator("[style*='block']")).toContainText(
     "Incorrect username/password.",
   );
});



