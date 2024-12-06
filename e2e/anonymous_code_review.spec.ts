import {test, expect} from '@playwright/test';

test('should navigate to the home page', async ({page}) => {
    await page.goto('http://localhost:3000/')
    await expect(page.locator('h1')).toContainText('Anonymous code review 🎭')
    await expect(page.locator('h2')).toContainText('Sala de Espera')
})

test('should generate a code review with random repositories', async ({page}) => {
    await page.goto('http://localhost:3000/room')
    await page.getByRole('textbox').fill('https://github.com/octocat/Hello-World');
    await page.getByRole('button').click();
    await page.waitForURL('**/room/*');
    await expect(page.locator('h3')).toContainText('Gracias por participar');
    const randomName = await page.locator('span#randomName').textContent() as string;
    await page.goto('http://localhost:3000/');
    await expect(page.locator('h2')).toContainText('Sala de Espera');
    await expect(page.locator('span')).toContainText(randomName);
})
