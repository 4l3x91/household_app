import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { signOut } from "firebase/auth";
import React from "react";
import { ColorSchemeName, Pressable, View } from "react-native";
import { Button, RadioButton, Surface, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { auth } from "../../config/firebase";
import { useUtils } from "../../hooks/useUtils";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectTheme, set } from "../../store/theme/themeSlice";
import { logout } from "../../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const SettingsScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectTheme);
  const { resetStore } = useUtils();

  function handleSignOut() {
    signOut(auth).then(() => {
      {
        dispatch(logout());

        resetStore();
      }
    });
  }
  return (
    <>
      <HeaderContainer>
        <Pressable onPress={() => navigation.goBack()} style={{ marginTop: Constants.statusBarHeight, padding: 10, marginHorizontal: 10 }}>
          <Ionicons name="arrow-back-circle-outline" size={50} color={colors.primary} />
        </Pressable>
        <Text style={{ marginLeft: 50, textAlign: "center", marginTop: Constants.statusBarHeight }} variant="headlineMedium">
          Inställningar
        </Text>
      </HeaderContainer>
      <Container>
        <ModalContent elevation={0}>
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
        </ModalContent>
        <Button style={{ marginBottom: 20 }} mode="contained" onPress={handleSignOut}>
          Logga ut
        </Button>
      </Container>
    </>
  );
};

export default SettingsScreen;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;
const Content = styled(Surface)`
  margin: 5px;
  padding: 10px 20px;
  border-radius: 10px;
`;
const ModalContent = styled(Surface)`
  padding: 20px;
  margin-top: 10px;
`;

const RadioButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
