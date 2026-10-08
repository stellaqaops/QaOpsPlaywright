import { test, expect } from '@playwright/test'


test.describe.configure({ mode: "parallel" })
// we have parallel and serial mood, parallel means the test would run in parallel. serial execution is used when one test 
// depends on another test to pass / if test a fails then test b would skip
test('@Web popup validations', async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://www.google.com/");
  // await page.goBack()
  // await page.goForward()
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: 'screenshots.png' }) // takes screenshot of the entire page
  // await expect(page.locator("#displayed-text")).toBeHidden(); 
  //  await expect(page.locator("#displayed-text")).toBeVisible();
  // await page.locator("#displayed-text").screenshot({path:'partial screenshot.png'})
  //   // await page.pause();
    page.on("dialog", (dialogue) => dialogue.accept()); // allows us to accept dislogue box its more like a listener, it listens to the dialoge box event
    // page.on("dialog", (dialogue) => dialogue.dismiss); // allows us to accept dislogue box
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();

  //   // iphrames 
    const framePage = page.frameLocator("#courses-iframe");
    // handling element in invisile mode 
    await framePage.locator(' li a[href="lifetime-access"]:visible').click(); // : visible targets only elements which are visiblemon the page
    await framePage.locator(".text h2").waitFor()
  const textCheck = await framePage.locator(".text h2").textContent();
  console.log(textCheck)
    const actualText = textCheck.split(" ")[1]
    console.log(actualText)
})

test('Screenshots and visual testing', async ({page}) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/", {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
  // await page.waitForLoadState("networkidle")
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: 'screenshots.png' }) // takes screenshot of the entire page
  
  // await expect(page.locator("#displayed-text")).toBeHidden(); 
  // await page.locator("#displayed-text").screenshot({path:'partial screenshot.png'})
  
})
test('Visual testing', async ({page}) => {
  await page.goto("https://www.rediff.com/");
  expect(await page.screenshot()).toMatchSnapshot('landing.png') // this code will run , bit will fail on the first test.
  // the test does two things 
  // create a snapshot of landing.png so that on the next test run, it picks the file, then make the comparison. on the second test run, the test is expected to pass
  
})