export function shuffle(array: Array<unknown>) {
  return array.sort(() => Math.random() - 0.5);
}

export function wait(millis: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, millis);
  });
}
