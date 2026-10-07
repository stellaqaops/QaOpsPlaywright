# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EcommerceLoginIMPL.spec.js >> @Web Client app
- Location: tests/EcommerceLoginIMPL.spec.js:13:1

# Error details

```
TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('div li').nth(1) to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [aria-hidden] [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import LoginPage from "./PageObjects/LoginPage";
  3   | import DashboardPage from "./PageObjects/DashboardPage";
  4   | import PoManager from "./PageObjects/Pomanager";
  5   | import { CustomTest }  from "../tests/utils/test-base";
  6   | // import { placeHolderTestData } from './utils/placeholderTestData.json'
  7   | import placeHolderTestData from "./utils/placeholderTestData.json" with { type: "json" };
  8   | const stringData = JSON.stringify(placeHolderTestData);
  9   | const dataSet = JSON.parse(stringData);
  10  | 
  11  | // this is what the playwright parametirization is for
  12  | 
  13  | test(`@Web Client app`, async ({ page }) => {
  14  |   const pageObjectManager = new PoManager(page);
  15  |   const loginPage = pageObjectManager.loginPage();
  16  |   const dashboardPage = pageObjectManager.dashboardPage();
  17  |   const productName = "ZARA COAT 3"
  18  |   const email = "user111@yopmail.com"
  19  | 
  20  | 
  21  |   await loginPage.goto();
  22  |   await loginPage.validLogin(email, "Password1@");
  23  | 
  24  |   // implement wait mechanism to wait for the page to load and the products to be displayed
  25  |   //this helps us to wait for data fetching to be completed from the server..
  26  |   const products = await page.locator(".card-body");
  27  |   // await page.locator(".card-body b").first().waitFor(); // this works when the locator returns a single elemens
  28  |   
  29  | 
  30  |   const title = await page.locator(".card-body b").allTextContents();
  31  |   console.log(title);
  32  |   const count = await products.count(); // gets the counts of the elements
  33  |   console.log(count);
  34  |   for (let i = 0; i < count; i++) {
  35  |     if ((await products.nth(i).locator("b").textContent()) === productName) {
  36  |       console.log("true");
  37  |       await products.nth(i).locator("text=Add To Cart").click();
  38  |       console.log('clicked')
  39  |       break;
  40  |     }
  41  |   }
  42  |   await page.locator("[routerlink *=cart]").click();
  43  |     
  44  |   // // i commented this out
  45  | 
> 46  |   await page.locator("div li").nth(1).waitFor(); // this waits for elements to be displayed on the page., we are using this method because auto-waiting is not been implemeted for isvisible.
      |                                       ^ TimeoutError: locator.waitFor: Timeout 10000ms exceeded.
  47  |   const bool = await page.locator(`h3:has-text("${productName}")`).isVisible(); // this method returns a boolean value.
  48  |   // from playwright, auto wating is not been implemented
  49  |   await expect(bool).toBeTruthy();
  50  |   await page.locator('[type="button"]').last().click();
  51  |   await page.locator('[placeholder="Select Country"]').pressSequentially("ind"); // press sequentially is used to type in letters in an input field one after the other., add delay to enable the server provide a response prior to the delay.
  52  |   // Handling auto-suggestion dropdowns in playwright.
  53  |   const options = page.locator("[class*='ta-results']");
  54  |   await options.waitFor();
  55  |   const optionCount = await options.locator("button").count();
  56  |   for (let i = 0; i < optionCount; i++) {
  57  |     const text = await options.locator("button").nth(i).textContent();
  58  |     console.log(text)
  59  |     if (text.trim() === "India") {
  60  |       await options.locator("button").nth(i).click();
  61  |       break;
  62  |     }
  63  |   }
  64  | 
  65  |   await expect(page.locator(".user__name [type='text']").first()).toHaveText(
  66  |     email,
  67  |   ); // checking that email is displayed on page
  68  |   await page.locator(".action__submit").click();
  69  | 
  70  |   // asertions after placing order for a product
  71  |   await expect(page.locator(".hero-primary")).toHaveText(
  72  |     "Thankyou for the order.",
  73  |   );
  74  |   const orderId = await page
  75  |     .locator(".em-spacer-1 .ng-star-inserted")
  76  |     .textContent();
  77  |   console.log(orderId);
  78  | 
  79  |   // checking my orders
  80  |   await page.locator("button[routerlink*='myorders']").click();
  81  |   await page.locator("tbody").waitFor(); // because we need to wait for data to be fetched;
  82  |   const rows = await page.locator("tbody tr");
  83  |   for (let i = 0; i < (await rows.count()); i++) {
  84  |     const rowOrderId = await rows.nth(i).locator("th").textContent();
  85  |     console.log(rowOrderId);
  86  |     if (orderId.includes(rowOrderId)) {
  87  |       await rows.nth(i).locator("button").first().click();
  88  |       break;
  89  |     }
  90  |   }
  91  | 
  92  |   const orderIdDetails = await page.locator(".col-text").textContent();
  93  |   await expect(orderId.includes(orderIdDetails)).toBeTruthy();
  94  |   //   // await page.pause()
  95  | 
  96  |   //   // jara coat 4
  97  | })
  98  | 
  99  |   // CustomTest.only("Fixture Test", async ({ page, testDataForOrder }) => {
  100 |   //   const pageObjectManager = new PoManager(page);
  101 |   //   const loginPage = pageObjectManager.loginPage();
  102 |   //   const dashboardPage = pageObjectManager.dashboardPage();
  103 |   //   // const productName = data.productName;
  104 |   //   const email = "user111@yopmail.com";
  105 | 
  106 |   //   await loginPage.goto();
  107 |   //   // await page.waitForLoadState('domcontentloaded')
  108 |   //   await loginPage.validLogin(testDataForOrder.email, testDataForOrder.password);
  109 |   //   // await page.locator(" b").first().click()
  110 |   // });
  111 | 
```