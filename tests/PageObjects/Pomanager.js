import LoginPage from "./LoginPage.js";
import DashboardPage from "./DashboardPage.js";

class PoManager {
    constructor(page) {
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