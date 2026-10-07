import loginPage from "./Pages/LoginPage.page";
import { test, expect } from "@playwright/test";

const event = `TestEvent${Date.now()}`;
const futureDate = new Date();

futureDate.setDate(futureDate.getDate() + 7);

const futureDateString = futureDate.toISOString().slice(0, 16);

console.log(futureDateString);
futureDate.setDate(futureDate.getDate() + 7);
let seatsBeforeBooking;
const eventTitle = "newerTestisthis";
const baseUrl = "https://eventhub.rahulshettyacademy.com";

test("Step 1 — Login", async ({ browser }) => {
  const context = await browser.newContext();
  const newPage = await context.newPage();
  await newPage.goto("https://eventhub.rahulshettyacademy.com");
  const login = new loginPage(newPage);
  await login.loginToAccount("user111@yopmail.com", "Password1@");
  await expect(newPage.locator(`[href*="/events"] span`)).toContainText(
    "Browse Events",
  );
});
test("Create a new event", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com");
  const login = new loginPage(page);
  await login.loginToAccount("user111@yopmail.com", "Password1@");
  await page.getByText("Admin").click();
  await page.locator('.absolute  [href ="/admin/events"]').click();
  // filling of the event details
  await page.locator("#event-title-input").fill(eventTitle);
  await page.getByPlaceholder("Describe the event…").fill("lorem");
  await page.locator("#city").fill("lagos");
  await page.getByLabel("venue").fill("london");
  await page.locator('[id="event-date-&-time"]').fill(futureDateString);
  await page.locator("[id='price-($)']").fill("1000");
  await page.getByPlaceholder("e.g. 500").fill("50");
  await page.locator("#add-event-btn").click();
  await expect(page.getByText("Event created!")).toBeVisible();
});

test("Step 3 — Find the event card and capture seats", async ({ page }) => {
    await page.goto("https://eventhub.rahulshettyacademy.com");
    const login = new loginPage(page);
    await login.loginToAccount("user111@yopmail.com", "Password1@");
    await page.locator("#nav-events").click();
    await page.waitForLoadState("networkidle")
    await page.locator("#event-card").first().isVisible();
    const allEvents =  page.locator("#event-card");
    await expect(allEvents.filter({ hasText: "test1234" })).toBeVisible({ timeout: 5000 });
    let seatText = await allEvents.filter({ hasText: eventTitle }).getByText("seats").textContent();
    seatsBeforeBooking = Number(seatText.split(" ")[0]);
    console.log(seatsBeforeBooking);
});
test("Step 4 — Start booking", async ({ page }) => {
  let bookingRef;
  // step1
  await page.goto("https://eventhub.rahulshettyacademy.com");
  const login = new loginPage(page);
  await login.loginToAccount("user111@yopmail.com", "Password1@");
   // step2 -Create a new event
    await page.getByText("Admin").click();
    await page.locator('.absolute  [href ="/admin/events"]').click();
    // filling of the event details
    await page.locator("#event-title-input").fill(eventTitle);
    await page.getByPlaceholder("Describe the event…").fill("lorem");
    await page.locator("#city").fill("lagos");
    await page.getByLabel("venue").fill("london");
    await page.locator('[id="event-date-&-time"]').fill(futureDateString);
    await page.locator("[id='price-($)']").fill("1000");
    await page.getByPlaceholder("e.g. 500").fill("50");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();
    await page.locator("#nav-events").click();
    await page.waitForLoadState("networkidle")
  await page.locator("#event-card").first().isVisible();
  const allEvents = page.locator("#event-card");
  //"Step 3 — Find the event card and capture seats"
    await expect(allEvents.filter({ hasText: eventTitle })).toBeVisible({ timeout: 5000 });
    let seatText = await allEvents.filter({ hasText: eventTitle }).getByText("seats").textContent();
    seatsBeforeBooking = Number(seatText.split(" ")[0]);
    console.log(seatsBeforeBooking);
    await expect(allEvents.filter({ hasText: eventTitle })).toBeVisible({ timeout: 5000 }); 
  //Step 4 — Start booking
    await allEvents.filter({ hasText: eventTitle }).getByRole('link', { name: "Book Now" }).click()

   //Step 5 — Fill booking form
    const ticketCount = await page.locator("#ticket-count").textContent();
    console.log(ticketCount);
    expect(parseInt(ticketCount)).toEqual(1);
    await page.locator("#customerName").fill("testuser");
    await page.locator("#customer-email").fill("user111@yopmail.com");
    await page.locator("#phone").fill("+91 98765 43210");
    await page.locator(".confirm-booking-btn").click();

  
//  Step 6 — Verify booking confirmation

    await expect ( page.locator(".booking-ref")).toBeVisible();
    bookingRef = await page.locator(".booking-ref").textContent();

    //Step 7 — Verify in My Bookings
  await page.getByRole("button", { name: "View My Bookings" }).click();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveURL(`${baseUrl}/bookings`);
  const allBookings = page.locator("#booking-card");
  await expect(allBookings.first()).toBeVisible()
  await expect(allBookings.locator(".booking-ref").filter({ hasText: bookingRef })).toBeVisible();
  // await expect(allBookings.filter({ hasText: eventTitle })).toContainText(eventTitle)
  //
  //Step 8 — Verify seat reduction
  await page.locator("#nav-events").click();
  await page.waitForLoadState("networkidle");
  await expect(allEvents.first()).toBeVisible()
  await expect(allEvents.filter({ hasText: eventTitle })).toBeVisible()
  const seatTexT = await allEvents.filter({ hasText: eventTitle }).getByText('seats').textContent()
  const seatsAfterBooking = parseInt(seatTexT);
  // expect(seatCount - seatsAfterBooking).toEqual(1)
  // expect(seatsAfterBooking).toEqual(seatsBeforeBooking-1)

  
  



  
    
    

     

    
    
});




