

class LoginHelper{

    constructor(page) {
        this.page= page
        this.username = "#email";
        this.password = "#password";
        this.loginBtn = "#login-btn";

        
    }

    async loginToAccount(username, password) {
        await this.page.locator(this.username).fill(username)
        await this.page.locator(this.password).fill(password)
        await this.page.locator(this.loginBtn).click()
        await this.page.waitForLoadState("networkidle");
        
    }
}


export default LoginHelper