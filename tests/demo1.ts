
import { expect, type Locator, type Page } from "@playwright/test";
let greetings: string = "hello"
greetings = 'HI'
let age: number = 20
let isActive: Boolean = true
let array: number[] = [1, 2, 3, 4]
let data: any = "anydata type";
data = 2 // this works like javascript and accepts any data type

// typescript checks types during developement , catches errors even before you run ur code , while javascript is dynamically typed meaning type errors can only surface once u run the code

function addTwo(a : number , b:number):number {
    return a + b

    
}
addTwo(2, 2)

// object
// typscript throws an error when using an incomaptible type

let user: { name: string, age: number } = { name: "stella", age: 40 }
// user.location ="gdgdgdgd" // this would complain during compilation because location is not added in the declaration that is the additional features

// class DashboardPage {
//    page:Page
//   constructor(page) {
//     this.page = page;
//     this.products = page.locator(".card-body");
//     this.productTexts = page.locator(".card-body b");
//     this.cart = page.locator("[routerlink *=cart]");

//     // apage.locator("[routerlink *=cart]").click();
//   }

//   async searchProducts(productName) {
//     await this.page.locator(".card-body b").first().waitFor();
//     const title = await this.productTexts.allTextContents();
//     console.log(title);
//     const count = await this.products.count(); // gets the counts of the elements
//     console.log(count);
//     for (let i = 0; i < count; i++) {
//       if (
//         (await this.products.nth(i).locator("b").textContent()) === productName
//       ) {
//         console.log("true");
//         await this.products.nth(i).locator("text=Add To Cart").click();
//         break;
//       }
//     }
//   }

//   async navigateToCart() {
//     await this.cart.click();
//   }
// }