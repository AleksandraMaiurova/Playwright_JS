const { test, expect } = require('@playwright/test')
const { StatusCodes } = require('http-status-codes')

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




