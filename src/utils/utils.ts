export const randomFromOneTo = (max) => Math.floor(Math.random() * max) + 1;

// between min (included) and max (included)
export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
