import { randomNum } from "../pages/page";

const index = randomNum(1, 5);

export const preMatch: string = `//div[@class='filter-component-sport-mode__item--VlBSc'][1]`;

export const randomMatch: string = `//div[contains(@data-testid, 'sportBaseEvent')][${index}]`;

export const randomBet: string = `//div[contains(@data-testid,'factorValue')][${index}]`;

export const newBetPlace: string = `//div[@class='coupon-cart--dWMlE']`;

export const betButton: string = `//div[@class='coupon-cart-footer__place-button--fS2il']//span`;