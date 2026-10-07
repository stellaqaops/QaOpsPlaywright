import LoginPage from "./LoginPage";
import DashboardPage from "./DashboardPage";
import { Page } from "@playwright/test";

class PoManager {
    login: LoginPage
    dashboard: DashboardPage
    page:Page
    constructor(page:Page) {
        this.page =page
        this.login = new LoginPage(this.page)
        this.dashboard = new DashboardPage(this.page)
    }
    
    loginPage() {
        return  this.login

        
    }
    dashboardPage() {
       return  this.dashboard
    }
}

export default PoManager