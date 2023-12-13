import { Page } from "@playwright/test";

export async function takeRandomBet(page: Page) {
    const randomIndex = randomNum(1, 5);
    const randomMatch = `//div[contains(@data-testid, 'sportBaseEvent')][${randomIndex}]`
    await page.locator(`${randomMatch}//div[contains(@data-testid,'factorValue')][${randomIndex}]`).click(); // Выбор случайного эвента и ставки
    await page.waitForTimeout(500);
}

export function randomNum(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}