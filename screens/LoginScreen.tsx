import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { Surface, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const LoginScreen = ({ navigation }: Props) => {
  return (
    <>
      <Main>
        <Surface style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}>
          <View>
            <HeaderText>Logga in</HeaderText>
          </View>
        </Surface>

        <Surface style={{ flex: 1, justifyContent: "center" }}>
          <InputView>
            <TextInput placeholder="Användarnamn" style={{ marginBottom: 10 }} />
            <TextInput placeholder="Lösenord" />
          </InputView>
        </Surface>

        <Surface>
          <Footer>
            <FooterButton onPress={() => navigation.replace("TabStack")}>
              <AntDesign name="pluscircleo" size={24} color="black" />
              <FooterText>Logga in</FooterText>
            </FooterButton>
            <FooterButton onPress={() => navigation.navigate("Welcome")}>
              <AntDesign name="closecircleo" size={24} color="black" />
              <FooterText>Stäng</FooterText>
            </FooterButton>
          </Footer>
        </Surface>
      </Main>
    </>
  );
};

export default LoginScreen;

const HeaderText = styled.Text`
  font-size: 30px;
  margin: 20px 20px;
  font-weight: 500;
`;
const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const FooterText = styled.Text`
  font-size: 20px;
  margin-left: 10px;
`;

const Main = styled.View`
`;

const InputView = styled.View`
  justify-content: space-between;
  margin: 0 30px;
`;

const FooterButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin: 20px 30px;
`;
