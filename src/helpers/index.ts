export function getLS(key: string) {
  return window.localStorage.getItem(key);
}

export function setLS(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function deleteLS(key: string) {
  window.localStorage.removeItem(key);
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

export function shuffle(array: Array<unknown>) {
  return array.sort(() => Math.random() - 0.5);
}
