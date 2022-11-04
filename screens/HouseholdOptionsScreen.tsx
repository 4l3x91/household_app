import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Modal from "react-native-modal";
import { Modalize } from "react-native-modalize";
import { Button, Portal, Snackbar, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import CreateHousehold from "../components/household/CreateHousehold";
import JoinHousehold from "../components/household/JoinHousehold";
import MyHouseholds from "../components/household/MyHouseholds";
import { auth } from "../config/firebase";
import { useUtils } from "../hooks/useUtils";
import { RootStackParams } from "../navigation/RootStackNavigator";
import { getHouseholdById } from "../store/household/householdThunks";
import { selectMemoizedUserProfiles } from "../store/profile/profileSelectors";
import { getAllProfiles } from "../store/profile/profileThunks";
import { useAppDispatch, useAppSelector } from "../store/store";
import { selectUser } from "../store/user/userSelectors";
import { logout } from "../store/user/userSlice";

type Props = NativeStackScreenProps<RootStackParams>;

const HouseholdOptionsScreen = ({ navigation }: Props) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [joinModalVisible, setJoinModalVisible] = useState(false);
  const userProfiles = useAppSelector(selectMemoizedUserProfiles);
  const user = useAppSelector(selectUser);
  const householdModalRef = useRef<Modalize>(null);
  const { resetStore } = useUtils();
  const [snackBarVisible, setSnackbarVisible] = useState(false);
  const joinHouseholdRef = useRef<Modalize>(null);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { error } = useAppSelector((state) => state.profile);

  const openMyHouseholds = () => {
    householdModalRef.current?.open();
  };

  useEffect(() => {
    if (user) {
      dispatch(getAllProfiles(user));
      if (error !== "") {
        console.log(error);
        navigation.navigate("HouseholdOptions");
      }
    }
  }, [user, error]);

  useEffect(() => {
    if (user && userProfiles.length === 1) {
      dispatch(getHouseholdById(userProfiles[0].householdId));
      navigation.navigate("TabStack");
    }
  }, [userProfiles]);

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
      <Container>
        {userProfiles.length > 1 && (
          <Button
            dark
            mode={"outlined"}
            style={{ marginTop: 10, width: 300 }}
            onPress={() => {
              openMyHouseholds();
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
            setTimeout(() => {
              setJoinModalVisible(true);
            }, 200);
          }}
        >
          Gå med i hushåll
        </Button>
        <Button
          dark
          mode={"outlined"}
          style={{ marginTop: 10, width: 300 }}
          onPress={() => {
            setTimeout(() => {
              setCreateModalVisible(true);
            }, 200);
          }}
        >
          Skapa hushåll
        </Button>
      </Container>
      <Button mode={"contained"} style={{ width: 200, alignSelf: "center", marginBottom: 50 }} onPress={handleSignOut}>
        Logga ut
      </Button>

      <Modalize ref={householdModalRef} rootStyle={{}} modalStyle={{ backgroundColor: theme.colors.surface, padding: 10 }} adjustToContentHeight>
        <View style={{ padding: 10, justifyContent: "center", paddingBottom: 25 }}>
          <MyHouseholds goToChores={() => navigation.navigate("TabStack")} />
        </View>
      </Modalize>

      <Portal>
        <Modal
          onSwipeComplete={() => setJoinModalVisible(false)}
          swipeDirection={"down"}
          avoidKeyboard
          isVisible={joinModalVisible}
          statusBarTranslucent
        >
          <JoinHousehold setSnackbarVisible={setSnackbarVisible} closeModal={() => setJoinModalVisible(false)} />
        </Modal>
      </Portal>

      <Portal>
        <Modal
          onSwipeComplete={() => setCreateModalVisible(false)}
          swipeDirection={"down"}
          avoidKeyboard
          isVisible={createModalVisible}
          statusBarTranslucent
        >
          <CreateHousehold closeModal={() => setCreateModalVisible(false)} />
        </Modal>
      </Portal>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "Ok",
          onPress: () => {
            () => setSnackbarVisible(false);
          },
        }}
        style={{ padding: 10 }}
      >
        En ansökan om att gå med i hushållet har skickats till ägaren! 🥳
      </Snackbar>
    </>
  );
};

export default HouseholdOptionsScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
