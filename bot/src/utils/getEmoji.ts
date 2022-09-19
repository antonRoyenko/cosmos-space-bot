import { number } from "@bot/constants/regex";

export function getNumberEmoji(num: number) {
  const digits = num.toString().split("");
  const digitWithEmoji = digits
    .map((item) => `${item}&#65039;&#8419;`)
    .join("");

  return digitWithEmoji;
}

export function getPositiveOrNegativeEmoji(num: number | string) {
  let parsedNumber = num;
  if (typeof num === "string") {
    // eslint-disable-next-line no-useless-escape
    parsedNumber = parseFloat(num.replace(number, ""));
  }
  return parsedNumber >= 0 ? `📈 ${num}` : `📉 ${num}`;
}

export function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
