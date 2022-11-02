import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Constants from "expo-constants";
import { signOut } from "firebase/auth";
import React from "react";
import { Pressable } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import ThemePicker from "../../components/common/ThemePicker";
import { auth } from "../../config/firebase";
import { useUtils } from "../../hooks/useUtils";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const SettingsScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
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
        <ThemePicker />
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

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
