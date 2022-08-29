export function getNumberEmoji(num: number) {
  const digits = num.toString().split("");
  const digitWithEmoji = digits
    .map((item) => `${item}&#65039;&#8419;`)
    .join("");

  return digitWithEmoji;
}

export function getPositiveOrNegativeEmoji(num: number) {
  return num >= 0 ? `📈 ${num}` : `📉 ${num}`;
}

export function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
