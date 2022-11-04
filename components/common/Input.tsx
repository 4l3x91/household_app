import React from "react";
import { TextInput } from "react-native-paper";

interface Props {
  label: string;
  value: string;
  handleChange: (string: string) => void;
  secureTextEntry?: boolean;
  height?: number;
  width?: number | string;
  marginHorizontal?: number;
  marginVertical?: number;
  multiline?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
  activeOutlineColor?: string | undefined;
  outlineColor?: string | undefined;
  numberOfLines?: number;
  max?: number;
}

const Input = ({
  label,
  value,
  handleChange,
  secureTextEntry,
  height,
  multiline,
  numberOfLines,
  activeOutlineColor,
  marginHorizontal,
  marginVertical,
  outlineColor,
  right,
  width,
  max,
}: Props) => {
  return (
    <TextInput
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      multiline={multiline}
      numberOfLines={numberOfLines}
      label={label}
      mode={"outlined"}
      value={value}
      onChangeText={handleChange}
      secureTextEntry={secureTextEntry}
      style={{ marginHorizontal: marginHorizontal, marginVertical: marginVertical, height: height, width: width }}
      right={right}
      maxLength={max}
    />
  );
};

export default Input;
