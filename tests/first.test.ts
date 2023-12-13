import { Page, test, expect } from "@playwright/test";
import { baseUrl } from "../environments/main/data";
import { randomFactorValue, randomSportEvent } from "../e2e/locators/locator";
import { randomInt } from "crypto";
import { takeRandomBet } from "../e2e/pages/page";

test.describe('Заключение экспресс пари в несколько кликов', async () => {

    test('Открытие вкладки спорт', async ({ page }) => {
        await page.goto(baseUrl, { waitUntil: "load" }); // Переход на страницу
        await page.locator("//a[@data-testid='btn.Sport']").first().click(); // Нажатие на кнопку "Спорт"
        await page.waitForLoadState("load"); // Ожидание загрузки страницы
        expect(page).toHaveURL("https://new.fon.bet/sports/") // Проверка, что открыта нужная страница
    });

    test('Открытие вкладки "Прематч"', async ({ page }) => {
        await page.goto(baseUrl + '/sports/', {waitUntil: "load"}); // Открытие страницы "Спорт"
        await page.locator("//div[@class='filter-component-sport-mode__item--VlBSc'][1]").click(); // Нажатие на кнопку "Прематч"
        await page.waitForLoadState("load"); // Ожидание загрузки страницы
        await page.waitForTimeout(500);
        expect(page).toHaveURL(baseUrl + '/sports?mode=1'); // Проверка, что открыта нужная страница
    });

    test('Добавление ставки в пари', async ({ page }) => {
        await page.goto(baseUrl + '/sports?mode=1', { waitUntil: "load" }); // Переход на страницу
        await page.waitForSelector(randomSportEvent); // Ожидание отрисовки таблицы
        await page.waitForTimeout(500);
        const randomMatch = `//div[contains(@data-testid, 'sportBaseEvent')][${randomInt(6)}]`
        await page.locator(randomMatch).locator(`//div[contains(@data-testid,'factorValue')][${randomInt(6)}]`).click(); // Выбор случайного эвента и ставки
        const element = page.locator(randomMatch + `//a[@data-testid='event']`);
        const text = await element.textContent();
        const teamsArray = text?.split('—') as [string, string]
        console.log(teamsArray[1])
        console.log(teamsArray[0])
        await expect.soft(page.locator("//div[@class='coupon-cart--dWMlE']")).toContainText(teamsArray[0]);
        await expect.soft(page.locator("//div[@class='coupon-cart--dWMlE']")).toContainText(teamsArray[1]);
    });

    test('Экспресс пари', async ({ page }) => {
        await page.goto(baseUrl + '/sports?mode=1', { waitUntil: "load" }); // Переход на страницу
        await page.waitForSelector(randomSportEvent); // Ожидание отрисовки таблицы
        await page.waitForTimeout(500);
        await takeRandomBet(page);
        await takeRandomBet(page);
        await page.locator("//input[@data-testid='stringEdit']").click();
        const bet: string = `${randomInt(10000)}`
        await page.keyboard.type(bet);
        await page.locator(`//span[contains(text(),'${bet}')]`).click();
        await page.waitForTimeout(200);
        expect(page.locator("//div[@class='login-box--Rb_3i']"), 'Не отображается форма входа в аккаунт').toBeVisible();
    });
});