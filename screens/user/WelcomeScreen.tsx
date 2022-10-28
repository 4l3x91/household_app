import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Image } from "react-native";
import { Button, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { RootStackParams } from "../../navigation/RootStackNavigator";
import { getTheme } from "../../theme";

type Props = NativeStackScreenProps<RootStackParams>;

const WelcomeScreen = ({ navigation }: Props) => {
  const theme = useTheme();
  console.log(getTheme(theme).dark);

  return (
    <>
      <Container>
        <Image source={require("../../assets/catbroomSplash.png")} style={{ flex: 1, resizeMode: "contain" }} />
        <InnerContainer>
          <Button
            contentStyle={{ flexDirection: "row-reverse", paddingHorizontal: 15, paddingVertical: 5 }}
            labelStyle={{ fontSize: 15 }}
            icon="login"
            mode="contained"
            onPress={() => navigation.navigate("Login")}
          >
            Logga in
          </Button>
          <DividerContainer>
            <DividerLine />
            <DividerText color={theme.colors.onSurface}>eller</DividerText>
            <DividerLine />
          </DividerContainer>
          <Button
            contentStyle={{ flexDirection: "row-reverse", paddingHorizontal: 15, paddingVertical: 5 }}
            labelStyle={{ fontSize: 15 }}
            icon="account-plus"
            mode="outlined"
            onPress={() => navigation.navigate("CreateUser")}
          >
            Registrera konto
          </Button>
        </InnerContainer>
      </Container>
    </>
  );
};

export default WelcomeScreen;

const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
`;
const DividerContainer = styled.View`
  flex-direction: row;
  padding: 0 10px;
`;

const DividerText = styled.Text<{ color: string }>`
  padding: 15px 5px;
  color: ${(props) => props.color};
`;

const DividerLine = styled.View`
  height: 1px;
  flex: 1;
  background-color: #6d6d6def;
  align-self: center;
`;

const InnerContainer = styled.View`
  position: absolute;
  top: 60%;
`;
