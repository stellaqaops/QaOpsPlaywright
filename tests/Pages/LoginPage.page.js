import {expect } from '@playwright/test'
class LoginPage{

    constructor(page) {
        this.page = page
        
        this.email = page.getByPlaceholder("you@email.com");
        this.password = page.getByLabel("Password");
        this.loginBtn = page.locator("#login-btn");
        
    }

    // methods 
    async loginToAccount(username, password) {
        await this.email.fill(username)
        await this.password.fill(password)
        await this.loginBtn.click()
        await expect(this.page.locator(`[href*="/events"] span`)).toContainText(
          "Browse Events",
        );
    }
}
export default LoginPage
