import React from "react";
import { ColorSchemeName } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectTheme, set } from "../store/theme/themeSlice";

const SelectThemeScreen = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);

  return (
    <Container>
      <RadioButton.Group onValueChange={(theme) => dispatch(set(theme))} value={theme.theme as NonNullable<ColorSchemeName>}>
        <RadioButtonContainer onPress={() => dispatch(set("dark"))}>
          <RadioButtonText variant="bodyMedium">På</RadioButtonText>
          <RadioButton.Android value="dark" />
        </RadioButtonContainer>

        <Divider />

        <RadioButtonContainer onPress={() => dispatch(set("light"))}>
          <RadioButtonText variant="bodyMedium">Av</RadioButtonText>
          <RadioButton.Android value="light" />
        </RadioButtonContainer>

        <Divider />

        <RadioButtonContainer onPress={() => dispatch(set("system"))}>
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
  background-color: #808080;
  opacity: 0.5;
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
