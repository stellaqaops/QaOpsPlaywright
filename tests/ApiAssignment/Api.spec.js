import { test, expect } from "@playwright/test";
import LoginHelper from "./LoginHelper.page";
import { request, STATUS_CODES } from "node:http";
const SIX_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 5,
      title: "Lollapalooza India",
      category: "Festival",
      eventDate: "2025-06-20T12:00:00.000Z",
      venue: "Mahalaxmi Racecourse",
      city: "Mumbai",
      price: "3000",
      totalSeats: 5000,
      availableSeats: 2000,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 6,
      title: "AI & ML Expo",
      category: "Conference",
      eventDate: "2025-06-25T10:00:00.000Z",
      venue: "Bangalore International Exhibition Centre",
      city: "Bangalore",
      price: "750",
      totalSeats: 300,
      availableSeats: 180,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      category: "Conference",
      eventDate: "2025-06-01T10:00:00.000Z",
      venue: "HICC",
      city: "Hyderabad",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 2,
      title: "Rock Night Live",
      category: "Concert",
      eventDate: "2025-06-05T18:00:00.000Z",
      venue: "Palace Grounds",
      city: "Bangalore",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 3,
      title: "IPL Finals",
      category: "Sports",
      eventDate: "2025-06-10T19:30:00.000Z",
      venue: "Chinnaswamy",
      city: "Bangalore",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
    },
    {
      id: 4,
      title: "UX Design Workshop",
      category: "Workshop",
      eventDate: "2025-06-15T09:00:00.000Z",
      venue: "WeWork",
      city: "Mumbai",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
    },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

// test.beforeEach(async ({page}) => {

//     // const page = await request.newContext()
//     // here i'm using page cos it has something that allows me to access route and then page.request

// })

test("Test 1 — Banner IS visible when 6 events are returned", async ({
  page,
}) => {
  //     //Step 1 — Set up the API mock
  await page.route("**/api/events**", async (route) => {
    // request is intercepted
    const body = JSON.stringify(SIX_EVENTS_RESPONSE);
    const response = await page.request.fetch(route.request()); // teling playwright to take this request and then send it to the actual server
    await route.fulfill({
      response, // - getting the request from the endpoint call
      body,  // replacing the request with a fake response 
      status: 200,
      "Content-type": "application/json",
    });
  });
  await page.goto("https://eventhub.rahulshettyacademy.com");
  const loginInstance = new LoginHelper(page);
  //Step 2 — Login and navigate
  await loginInstance.loginToAccount("user111@yopmail.com", "Password1@");
  await page.locator("#nav-events").click();
  //  Step 3 — Verify cards loaded from mock
  // - Get all event cards by data-testid="event-card"
  await page.locator('[data-testid="event-card"]').first().waitFor();
  await expect(
    page.locator('[data-testid="event-card"]').first(),
  ).toBeVisible();
  await expect(
    await page.locator('[data-testid="event-card"]').count(),
  ).toEqual(6);
  //     Step 4 — Verify banner is visible
  // - Locate the banner using a case-insensitive text regex: /sandbox holds up to/i
  await page.locator(".mx-1").first().isVisible();
  await expect(await page.locator(".mx-1").first()).toContainText("9 bookings");

  // - Assert it is visible

  // - Assert it contains text 9 bookings
});

test("Test 2 — Banner is NOT visible when 4 events are returned", async ({page}) => {
  //     //Step 1 — Set up the API mock
  await page.route("**/api/events**", async (route) => {
    // request is intercepted
    const body = JSON.stringify(FOUR_EVENTS_RESPONSE);
    const response = await page.request.fetch(route.request()); // teling playwright to take this request and then send it to the actual server
    await route.fulfill({
      response,
      body,
      status: 200,
      "Content-type": "application/json",
    });
  });
  await page.goto("https://eventhub.rahulshettyacademy.com");
  const loginInstance = new LoginHelper(page);
  //Step 2 — Login and navigate
  await loginInstance.loginToAccount("user111@yopmail.com", "Password1@");
  await page.locator("#nav-events").click();

  //Step 3 — Verify cards loaded from mock
  await page.locator('[data-testid="event-card"]').first().waitFor();
  await expect(
    page.locator('[data-testid="event-card"]').first(),
  ).toBeVisible();
  await expect(
    await page.locator('[data-testid="event-card"]').count(),
  ).toEqual(4);
    // Step 4 — Verify banner is hidden
    await expect(page.locator(".mx-1").first()).toBeHidden({ timeout: 6000 })
    
});
