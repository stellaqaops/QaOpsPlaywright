import { expect, Page, Locator } from "@playwright/test";
class LoginPage {
  page: Page
  email: Locator
  password: Locator
  signInBtn:Locator
  constructor(page:Page) {
    this.page = page;
    this.email = page.locator("#userEmail");
    this.password = page.locator("#userPassword");
    this.signInBtn = page.locator('[value="Login"]');
  }

  //   async goto() {
  //        await this.page.goto("https://rahulshettyacademy.com/client");

  //   }
  async goto() {
    // FIX: Wait for HTML DOM structure instead of full window load event
    await this.page.goto("https://rahulshettyacademy.com/client", {
      waitUntil: "domcontentloaded",
    });
  }
  async validLogin(username:string, password:string) {
    await this.email.fill(username);
    await this.password.fill(password);
    await this.signInBtn.click();
    // await this.page.waitForLoadState("networkidle");
  }
}

export default LoginPage;
