import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Surface, Text, useTheme, TextInput } from "react-native-paper";
import { Theme } from "../../theme";

const JoinHousehold = () => {
  const { colors } = useTheme();
  const [text, setText] = useState<string>();
  const pinCodeLength = 6;
  function InputBoxes() {
    
    const inputBoxes = [];
    for (let i = 0; i < pinCodeLength; i++) {
      let filled = false;
      if (text && text[i]) filled = true;
      inputBoxes.push(
        <Surface elevation={0} key={i} style={[styles.surface, styles.inputBox, propsStyle(filled, colors).test]}>
          <Text variant="headlineLarge">{text && text[i]}</Text>
        </Surface>
      );
    }
    return inputBoxes;
  }

  return (
    <Surface elevation={0} style={styles.surface}>
      <Text>Skriv in din kod här</Text>
      <Surface style={{ backgroundColor: "transparent", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
        <TextInput
          maxLength={pinCodeLength}
          mode="outlined"
          style={styles.input}
          value={text}
          onChangeText={(text) => setText(text.toUpperCase())}
          onSubmitEditing={() => console.log("Take me to Profile Creation or throw an error")}
        />
{InputBoxes()}
      </Surface>
    </Surface>
  );
};

export default JoinHousehold;

const styles = StyleSheet.create({
  surface: {
    backgroundColor: "transparent",
  },
  input: {
    marginTop: -8,
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
  },
  inputBox: {
    borderWidth: 1,
    minWidth: 50,
    minHeight: 70,
    borderRadius: 5,
    margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

const propsStyle = (filled: boolean, colors: any) => StyleSheet.create({
  test:  {
    opacity: filled ? 1 : .3,
    borderColor: filled ? "green" : colors.primary
  }
})
