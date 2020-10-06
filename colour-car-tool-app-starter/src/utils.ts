export const nanToStr = (value: number) => (isNaN(value) ? '' : String(value));

export const strToNaN = (value: string) => (value === '' ? NaN : Number(value));
