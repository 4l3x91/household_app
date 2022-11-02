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

export function getLastWeeksMondayDate() {
  const date = new Date();
  const day = date.getDay();
  const LastWeeksMondayDate = new Date();
  if (date.getDay() == 1) {
    LastWeeksMondayDate.setDate(date.getDate() - 7);
  } else {
    LastWeeksMondayDate.setDate(date.getDate() - (day + 6));
  }
  return LastWeeksMondayDate;
}

export function getLastWeeksSundayDate() {
  const date = new Date();
  const day = date.getDay();
  const LastWeeksSundayDate = new Date();
  if (date.getDay() == 1) {
    LastWeeksSundayDate.setDate(date.getDate() - 1);
  } else {
    LastWeeksSundayDate.setDate(date.getDate() - day);
  }
  return LastWeeksSundayDate;
}

export const firstDayOfTheYear = new Date(new Date().getFullYear(), 0, 1);

export function getPreviousMonday() {
  const date = new Date();
  const day = date.getDay();
  const prevMonday = new Date();
  if (date.getDay() == 1) {
    prevMonday.setDate(date.getDate());
  } else {
    prevMonday.setDate(date.getDate() - (day - 1));
  }
  return prevMonday;
}

export function getFirstDayPreviousMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth() - 1, 1);
}
export function getLastDayPreviousMonth() {
  const date = new Date();
  return new Date(date.getFullYear(), date.getMonth(), 0);
}
