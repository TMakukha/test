import { randomInt } from "crypto";

export const randomSportEvent: string = `//div[contains(@data-testid, 'sportBaseEvent')][${randomInt(11)}]`
export const randomFactorValue: string = `//div[contains(@data-testid,'factorValue')][${randomInt(6)}]`

export const preMatch: string = `//div[@class='filter-component-sport-mode__item--VlBSc _selected--FXP2N']`