export function isNumber(n: string) {
  return !isNaN(parseFloat(n)) && isFinite(Number(n));
}
