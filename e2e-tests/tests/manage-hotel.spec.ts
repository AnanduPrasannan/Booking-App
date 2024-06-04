import {test,expect} from '@playwright/test'
import path from 'path'

const UI_URL='http://localhost:5173/'

test.beforeEach(async({page})=>{

await page.goto(UI_URL)

await page.getByRole('link',{name:'Sign In'}).click()

await expect(page.getByRole('heading',{name:'Sign In'})).toBeVisible()

await page.locator('[name=email]').fill('abc@gmail.com')
await page.locator('[name=password]').fill('Anan123')

await page.getByRole('button',{name:'Login'}).click()

await expect(page.getByText('Signed Succesfully')).toBeVisible()

await expect(page.getByRole('link',{name:'My-hotels'})).toBeVisible()

})

test('should allow user to add hotel', async({page})=>{

    await page.goto(`${UI_URL}add-hotel`)


    await page.locator('[name=name]').fill('Anandu')
    await page.locator('[name=city]').fill('kolkata')
    await page.locator('[name=country]').fill('India')
    await page.locator('[name=description]').fill('hello-world')
    await page.locator('[name=pricePerNight]').fill('100')
    await page.selectOption('select[name=starRating]','3')
    await page.getByText('Budget').click()
    await page.getByLabel('Free-wifi').click()
    await page.locator('[name=adultCount]').fill('2')
    await page.locator('[name=childCount]').fill('2')
    
    await page.setInputFiles('[name=imageFiles]',[
        path.join(__dirname,'files','1.png'),
        path.join(__dirname,'files','2.png')
    ])

await page.getByRole('button',{name:'save'}).click()

await expect(page.getByText('Hotel Saved Succesfully')).toBeVisible()





})