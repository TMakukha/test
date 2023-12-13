import { Page } from "@playwright/test";
import { randomInt } from "crypto";

export async function takeRandomBet(page: Page) {
    const randomMatch = `//div[contains(@data-testid, 'sportBaseEvent')][${randomInt(6)}]`
    await page.locator(randomMatch).locator(`//div[contains(@data-testid,'factorValue')][${randomInt(6)}]`).click(); // Выбор случайного эвента и ставки
}