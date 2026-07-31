class ApiUtils{

    constructor(apiContext,loginPayload){

        this.apiContext = apiContext;
        this.loginPayload = loginPayload;

    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
                {
                    data: this.loginPayload
        
                 }
        
            )
        
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
         token = loginResponseJson.token;
        console.log(token);
        return token;
    }
}


 module.exports(ApiUtils);