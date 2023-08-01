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

test('request status competence', async ({ request}) => {
  const token = await authToken(request)
  const response = await request.get('https://k-ampus.dev/api/v1/competence', {
      headers: {
        "Authorization": `${token}`,
      }    
})  

      expect(response.status()).toEqual(StatusCodes.OK)

})

test('test_competence_content_not_none', async ({ request}) => {
  const token = await authToken(request)
  const response = await request.get('https://k-ampus.dev/api/v1/competence', {
      headers: {
        "Authorization": `${token}`,
      }    
})  
  const responseBody = JSON.parse(await response.text())
  expect(responseBody.content).not.toBeNull();
  expect(responseBody.content).not.toBeUndefined();

})

test('test_competence_content_types', async ({ request}) => {
  const token = await authToken(request)
  const response = await request.get('https://k-ampus.dev/api/v1/competence', {
      headers: {
        "Authorization": `${token}`,
      }    
})  
  const responseBody = JSON.parse(await response.text())
  const contents= responseBody.content
  for (let key in contents) {
  if (key == 'id') {
    expect(contents[key]).toBeInstanceOf(number)
  } else if (key == 'name') {
    expect(contents[key]).toBeInstanceOf(string)
  } else if (key == 'isHardSkill') {
    expect(contents[key]).toBeInstanceOf(boolean)
  } else if (key == 'skillIds') {
    expect(contents[key]).toBeInstanceOf(object)
  }}
  

})

test('pageable in JSON', async ({ request}) => {
  const token = await authToken(request)
  const response = await request.get('https://k-ampus.dev/api/v1/competence', {
      headers: {
        "Authorization": `${token}`,
      }    
})  
  const responseBody = JSON.parse(await response.text())
  expect(responseBody.pageable).not.toBeNull();
  expect(responseBody.pageable).not.toBeUndefined();
 
})

test('content of pageable', async ({ request}) => {
  const token = await authToken(request)
  const response = await request.get('https://k-ampus.dev/api/v1/competence', {
      headers: {
        "Authorization": `${token}`,
      }    
})  
  const responseBody = JSON.parse(await response.text())
  const pageable= responseBody.pageable
  console.log(pageable)
  for (let key in pageable) {
  if (key == 'pageSize') {
    expect(typeof pageable[key]).toBe('number')
  } else if (key == 'pageNumber') {
    expect(typeof pageable[key]).toBe('number')
  } else if (key == 'unpaged') {
    expect(typeof pageable[key]).toBe('boolean')
  } else if (key == 'paged') {
    expect(typeof pageable[key]).toBe('boolean')
  } else if (key == 'offset') {
    expect(typeof pageable[key]).toBe('number')
  }}
 
})

test('sort in pageable', async ({ request}) => {
  const token = await authToken(request)
  const response = await request.get('https://k-ampus.dev/api/v1/competence', {
      headers: {
        "Authorization": `${token}`,
      }    
})  
  const responseBody = JSON.parse(await response.text())
  expect(responseBody.pageable.sort).not.toBeNull();
  expect(responseBody.pageable.sort).not.toBeNull();
 
})

test('content of sort in pageable', async ({ request}) => {
  const token = await authToken(request)
  const response = await request.get('https://k-ampus.dev/api/v1/competence', {
      headers: {
        "Authorization": `${token}`,
      }    
})  
  const responseBody = JSON.parse(await response.text())
  const sort= responseBody.pageable.sort
  console.log(sort)
  for (let key in sort) {
  if (key == 'sorted') {
    expect(typeof sort[key]).toBe('boolean')
  } else if (key == 'unsorted') {
    expect(typeof sort[key]).toBe('boolean')
  } else if (key == 'empty') {
    expect(typeof sort[key]).toBe('boolean')
  }}
 
})

})


