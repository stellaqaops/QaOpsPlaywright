import { test as base, request } from "@playwright/test";

const payload = {
  title: "fixture event",
  description: "test",
  category: "Concert",
  venue: "alat",
  city: "sofia",
  eventDate: "2026-09-17T11:16:00.000Z",
  price: 20,
  totalSeats: 500,
};
let token;

export const customTest = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/");
    await page.getByPlaceholder("you@email.com").fill("user419@gmail.com");
    await page.getByLabel("Password").fill("Password1@");
    await page.locator("#login-btn").click();
    await page.waitForLoadState("networkidle");
    token = await page.evaluate(() => {
      return localStorage.getItem("eventhub_token");
    });
    console.log(token);

    await use(page);
  },

  createEvent: async ({ page }, use) => {
    //  const LoginResponse = await page.request.post(
    //    "https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    //    { data:loginPayload },
    //  );
    //          expect(LoginResponse.ok()).toBeTruthy() // expect that the login response is a success
    //          const allResponseObject = await LoginResponse.json()
    //          const  token = allResponseObject.token
    //     console.log(token)
    const response = await page.request.post(
      `
          https://api.eventhub.rahulshettyacademy.com/api/events`,
      {
        data: payload,
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      },
    );
    const jsonResponse = await response.json();
    await use(jsonResponse);
  },
});

