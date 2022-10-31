import { ColorSchemeName, useColorScheme as _useColorScheme } from "react-native";

export default function useColorScheme(theme?: ColorSchemeName): NonNullable<ColorSchemeName> {
  const colorScheme = _useColorScheme() as NonNullable<ColorSchemeName>;
  if (theme === "light") return "light";
  else if (theme === "dark") return "dark";
  else return colorScheme;
}
