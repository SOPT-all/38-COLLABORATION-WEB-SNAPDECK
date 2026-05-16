export const assertNever = (
  value: never,
  message = "처리되지 않은 값입니다",
): never => {
  throw new Error(`${message}: ${value}`);
};
