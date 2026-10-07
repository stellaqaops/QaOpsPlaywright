import { test, expect, request } from '@playwright/test'
import LoginHelper from './LoginHelper.page';


const BASE_URL = "https://eventhub.rahulshettyacademy.com"
const API_URL = `${BASE_URL} / api`
const loginAPi = "https://api.eventhub.rahulshettyacademy.com/api/auth/login";
const apiBaseUrl = "https://api.eventhub.rahulshettyacademy.com/api/auth/";
const bookingPayload = {
  eventId: 1,
  customerName: "Priya Sharma",
  customerEmail: "priya.sharma@email.com",
  customerPhone: "+91-9876543210",
  quantity: 1,
};
const gmailPayload = {
  email: "user419@gmail.com",
  password: "Password1@",
};
const yahooMailPayload = {
  email: "user419@yahoo.com",
  password: "Password1@",
};

test('Cross user access Denied', async ({ page }) => {
  // const apiContext = (await request.newContext());
  // https://api.eventhub.rahulshettyacademy.com/api/docs/ - Api documentation
  //Step 1 — Login as Yahoo user via API  -
  // const request = page.request.post()
  //  const apiContext = await request.newContext();
  const response = await page.request.post(loginAPi, { data: gmailPayload });
  expect(response.ok()).toBeTruthy();
  const jsonResponse = await response.json();
  const token = await jsonResponse.token;
  console.log(token);
  // Step 2 — Fetch events via API to get a valid event ID
  const getResponse = await page.request.get(
    "https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    },
  );
  expect(getResponse.ok()).toBeTruthy()
  console.log(getResponse);
  const data = await getResponse.json();
  console.log(data);

  const eventId = data.data[0].id
  console.log(eventId)
  


  //   Step 3 — Create a booking via API as Yahoo user
  
  const yahooResponse = await page.request.post(loginAPi, { data: yahooMailPayload });
  const jsonResponseYahoo = await yahooResponse.json()
  const yahooToken = await jsonResponseYahoo.token
  console.log(yahooToken)
  const response1 = await page.request.post(
    `https://api.eventhub.rahulshettyacademy.com/api/bookings/`,
    {
      data: { ...bookingPayload, eventId:eventId },
      headers: {
        Authorization: `Bearer ${yahooToken}`,
        "Content-type": "application/json",
      },
    },
  );
   expect(response1.ok()).toBeTruthy();
  const yahooResponseApi = await response1.json()
  const yahooBookingId = yahooResponseApi.data.id;
  console.log(yahooBookingId);

  // Step 4 — Login as Gmail user via browser UI

  // - Call your loginAs(page, GMAIL_USER) helper
    await page.goto("https://eventhub.rahulshettyacademy.com");
    const login = new LoginHelper(page);
    await login.loginToAccount(gmailPayload.email, gmailPayload.password);

    //   Step 5 — Navigate to Yahoo's booking URL as Gmail user

  // - Navigate directly to /bookings/${yahooBookingId}
  console.log("After login:", page.url());
    await page.goto(
      `https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`,
      {
        waitUntil: "networkidle",
      },
    );

    // - Pass { waitUntil: 'networkidle' } as the navigation option so the page fully resolves before asserting

    // Ste6 — Validate Access Denied
    await expect(page.getByText("Access Denied")).toBeVisible();
    await expect(
      page.getByText("You are not authorized to view this booking"),
    ).toContainText("You are not authorized to view this booking");

  // await page.pause()
  
  

    
})
