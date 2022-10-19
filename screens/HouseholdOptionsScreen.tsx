import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { auth } from "../config/firebase";
import { RootStackParams } from "../navigation/RootStackNavigator";

type Props = NativeStackScreenProps<RootStackParams>;

const HouseholdOptionsScreen = ({ navigation }: Props) => {
  function handleSignOut() {
    signOut(auth).then(() => {
      {
        navigation.popToTop();
      }
    });
  }
  return (
    <>
      <Container>
        <Button
          dark
          mode={"outlined"}
          style={{ marginTop: 10, width: 300 }}
          onPress={() => {
            console.log("Mina hushåll");
          }}
        >
          Mina hushåll
        </Button>
        <Button
          dark
          mode={"outlined"}
          style={{ marginTop: 10, width: 300 }}
          onPress={() => {
            console.log("Gå med i hushåll");
          }}
        >
          Gå med i hushåll
        </Button>
        <Button
          dark
          mode={"outlined"}
          style={{ marginTop: 10, width: 300 }}
          onPress={() => {
            console.log("skapa hushåll");
          }}
        >
          Skapa hushåll
        </Button>

        <Button
          dark
          mode={"outlined"}
          style={{ marginTop: 10, width: 300 }}
          onPress={() => {
            navigation.navigate("TabStack");
          }}
        >
          tillfällig choreScreen
        </Button>
      </Container>
      <Button mode={"contained"} style={{ width: 200, alignSelf: "center", marginBottom: 50 }} onPress={handleSignOut}>
        Logga ut
      </Button>
    </>
  );
};

export default HouseholdOptionsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
