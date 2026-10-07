import { test, expect } from "@playwright/test";
import { it } from "node:test";

test.describe.configure({mode:'parallel'})
test("@Web first test", async ({ browser, page }) => {
  // browser and page are all playwright fixturees, we can bypass them to directly use  page
  // the browser here is an anonymous function. we need to create a fresh browser context to start a new instance
  const newContext = await browser.newContext(); // opens a new browser context without cookies
  const newPage = await newContext.newPage(); // opens a new page in the browser context
  // In this test, i;m going to be blocking a network request
  // await newPage.route("**/*.css", (route) => route.abort());
  await newPage.route("**/*.{png,jpeg,jpg}", (route) => route.abort());
  // await newPage.route("**/*.{png,jpeg,jpg}", (route) => route.);

  const userName = newPage.locator("#username");
  const signInBtn = newPage.locator("#signInBtn");
  const cardTitles = newPage.locator(".card-body a");
  newPage.on('request', request => console.log(request.url()))
  newPage.on("response", (response) => console.log(response.url(), response.status()));
  
  await newPage.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await newPage.locator("[name='username']").fill("rahulshetty");
  await newPage.locator("[name='password']").fill("Learning@830$3mK2");
  await newPage.locator("#signInBtn").click();

  // default playwright wait `
  console.log(await newPage.locator("[style*='block']").textContent());
  await expect(newPage.locator("[style*='block']")).toContainText(
    "Incorrect username/password.",
  );

  // selectors to identify elements uniquely on the page
  1; // css and expath
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signInBtn.click();
  const allDisplayedText = await newPage
    .locator(".card-body a")
    .nth(1)
    .textContent(); // getting the first element from the list
  console.log(allDisplayedText);
  console.log(await newPage.locator(".card-body a").first().textContent());
  const allTitles = await cardTitles.allTextContents(); // the text content method will not wait untill all the element is displayed. the default wait timer is 30sec
  console.log(allTitles);
});
// test("first test using page fixtures directly and skip the context", async ({ browser, page }) => {
//   // browser and page are all playwright fixturees, we can bypass them to directly use  page
//   // the browser here is an anonymous function. we need to create a fresh browser context to start a new instance
// //   const newContext = await browser.newContext(); // opens a new browser context without cookies
// //   const newPage = await newContext.newPage(); // opens a new page in the browser context
//     await page.goto("https://www.google.com/");
//     console.log(await page.title())
//      await expect(page).toHaveTitle('Google')
// });
test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signInBtn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");
  await dropdown.selectOption("consult"); // select an option from a dropdown
  // to select a radio button
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();

  await expect(page.locator(".radiotextsty").last()).toBeChecked;
  await page.locator("#terms").click();
  console.log(await expect(page.locator("#terms").last()).toBeChecked);
  await page.locator("#terms").uncheck();
  await expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  //  await page.pause();
});
test(" Child window test", async ({ browser }) => {
  const context = await browser.newContext();
  const newPage = await context.newPage();
  const userName = "#username";
  await newPage.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = newPage.locator("[href*='documents-request']");

  // they are 3 stages of promise  namely
  // promise pending, promise fulfiled and promise rejected. await waits till promise is fulfiled to get a response

  // if two sets of events are mearnt to happen asynchronously, we can use promise.all to wait for the both events to complete.
  // events such as waiting for a click event or for a context to be swiched or for a child window to be opened can be done using promise.all
  const [childPage] = await Promise.all([
    context.waitForEvent("page"), // this method is used to switch context to the child window which is opened when the link is clicked. we need to wait for the event to be triggered before we can switch context to the child window
    await documentLink.click(),
  ]);
  const text = await childPage.locator(".red").textContent();
  console.log(text);
  // returned text manipulation.
  const domain = text.split("@")[1].split(" ")[0];
  console.log(domain);
  await newPage.locator("#username").fill(domain);
  console.log(await newPage.locator("#username").inputValue()); // this input value method is used to grab the users input value from the UI on the playwright
});
