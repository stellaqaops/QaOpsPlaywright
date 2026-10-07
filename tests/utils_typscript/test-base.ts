import { test as base } from "@playwright/test";

interface TestDataForOrder {
  productName: string
  email:string
  password: string
}
export const CustomTest = base.extend<{ testDataForOrder:TestDataForOrder }>({
  testDataForOrder: {
    productName: "ZARA COAT 4",
    email: "user111@yopmail.com",
    password: "Password1@",
  },
});

// in the above code, we added an interfcase to enable playwright utilize the features of typscript 
// after providing an interface , we still need to implement that interface, and add the valuse as the type defined in the interface
