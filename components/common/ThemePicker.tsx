import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ColorSchemeName, View } from "react-native";
import { RadioButton, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectTheme, set } from "../../store/theme/themeSlice";

const ThemePicker = () => {
  const theme = useAppSelector(selectTheme);
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <View>
        <Text style={{ marginLeft: 10 }}>
          darkmode <MaterialCommunityIcons name="theme-light-dark" size={15} color={colors.primary} />
        </Text>

        <RadioButton.Group onValueChange={(theme) => dispatch(set(theme))} value={theme.theme as NonNullable<ColorSchemeName>}>
          <Content>
            <RadioButtonContainer onPress={() => dispatch(set("dark"))}>
              <Text variant="bodyMedium">På</Text>
              <RadioButton.Android value="dark" />
            </RadioButtonContainer>
          </Content>

          <Content>
            <RadioButtonContainer onPress={() => dispatch(set("light"))}>
              <Text variant="bodyMedium">Av</Text>
              <RadioButton.Android value="light" />
            </RadioButtonContainer>
          </Content>

          <Content>
            <RadioButtonContainer onPress={() => dispatch(set("system"))}>
              <View>
                <Text variant="bodyMedium">System</Text>
                <Text variant="bodySmall">Vi anpassar applikationen baserat på din enhets systeminställningar.</Text>
              </View>
              <RadioButton.Android value="system" />
            </RadioButtonContainer>
          </Content>
        </RadioButton.Group>
      </View>
    </Container>
  );
};

export default ThemePicker;

const Content = styled(Surface)`
  margin: 5px;
  padding: 10px 20px;
  border-radius: 10px;
`;
const Container = styled.View`
  padding: 20px;
  margin-top: 10px;
`;

const RadioButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
