
export const filterNumbersFromString = (string: string) => string.replace(/[^\d]/g, '')

export const getRandomNumber = (max: number) => Math.floor(Math.random() * max);
