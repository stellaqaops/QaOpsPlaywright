import { test, request, expect } from '@playwright/test'
class ApiUtils {

    constructor(apiContext,loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
        
    }

    async getToken() {
        // const apiContext = await request.newContext()
            const LoginResponse = await this.apiContext.post(
              "https://rahulshettyacademy.com/api/ecom/auth/login",
              { data: this.loginPayload },
            );
             expect(LoginResponse.ok()).toBeTruthy() // expect that the login response is a success
             const allResponseObject = await LoginResponse.json()
             const  token = allResponseObject.token
        console.log(token)
        return token 
        
        
    }

    async createOrder(orderPayload) {
        const response = {}
        response.token = await this.getToken();
       const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
              data: orderPayload ,
              headers: {
                'Authorization': response.token,
                'Content-type': 'application/json'
              }
            },
            
          );
        const orderJson = await orderResponse.json();
        console.log(orderJson);
        response.orderId = orderJson.orders[0];
        
        return response
    }
    
}
export default ApiUtils