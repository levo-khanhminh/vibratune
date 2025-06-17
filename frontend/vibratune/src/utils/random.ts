export function getRandomHexColor(): string {
  const randomColor = Math.floor(Math.random() * 16777216);
  let hexColor = randomColor.toString(16);
  hexColor = "#" + ("000000" + hexColor).slice(-6);
  return hexColor;
}
