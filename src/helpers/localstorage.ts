export function getLS(key: string) {
  return window.localStorage.getItem(key);
}

export function setLS(key: string, value: string) {
  window.localStorage.setItem(key, value);
}

export function deleteLS(key: string) {
  window.localStorage.removeItem(key);
}
