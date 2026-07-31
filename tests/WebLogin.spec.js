const {test, expect, request} = require ('@playwright/test');
const { ok } = require('assert');
const loginPayload = {userEmail: "rcptest43@gmail.com", userPassword: "Iamking@000"}
const {ApiUtils} = require(".//utils//ApiUtil");
let token;

test.beforeAll( async()=> {

    const apiContext = await request.newContext()
     ApiUtil = new ApiUtils(apiContext,loginPayload);
     ApiUtil.ge
    
    
    
   

expect(loginResponse.ok()).toBeTruthy();
const loginResponseJson = await loginResponse.json();
 token = loginResponseJson.token;
console.log(token);
});

test('@Webst Client App login', async ({ page }) => {

   const apiUtils = new ApiUtil(apiContext , loginPayload)

    await page.addInitScript(value =>{
        window.localStorage.setItem('token' , value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")

   //js file- Login js, DashboardPage
   const email = "rcptest43@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
   .getByRole("button",{name:"Add to Cart"}).click();
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
 
   //await page.pause();
   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
   const orderId = await page.locator("//tr[@class='ng-star-inserted']").textContent();
   console.log(orderId);

})
