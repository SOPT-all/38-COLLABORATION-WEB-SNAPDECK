export const createTurnId = () =>
  globalThis.crypto?.randomUUID?.() ?? String(Date.now());
