const { test, expect } = require('@playwright/test')
const { StatusCodes } = require('http-status-codes')
import { chromium } from "@playwright/test"
const { authToken } = require('../authToken')



test.describe("API", () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('request status', async ({ request }) => {
    const response = await request.post('https://k-ampus.dev/api/v1/login', {
        data: {
          username: 'skhalipa@gmail.com',
          password: 'skhalipa@gmail.com',
        }
})
    expect(response.status()).toEqual(StatusCodes.OK)
    const responseBody = JSON.parse(await response.text())
    expect(responseBody.accessToken).not.toBeNull();
    expect(responseBody.accessToken).not.toBeUndefined();
    })

})

test('request status competence', async ({ request}) => {
  const token = await authToken(request)
  const response = await request.get('https://k-ampus.dev/api/v1/competence', {
      headers: {
        "Authorization": `${token}`,
      }    
})  

      expect(response.status()).toEqual(StatusCodes.OK)

})


