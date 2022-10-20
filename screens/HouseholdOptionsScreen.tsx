import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { auth } from "../config/firebase";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { selectUsersProfiles } from "../store/profile/profileSelectors";
import { resetProfileState } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const HouseholdOptionsScreen = ({ navigation }: Props) => {
  const userProfiles = useAppSelector(selectUsersProfiles);
  const dispatch = useAppDispatch();

  function handleSignOut() {
    signOut(auth).then(() => {
      {
        navigation.popToTop();
        dispatch(logout());

        //denna resettar state men ska bytas ut mot en useEffect där alla state resettas
        dispatch(resetProfileState());
      }
    });
  }
  return (
    <>
      <Container>
        {userProfiles.length > 0 && (
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
        )}
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
