// @ts-check
const { test, expect } = require('@playwright/test');

test('start link', async ({ page }) => {
    await page.goto('https://id.itmo.ru/auth/realms/itmo/protocol/openid-connect/auth?response_type=code&scope=openid&client_id=isu&redirect_uri=https://isu.ifmo.ru/api/sso/v1/public/login?apex_params=p=2143:LOGIN:103860408821502');
    await page.getByLabel('username').fill('LOGIN');
    await page.getByLabel('password').fill('PASSWORD');
    const element = await page.$('[id="kc-login"]')
    await element.click()
    const title = await page.title()
    expect(title).toEqual(expect.stringContaining('Старт - ИСУ ИТМО'))

  });
  