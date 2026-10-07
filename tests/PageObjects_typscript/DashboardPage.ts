import {expect, Page, Locator} from "@playwright/test"
class DashboardPage {
  page: Page
  products: Locator
  productTexts: Locator
  cart:Locator
  constructor(page:Page) {
      this.page =page
        this.products = page.locator(".card-body");
        this.productTexts = page.locator(".card-body b");
        this.cart = page.locator("[routerlink *=cart]");
        
        // apage.locator("[routerlink *=cart]").click();
    }

  async searchProducts(productName:string) {
  await this.page.locator(".card-body b").first().waitFor();
  const title = await this.productTexts.allTextContents();
  console.log(title);
  const count = await this.products.count(); // gets the counts of the elements
  console.log(count);
  for (let i = 0; i < count; i++) {
    if ((await this.products.nth(i).locator("b").textContent()) === productName) {
      console.log("true");
      await this.products.nth(i).locator("text=Add To Cart").click();
      break;
    }
  }

    
    }

    async navigateToCart() {
        await this.cart.click()
        
    }


}
export default DashboardPage