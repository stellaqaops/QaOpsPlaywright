import {expect } from '@playwright/test'
import { customTest } from './BuildFixtures'




customTest("fixture test", async ({ authenticatedPage, createEvent }) => {
  await authenticatedPage.goto(
    "https://eventhub.rahulshettyacademy.com/events",
  );
    console.log(createEvent)
    await authenticatedPage.waitForLoadState("networkidle");
    expect(await authenticatedPage.locator("#event-card").filter({ hasText:'fixture event'})).toContainText(createEvent.data.title);

    
});