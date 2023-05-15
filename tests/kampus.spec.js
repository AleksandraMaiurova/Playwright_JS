const { test, expect } = require('@playwright/test')
const { StatusCodes } = require('http-status-codes')
const { authToken } = require('../authToken')
import { chromium } from "@playwright/test"



test.describe("API", () => {
  let browser;
  let page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test.beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://k-ampus.dev/api/v1/login");
  });

  test.afterEach(async () => {
    await page.close();
  });


  test('request status', async ({ request }) => {
    const response = await request.post('https://k-ampus.dev/api/v1/login', {
        data: {
          username: 'skhalipa@gmail.com',
          password: 'skhalipa@gmail.com',
        }
})
    expect(response.status()).toEqual(StatusCodes.OK)
    expect(await response.json()['accessToken']).not.toBeNull();
  })


})