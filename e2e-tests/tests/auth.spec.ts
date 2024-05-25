import { test, expect } from '@playwright/test';



const UI_URL='http://localhost:5173/'
test('has title', async ({ page }) => {
 await page.goto(UI_URL)

 // get sign in button

 await page.getByRole('link',{name:"Sign In"}).click()

 await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible()

 await page.locator('[name=email]').fill('abc@gmail.com')

 await page.locator('[name=password]').fill('Anan1996')

 await page.getByRole('button',{name:'Login'}).click()

 await expect(page.getByText('Sign in successful')).toBeVisible()

 await expect(page.getByRole('link',{name:'my bookings'})).toBeVisible()
 await expect(page.getByRole('link',{name:'My hotels'})).toBeVisible()
 await expect(page.getByRole('button',{name:'Sign out'})).toBeVisible()

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
