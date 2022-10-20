import React from "react";
import { TextInput } from "react-native-paper";

interface Props {
  label: string;
  value: string;
  handleChange: (string: string) => void;
  secureTextEntry?: boolean;
  height?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  multiline?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
  activeOutlineColor?: string | undefined;
  outlineColor?: string | undefined;
}

const Input = ({
  label,
  value,
  handleChange,
  secureTextEntry,
  height,
  multiline,
  activeOutlineColor,
  marginHorizontal,
  marginVertical,
  outlineColor,
  right,
}: Props) => {
  return (
    <TextInput
      outlineColor={outlineColor}
      activeOutlineColor={activeOutlineColor}
      multiline={multiline}
      label={label}
      mode={"outlined"}
      value={value}
      onChangeText={handleChange}
      secureTextEntry={secureTextEntry}
      style={{ marginHorizontal: marginHorizontal, marginVertical: marginVertical, height: height }}
      right={right}
    />
  );
};

export default Input;
