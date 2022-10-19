import React, { useState } from "react";
import { RadioButton, Text } from "react-native-paper";
import styled from "styled-components/native";

const SelectThemeScreen = () => {
  const [theme, setTheme] = useState("system");
  console.log(theme);
  return (
    <Container>
      <RadioButton.Group onValueChange={(newValue) => setTheme(newValue)} value={theme}>
        <RadioButtonContainer onPress={() => setTheme("dark")}>
          <RadioButtonText variant="bodyMedium">På</RadioButtonText>
          <RadioButton.Android value="dark" />
        </RadioButtonContainer>

        <Divider />

        <RadioButtonContainer onPress={() => setTheme("light")}>
          <RadioButtonText variant="bodyMedium">Av</RadioButtonText>
          <RadioButton.Android value="light" />
        </RadioButtonContainer>

        <Divider />

        <RadioButtonContainer onPress={() => setTheme("system")}>
          <RadioButtonTextContainer>
            <Text variant="bodyMedium">System</Text>
            <Text variant="bodySmall">Vi anpassar applikationen baserat på din enhets systeminställningar.</Text>
          </RadioButtonTextContainer>
          <RadioButton.Android value="system" />
        </RadioButtonContainer>

        <Divider />
      </RadioButton.Group>
    </Container>
  );
};

export default SelectThemeScreen;
const Container = styled.View`
  padding: 20px;
`;

const Divider = styled.View`
  margin: 10px 0px;
  height: 1px;
  background-color: white;
  opacity: 0.3;
`;

const RadioButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RadioButtonTextContainer = styled.View`
  flex: 1;
`;

const RadioButtonText = styled(Text)`
  flex: 1;
`;
