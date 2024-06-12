export const sleep = (ms: number) =>
  new Promise((r) => {
    setTimeout(r, ms);
  });

export const delay =
  <T>(ms: number) =>
  async (input: T) => {
    await sleep(ms);
    return input;
  };
