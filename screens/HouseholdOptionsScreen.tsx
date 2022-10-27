import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React, { useRef } from "react";
import { View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Button, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import CreateHousehold from "../components/household/CreateHousehold";
import JoinHousehold from "../components/household/JoinHousehold";
import MyHouseholds from "../components/household/MyHouseholds";
import { auth } from "../config/firebase";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { resetHousehold } from "../store/household/householdSlice";
import { selectUserProfiles } from "../store/profile/profileSelectors";
import { resetProfileState } from "../store/profile/profileSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { logout } from "../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const HouseholdOptionsScreen = ({ navigation }: Props) => {
  const userProfiles = useAppSelector(selectUserProfiles);
  const modalizeRef = useRef<Modalize>(null);
  const householdModalRef = useRef<Modalize>(null);

  const joinHouseholdRef = useRef<Modalize>(null);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const openJoinHouseholdModalize = () => {
    joinHouseholdRef.current?.open();
  };

  const openModalize = () => {
    modalizeRef.current?.open();
  };

  const openMyHouseholds = () => {
    householdModalRef.current?.open();
  };

  function handleSignOut() {
    signOut(auth).then(() => {
      {
        navigation.popToTop();
        dispatch(logout());

        //denna resettar state men ska bytas ut mot en useEffect där alla state resettas
        dispatch(resetProfileState());
        dispatch(resetHousehold());
      }
    });
  }
  return (
    <>
      <Container>
        {userProfiles.length > 1 && (
          <Button
            dark
            mode={"outlined"}
            style={{ marginTop: 10, width: 300 }}
            onPress={() => {
              console.log("Mina hushåll");
              openMyHouseholds();
            }}
          >
            Mina hushåll
          </Button>
        )}
        <Button dark mode={"outlined"} style={{ marginTop: 10, width: 300 }} onPress={openJoinHouseholdModalize}>
          Gå med i hushåll
        </Button>
        <Button dark mode={"outlined"} style={{ marginTop: 10, width: 300 }} onPress={openModalize}>
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
      <Modalize ref={modalizeRef} rootStyle={{}} modalStyle={{ backgroundColor: theme.colors.background, padding: 10 }} adjustToContentHeight={true}>
        <CreateHousehold closeModal={() => modalizeRef.current?.close()} />
      </Modalize>
      <Modalize ref={householdModalRef} rootStyle={{}} modalStyle={{ backgroundColor: theme.colors.surface, padding: 10 }} modalTopOffset={50}>
        <View style={{ padding: 10, justifyContent: "center" }}>
          <MyHouseholds goToChores={() => navigation.navigate("TabStack")} />
        </View>
      </Modalize>
      <Modalize
        ref={joinHouseholdRef}
        rootStyle={{}}
        modalStyle={{ backgroundColor: theme.colors.surface, paddingVertical: 100 }}
        modalTopOffset={50}
      >
        <JoinHousehold closeModal={() => joinHouseholdRef.current?.close()} />
      </Modalize>
    </>
  );
};

export default HouseholdOptionsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
