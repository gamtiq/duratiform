// Created on the basis of http://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

export as namespace duratiform;

export interface DivideResult {
    day?: number;
    day2?: string;
    hour?: number;
    hour2?: string;
    minute?: number;
    minute2?: string;
    second?: number;
    second2?: string;
    week?: number;
    week2?: string;
}

export function divide(duration: number, partQty?: number, addStrings?: boolean): DivideResult;

export function format(duration: number, format?: string): string;
