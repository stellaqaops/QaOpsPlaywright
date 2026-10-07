import { test as base } from "@playwright/test";

export const CustomTest = base.extend({
  testDataForOrder: {
    productName: "ZARA COAT 4",
    email: "user111@yopmail.com",
    password: "Password1@",
  },
});
