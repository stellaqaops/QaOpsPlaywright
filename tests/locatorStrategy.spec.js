import { test, expect } from "@playwright/test";

test("playwright special locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Female");

  // when they is a typing scope then get by label does not really work like that

  // get by placeholder
  await page.getByPlaceholder("Password").fill("Password123");
  await page.getByRole("button", { name: "Submit" }).click();

  // assertion verse non assertion 
  // the outcome of an assertion can make a test pass or fail for instance visible and tobevisible

  
  await page .getByText("Success! The Form has been submitted successfully!.") .isVisible();
    
  // asertion would faile the test in playwright when the  assertion fails but the above cannot fail the test. by default, assertions wait for 5 seconds
  // 5 sceonds before timeout for expect assertions
  // but it takes more than 5 seconds and the client is happy that its taken more than 5 seconds then we need to wrap the timeout . the customized timeout is going to overide or increase the original timeout 
  await expect(page .getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000})
  await page.getByRole("link", { name: "Shop" }).click();
  /// we have used special locators to create powerful chaining incase we dont want to use loop
  await page
    .locator("app-card")
    .filter({ hasText: "iphone X" })
    .getByRole("button")
    .click();
  
  
});
test("test level timeouts", async ({ page }) => {
  const slowExpect = expect.configure({ timeout: 9000 })
  test.setTimeout(60000) // the test timeout overides the global timeout configuration 
  page.setDefaultTimeout(90000) // this is an action timeout that is being set up in the test level
  // test timeout is different from assertion timeouts
  // settings timeout in the test level and if i think the page is loading slowly and is not processing immidiately
  // step level
  // global level time out and step level timeoutouts
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Female");

  // when they is a typing scope then get by label does not really work like that

  // get by placeholder
  await page.getByPlaceholder("Password").fill("Password123");
  await page.getByRole("button", { name: "Submit" }).click();
  // assertion verse non assertion
  // the outcome of an assertion can make a test pass or fail for instance visible and tobevisible

  await page .getByText("Success! The Form has been submitted successfully!.") .isVisible();

  // asertion would faile the test in playwright when the  assertion fails but the above cannot fail the test. by default, assertions wait for 5 seconds
  // 5 sceonds before timeout for expect assertions
  // but it takes more than 5 seconds and the client is happy that its taken more than 5 seconds then we need to wrap the timeout . the customized timeout is going to overide or increase the original timeout
  await expect(page.getByText("Success! The Form has been submitted successfully!."),).toBeVisible({ timeout: 10_000 });
  // oder of timeouts , it follows the test level, in case you have any
  //  action timeout on the global level, the test level  
  // takes priority but if they is any timeouts in the global level 
  // then step level takes the high priority 
  await page.getByRole("link", { name: "Shop" }).click({timeout:15000}); // this is an action timeout set on the test level
  /// we have used special locators to create powerful chaining incase we dont want to use loop
  await page .locator("app-card").filter({ hasText: "iphone X" }).getByRole("button").click();
  await slowExpect ( page.locator("h1:has-text('Shop Name')")).toHaveText('Shop Name'); 
  
  
});
