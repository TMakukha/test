import { test, expect } from "@playwright/test";
import { baseUrl } from "../environments/main/data";
import { randomNum, takeRandomBet } from "../e2e/pages/page";
import { betButton, newBetPlace, preMatch, randomBet, randomMatch } from "../e2e/locators/locator";

test.describe('Заключение экспресс пари в несколько кликов', async () => {

    test('Открытие вкладки спорт', async ({ page }) => {
        await page.goto(baseUrl, { waitUntil: "load" }); // Переход на страницу
        await page.getByTestId('btn.Sport').first().click(); // Нажатие на кнопку "Спорт"
        await page.waitForTimeout(1000);
        expect(page).toHaveURL(baseUrl + "/sports/") // Проверка, что открыта нужная страница
    });

    test('Открытие вкладки "Прематч"', async ({ page }) => {
        await page.goto(baseUrl + '/sports/', {waitUntil: "load"}); // Открытие страницы "Спорт"
        await page.locator(preMatch).click(); // Нажатие на кнопку "Прематч"
        await page.waitForTimeout(1000);
        expect(page).toHaveURL(baseUrl + '/sports?mode=1'); // Проверка, что открыта нужная страница
    });

    test('Добавление ставки в пари', async ({ page }) => {
        // Открытие страницы
        await page.goto(baseUrl + '/sports?mode=1', { waitUntil: "load" });
        await page.waitForSelector(randomMatch);
        await page.waitForTimeout(1000);

        // Случайная ставка
        await page.locator(`${randomMatch}${randomBet}`).click(); // Выбор случайного эвента и ставки
        const element = page.locator(randomMatch + `//a[@data-testid='event']`);
        const elementText = await element.textContent();
        const teamsArray = elementText?.split('—') as [string, string]

        // Проверка, что ставка отображается
        await expect.soft(page.locator(newBetPlace)).toContainText(teamsArray[0]);
        await expect.soft(page.locator(newBetPlace)).toContainText(teamsArray[1]);
    });

    test('Экспресс пари', async ({ page }) => {
        // Открытие страницы
        await page.goto(baseUrl + '/sports?mode=1', { waitUntil: "load" });
        const firstMatch = `//div[contains(@data-testid, 'sportBaseEvent')][1]`
        await page.waitForSelector(firstMatch);
        await page.waitForTimeout(1000);

        // Случайная ставка 
        await takeRandomBet(page);
        await page.waitForTimeout(500);

        // Случайная ставка
        await takeRandomBet(page);

        // Ввод суммы ставки
        await page.getByTestId('stringEdit').click();
        const bet: string = `${randomNum(100, 10000)}`

        // Нажатие на кнопку "Ставка"
        await page.keyboard.type(bet);
        await page.locator(betButton).click();
        await page.waitForTimeout(200);
        expect(page.locator("//div[@class='login-box--Rb_3i']"), 'Не отображается форма входа в аккаунт').toBeVisible();
    });
});