const { test, expect, request } = require('@playwright/test');
const loginPayload = { userEmail: 'rcptest43@gmail.com', userPassword: 'Iamking@000' };
const ApiUtil = require('./utils/ApiUtil');

let token;
let apiContext;

test.beforeAll(async () => {
    apiContext = await request.newContext();
    const apiUtil = new ApiUtil(apiContext, loginPayload);
    token = await apiUtil.getToken();
});

test('@Webst Client App login', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');

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
