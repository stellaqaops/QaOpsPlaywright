import { test, expect } from '@playwright/test'
import loginPage from './Pages/LoginPage.page';

const baseUrl = "https://eventhub.rahulshettyacademy.com";
test('Ticket Eligibility For Refund-Test1', async({ page }) => {
  //Test 1 — Single ticket booking is eligible for refund
   await page.goto(baseUrl);
   const login = new loginPage(page);
   await login.loginToAccount("user111@yopmail.com", "Password1@");

    // Step 2 — Book first event with 1 ticket (default)
    await page.locator("#nav-events").click();
    await page.locator('[data-testid="event-card"]').first().getByRole('link', { name: "Book Now" }).click();
    await page.locator("#customerName").fill("chisom- chisom");
    await page.locator("#customer-email").fill("userEmail@yopmail.com");
    await page.locator("#phone").fill("+91 98765 43210");
    await page.locator(".confirm-booking-btn").click();

    //Step 3 — Navigate to booking detail
    await page.locator("#nav-bookings").click();
    expect(page).toHaveURL(`${baseUrl}/bookings`);
    await page.locator('[data-testid="booking-card"]').first().getByRole('button', { name: 'View Details' }).click()
    await expect(page.getByText("Booking Information")).toBeVisible();
    //Step 4 — Validate booking ref
    const bookingRef = await page.locator(".font-mono").first().textContent();
    const eventTitle = await page.locator("h1").textContent();
    expect(bookingRef.charAt(0).toLocaleLowerCase()).toBe(eventTitle.charAt(0).toLocaleLowerCase())

    //Step 5 — Check refund eligibility
    await page.locator("#check-refund-btn").click();
    await page.locator("#refund-spinner").waitFor();
    await page.locator("#refund-spinner").isVisible();
    await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 })
    
    //Step 6 — Validate result
    await expect(page.locator("#refund-result")).toBeVisible();
    await expect(page.locator("#refund-result")).toContainText("Eligible for refund.");
    await expect(page.locator("#refund-result")).toContainText("Single-ticket bookings qualify for a full refund.");

// - Assert it contains text Single-ticket bookings qualify for a full refund
    
})

test("Test 2 — Group ticket booking is NOT eligible for refund", async ({
  page
}) => {

  //Test 1 — Single ticket booking is eligible for refund
   await page.goto(baseUrl);
   const login = new loginPage(page);
   await login.loginToAccount("user111@yopmail.com", "Password1@");

    // Step 2 — Book first event with 1 ticket (default)
    await page.locator("#nav-events").click();
    await page.locator('[data-testid="event-card"]').first().getByRole('link', { name: "Book Now" }).click();
    await page.locator("#customerName").fill("chisom- chisom");
    await page.locator("#customer-email").fill("userEmail@yopmail.com");
    await page.locator("#phone").fill("+91 98765 43210");
   await page.getByRole("button", { name: "+" }).click();
  await page.getByRole("button", { name: "+" }).click();
  await page.locator(".confirm-booking-btn").click();

      //Step 3 — Navigate to booking detail
    await page.locator("#nav-bookings").click();
  expect(page).toHaveURL(`${baseUrl}/bookings`);
  await expect(page.locator("#booking-card").first().getByText("ticket")).toContainText("3 tickets");
    await page.locator('[data-testid="booking-card"]').first().getByRole('button', { name: 'View Details' }).click()
    await expect(page.getByText("Booking Information")).toBeVisible();
    //Step 4 — Validate booking ref
    const bookingRef = await page.locator(".font-mono").first().textContent();
    const eventTitle = await page.locator("h1").textContent();
    expect(bookingRef.charAt(0).toLocaleLowerCase()).toBe(eventTitle.charAt(0).toLocaleLowerCase())

    //Step 5 — Check refund eligibility
    await page.locator("#check-refund-btn").click();
    await page.locator("#refund-spinner").waitFor();
    await page.locator("#refund-spinner").isVisible();
  await expect(page.locator("#refund-spinner")).toBeHidden({ timeout: 6000 })

  //Step 6 — Validate result (different assertions)
  await expect(page.locator("#refund-result")).toBeVisible();
  await expect(page.locator("#refund-result")).toContainText("Not eligible for refund");
   await expect(page.locator("#refund-result")).toContainText("Group bookings (3 tickets) are non-refundable.");
 


  
    

});
