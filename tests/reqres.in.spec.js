const { test, expect } = require('@playwright/test')
const { StatusCodes } = require('http-status-codes')
import { webkit } from "@playwright/test"

test.describe.parallel("reqres.tests", () => {
  const URL = "https://reqres.in/api";
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await webkit.launch();
  });

  test.afterAll(async () => {
    await browser.close();
  });


  test("request GET status 200", async ({request}) => {
    const response = await request.get(`${URL}/users?page=2`);
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.data[0].id).toBe(7);
    expect(responseBody.data[1].email).toBe('lindsay.ferguson@reqres.in');
})

  test("request GET status 404", async ({request}) => {
    const response = await request.get(`${URL}/users/23`);
    expect(response.status()).toBe(404);
})

  test("request POST users", async ({request}) => {
    const response = await request.post(`${URL}/users`, {
        data: {
            "name": "Aleks",
            "job": "QA engineer"
        }
    })
    expect(response.status()).toBe(201);
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.name).toBe('Aleks');
    expect(responseBody.job).toBe('QA engineer');
    expect(responseBody.id).toBeTruthy();
    expect(responseBody.createdAt).toBeTruthy();
    
})

  test("request POST registers 200", async ({request}) => {
    const response = await request.post(`${URL}/register`, {
        data: {
            "email": "eve.holt@reqres.in",
            "password": "pistol"
        }
    })
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text())
    console.log(responseBody);
    expect(responseBody.id).toBeTruthy();
    expect(responseBody.token).toBeTruthy();    
    expect(responseBody.token).toBe('QpwL5tke4Pnpja7X4');
    
})
  test("request POST registers wrong user 400", async ({request}) => {
    const response = await request.post(`${URL}/register`, {
        data: {
            "email": "eve@reqres.in",
            "password": "pi"
        }
    })
    expect(response.status()).toBe(400);
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.error).toBe('Note: Only defined users succeed registration');
    
})

  test("request POST registers without password 400", async ({request}) => {
    const response = await request.post(`${URL}/register`, {
        data: {
            "email": "eve@reqres.in",
            
        }
    })
    expect(response.status()).toBe(400);
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.error).toBe('Missing password');
    
})

  test("request PUT", async ({request}) => {
    const response = await request.put(`${URL}/users/2`, {
        data: {
            "name": "Aleks",
            "job": "Lead QA engineer"
            
        }
    })
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.job).toBe('Lead QA engineer');
    expect(responseBody.updatedAt).toBeTruthy();
    
})
  })