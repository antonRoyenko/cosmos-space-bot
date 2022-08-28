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
