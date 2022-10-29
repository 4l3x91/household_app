export function convertToRGB(hex: string, alpha: number): string {
  const newHex = hex.substring(1);

  if (newHex.length != 6) {
    throw "Only six-digit hex colors are allowed.";
  }

  const aRgbHex = newHex.match(/.{1,2}/g);
  if (aRgbHex) {
    const aRgb = [parseInt(aRgbHex[0], 16), parseInt(aRgbHex[1], 16), parseInt(aRgbHex[2], 16)];

    const aRgbString = `rgba(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]}, ${alpha})`;

    return aRgbString;
  }
  return "rgba(0,0,0,0)";
}
